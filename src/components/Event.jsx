import React from 'react'

const Event = ({
  title,
  date,
  venue,
  address,
  city,
  summary,
  description,
  url,
}) => {
  // const eventMonth = date.slice(5, 7) //? Gets the month number from ISO date
  //? Passes in the ISO date from Sanity and gets the month number.
  //@ The +1 is because the Date().getMonth is 0 indexed and we want human numbers.
  const eventDayNum = new Date(date).getDate() + 1
  const eventMonth = new Date(date).toLocaleString('default', {
    month: 'short',
  })

  return (
    <div className="event">
      <div className="event-date">
        <span className="event-month-small">{eventMonth}</span>
        <span className="event-date-number">{eventDayNum}</span>
      </div>
      <hr className="show-on-mobile" />
      <div className="event-title">{title ? title : city}</div>
      <div className="event-venue">
        <div className="event-venue-name">{venue}</div>
        <div className="event-venue-address">
          <a
            href={`https://www.google.com/maps/search/${venue}`}
            target="_blank"
            rel="noopener noreferrer"
            className="venue-link"
          >
            {address}
          </a>
        </div>
      </div>
      <div className="event-ticket-link">
        <a
          href={url ? url : `https://www.google.com/maps/search/${venue}`}
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
