//* app/page.tsx
import { getNextEvents, EventType } from '@/lib/sanityQueries'
import VideoPlayer from '@/components/VideoPlayer'
import EventTeaser from '@/components/EventTeaser'
import styles from './page.module.css'
import Image from 'next/image'
import FollowUs from '@/components/FollowUs'
import Gallery from '@/components/Gallery'
import { getGalleyItems } from '@/lib/sanityQueries'
import Members from '@/components/Members'
import VisualHighlights from '@/components/VisualHighlights'
import Audio from '@/components/Audio'
import Link from 'next/link'
import Button from '@/components/Button'

type NextEvents = EventType[]

export default async function Home() {
  // const nextEvent = await getNextEvent()
  // console.log('nextEvent:', nextEvent)
  const nextEvents: NextEvents = await getNextEvents(3)
  // console.log(`Next events:`, nextEvents)
  const galleryItems = await getGalleyItems()
  // console.log('Gallery Items:', galleryItems)
  // Sample hightlight images
  const highlightImages = [
    {
      src: '/imgs/highlights/banner-02.jpg',
      alt: 'ABBA show performance highlight',
    },
    { src: '/imgs/highlights/highlight-02.jpg', alt: 'ABBA dancers on stage' },
    {
      src: '/imgs/highlights/highlight-03.png',
      alt: 'ABBA singers performing',
    },
  ]

  return (
    <>
      <main className={styles.main}>
        <div className={`container ${styles.mainContent}`}>
          <div className={styles.textContent}>
            <h1>
              <span>Introducing</span>The fABBA Show
              <span>EXPERIENCE ABBA LIKE NEVER BEFORE!</span>
            </h1>
            <p>
              Step into a time machine and witness ABBA live in their prime with
              The fABBA Show, the sensational stage production that&apos;s
              taking audiences by storm all across the United States! This
              isn&apos;t just a tribute – it&apos;s a vibrant, theatrical
              journey celebrating the music and story of ABBA, the Swedish
              supergroup that conquered the world.
            </p>
            <p>
              Prepare to be amazed by The fABBA Show&apos;s cast of incredibly
              talented musicians and performers who embody the spirit and sound
              of Agnetha, Björn, Benny, and Anni-Frid. From note-perfect
              renditions of your favorite classics that will have you singing
              along at the top of your lungs, to exciting, modernized
              arrangements that breathe new life into these timeless hits, The
              fABBA Show delivers a musical experience like no other.
            </p>
            <p>
              It&apos;s more than just the music. Immerse yourself in the
              fascinating story of ABBA, told through engaging dialogue and
              scenes that reveal the triumphs, the heartbreaks, and the sheer
              brilliance behind their iconic songs.
            </p>
            <p>
              You can dance, you can jive during this night of dazzling
              costumes, dynamic performances, and hit after hit that will leave
              you feeling like you&apos;ve truly witnessed ABBA in their prime.
            </p>
          </div>
          <VisualHighlights images={highlightImages} />
        </div>
        <div className='container'>
          <VideoPlayer autoplay />
        </div>
        <Image
          src='/imgs/disco-ball-02.png'
          alt='ABBA'
          width={1920}
          height={1080}
          className={styles.discoBall}
        />
      </main>
      <section className={`${'blue-gradient'} ${styles.eventsSection}`}>
        <div className='container'>
          <h2 className='textStroke'>Upcoming Events</h2>
          <div className={styles.eventList}>
            {nextEvents.map((event) => (
              <EventTeaser key={event._id} event={event} />
            ))}
          </div>
          <Link href={'/events'} style={{ width: '100%' }}>
            <Button size='lg' fullWidth variant='secondary'>
              View All Events
            </Button>
          </Link>
        </div>
      </section>
      <FollowUs />
      <Gallery items={galleryItems} />
      <Members />
      <Audio />
      {/* <section>
        <Image
          src='/imgs/photos/poster-02.jpg'
          width={2000}
          height={4000}
          alt='The FABBA Show Poster'
        />
      </section> */}
    </>
  )
}
