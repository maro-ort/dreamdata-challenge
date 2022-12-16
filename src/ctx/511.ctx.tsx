import React, { createContext, FC, ReactNode, Reducer, useCallback, useReducer, useState } from 'react'
import { fetchEvents, EventSeverity } from '../511'
import { CurrentEvents, EventReducerAction } from '../@types/511'

const eventsReducer = (prev: CurrentEvents, { severity, events }: EventReducerAction): CurrentEvents => {
  // This reducer could be expanded to check if an event has been added or removed from the previous state
  // adding a flag, that would allow to visualy add and remove events from the list with effects

  prev[severity] = events

  return { ...prev }
}

const Five11Ctx = createContext<{
  apiStatus: number
  setApiStatus?: React.Dispatch<number>
  currentEvents?: CurrentEvents
  updateCurrentEvents?: (severity: EventSeverity) => Promise<void>
}>({
  apiStatus: 200,
})

const Five11Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const [apiStatus, setApiStatus] = useState<number>(200)
  const [currentEvents, dispatchEvents] = useReducer<Reducer<CurrentEvents, EventReducerAction>>(eventsReducer, {
    [EventSeverity.MAJOR]: [],
    [EventSeverity.MINOR]: [],
    [EventSeverity.MODERATE]: [],
    [EventSeverity.SEVERE]: [],
    [EventSeverity.UNKNOWN]: [],
  } as CurrentEvents)

  const updateCurrentEvents = useCallback(
    (severity: EventSeverity) => {
      return fetchEvents(new URLSearchParams({ severity }))
        .then(async ({ events, nextParams }) => {
          if (apiStatus !== 200) setApiStatus(200)
          if (nextParams) {
            const { events: newEvents } = await fetchEvents(nextParams)
            return events.concat(newEvents)
          }
          return events
        })
        .then(events => events.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()))
        .then(events => dispatchEvents({ severity, events }))
        .catch(e => setApiStatus(parseInt(e.message)))
    },
    [apiStatus]
  )

  const value = {
    apiStatus,
    setApiStatus,
    currentEvents,
    updateCurrentEvents,
  }
  return <Five11Ctx.Provider value={value}>{children}</Five11Ctx.Provider>
}

export { Five11Provider }
export default Five11Ctx
