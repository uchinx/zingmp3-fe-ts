import { UsePlayer, Playlist } from '@/types'
import { computed } from 'vue'
import { useStore } from 'vuex'
import Player from '@/helpers/player'
import { fetchStreaming } from '@/api'
const QUALITY = '128'

export default function usePlayer(): UsePlayer {
  const store = useStore()
  const player: Player = store.state.player
  const _player = <UsePlayer>{
    togglePlay() {
      _player.isPlaying.value = !_player.isPlaying.value
    },
    async playSong(song, playlist, isShuffle = false) {
      if (player.currentSongId === song.encodeId) {
        _player.togglePlay()
        return
      }

      if (playlist && player.currentPlaylistId !== playlist.encodeId) {
        player.currentPlaylist = playlist
        if (isShuffle) {
          _player.isShuffle.value = true
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
      _player.isShuffle.value = !_player.isShuffle.value
    },
    queues: computed(() => player.queues),
    currentSong: computed(() => player.currentSong),
    recentItems: computed(() => player.recentItems),
    currentPlaylist: computed(() => player.currentPlaylist),
    currentSongId: computed(() => player.currentSong.encodeId),
    currentPlaylistId: computed(() => player.currentPlaylist.encodeId),
    volume: player.writableComputed('volume'),
    isMuted: player.writableComputed('isMuted'),
    progress: player.writableComputed('progress'),
    isPlaying: player.writableComputed('isPlaying'),
    isShuffle: player.writableComputed('isShuffle'),
    isShowQueuePlaylist: player.writableComputed('isShowQueuePlaylist'),
    Player: player,
  }
  return _player
}
