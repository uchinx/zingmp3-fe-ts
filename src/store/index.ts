import { createStore } from 'vuex'
import player from './modules/player'

const store = createStore({
  modules: { player },
})

export default store
