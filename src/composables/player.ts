import { Song, Playlist, Player } from '@/types'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'

export default function usePlayer(
  option: {
    watch?: boolean
  } = {}
): Player {
  const store = useStore()
  const player = {
    togglePlay() {
      player.isPlaying.value = !player.isPlaying.value
    },
    playSong(song, playlist) {
      if (player.currentSongId.value === song.encodeId) {
        player.togglePlay()
        return
      }
      player.currentSong.value = song
      player.isPlaying.value = true
      if (playlist && player.currentPlaylist.value.encodeId !== playlist.encodeId) {
        player.currentPlaylist.value = playlist
      }
    },
    playPlaylist(playlist = <Playlist>{}) {
      if (playlist.song && Array.isArray(playlist.song.items)) {
        if (playlist.encodeId === player.currentPlaylistId.value) {
          return player.togglePlay()
        }
        const firstSong: Song = playlist.song.items[0]
        if (firstSong) {
          player.playSong(firstSong, playlist)
        }
      }
    },
    isPlaying: computed({
      get(): boolean {
        return store.getters['player/isPlaying']
      },
      set(val: boolean) {
        store.commit('player/update', ['isPlaying', val])
      },
    }),
    currentSong: computed({
      get(): Song {
        return store.getters['player/currentSong']
      },
      set(song: Song) {
        store.commit('player/update', ['currentSong', song])
      },
    }),
    currentSongId: computed(() => player.currentSong.value.encodeId),
    currentPlaylist: computed({
      get(): Playlist {
        return store.getters['player/currentPlaylist']
      },
      set(playlist: Playlist) {
        store.commit('player/update', ['currentPlaylist', playlist])
      },
    }),
    currentPlaylistId: computed(() => player.currentPlaylist.value.encodeId)
  } as Player

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
