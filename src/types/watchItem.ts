export type WatchItemType = 'movie' | 'animatedMovie' | 'series' | 'season' | 'special' | 'short'

export type WatchItem = {
  id: string
  title: string
  year?: number
  type: WatchItemType
  importance: 'essential' | 'recommended' | 'optional'
  universe?: string
  seasonNumber?: number
  status: 'released' | 'upcoming'
  releaseDate?: string
  timelineStatus?: 'confirmed' | 'unconfirmed'
}
