import React from 'react'

const Event = ({ venue, date, ticketLink }) => {
  return (
    <div className="event">
      <div className="event-date">
        <span className="event-month-small">{date.month}</span>
        <span className="event-date-number">{date.day}</span>
      </div>
      <hr className="show-on-mobile" />
      <div className="event-title">{venue.city}</div>
      <div className="event-venue">
        <div className="event-venue-name">{venue.name}</div>
        <div className="event-venue-address">
          <a
            href={venue.link}
            target="_blank"
            rel="noopener noreferrer"
            className="venue-link"
          >
            {venue.address}
          </a>
        </div>
      </div>
      <div className="event-ticket-link">
        <a
          href={ticketLink}
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          Tickets
        </a>
      </div>
    </div>
  )
}

export default Event
