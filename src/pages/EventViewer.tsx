import React, { FC, useEffect, useState, useContext, useCallback } from 'react'
import cx from 'classnames'

import { EventSeverity } from '../511'
import Five11Ctx from '../ctx/511.ctx'
import EventComponent from '../common/Event'

const EventViewer: FC<{ severity: EventSeverity }> = ({ severity }) => {
  const { apiStatus, currentEvents, updateCurrentEvents } = useContext(Five11Ctx) || {}
  const [isLoading, setIsLoading] = useState(false)

  const updateEvents = useCallback(() => {
    if (!updateCurrentEvents) return
    setIsLoading(true)
    updateCurrentEvents(severity).finally(() => setIsLoading(false))
  }, [severity, updateCurrentEvents])

  useEffect(() => {
    const updateIntervalTime = apiStatus === 429 ? 3600000 : parseInt(process.env.REACT_APP_SYNC_TIME || '10000')
    updateEvents()
    const updateInterval = setInterval(() => updateEvents, updateIntervalTime)

    return () => {
      clearInterval(updateInterval)
    }
  }, [apiStatus, updateEvents])

  return (
    <div id="event_viewer">
      <h1>
        {severity} Events <button onClick={updateEvents}>Update</button>
      </h1>
      <div
        className={cx('event_viewer__loading', {
          'is-loading': isLoading,
        })}
      >
        Loading
      </div>
      {currentEvents?.[severity].length === 0 && <div className="event_viewer__empty">No events to list</div>}
      {currentEvents?.[severity].map(event => (
        <EventComponent key={event.id} event={event} />
      ))}
    </div>
  )
}

export default EventViewer
