<script lang="ts">
import { usePlayer } from '@/composables'
import ModalComponent from '@/components/globals/modal.vue'
import KaraokeComponent from './lyric/karaoke.vue'
import LyricComponent from './lyric/lyric.vue'
import { ref, watch } from 'vue'
export default {
  components: { ModalComponent, KaraokeComponent, LyricComponent },
  setup() {
    const player = usePlayer()
    const isShowing = ref(false)
    const lastId = ref('')
    const tab = ref('lyric')
    const lyricUrl = ref('')
    watch(player.isShowKaraoke, (val: boolean) => {
      if (val) {
        isShowing.value = player.isShowKaraoke.value
        lastId.value = player.currentSongId.value
        return
      }
      setTimeout(() => {
        isShowing.value = player.isShowKaraoke.value
      }, 1000)
    })
    watch(player.currentSongId, (val: string) => {
      if (isShowing.value) {
        lastId.value = val
      }
    })
    return {
      ...player,
      isShowing,
      lastId,
      tab,
      lyricUrl,
    }
  },
}
</script>
<template>
  <div class="wrapper-lyric" :class="{ active: isShowKaraoke }">
    <div class="wrapper" v-show="isShowing">
      <div class="header">
        <div class="left"></div>
        <div class="center">
          <div class="tab">
            <button
              @click="tab = 'karaoke'"
              class="btn"
              :class="{ current: tab === 'karaoke' }"
            >
              Karaoke
            </button>
            <button
              @click="tab = 'lyric'"
              class="btn"
              :class="{ current: tab === 'lyric' }"
            >
              Lyric
            </button>
          </div>
        </div>
        <div class="right">
          <div class="actions">
            <!-- <button class="btn"><i class="icon ic-scale"></i></button> -->
            <button class="btn">
              <i class="icon ic-settings"></i>
            </button>
            <button class="btn" @click="isShowKaraoke = false">
              <i class="icon ic-go-down"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="content">
        <template v-if="isShowing || lastId === currentSongId">
          <karaoke-component
            v-show="tab === 'karaoke'"
            :key="currentSongId"
            v-model:lyricUrl="lyricUrl"
          />
          <lyric-component
            v-if="lyricUrl"
            :key="lyricUrl"
            v-show="tab === 'lyric'"
            :lyric-url="lyricUrl"
          />
        </template>
      </div>
      <div class="bottom">
        <div class="song-info">
          <span class="song">
            {{ currentSong.title }}
          </span>
          <span class="artist"> - {{ currentSong.artistsNames }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-lyric {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background);
  z-index: 11111;
  transition: 0.5s;
  transform: translateY(100%);
  padding-bottom: $player-height - 5px;
  &.active {
    transform: translateY(0);
  }
  .wrapper {
    position: relative;
    padding: 10px 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .bottom {
      position: absolute;
      margin: auto;
      bottom: 0;
      left: 0;
      right: 0;
      .song-info {
        text-align: center;
        font-size: 13px;
        .song {
          font-weight: bold;
        }
        .artist {
          color: var(--text-secondary);
        }
      }
    }
  }
  .header {
    position: relative;
    align-items: center;
    height: 75px;
    min-height: 75px;
    margin-top: 15px;
    .right {
      position: absolute;
      right: 0;
      top: 0;
      .actions {
        .btn {
          border-radius: 999px;
          font-size: 20px;
          padding: 15px;
          margin-left: 20px;
        }
      }
    }
    .center {
      width: 25%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      .tab {
        display: flex;
        background: var(--alpha-bg);
        padding: 3px;
        border-radius: 999px;
        & > button {
          border-radius: 999px;
          flex: 1;
          background: transparent;
          font-size: 16px;
          flex-grow: 1;
          padding: 8px 5px;
          font-weight: 500;
          &.current {
            font-weight: bold;
            color: var(--primary-text);
            background: var(--tab-active);
          }
        }
      }
    }
  }
  .content {
    flex: 1;
  }
}
</style>
