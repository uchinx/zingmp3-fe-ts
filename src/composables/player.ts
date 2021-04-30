import { Player } from '@/types/player'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'

export default function usePlayer(
  obj: {
    watch?: boolean
  } = {}
): Player {
  const store = useStore()
  const player = {} as Player

  player.playSong = (id, playlist) => {
    console.log(playlist)
    player.currentSongId.value = id
  }
  player.isPlaying = computed(() => store.getters['player/isPlaying'])
  player.currentSong = computed(() => store.getters['player/currentSong']) || {}
  player.currentSongId = computed({
    get(): string {
      return store.getters['player/currentSongId']
    },
    set(val: string) {
      store.commit('player/update', {
        key: 'currentSongId',
        value: val,
      })
    },
  })

  if (obj.watch) {
    watch(player.currentSongId, (val) => {
      console.log(val)
    })
  }
  return player
}
