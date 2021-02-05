import Event from '../components/Event'
import Footer from '../components/Footer'
import Nav from '../components/nav/Nav'
import logo from '../imgs/logo-01.png'
import EventsList from '../EventsList.js'

const Events = () => {
  return (
    <>
      <Nav logo={logo} transparency />
      <main>
        <div className="events-bg container">
          <h1>Upcoming Events</h1>
          <div className="container" id="events_list">
            {EventsList.map((event) => (
              <Event
                key={event._id}
                venue={event.venue}
                date={event.date}
                ticketLink={event.ticketLink}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Events
