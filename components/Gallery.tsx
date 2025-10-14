'use client'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import styles from './Gallery.module.css'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanityQueries'

interface GalleryImageItem {
  original: string
  thumbnail?: string
  originalAlt?: string
  thumbnailAlt?: string
  caption?: string
  originalTitle?: string
  thumbnailTitle?: string
  type?: 'image' | 'video'
}

export type GalleryItem = {
  _id: string
  title: string
  mediaType: 'image' | 'video'
  imageContent?: {
    asset: {
      _ref: string
    }
  }
  videoContent?: {
    asset: {
      _ref: string
      url: string
    }
  }
  alt?: string
  caption?: string
}

export default function Gallery({
  items: galleryItems,
}: {
  items: GalleryItem[]
}) {
  // State to track if any video is playing
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const galleryRef = useRef<ImageGallery>(null)
  const activeVideoRef = useRef<HTMLVideoElement | null>(null)

  // Control gallery when video play state changes
  useEffect(() => {
    if (galleryRef.current) {
      if (isVideoPlaying) {
        galleryRef.current.pause()
      } else {
        galleryRef.current.play()
      }
    }
  }, [isVideoPlaying])

  if (!galleryItems || galleryItems.length === 0) {
    return null
  }

  // Convert Sanity items to gallery items
  const items: GalleryImageItem[] = galleryItems.map((item) => {
    let original = ''

    // Get the right URL based on media type
    if (item.mediaType === 'image' && item.imageContent?.asset) {
      original = urlForImage(item.imageContent.asset).width(1200).url() || ''
    } else if (item.mediaType === 'video' && item.videoContent?.asset?.url) {
      original = item.videoContent.asset.url
    }

    return {
      original,
      originalAlt: item.alt || item.title,
      caption: item.caption,
      type: item.mediaType,
    }
  })

  // Handle slide change to pause any playing videos
  const handleSlide = () => {
    if (activeVideoRef.current) {
      activeVideoRef.current.pause()
      setIsVideoPlaying(false)
    }
  }

  // Custom renderer for gallery items
  const renderItem = (item: GalleryImageItem) => {
    if (item.type === 'video') {
      return (
        <div className={styles.imageGalleryItem}>
          <div className={styles.mediaContainer}>
            <video
              ref={(el) => {
                if (el) activeVideoRef.current = el
              }}
              src={item.original}
              autoPlay={false}
              playsInline
              controls
              className={styles.videoElement}
              controlsList='nodownload'
              onPlay={(e) => {
                setIsVideoPlaying(true)
                activeVideoRef.current = e.currentTarget
              }}
              onPause={() => setIsVideoPlaying(false)}
              onEnded={() => setIsVideoPlaying(false)}
            >
              Your browser does not support video playback.
            </video>
          </div>
          {item.caption && (
            <div className={styles.descriptionContainer}>
              <span className={styles.imageGalleryDescription}>
                {item.caption}
              </span>
            </div>
          )}
        </div>
      )
    }

    // Default image rendering
    return (
      <div className={styles.imageGalleryItem}>
        <div className={styles.mediaContainer}>
          <Image
            src={item.original}
            alt={
              item.originalAlt ||
              item.caption ||
              item.originalTitle ||
              'Gallery Item'
            }
            fill
            className={styles.imageElement}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
        {item.caption && (
          <div className={styles.descriptionContainer}>
            <span className={styles.imageGalleryDescription}>
              {item.caption}
            </span>
          </div>
        )}
      </div>
    )
  }

  return (
    <section>
      <div className='container'>
        <h2 className='textStroke'>Gallery</h2>
        <ImageGallery
          ref={galleryRef}
          items={items}
          renderItem={renderItem}
          showBullets={true}
          showThumbnails={false}
          showPlayButton={!isVideoPlaying}
          showFullscreenButton={false}
          showNav={true}
          disableSwipe={false}
          autoPlay={false}
          onSlide={handleSlide}
          slideInterval={5000}
          infinite={!isVideoPlaying}
        />
      </div>
    </section>
  )
}

