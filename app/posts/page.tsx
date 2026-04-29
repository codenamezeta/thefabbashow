//* app/events/page.tsx
import { getAllPosts, PostType } from '@/lib/sanityQueries'
import Header from '@/components/Header'
// import Link from 'next/link'
import Image from 'next/image'
import styles from './posts.module.css'
import Button from '@/components/Button'
import dateFormatter from '@/lib/dateFormatter'

import { PortableTextBlock } from '@portabletext/types'

/**
 * Revalidate the page every 60 seconds to fetch fresh data from Sanity.
 */
export const revalidate = 60

// Define types for Sanity block content
type BlockContent = string | PortableTextBlock[] | null | undefined

// Helper function to extract text from block content and truncate it
const getTextPreview = (
  blockContent: BlockContent,
  maxLength: number = 250,
) => {
  if (!blockContent) return 'Not block content'

  // If it's already a string, just truncate it
  if (typeof blockContent === 'string') {
    return blockContent.length > maxLength ?
        blockContent.substring(0, maxLength) + '...'
      : blockContent
  }

  // If it's an array of blocks (Sanity block content)
  if (Array.isArray(blockContent)) {
    let text = ''

    // Iterate through blocks to extract text
    blockContent.forEach((block) => {
      // Handle text blocks
      if (block._type === 'block' && Array.isArray(block.children)) {
        block.children.forEach((child) => {
          if (child._type === 'span' && child.text) {
            text += child.text + ' '
          }
        })
      }
    })

    // Trim and truncate the extracted text
    text = text.trim()
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return 'No description available'
}

export default async function Posts() {
  const allPosts: PostType[] = await getAllPosts()

  return (
    <>
      <Header
        backgroundImage='/imgs/photos/stage-04.jpg'
        title='FABBA Fans Page'
        subtitle='Highlights from events, concerts, and more!'
        height='50vh'
      />
      <section className={styles.container}>
        <div className={styles.grid}>
          {allPosts.map(
            (post: PostType, index: number) => (
              console.log('post:', post),
              (
                <div key={index} className={styles.card}>
                  <div className={styles.imageContainer}>
                    {post.mainImage?.asset?.url ?
                      <Image
                        src={post.mainImage?.asset?.url}
                        alt={post.mainImage?.alt || post.title || 'Post image'}
                        fill
                        className={styles.image}
                      />
                    : <div className={styles.fallbackImage}>
                        <span className={styles.fallbackText}></span>
                      </div>
                    }
                  </div>
                  <div className={styles.cardContent}>
                    {post.publishedAt && (
                      <div className={styles.date}>
                        {dateFormatter(post.publishedAt)?.fullDate ||
                          'Unpublished'}
                      </div>
                    )}
                    <h2 className={styles.title}>
                      {post.title || 'Untitled Post'}
                    </h2>
                    <p className={styles.body}>
                      {getTextPreview(post.body, 250)}
                    </p>
                    <Button
                      variant='primary'
                      fullWidth
                      href={`/posts/${post.slug?.current || index}`}
                      className={styles.button}
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              )
            ),
          )}
        </div>
      </section>
    </>
  )
}
