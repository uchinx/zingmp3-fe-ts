import { UsePlayer, Playlist, Song } from '@/types'
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import Player from '@/helpers/player'
import { fetchStreaming } from '@/api'
const QUALITY = '128'

export default function usePlayer(
  option: {
    watch?: boolean
  } = {}
): UsePlayer {
  const store = useStore()
  const player: Player = store.state.player
  const currentDuration = ref(0)
  const progress = ref(0)
  const progressRef = ref()
  let isSeek = false
  const _player = <UsePlayer>{
    togglePlay() {
      player.isPlaying = !player.isPlaying
    },
    async playSong(song, playlist, isShuffle = false) {
      if (player.currentSongId === song.encodeId) {
        _player.togglePlay()
        return
      }
      player.currentSong = song
      const result = await fetchStreaming(song.encodeId)
      if (result && result.data) {
        player.initialize(result.data[QUALITY], true)
      }
      if (playlist && player.currentPlaylistId !== playlist.encodeId) {
        player.currentPlaylist = playlist
        if (isShuffle) {
          player.isShuffle = true
        }
      }
    },
    playPlaylist(playlist = <Playlist>{}, isShuffle = false) {
      if (playlist.song && Array.isArray(playlist.song.items)) {
        if (playlist.encodeId === player.currentPlaylistId) {
          return _player.togglePlay()
        }
        const firstSong = playlist.song.items[0]
        if (firstSong) {
          _player.playSong(firstSong, playlist, isShuffle)
        }
      }
    },
    handleSeek(ev: any) {
      if (ev.type === 'mousedown') {
        isSeek = true
      }
      if (ev.type === 'click' && ev.target) {
        const percentage = (ev.offsetX / ev.target.offsetWidth) * 100
        player._howler.seek(percentage * player._howler.duration() / 100)
      }
    },
    toggleShuffle() {
      player.isShuffle = !player.isShuffle
    },
    isPlaying: computed(() => player.isPlaying),
    isShuffle: computed({
      get(): boolean {
        return player.isShuffle
      },
      set(val: boolean) {
        player.isShuffle = val
      }
    }),
    currentSong: computed(() => player.currentSong),
    currentSongId: computed(() => player.currentSong.encodeId),
    currentPlaylist: computed(() => player.currentPlaylist),
    currentPlaylistId: computed(() => player.currentPlaylist.encodeId),
    queues: computed(() => player.queues),
    recentItems: computed(() => player.recentItems),
    Player: player,
    currentDuration,
    progress,
    progressRef
  }

  if (option.watch) {
    
    function _interval() {
      if (!isSeek) {
        currentDuration.value = player._howler
          ? <number>player._howler.seek()
          : 0
        const duration = player._howler ? player._howler.duration() : 0
        progress.value = (currentDuration.value / duration) * 100
      }
      setTimeout(_interval, 250)
    }
    _interval()
    document.onmouseup = () => {
      if (isSeek) {
        player._howler.seek(progress.value * player._howler.duration() / 100)
      }
      isSeek = false
    }
    document.onmousemove = (ev) => {
      if (isSeek) {
        const ele = progressRef.value
        if (ele) {
          const w = ele.offsetWidth
          let x = ev.clientX - ele.offsetLeft
          if (x < 0) x = 0
          if (x > w) x = w
          if (ev.target && player._howler) {
            const percentage = (x / w) * 100
            currentDuration.value = percentage * player._howler.duration() / 100
            progress.value = percentage
          }
        }
      }
    }
  }
  return _player
}
