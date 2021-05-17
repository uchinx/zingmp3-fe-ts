import Player from '@/helpers/player'
import { getObject, saveObject } from '@/helpers/storage'
import { createStore } from 'vuex'
import mutations from './global/mutations'

const settings = getObject('settings') || {}

const store = createStore({
  state: {
    player: new Proxy(new Player(), {
      set(target: any, prop, val) {
        target[prop] = val
        return true
      },
    }),
    settings: new Proxy(settings, {
      set(target: any, prop, val) {
        target[prop] = val
        saveObject('settings', target)
        return true
      }
    }),
    queueItems: [],
    recentItems: [],
    isShowQueuePlaylist: false,
    isProgressBusy: false
  },
  mutations: mutations,
})

export default store
