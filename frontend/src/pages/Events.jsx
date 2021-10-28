import Event from '../components/Event'
import Footer from '../components/Footer'
import Nav from '../components/nav/Nav'
import logo from '../imgs/logo-01.png'
import { useEffect, useState } from 'react'
// import EventsList from '../EventsList.js'

import client from '../client'

export default function Events() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const query = `
  *[_type == 'event' && category == 'show'] | order(start) {
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
        <div className="events-bg container">
          <h1>Upcoming Events</h1>
          <div className="container" id="events_list">
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
