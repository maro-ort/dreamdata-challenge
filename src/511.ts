import { Event511 } from './@types/511'

const api_key = process.env.REACT_APP_511_API_KEY!
const HOST = process.env.REACT_APP_511_PROXY

export enum EventStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export enum EventType {
  CONSTRUCTION = 'CONSTRUCTION',
  INCIDENT = 'INCIDENT',
  ROAD_CONDITION = 'ROAD_CONDITION',
  SPECIAL_EVENT = 'SPECIAL_EVENT',
  WEATHER_CONDITION = 'WEATHER_CONDITION',
}

export enum EventSeverity {
  MAJOR = 'Major',
  MINOR = 'Minor',
  MODERATE = 'Moderate',
  SEVERE = 'Severe',
  UNKNOWN = 'Unknown',
}

export const parseEvent = (event: any): Event511 => {
  const {
    geography: { coordinates },
  } = event

  return { ...event, coordinates }
}

export const fetchEvents = (
  params: URLSearchParams
): Promise<{ events: Event511[]; nextParams: URLSearchParams | null }> => {
  params.set('api_key', api_key)
  // console.log(HOST + '/traffic/events?' + params)

  return fetch(HOST + '/traffic/events?' + params)
    .then(r => {
      if (!r.ok) throw new Error(r.status.toString())
      return r.json()
    })
    .then(r => {
      const {
        events,
        pagination: { next_url },
      } = r

      const nextParams = next_url && new URLSearchParams(next_url.split('?').pop())

      return { events: events.map(parseEvent), nextParams }
    })
}

export const searchEvents = ({
  longitude,
  latitude,
  distance,
}: {
  longitude: number
  latitude: number
  distance: number
}) => {
  const params = {
    geography: `POINT(${longitude} ${latitude})`,
    tolerance: distance * 1000,
  }
}
