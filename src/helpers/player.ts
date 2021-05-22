import { fetchPlaylist, fetchStreaming } from '@/api'
import { Playlist, Song } from '@/types'
import { Howl, Howler } from 'howler'
import { cloneDeep, head, shuffle } from 'lodash-es'
import { computed, reactive, ref, watch, WritableComputedRef } from 'vue'
import { getObject, saveObject } from './storage'

const QUALITY = '128'

enum Repeat {
  None = 'none',
  One = 'one',
  All = 'all',
}
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
    isShuffle: false,
    repeat: Repeat.None,
  })

  private _reactivity = reactive({
    isPlaying: false,
    isShowKaraoke: false
  })

  public currentSongId: string
  public currentPlaylistId: string
  public duration: number = 0
  public isProgressBusy: boolean = false

  // Vue Reactivity
  public isShowQueuePlaylist = ref(false)
  public progress = ref(0)

  constructor() {
    this.volume = 50
    const obj = getObject('Player')
    if (obj) {
      this._state = reactive(obj)
    }
    this._subscribe()
    this.looper()
    this.initMediaSession()
  }
  looper() {
    if (this._howler && this.isPlaying && !this.isProgressBusy) {
      try {
        const current = this._howler.seek() || 0
        const total = this._howler.duration() || 0
        this.progress.value = current && total ? (+current / total) * 100 : 0
      } catch {}
    }
    setTimeout(() => {
      this.looper()
    }, 500)
  }
  _subscribe() {
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
    } else if (this.currentSong) {
      this.loadSong(true)
    }
  }

  get isShuffle(): boolean {
    return this._state.isShuffle
  }

  set isShuffle(val: boolean) {
    this._state.isShuffle = val
    if (val && this.currentPlaylistId) {
      this.queues = shuffle(this.currentPlaylistItems)
    } else {
      this.queues = this.currentPlaylistItems
    }
  }

  get repeat(): Repeat {
    return this._state.repeat
  }

  set repeat(val: Repeat) {
    this._state.repeat = val
  }

  get nextSong(): Song {
    return head(this.queues)
  }

  get isShowKaraoke(): boolean {
    return this._reactivity.isShowKaraoke
  }

  set isShowKaraoke(val: boolean) {
    this._reactivity.isShowKaraoke = val
  }

  handleOnend(): void {
    this.isPlaying = false
    if (this.repeat === Repeat.One) {
      setTimeout(() => {
        this.isPlaying = true
      }, 500)
      return
    }
    this.handleNextSong()
  }

  initMediaSession() {
    const navigator: any = window.navigator
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => {
        this.isPlaying = true
      })
      navigator.mediaSession.setActionHandler('pause', () => {
        this.isPlaying = false
      })
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        console.log('previoustrack')
      })
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        this.handleNextSong()
      })
      navigator.mediaSession.setActionHandler('stop', () => {
        this.isPlaying = false
      })
    }
  }

  _updateMediaSessionMetaData() {
    const navigator: any = window.navigator
    const MediaMetadata: any = (<any>window).MediaMetadata
    if ('mediaSession' in navigator === false) {
      return
    }
    navigator.mediaSession.metadata = new MediaMetadata({
      title: this.currentSong.title,
      artist: this.currentSong.artistsNames,
      album: 'Zing MP3',
      artwork: [
        {
          src: this.currentSong.thumbnailM,
          type: 'image/jpg',
          sizes: '512x512',
        },
      ],
    })
  }

  async loadSong(autoPlay?: boolean, song?: Song) {
    Howler.unload()
    const _song = song ? song : this.currentSong
    const result = await fetchStreaming(_song.encodeId)
    if (!result || !result.data) {
      return false
    }
    const source = result.data[QUALITY]
    this._howler = new Howl({
      src: [source],
      html5: true,
      format: ['mp3'],
      onend: this.handleOnend.bind(this),
    })
    this._updateMediaSessionMetaData()
    if (autoPlay) {
      this.isPlaying = true
      document.title = `${this.currentSong.title} - ${this.currentSong.artistsNames} | Zing MP3`
    }
  }
  seek(percent?: number): number | void {
    if (this._howler) {
      if (percent) {
        this._howler.seek((percent / 100) * this._howler.duration())
      } else {
        try {
          return this._howler.seek() as number
        } catch {
          return 0
        }
      }
    }
  }
  calculateDuration(percent: number) {
    if (this._howler) {
      return (percent / 100) * this._howler.duration() || 0
    }
    return 0
  }

  togglePlay(): void {
    this.isPlaying = !this.isPlaying
  }

  toggleShuffle(): void {
    this.isShuffle = !this.isShuffle
  }

  toggleRepeat(): void {
    switch (this.repeat) {
      case Repeat.None:
      case undefined:
        this.repeat = Repeat.One
        break
      case Repeat.One:
        this.repeat = Repeat.All
        break
      case Repeat.All:
        this.repeat = Repeat.None
        break
    }
  }
  async playSong(song?: Song, playlist?: Playlist, isShuffle = false) {
    if (this.currentSongId === song.encodeId) {
      this.togglePlay()
      return
    }

    if (playlist && this.currentPlaylistId !== playlist.encodeId) {
      this.currentPlaylist = playlist
      if (isShuffle) {
        this.isShuffle = true
      }
    }

    this.currentSong = song

    this.loadSong(true)
  }

  handleNextSong() {
    this.currentSong = this.nextSong
    this.loadSong(true)
  }

  playPlaylist(playlist = <Playlist>{}, isShuffle = false) {
    if (playlist.encodeId === this.currentPlaylistId) {
      return this.togglePlay()
    }
    if (playlist.song && Array.isArray(playlist.song.items)) {
      const firstSong = playlist.song.items[0]
      if (firstSong) {
        this.playSong(firstSong, playlist, isShuffle)
      }
    } else {
      this.loadPlaylist(playlist)
    }
  }

  async loadPlaylist(playlist: Playlist) {
    const result: any = await fetchPlaylist(playlist.encodeId).catch(() => false)
    if (result && result.data) {
      this.playPlaylist(result.data)
    }
  }
}

export default Player
