// components/VisualHighlights.tsx
'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './VisualHighlights.module.css'

type HighlightImage = {
  src: string
  alt: string
}

export default function VisualHighlights({
  images,
}: {
  images: HighlightImage[]
}) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div
      className={`${styles.visualHighlights} ${loaded ? styles.loaded : ''}`}
    >
      {/* Decorative elements */}
      <div className={styles.discoBall}></div>

      <div className={styles.star1}>★</div>
      <div className={styles.star2}>★</div>
      <div className={styles.star3}>✦</div>
      <div className={styles.boot}>
        <svg
          fill='#dddddd'
          version='1.1'
          id='Capa_1'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          width='400px'
          height='400px'
          viewBox='0 0 60.853 60.852'
          xmlSpace='preserve'
        >
          <g>
            <g>
              <path
                d='M20.721,46.778v10.363h1.325c0-4.488,0.511-7.13,0.867-8.43c3.323,4.186,4.129,12.141,4.129,12.141h14.13
			c1.547-2.979-2.097-3.863-4.857-5.52c-2.76-1.656-1.876-4.085-2.54-12.254c-0.662-8.17,0.884-41.067,0.884-41.067
			c-8.389-4.526-14.24,0-14.24,0c-0.663,4.084-0.442,11.812,1.435,20.534c1.877,8.721,1.877,16.338,1.877,16.338
			S16.288,43.78,20.721,46.778z'
              />
            </g>
          </g>
        </svg>
      </div>

      <div className={styles.musicNote1}>♪</div>
      <div className={styles.musicNote2}>♫</div>

      {/* Staggered images */}
      <div className={styles.imageStack}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.imageWrapper} ${styles[`image${index + 1}`]}`}
            style={{
              zIndex: images.length - index,
              transition: `transform 0.5s ${index * 0.15}s, opacity 0.5s ${
                index * 0.15
              }s`,
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={300}
              height={400}
              className={styles.image}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
