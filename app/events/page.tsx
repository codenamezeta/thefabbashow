//* app/events/page.tsx
import { getNextEvents, EventType } from '@/lib/sanityQueries'
import EventTeaser from '@/components/EventTeaser'
import Header from '@/components/Header'

export default async function Events() {
  const allEvents = await getNextEvents(24)

  return (
    <>
      <Header
        backgroundImage='/imgs/fabba-07.jpg'
        title='Upcoming Events'
        subtitle='Experience ABBA like never before!'
        height='50vh'
      />
      <section className='container'>
        {allEvents.map((event: EventType) => (
          <EventTeaser key={event._id} event={event} />
        ))}
      </section>
    </>
  )
}
