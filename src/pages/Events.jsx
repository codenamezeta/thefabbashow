import Event from '../components/Event'
import Footer from '../components/Footer'
import Nav from '../components/nav/Nav'
import logo from '../imgs/logo.png'
import { useEffect, useState } from 'react'
// import EventsList from '../EventsList.js'
import client from '../client'

export default function Events() {
  const [events, setEvents] = useState([])

  function getToday() {
    // Get today's date.
    const today = new Date()

    // Convert the month index to a string.
    const monthString = String(today.getMonth() + 1).padStart(2, '0')

    // Convert the day to a string.
    const dayString = String(today.getDate()).padStart(2, '0')

    // Return today's date in the format yyyy-mm-dd.
    return `${today.getFullYear()}-${monthString}-${dayString}`
  }

  const today = getToday()
  console.log('🚀 ~ file: Events.jsx:27 ~ Events ~ today:', today)

  useEffect(() => {
    const query = `
    *[_type == 'event' && category == 'show' && start >= '${today}'] | order(start) {
      _id,
      name,
      summary,
      description,
      start,
      end,
      image,
      url,
      category,
      organizer,
      venue->,
      slug
    }
    `
    client
      .fetch(query)
      .then((data) => {
        console.log('🚀 ~ file: Events.jsx:48 ~ .then ~ data:', data)
        setEvents(data)
      })
      .catch(console.error)
  }, [today])

  return (
    <>
      <Nav logo={logo} transparency />
      <main>
        {/* {events.map((event) => {
          return <span>{event.name}</span>
        })} */}
        <div className='events-bg container'>
          <h1>Upcoming Events</h1>

          <div className='container' id='events_list'>
            {events.map((event) => (
              <Event
                key={event._id}
                title={event.name}
                date={event.start}
                venue={event.venue.name}
                address={event.venue.address.address1}
                city={event.venue.address.city}
                zipCode={event.venue.address.postalCode}
                state={event.venue.address.state}
                summary={event.summary}
                description={event.description}
                url={event.url}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
