import { Playlist, Song } from '@/types'
import { Howl, Howler } from 'howler'
import store from '@/store'
import { ref } from 'vue'

interface Handler {
  (val: any, oldVal?: any): void
}

class Player {
  public _howler: Howl = null
  private _isPlaying: boolean = false
  private _watchers: { [key: string]: [Handler] } = {}
  public currentSong: Song = {} as Song
  public currentPlaylist: Playlist = {} as Playlist
  public currentSongId: string
  public currentPlaylistId: string
  public duration: number = 0
  constructor() {
    this.subscribe('currentSong', (val: Song) => {
      this.duration = val.duration
    })
  }
  subscribe(prop: string, cb: Handler) {
    const handlers = this._watchers[prop]
    if (Array.isArray(handlers)) {
      handlers.push(cb)
    } else {
      this._watchers[prop] = [cb]
    }
  }
  notify(prop: string, val: any, oldVal: any) {
    const handlers = this._watchers[prop]
    if (Array.isArray(handlers)) {
      for (const handler of handlers) {
        if (typeof handler === 'function') {
          if (handler.length === 1) {
            return handler(val)
          }
          return handler(val, oldVal)
        }
      }
    }
  }
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
    })
    if (autoPlay) {
      this.isPlaying = true
      document.title = `${this.currentSong.title} - ${this.currentSong.artistsNames} | Zing MP3`
    }
    this._howler.once('end', () => {
      setTimeout(() => {
        this.isPlaying = true
      }, 1000)
    })
  }
}

export default Player
