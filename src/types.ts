import { ComputedRef, WritableComputedRef } from '@vue/reactivity'

export interface NavBar {
  title: string
  slug: string
  icon: string
  active?: boolean
}
export interface Playlist {
  PR: boolean
  aliasTitle: string
  contentLastUpdate: number
  description: string
  encodeId: string
  genres: [any]
  isAlbum: boolean
  isIndie: boolean
  isPrivate: boolean
  isShuffle: boolean
  isSingle: boolean
  isoffical: boolean
  like: number
  liked: boolean
  link: string
  listen: number
  playItemMode: number
  releaseDate: string
  sectionId: string
  song: {
    items: [Song]
    total: number
    totalDuration: number
  }
  subType: number
  textType: string
  thumbnail: string
  thumbnailM: string
  title: string
  uid: number
  userName: string
}

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

export interface Artist {
  id: string
  link: string
  name: string
  spotlight: boolean
}

export interface Player {
  [key: string]: any
  isPlaying: WritableComputedRef<boolean>
  currentSong: WritableComputedRef<Song>
  currentSongId: ComputedRef<string>
  currentPlaylist: WritableComputedRef<Playlist>
  currentPlaylistId: ComputedRef<string>
  playSong(id: Song, playlist?: Playlist): void
  playPlaylist(playlist: Playlist): void
  togglePlay(): void
}
