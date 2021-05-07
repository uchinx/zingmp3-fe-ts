import { Playlist, Song } from '@/types'
import { Howl, Howler } from 'howler'
import { shuffle } from 'lodash-es'
import store from '@/store'
interface Handler {
  (val: any, oldVal?: any): void
}

class Player {
  public _howler: Howl = null
  private _isPlaying: boolean = false
  private _watchers: { [key: string]: [Handler] } = {}
  private _currentSong: Song = {} as Song

  public currentPlaylist: Playlist = {} as Playlist
  public currentSongId: string
  public currentPlaylistId: string
  public duration: number = 0
  public isShuffle: boolean = false
  
  constructor() {
    this.subscribe('currentPlaylist', (val: Playlist) => {
      if (val) {
        this.currentPlaylistId = val.encodeId
        this.queues = this.currentPlaylistItems
      }
    })
    this.subscribe('currentSong', (val: Song) => {
      if (val) {
        this.currentSongId = val.encodeId
      }
    })
    this.subscribe('isShuffle', (val: boolean) => {
      if (val && this.currentPlaylistId) {
        this.queues = shuffle(this.currentPlaylistItems)
      } else {
        this.queues = this.currentPlaylistItems
      }
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

  get queues(): Song[] {
    return store.state.queueItems
  }

  set queues(val: Song[]) {
    store.commit('update', ['queueItems', val])
  }

  get currentPlaylistItems(): Song[] {
    if (this.currentPlaylist && Array.isArray(this.currentPlaylist.song.items)) {
      const ids = this.recentItems.map(item => item.encodeId)
      return this.currentPlaylist.song.items.filter(item => !ids.includes(item.encodeId))
    }
    return []
  }

  get recentItems(): Song[] {
    return store.state.recentItems
  }

  set recentItems(val: Song[]) {
    store.commit('update', ['recentItems', val])
  }

  get currentSong(): Song {
    return this._currentSong
  }

  set currentSong(song: Song) {
    let index = this.queues.findIndex(item => item.encodeId === song.encodeId)
    if (index >= 0) {
      this.queues.splice(index, 1)
    }
    index = this.recentItems.findIndex(item => item.encodeId === song.encodeId)
    if (index >= 0) {
      this.recentItems.splice(index, 1)
    }
    this.recentItems.push(song)
    this._currentSong = song
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
