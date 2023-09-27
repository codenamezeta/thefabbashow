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
    const monthString = String(today.getMonth() + 1)

    // Pad the month string with a leading zero if it is less than 10.
    const formattedMonth = monthString.padStart(2, '0')

    // Return today's date in the format yyyy-mm-dd.
    return `${today.getFullYear()}-${formattedMonth}-${today.getDate()}`
  }

  const today = getToday()

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
        setEvents(data)
      })
      .catch(console.error)
  }, [])

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
