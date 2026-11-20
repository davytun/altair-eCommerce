import { existsSync } from 'node:fs'
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { deflateRawSync } from 'node:zlib'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDirectory = path.join(projectRoot, 'dist')
const artifactsDirectory = path.join(projectRoot, 'artifacts')
const productConfigPath = path.join(projectRoot, 'src', 'config', 'product.ts')
const trackingMarker = '<!-- flexshop:tracking-head -->'

function fail(message) {
  throw new Error(`Packaging blocked: ${message}`)
}

function crc32(buffer) {
  let checksum = 0xffffffff

  for (const byte of buffer) {
    checksum ^= byte
    for (let bit = 0; bit < 8; bit += 1) {
      checksum = (checksum >>> 1) ^ (0xedb88320 & -(checksum & 1))
    }
  }

  return (checksum ^ 0xffffffff) >>> 0
}

function dosTimestamp(date) {
  const year = Math.max(date.getFullYear(), 1980)
  return {
    date: ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate(),
    time: (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2),
  }
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...await collectFiles(entryPath))
    } else if (entry.isFile()) {
      files.push(entryPath)
    }
  }

  return files
}

function createZipEntry(relativePath, data, modifiedAt, offset) {
  const name = Buffer.from(relativePath.replaceAll(path.sep, '/'))
  const compressed = deflateRawSync(data)
  const checksum = crc32(data)
  const timestamp = dosTimestamp(modifiedAt)
  const localHeader = Buffer.alloc(30)

  localHeader.writeUInt32LE(0x04034b50, 0)
  localHeader.writeUInt16LE(20, 4)
  localHeader.writeUInt16LE(0, 6)
  localHeader.writeUInt16LE(8, 8)
  localHeader.writeUInt16LE(timestamp.time, 10)
  localHeader.writeUInt16LE(timestamp.date, 12)
  localHeader.writeUInt32LE(checksum, 14)
  localHeader.writeUInt32LE(compressed.length, 18)
  localHeader.writeUInt32LE(data.length, 22)
  localHeader.writeUInt16LE(name.length, 26)
  localHeader.writeUInt16LE(0, 28)

  const centralHeader = Buffer.alloc(46)
  centralHeader.writeUInt32LE(0x02014b50, 0)
  centralHeader.writeUInt16LE(20, 4)
  centralHeader.writeUInt16LE(20, 6)
  centralHeader.writeUInt16LE(0, 8)
  centralHeader.writeUInt16LE(8, 10)
  centralHeader.writeUInt16LE(timestamp.time, 12)
  centralHeader.writeUInt16LE(timestamp.date, 14)
  centralHeader.writeUInt32LE(checksum, 16)
  centralHeader.writeUInt32LE(compressed.length, 20)
  centralHeader.writeUInt32LE(data.length, 24)
  centralHeader.writeUInt16LE(name.length, 28)
  centralHeader.writeUInt16LE(0, 30)
  centralHeader.writeUInt16LE(0, 32)
  centralHeader.writeUInt16LE(0, 34)
  centralHeader.writeUInt16LE(0, 36)
  centralHeader.writeUInt32LE(0, 38)
  centralHeader.writeUInt32LE(offset, 42)

  return {
    centralDirectory: Buffer.concat([centralHeader, name]),
    localFile: Buffer.concat([localHeader, name, compressed]),
  }
}

if (!existsSync(distDirectory)) {
  fail('dist is missing. Run the build and PHP preparation steps first.')
}

const indexPhpPath = path.join(distDirectory, 'index.php')
const indexHtmlPath = path.join(distDirectory, 'index.html')
if (!existsSync(indexPhpPath) || existsSync(indexHtmlPath)) {
  fail('dist must contain index.php and must not contain index.html.')
}

const [indexPhp, productConfig] = await Promise.all([
  readFile(indexPhpPath, 'utf8'),
  readFile(productConfigPath, 'utf8'),
])

if (indexPhp.split(trackingMarker).length - 1 !== 2) {
  fail('index.php does not contain exactly one injected tracking template.')
}

if (productConfig.includes('isPlaceholder: true')) {
  fail('src/config/product.ts still has isPlaceholder: true. Replace all preview content before packaging.')
}

const slugMatch = productConfig.match(/slug:\s*'([a-z0-9-]+)'/i)
if (!slugMatch) {
  fail('A lowercase hyphenated product slug is required to name the ZIP file.')
}

const files = await collectFiles(distDirectory)
if (!files.some((filePath) => /[\\/]assets[\\/].+\.js$/i.test(filePath))) {
  fail('No generated JavaScript asset was found in dist/assets.')
}
if (!files.some((filePath) => /[\\/]assets[\\/].+\.css$/i.test(filePath))) {
  fail('No generated CSS asset was found in dist/assets.')
}
if (files.some((filePath) => /(?:\.env|\.tsx?|node_modules)/i.test(path.relative(distDirectory, filePath)))) {
  fail('dist contains a disallowed source, environment, or dependency file.')
}

const localFiles = []
const centralDirectories = []
let offset = 0

for (const filePath of files) {
  const [data, fileStats] = await Promise.all([readFile(filePath), stat(filePath)])
  const entry = createZipEntry(path.relative(distDirectory, filePath), data, fileStats.mtime, offset)
  localFiles.push(entry.localFile)
  centralDirectories.push(entry.centralDirectory)
  offset += entry.localFile.length
}

const centralDirectory = Buffer.concat(centralDirectories)
const endOfCentralDirectory = Buffer.alloc(22)
endOfCentralDirectory.writeUInt32LE(0x06054b50, 0)
endOfCentralDirectory.writeUInt16LE(0, 4)
endOfCentralDirectory.writeUInt16LE(0, 6)
endOfCentralDirectory.writeUInt16LE(files.length, 8)
endOfCentralDirectory.writeUInt16LE(files.length, 10)
endOfCentralDirectory.writeUInt32LE(centralDirectory.length, 12)
endOfCentralDirectory.writeUInt32LE(offset, 16)
endOfCentralDirectory.writeUInt16LE(0, 20)

await mkdir(artifactsDirectory, { recursive: true })
const zipPath = path.join(artifactsDirectory, `${slugMatch[1]}.zip`)
await writeFile(zipPath, Buffer.concat([...localFiles, centralDirectory, endOfCentralDirectory]))

console.log(`Created ${path.relative(projectRoot, zipPath)} with ${files.length} deployable files.`)
