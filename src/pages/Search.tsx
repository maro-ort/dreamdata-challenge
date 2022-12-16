import React, { useCallback, useContext, useRef, useState } from 'react'
import cx from 'classnames'

import { fetchEvents } from '../511'
import { Event511 } from '../@types/511'
import EventComponent from '../common/Event'
import Five11Ctx from '../ctx/511.ctx'

const Search = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const { apiStatus, setApiStatus } = useContext(Five11Ctx)
  const [longitude, setLongitude] = useState<number>()
  const [latitude, setLatitude] = useState<number>()
  const [distance, setDistance] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const [searchEvents, setSearchEvents] = useState<Event511[]>([])

  const updateDistance = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setDistance(Math.min(100, Math.max(1, parseInt(value))))
  }

  const updateLongitude = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setLongitude(parseFloat(value))
    },
    [setLongitude]
  )
  const updateLatitude = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setLatitude(parseFloat(value))
    },
    [setLatitude]
  )

  const updateLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLongitude(coords.longitude)
        setLatitude(coords.latitude)
      },
      e => {
        // Display error on some AppCtx
        alert('Cannot retrieve your location')
      }
    )
  }

  const search = useCallback(() => {
    const isValid = formRef.current?.checkValidity()
    if (!isValid) {
      // Display error on some AppCtx
      alert('Some field is invalid and checkValidity is not showing it')
      return
    }

    setIsLoading(true)

    const params = new URLSearchParams({
      geography: `POINT(${longitude} ${latitude})`,
      tolerance: (distance * 1000).toString(),
    })

    return fetchEvents(params)
      .then(async ({ events, nextParams }) => {
        if (apiStatus !== 200) setApiStatus?.(200)
        if (nextParams) {
          const { events: newEvents } = await fetchEvents(nextParams)
          return events.concat(newEvents)
        }
        return events
      })
      .then(events => events.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()))
      .then(events => setSearchEvents(events))
      .catch(e => setApiStatus?.(parseInt(e.message)))
      .finally(() => setIsLoading(false))
  }, [latitude, longitude, distance, apiStatus, setApiStatus, setIsLoading])
  return (
    <div id="search">
      <h1>Search events</h1>
      <form ref={formRef} className="search__filter">
        <button onClick={updateLocation}>Get my location</button>
        <div>
          Longitude:{' '}
          <input type="text" placeholder="-122.356" defaultValue={longitude} onChange={updateLongitude} required />
        </div>
        <div>
          Latitude: <input type="text" placeholder="38.18" defaultValue={latitude} onChange={updateLatitude} required />
        </div>
        <div>
          Distance: <input type="range" min={1} max={100} step={1} defaultValue={distance} onChange={updateDistance} />
          <output>{distance}km</output>
        </div>

        <button type="button" onClick={search}>
          Search
        </button>
      </form>
      <div
        className={cx('search__loading', {
          'is-loading': isLoading,
        })}
      >
        Loading
      </div>

      <div className="search__results">
        {searchEvents.map(event => (
          <EventComponent key={event.id} event={event} />
        ))}
      </div>

      <div className="info">
        <p>
          This functionality doesn't work well as the API crashes when encoding POINT(lng lat) with URLSearchParms,
          could be fixed manually encoding the string.
        </p>
        <p>
          The API is also unreliable with distances, it returns results for POINT(0 0) at 1km distance, evidently that's
          wrong.
        </p>
      </div>
    </div>
  )
}

export default Search
