import { UsePlayer } from '@/types'
import { computed } from 'vue'
import { useStore } from 'vuex'
import Player from '@/helpers/player'

export default function usePlayer(): UsePlayer {
  const store = useStore()
  const player: Player = store.state.player
  return <UsePlayer>{
    repeat: computed(() => player.repeat),
    queues: computed(() => player.queues),
    currentSong: computed(() => player.currentSong),
    nextSong: computed(() => player.nextSong),
    recentItems: computed(() => player.recentItems),
    currentPlaylist: computed(() => player.currentPlaylist),
    currentSongId: computed(() => player.currentSong.encodeId),
    currentPlaylistId: computed(() => player.currentPlaylist.encodeId),
    volume: player.writableComputed('volume'),
    isMuted: player.writableComputed('isMuted'),
    progress: player.writableComputed('progress'),
    isPlaying: player.writableComputed('isPlaying'),
    isShuffle: player.writableComputed('isShuffle'),
    isShowKaraoke: player.writableComputed('isShowKaraoke'),
    isShowQueuePlaylist: player.writableComputed('isShowQueuePlaylist'),
    Player: player,
    playSong: player.playSong.bind(player),
    playPlaylist: player.playPlaylist.bind(player),
    togglePlay: player.togglePlay.bind(player),
    toggleShuffle: player.toggleShuffle.bind(player),
    toggleRepeat: player.toggleRepeat.bind(player),
    handleNextSong: player.handleNextSong.bind(player),
  }
}
