import React, { FC } from 'react'
import { Event511 } from '../@types/511'

const dateFormater = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
})

const EventComponent: FC<{ event: Event511 }> = ({ event }) => {
  return (
    <div className="event" style={{ borderColor: `var(--color-${event.severity.toLocaleLowerCase()})` }}>
      <h3>
        {dateFormater.format(new Date(event.updated))} - {event.headline}
      </h3>
      {event.event_subtypes.length > 0 && (
        <>
          <p>Type: {event.event_type}</p>
          <ul>
            {event.event_subtypes.map((type, i) => (
              <li key={i}>{type}</li>
            ))}
          </ul>
        </>
      )}

      {event.schedule?.intervals.length > 0 && (
        <>
          <p>Scheduled:</p>
          <ul>
            {event.schedule?.intervals.map((interval, i) => {
              const times = interval.split('/')
              return (
                <li key={i}>
                  <div>From: {dateFormater.format(new Date(times[0]))}</div>
                  {times[1] && <div>To: {dateFormater.format(new Date(times[1]))}</div>}
                </li>
              )
            })}
          </ul>
        </>
      )}
      <a
        href={`https://www.openstreetmap.org/search?query=${event.coordinates[0]},${event.coordinates[1]}`}
        target="_blank"
        rel="noreferrer"
      >
        See on map
      </a>
    </div>
  )
}

export default EventComponent
