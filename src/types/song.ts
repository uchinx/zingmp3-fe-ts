import { Artist } from './artist'
export interface Song {
  alias: string
  allowAudioAds: boolean
  artists: [Artist]
  artistsNames: string
  duration: number
  encodeId: string
  hasLyric: boolean
  indicators: []
  isOffical: boolean
  isPrivate: boolean
  isWorldWide: boolean
  isZMA: boolean
  link: string
  preRelease: boolean
  radioId: number
  releaseDate: number
  streamingStatus: number
  thumbnail: string
  thumbnailM: string
  title: string
  username: string
  zingChoise: boolean
}
