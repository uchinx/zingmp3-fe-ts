import { Playlist, Song } from '@/types'
import { Howl, Howler } from 'howler'
import store from '@/store'
import { ref } from 'vue'

class Player {
  public _howler: Howl = null
  private _isPlaying: boolean = false
  private _progress: number = 0
  public currentSong: Song = {} as Song
  public currentPlaylist: Playlist = {} as Playlist
  public currentSongId: string
  public currentPlaylistId: string
  set isPlaying(val: boolean) {
    this._isPlaying = val
    if (val) {
      this._howler.play()
    } else {
      this._howler.pause()
    }
  }
  get isPlaying() {
    return this._isPlaying
  }
  initialize(url: string, autoPlay?: boolean) {
    Howler.unload()
    this._howler = new Howl({
      src: [url],
      html5: true,
      format: ['mp3'],
      onseek: this.handleOnSeek
    })
    if (autoPlay) {
      this.isPlaying = true
      document.title = `${this.currentSong.title} - ${this.currentSong.artistsNames} | Zing MP3`
    }
    this._howler.once('end', () => {
      this.isPlaying = true
    })
  }
  handleOnSeek(val: any) {
    console.log(val)
  }
}

export default Player
