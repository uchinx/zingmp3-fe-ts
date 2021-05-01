import { Song, Playlist } from '@/types'
import Player from '@/helpers/player'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'

export default function usePlayer(
  option: {
    watch?: boolean
  } = {}
) {
  const store = useStore()
  const _player: Player = store.state['player']
  const player = {
    togglePlay() {
      _player.isPlaying = !_player.isPlaying
    },
    playSong(song: Song, playlist?: Playlist) {
      if (_player.currentSongId === song.encodeId) {
        player.togglePlay()
        return
      }
      _player.currentSong = song
      _player.isPlaying = true
      if (playlist && _player.currentPlaylistId !== playlist.encodeId) {
        _player.currentPlaylist = playlist
      }
    },
    playPlaylist(playlist = <Playlist>{}) {
      if (playlist.song && Array.isArray(playlist.song.items)) {
        if (playlist.encodeId === _player.currentPlaylistId) {
          return player.togglePlay()
        }
        const firstSong: Song = playlist.song.items[0]
        if (firstSong) {
          player.playSong(firstSong, playlist)
        }
      }
    },
    isPlaying: computed(() => _player.isPlaying),
    currentSong: computed(() => _player.currentSong || {}),
    currentPlaylist: computed(() => _player.currentPlaylist || {}),
    currentSongId: computed(() => _player.currentSong.encodeId)
  }

  if (option.watch) {
    watch(player.currentSongId, (val) => {
      console.log(val)
    })
    watch(player.currentPlaylist, (val) => {
      console.log('playlist change', val)
    })
  }
  return player
}
