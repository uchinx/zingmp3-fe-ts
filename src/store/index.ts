import Player from '@/helpers/player'
import { createStore } from 'vuex'
import mutations from './global/mutations'

const store = createStore({
  state: {
    player: new Proxy(new Player(), {
      set(target: any, prop, val) {
        const old = target[prop]
        target[prop] = val
        target.notify(prop, val, old)
        return true
      },
    }),
    queueItems: [],
    recentItems: []
  },
  mutations: mutations,
})

export default store
