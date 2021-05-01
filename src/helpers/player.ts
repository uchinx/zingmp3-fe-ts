import { Playlist, Song } from '@/types'
import { Howl, Howler } from 'howler'

class Player {
  isPlaying = false
  currentSongId = ''
  currentPlaylistId = ''
  _currentSong: any = {}
  set currentPlaylist(val: Playlist) {
    this.currentPlaylistId = val.encodeId
  }
  set currentSong(val: Song) {
    console.log('SET', this)
    this.currentSongId = val.encodeId
    this._currentSong = val
  }
  get currentSong() {
    return this._currentSong
  }
}

export default Player
