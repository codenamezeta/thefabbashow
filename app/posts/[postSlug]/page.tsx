import { getPostBySlug, PostType } from '@/lib/sanityQueries'
import dateFormatter from '@/lib/dateFormatter'
import Header from '@/components/Header'
// import Button from '@/components/Button'
import Link from 'next/link'
import { IoChevronBackOutline } from 'react-icons/io5'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/PortableTextComponents'
import styles from './postPage.module.css'

// import AddToCalendarButton from '@/components/AddToCalendarButton'
// import { IoTicketOutline } from 'react-icons/io5'
// import FollowUs from '@/components/FollowUs'

export default async function PostPage({
  params,
}: {
  params: { postSlug: string }
}) {
  const { postSlug } = await params
  const post: PostType = await getPostBySlug(postSlug)
  if (!post) {
    console.log('Post not found for:', postSlug)
    return (
      <div className='container'>
        <h1>Event Not Found</h1>
        <p>Sorry, we could not find the post you&apos;re looking for.</p>
        <Link href='/'>Return to Home</Link>
      </div>
    )
  }

  const dateInfo = post.publishedAt ? dateFormatter(post.publishedAt) : null

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <article className={styles.postPage}>
      {post.mainImage ? (
        <Header
          backgroundImage={post.mainImage?.asset?.url}
          title={''}
          height='50vh'
        ></Header>
      ) : (
        <Header backgroundImage='' title={''} height='15vh'></Header>
      )}

      <main className='container'>
        <Link href='/posts' className={styles.backLink}>
          <IoChevronBackOutline />
          View All Posts
        </Link>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <p className={styles.postDate}>
          <strong>Published: </strong>
          {dateInfo?.fullDate}
        </p>
        {/* {post.categories && (
          <div className={styles.postCategories}>
            {post.categories.map((category) => (
              <Link
                key={category.slug?.current}
                href={`/posts/${category.slug?.current}`}
                className={styles.categoryLink}
              >
                {category.title}
              </Link>
            ))}
          </div>
        )} */}
        {post.body && (
          <div className={styles.postDescription}>
            {post.body ? (
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            ) : (
              <p>No details yet. Check back soon.</p>
            )}
          </div>
        )}
      </main>
      {/* <aside>
        <FollowUs />
      </aside> */}
    </article>
  )
}
