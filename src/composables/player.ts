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
  const _player = <UsePlayer>{
    togglePlay() {
      player.isPlaying = !player.isPlaying
    },
    async playSong(song, playlist) {
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
      }
    },
    playPlaylist(playlist = <Playlist>{}) {
      if (playlist.song && Array.isArray(playlist.song.items)) {
        if (playlist.encodeId === player.currentPlaylistId) {
          return _player.togglePlay()
        }
        const firstSong = playlist.song.items[0]
        if (firstSong) {
          _player.playSong(firstSong, playlist)
        }
      }
    },
    isPlaying: computed(() => player.isPlaying),
    currentSong: computed(() => player.currentSong),
    currentSongId: computed(() => player.currentSong.encodeId),
    currentPlaylist: computed(() => player.currentPlaylist),
    currentPlaylistId: computed(() => player.currentPlaylist.encodeId),
    Player: player,
    currentDuration,
    progress,
  }

  if (option.watch) {
    watch(_player.currentSongId, (val) => {
      console.log(val)
    })
    watch(_player.currentPlaylist, (val) => {
      console.log('playlist change', val)
    })
    watch(_player.isPlaying, (val) => {
      console.log('thinh playing', val)
    })
    function _interval() {
      currentDuration.value = player._howler ? <number>player._howler.seek() : 0
      const duration = player._howler ? player._howler.duration() : 0
      setTimeout(_interval, 100)
      progress.value = (currentDuration.value / duration) * 100
    }
    _interval()
  }
  return _player
}
