import Player from '@/helpers/player'
import { createStore } from 'vuex'

const store = createStore({
  state: {
    player: new Proxy(new Player(), {
      set(target: any, prop, val) {
        target[prop] = val
        return true
      },
    }),
  },
})

export default store
