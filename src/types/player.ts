import { ComputedRef, WritableComputedRef } from '@vue/reactivity'
import { Song } from './song'

export interface Player {
  [key: string]: any
  isPlaying: ComputedRef<boolean>
  currentSong: ComputedRef<Song>
  currentSongId: WritableComputedRef<string>
  playSong(id: string, playlistId?: string): void
  playPlaylist(): void
}
