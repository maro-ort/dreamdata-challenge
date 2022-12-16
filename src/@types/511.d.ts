import { EventSeverity, EventStatus, EventType } from '../511'

type Area = {
  id: number
  name: string
  url: string
}

type Event511 = {
  areas: Area[]
  id: string
  created: string
  description?: string
  event_subtypes: string[]
  event_type: EventType
  headline: string
  // jurisdiction_url: string
  severity: EventSeverity
  status: EventStatus
  updated: string
  url: string
  coordinates: [number, number]
  schedule: {
    intervals: string[]
  }
  // geography: {
  //   coordinates: [number, number]
  // }
}

type CurrentEvents = Record<EventSeverity, Event511[]>

type EventReducerAction = { severity: EventSeverity; events: Event511[] }
