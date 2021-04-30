import Player from '@/helpers/player'
import { Module } from 'vuex'
interface State {
  isPlaying: boolean
  currentSongId: string
}
const player = {
  namespaced: true,
  state: <State>{
    isPlaying: false,
    currentSongId: '',
  },
  mutations: {
    update(state: any, payload: any) {
      state[payload.key] = payload.value
    },
  },
  getters: {
    isPlaying: (state: State) => state.isPlaying,
    currentSongId: (state: State) => state.currentSongId
  },
}

export default player
