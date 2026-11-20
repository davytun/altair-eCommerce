import { existsSync } from 'node:fs'
import { readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDirectory = path.join(projectRoot, 'dist')
const htmlPath = path.join(distDirectory, 'index.html')
const phpPath = path.join(distDirectory, 'index.php')
const trackingTemplatePath = path.join(projectRoot, 'templates', 'store-tracking-head.php')
const trackingMarker = '<!-- flexshop:tracking-head -->'

function fail(message) {
  throw new Error(`Packaging blocked: ${message}`)
}

function validatePhpTemplate() {
  const phpLint = spawnSync('php', ['-l', trackingTemplatePath], { encoding: 'utf8' })

  if (phpLint.error?.code === 'ENOENT') {
    console.warn('PHP CLI was not found, so the approved tracking template was not syntax-checked locally.')
    return
  }

  if (phpLint.status !== 0) {
    fail(`PHP syntax check failed for templates/store-tracking-head.php. ${phpLint.stderr || phpLint.stdout}`)
  }
}

if (!existsSync(htmlPath)) {
  fail('dist/index.html is missing. Run the Vite build before preparing PHP output.')
}

if (!existsSync(trackingTemplatePath)) {
  fail('templates/store-tracking-head.php is missing. Add the exact company-approved, clean PHP source before packaging.')
}

validatePhpTemplate()

const [html, trackingTemplate] = await Promise.all([
  readFile(htmlPath, 'utf8'),
  readFile(trackingTemplatePath, 'utf8'),
])

if (!trackingTemplate.trim()) {
  fail('templates/store-tracking-head.php is empty.')
}

if (!/<head(?:\s[^>]*)?>/i.test(html)) {
  fail('dist/index.html has no <head> element for the tracking template.')
}

const php = html.replace(
  /<head(?:\s[^>]*)?>/i,
  (head) => `${head}\n    ${trackingMarker}\n    ${trackingTemplate.trim()}\n    ${trackingMarker}`,
)

const markerCount = php.split(trackingMarker).length - 1
if (markerCount !== 2) {
  fail('tracking marker injection did not produce exactly one template location.')
}

if (/\b(?:src|href)=["']\/(?!\/)/i.test(php)) {
  fail('absolute asset URLs were found. Vite must keep base set to "./" for subdirectory deployment.')
}

await writeFile(phpPath, php, 'utf8')
await rm(htmlPath)

console.log('Prepared dist/index.php with the approved tracking template.')
