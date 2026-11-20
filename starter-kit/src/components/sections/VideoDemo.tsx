import type { ProductVideo } from '../../types/product'
import { Section } from '../layout/Section'

type VideoDemoProps = {
  showMediaPlaceholder?: boolean
  video?: ProductVideo
}

export function VideoDemo({ showMediaPlaceholder = false, video }: VideoDemoProps) {
  if (!video && !showMediaPlaceholder) {
    return null
  }

  return (
    <Section tone="ink" aria-labelledby="video-title">
      <div className="max-w-4xl">
        <p className="eyebrow">Video demonstration</p>
        <h2 id="video-title" className="type-heading mt-3">{video?.title ?? 'Approved product video'}</h2>
        {video ? (
          <video className="video-demo mt-8" controls preload="metadata" poster={video.poster}>
            <source src={video.src} />
            Your browser does not support this video.
          </video>
        ) : (
          <div className="video-placeholder mt-8" role="img" aria-label="Approved product demonstration video required">
            <span>Approved demonstration video</span>
            <small>Video stays manual and never autoplays.</small>
          </div>
        )}
      </div>
    </Section>
  )
}