// 'use client'
// import ImageGallery from 'react-image-gallery'
// import 'react-image-gallery/styles/css/image-gallery.css'
// import styles from './Gallery.module.css'
// import { useState, useRef, useEffect } from 'react'
// import Image from 'next/image'

// // Proper typing for react-image-gallery items
// interface GalleryImageItem {
//   original: string
//   thumbnail?: string
//   originalAlt?: string
//   thumbnailAlt?: string
//   description?: string
//   originalTitle?: string
//   thumbnailTitle?: string
// }

// export type GalleryItem = {
//   _id: string
//   title: string
//   media: {
//     url: string
//     alt: string
//     type?: 'image' | 'video'
//   }
//   description: string
// }

// export default function Gallery({
//   items: galleryItems,
// }: {
//   items: GalleryItem[]
// }) {
//   // State to track if any video is playing
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false)
//   const galleryRef = useRef<ImageGallery>(null)
//   const activeVideoRef = useRef<HTMLVideoElement | null>(null)

//   // Control gallery when video play state changes
//   useEffect(() => {
//     if (galleryRef.current) {
//       if (isVideoPlaying) {
//         // Stop auto-play when video is playing
//         galleryRef.current.pause()
//       } else {
//         // Resume auto-play when video stops
//         galleryRef.current.play()
//       }
//     }
//   }, [isVideoPlaying])

//   if (!galleryItems || galleryItems.length === 0) {
//     return null
//   }

//   // Check if a URL is a video file
//   const isVideo = (url: string) => {
//     return url.match(/\.(mp4|mov|webm|ogg)$/i) !== null
//   }

//   // Handle slide change to pause any playing videos
//   const handleSlide = () => {
//     if (activeVideoRef.current) {
//       activeVideoRef.current.pause()
//       setIsVideoPlaying(false)
//     }
//   }

//   // Custom renderer for gallery items
//   const renderItem = (item: GalleryImageItem) => {
//     if (isVideo(item.original)) {
//       return (
//         <div className={styles.imageGalleryItem}>
//           <div className={styles.mediaContainer}>
//             <video
//               ref={(el) => {
//                 if (el) activeVideoRef.current = el
//               }}
//               src={item.original}
//               autoPlay={false}
//               playsInline
//               controls
//               className={styles.videoElement}
//               controlsList='nodownload' // Prevents download button
//               onPlay={(e) => {
//                 setIsVideoPlaying(true)
//                 activeVideoRef.current = e.currentTarget
//               }}
//               onPause={() => setIsVideoPlaying(false)}
//               onEnded={() => setIsVideoPlaying(false)}
//             >
//               Your browser does not support video playback.
//             </video>
//           </div>
//           {item.description && (
//             <div className={styles.descriptionContainer}>
//               <span className={styles.imageGalleryDescription}>
//                 {item.description}
//               </span>
//             </div>
//           )}
//         </div>
//       )
//     }

//     // Default image rendering
//     return (
//       <div className={styles.imageGalleryItem}>
//         <div className={styles.mediaContainer}>
//           <Image
//             src={item.original}
//             alt={item.originalAlt || ''}
//             fill
//             className={styles.imageElement}
//             sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
//           />
//         </div>
//         {item.description && (
//           <div className={styles.descriptionContainer}>
//             <span className={styles.imageGalleryDescription}>
//               {item.description}
//             </span>
//           </div>
//         )}
//       </div>
//     )
//   }

//   return (
//     <section>
//       <div className='container'>
//         <h2 className='textStroke'>Gallery:</h2>
//         <ImageGallery
//           ref={galleryRef}
//           items={galleryItems.map((item) => ({
//             original: item.media.url,
//             description: item.description,
//             originalAlt: item.media.alt || item.title,
//           }))}
//           renderItem={renderItem}
//           showBullets={true}
//           showThumbnails={false}
//           showPlayButton={!isVideoPlaying}
//           showFullscreenButton={false}
//           showNav={true}
//           disableSwipe={false}
//           autoPlay={false} // Controlled this manually
//           onSlide={handleSlide}
//           slideInterval={5000}
//           infinite={!isVideoPlaying} // Disables infinite loop for videos
//         />
//       </div>
//     </section>
//   )
// }
