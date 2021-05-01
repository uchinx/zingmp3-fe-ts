import mutations from '@/store/global/mutations'
import { Song } from '@/types/song'
import { Playlist } from '@/types/playlist'
interface State {
  isPlaying: boolean
  currentSong: Song
  currentPlaylist: Playlist
}
const player = {
  namespaced: true,
  state: <State>{
    isPlaying: false,
    currentSong: {},
  },
  mutations: mutations,
  getters: {
    isPlaying: (state: State) => state.isPlaying,
    currentSong: (state: State) => state.currentSong || {},
    currentPlaylist: (state: State) => state.currentPlaylist || {},
  },
}

export default player
