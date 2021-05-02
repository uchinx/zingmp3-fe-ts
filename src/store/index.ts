import Player from '@/helpers/player'
import { createStore } from 'vuex'
import mutations from './global/mutations'

const store = createStore({
  state: {
    player: new Proxy(new Player(), {
      set(target: any, prop, val) {
        target[prop] = val
        return true
      },
    }),
  },
  mutations: mutations,
})

export default store
