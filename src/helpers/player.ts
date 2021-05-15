import { Playlist, Song } from '@/types'
import { Howl, Howler } from 'howler'
import { cloneDeep, shuffle } from 'lodash-es'
import { computed, reactive, ref, watch, WritableComputedRef } from 'vue'
import { getObject, saveObject } from './storage'
class Player {
  public _howler: Howl = null
  private _volumeBeforeMuted: number
  private _isMuted: boolean = false
  private _state = reactive({
    volume: 50,
    currentSong: {} as Song,
    currentPlaylist: {} as Playlist,
    queueItems: [],
    recentItems: [],
  })

  private _reactivity = reactive({
    isPlaying: false,
  })

  public currentSongId: string
  public currentPlaylistId: string
  public duration: number = 0
  public repeat: string = 'none'
  public isProgressBusy: boolean = false

  // Vue Reactivity
  public isShowQueuePlaylist = ref(false)
  public isShuffle = ref(false)
  public progress = ref(0)

  constructor() {
    this.volume = 50
    const obj = getObject('Player')
    if (obj) {
      this._state = reactive(obj)
    }
    this._subscribe()
    this.looper()
  }
  looper() {
    if (this._howler && this.isPlaying && !this.isProgressBusy) {
      const current = this._howler ? <number>this._howler.seek() : 0
      const total = this._howler ? this._howler.duration() : 0
      this.progress.value = current && total ? (current / total) * 100 : 0
    }
    setTimeout(() => {
      this.looper()
    }, 500)
  }
  _subscribe() {
    watch(this.isShuffle, (val: boolean) => {
      if (val && this.currentPlaylistId) {
        this.queues = shuffle(this.currentPlaylistItems)
      } else {
        this.queues = this.currentPlaylistItems
      }
    })
    watch(this._state, (val) => {
      saveObject('Player', val)
    })
  }
  writableComputed<T extends keyof Omit<Player, 'currentPlaylistItems'>>(
    key: T
  ): WritableComputedRef<Player[T]> {
    return computed({
      get: () => {
        return this[key]
      },
      set: (val: any) => {
        this[key] = val
      },
    })
  }

  get queues(): Song[] {
    return this._state.queueItems
  }

  set queues(val: Song[]) {
    this._state.queueItems = val
  }

  get volume(): number {
    return this._state.volume
  }

  set volume(val: number) {
    if (val !== 0) {
      this._volumeBeforeMuted = val
    }
    this._state.volume = val
    if (this._howler) {
      this._howler.volume(val / 100)
    }
  }

  get isMuted(): boolean {
    return this._isMuted
  }

  set isMuted(val: boolean) {
    if (val) {
      this.volume = 0
    } else {
      this.volume = this._volumeBeforeMuted
    }
    this._isMuted = val
  }

  get currentPlaylistItems(): Song[] {
    if (
      this.currentPlaylist &&
      Array.isArray(this.currentPlaylist.song.items)
    ) {
      const ids = this.recentItems.map((item) => item.encodeId)
      return this.currentPlaylist.song.items.filter(
        (item) => !ids.includes(item.encodeId)
      )
    }
    return []
  }

  get recentItems(): Song[] {
    return this._state.recentItems
  }

  set recentItems(val: Song[]) {
    this._state.recentItems = val
  }

  get currentSong(): Song {
    return this._state.currentSong
  }

  set currentSong(song: Song) {
    this.currentSongId = song.encodeId
    let index = this.queues.findIndex((item) => item.encodeId === song.encodeId)
    if (index >= 0) {
      this.queues.splice(index, 1)
    }
    index = this.recentItems.findIndex(
      (item) => item.encodeId === song.encodeId
    )
    if (index >= 0) {
      this.recentItems.splice(index, 1)
    }
    this.recentItems.push(song)
    this._state.currentSong = song
  }

  get currentPlaylist(): Playlist {
    return this._state.currentPlaylist
  }

  set currentPlaylist(playlist: Playlist) {
    if (playlist) {
      this._state.currentPlaylist = cloneDeep(playlist)
      this.currentPlaylistId = playlist.encodeId
      this.recentItems = []
      if (
        this.currentSongId &&
        Array.isArray(this.currentPlaylist.song.items)
      ) {
        const index = this.currentPlaylist.song.items.findIndex(
          (song) => song.encodeId === this.currentSongId
        )
        this.currentPlaylist.song.items.splice(-1, index)
      }
      this.queues = this.currentPlaylistItems
    }
  }

  get isPlaying(): boolean {
    return this._reactivity.isPlaying
  }

  set isPlaying(val: boolean) {
    this._reactivity.isPlaying = val
    if (this._howler) {
      if (val) {
        this._howler.play()
      } else {
        this._howler.pause()
      }
    }
  }

  handleOnend(): void {
    this.isPlaying = false
    setTimeout(() => {
      this.isPlaying = true
    }, 200)
    if (this.repeat === 'one') {
    }
  }

  async initialize(url: string, autoPlay?: boolean) {
    Howler.unload()
    this._howler = new Howl({
      src: [url],
      html5: true,
      format: ['mp3'],
      onend: this.handleOnend.bind(this),
    })
    if (autoPlay) {
      this.isPlaying = true
      document.title = `${this.currentSong.title} - ${this.currentSong.artistsNames} | Zing MP3`
    }
  }
  seek(percent: number) {
    if (this._howler) {
      this._howler.seek((percent / 100) * this._howler.duration())
    }
  }
  calculateDuration(percent: number) {
    if (this._howler) {
      return (percent / 100) * this._howler.duration() || 0
    }
    return 0
  }
}

export default Player
