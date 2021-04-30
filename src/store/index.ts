import { createStore } from 'vuex'
import player from './player'

const store = createStore({
  modules: { player },
})

export default store
