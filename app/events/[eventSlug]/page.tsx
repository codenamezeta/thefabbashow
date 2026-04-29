import { getEvent, EventType } from '@/lib/sanityQueries'
import dateFormatter from '@/lib/dateFormatter'
import Header from '@/components/Header'
import Button from '@/components/Button'
import Link from 'next/link'
import { IoChevronBackOutline } from 'react-icons/io5'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/PortableTextComponents'
import styles from './eventPage.module.css'
import AddToCalendarButton from '@/components/AddToCalendarButton'
import { IoTicketOutline } from 'react-icons/io5'
// import FollowUs from '@/components/FollowUs'

interface EventPageProps {
  params: Promise<{ eventSlug: string }>
  // searchParams?: Promise<{ [key: string]: string | string[] | undefined }>; // Also make searchParams a Promise if you use it and it's typed as such in .next/types
}
/**
 * Revalidate the page every 60 seconds to fetch fresh data from Sanity.
 */
export const revalidate = 60

/**
 * Composes heading and subheading based on available event data
 * Uses cascading priority: eventName > date > venue > empty
 */
function composeEventTitles(event: EventType): {
  heading: string
  subheading: string
} {
  // Prepare the formatted date string once to avoid duplication
  const formattedDate = event.date
    ? (() => {
        const dateInfo = dateFormatter(event.date)
        return `${dateInfo?.weekdayFull}, ${dateInfo?.monthFull} ${dateInfo?.dayWithOrdinal} ${dateInfo?.year}`
      })()
    : ''

  if (event.privateEvent) {
    return {
      heading: formattedDate || 'Private Event',
      subheading: formattedDate ? 'Private Event' : '',
    }
  }

  // Determine heading and subheading with cascading priority
  if (event.eventName) {
    // If event name exists, use it as heading
    return {
      heading: event.eventName,
      // For subheading, choose date if available, otherwise venue
      subheading: formattedDate || event.venue?.name || '',
    }
  } else if (formattedDate) {
    // If no event name but date exists, date is heading
    return {
      heading: formattedDate,
      // Venue becomes subheading
      subheading: event.venue?.name || '',
    }
  } else if (event.venue?.name) {
    // If only venue exists, it's the heading
    return {
      heading: event.venue.name,
      subheading: '', // Nothing left for subheading
    }
  } else {
    // No meaningful data available
    return {
      heading: '',
      subheading: '',
    }
  }
}

function getDisplayPrice(price: EventType['price']): string | null {
  if (price === null || price === undefined) return null
  if (typeof price === 'string' && price.trim() === '') return null
  if (price === 0 || price === '0') return 'Free'
  return `${price}`
}

export default async function Page({ params: paramsPromise }: EventPageProps) {
  const params = await paramsPromise
  const event: EventType = await getEvent(params.eventSlug)
  if (!event) {
    console.log('Event not found for slug:', params.eventSlug)
    return (
      <div className='container'>
        <h1>Event Not Found</h1>
        <p>Sorry, we could not find the event you&apos;re looking for.</p>
        <Link href='/events'>View All Events</Link>
      </div>
    )
  }
  // console.log('event:', event)

  const dateInfo = event.date ? dateFormatter(event.date) : null
  const displayPrice = getDisplayPrice(event.price)

  // Get both heading and subheading with a single function call
  const { heading, subheading } = composeEventTitles(event)

  if (!event) {
    return <div>Event not found</div>
  }

  return (
    <article className={styles.eventPage}>
      <Header
        backgroundImage={event.thumbnail?.url}
        title={heading || 'To Be Announced'}
        subtitle={subheading || 'Check back soon for details'}
        height='33vh'
      >
        <div className={styles.eventButtons}>
          {!event.privateEvent && event.date && (
            <AddToCalendarButton event={event} />
          )}
          {!event.privateEvent && event.getTickets && (
            <Button
              href={event.getTickets}
              variant='secondary'
              disabled={event.soldOut}
              size='lg'
            >
              <IoTicketOutline />
              {event.soldOut ? 'Sold Out!' : 'Get Tickets'}
            </Button>
          )}
        </div>
      </Header>
      <aside className='container'>
        <Link href='/events' className={styles.backLink}>
          <IoChevronBackOutline />
          View All Events
        </Link>
      </aside>
      <main className='container'>
        {!event.privateEvent && event.description && (
          <div className={styles.eventDescription}>
            {event.description ? (
              <PortableText
                value={event.description}
                components={portableTextComponents}
              />
            ) : (
              <p>No details yet. Check back soon.</p>
            )}
          </div>
        )}
        <div className={styles.eventDetails}>
          <h3>
            {event.privateEvent
              ? 'Private Event'
              : event.eventName
                ? event.eventName
                : 'Event Details'}
          </h3>
          <ul className={styles.detailsList}>
            <li>
              <h4>Date:</h4>
              <p>
                {dateInfo
                  ? `${dateInfo.weekdayFull}, ${dateInfo.monthFull} ${dateInfo.dayWithOrdinal} ${dateInfo.year}`
                  : 'Check back soon for details about the date'}
              </p>
            </li>
            {!event.privateEvent && event.time && (
              <li>
                <h4>Time:</h4>
                <p>{event.time}</p>
              </li>
            )}
            {!event.privateEvent && (
              <li>
                <h4>Venue:</h4>
                {event.venue ? (
                  <>
                    <h5>{event.venue?.name}</h5>
                    <p>
                      {event.venue?.address?.street}
                      <br />
                      {event.venue?.address?.lineTwo && (
                        <>
                          {event.venue.address.lineTwo}
                          <br />
                        </>
                      )}
                      {`${event.venue?.address?.city}, ${event.venue?.address?.state} ${event.venue?.address?.zip}`}
                    </p>
                  </>
                ) : (
                  'Check back soon for details about the venue'
                )}
              </li>
            )}
            {!event.privateEvent && (
              <li>
                <h4>Tickets:</h4>

                {event.soldOut ? (
                  'Sold Out'
                ) : event.getTickets ? (
                  <>
                    <p>Tickets Available</p>
                    {displayPrice && <p>{displayPrice}</p>}
                    <Button
                      href={event.getTickets}
                      variant='primary'
                      size='md'
                      fullWidth
                    >
                      <IoTicketOutline />
                      Get Tickets
                    </Button>
                  </>
                ) : (
                  'Check back soon for details about tickets'
                )}
              </li>
            )}
          </ul>
        </div>
      </main>
      {/* <aside>
        <FollowUs />
      </aside> */}
    </article>
  )
}
