import { UsePlayer, Playlist } from '@/types'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import Player from '@/helpers/player'
import { fetchStreaming } from '@/api'
import { cloneDeep } from 'lodash-es'
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
  const _player = <UsePlayer>{
    togglePlay() {
      player.isPlaying = !player.isPlaying
    },
    async playSong(song, playlist, isShuffle = false) {
      if (player.currentSongId === song.encodeId) {
        _player.togglePlay()
        return
      }

      if (playlist && player.currentPlaylistId !== playlist.encodeId) {
        player.currentPlaylist = cloneDeep(playlist)
        if (isShuffle) {
          player.isShuffle = true
        }
      }
      const result = await fetchStreaming(song.encodeId)
      if (result && result.data) {
        player.currentSong = song
        player.initialize(result.data[QUALITY], true)
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
    toggleShuffle() {
      player.isShuffle = !player.isShuffle
    },
    seek(val: number) {
      if (player._howler) {
        player._howler.seek(val)
      }
    },
    duration() {
      if (player._howler) {
        return player._howler.duration()
      }
      return 0
    },
    isPlaying: computed(() => player.isPlaying),
    isShuffle: player.writableComputed('isShuffle'),
    isShowQueuePlaylist: computed({
      get(): boolean {
        return store.state.isShowQueuePlaylist
      },
      set(val: boolean) {
        store.commit('update', ['isShowQueuePlaylist', val])
      },
    }),
    currentSong: computed(() => player.currentSong),
    currentSongId: computed(() => player.currentSong.encodeId),
    currentPlaylist: computed(() => player.currentPlaylist),
    currentPlaylistId: computed(() => player.currentPlaylist.encodeId),
    queues: computed(() => player.queues),
    recentItems: computed(() => player.recentItems),
    volume: player.writableComputed('volume'),
    isMuted: player.writableComputed('isMuted'),
    Player: player,
    currentDuration,
    progress,
    progressRef,
  }

  if (option.watch) {
    function _interval() {
      if (!store.state.isProgressBusy) {
        currentDuration.value = player._howler ? <number>player._howler.seek() : 0
        const duration = player._howler ? player._howler.duration() : 0
        progress.value = (currentDuration.value / duration) * 100
      }
      setTimeout(_interval, 250)
    }
    _interval()
  }
  return _player
}
