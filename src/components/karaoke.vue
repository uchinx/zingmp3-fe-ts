<script lang="ts">
import { usePlayer } from '@/composables'
import ModalComponent from '@/components/globals/modal.vue'
import KaraokeContent from './karaoke/content.vue'
import { onMounted, ref, watch } from 'vue'
export default {
  components: { ModalComponent, KaraokeContent },
  setup() {
    const player = usePlayer()
    const isShowing = ref(false)
    const lastId = ref('')
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
    }
  },
}
</script>
<template>
  <div class="wrapper-karaoke" :class="{ active: isShowKaraoke }">
    <div class="wrapper" v-show="isShowing">
      <div class="header">
        <div class="left"></div>
        <div class="center"></div>
        <div class="right">
          <div class="actions">
            <!-- <button class="btn"><i class="icon ic-scale"></i></button> -->
            <button class="btn" @click="haha = true">
              <i class="icon ic-settings"></i>
            </button>
            <button class="btn" @click="isShowKaraoke = false">
              <i class="icon ic-go-down"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="content">
        <karaoke-content
          v-if="isShowing || lastId === currentSongId"
          :key="currentSongId"
        />
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
.wrapper-karaoke {
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
    display: flex;
    align-items: center;
    height: 75px;
    .right {
      margin-left: auto;
      .actions {
        .btn {
          border-radius: 999px;
          font-size: 20px;
          padding: 15px;
          margin-left: 20px;
        }
      }
    }
  }
  .content {
    flex: 1;
  }
}
</style>
