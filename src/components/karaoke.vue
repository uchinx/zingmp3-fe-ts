<script lang="ts">
import { usePlayer } from '@/composables'
import ModalComponent from '@/components/globals/modal.vue'
import { ref, watch } from 'vue'
export default {
  components: { ModalComponent },
  setup() {
    const player = usePlayer()
    const isShowing = ref(false)
    watch(player.isShowKaraoke, (val: boolean) => {
      if (val) {
        isShowing.value = player.isShowKaraoke.value
        return
      }
      setTimeout(() => {
        isShowing.value = player.isShowKaraoke.value
      }, 1000)
    })
    return {
      ...player,
      isShowing,
    }
  },
}
</script>
<template>
  <div class="wrapper-karaoke" :class="{ active: isShowKaraoke }">
    <div class="wrapper" v-if="isShowing">
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
      <div class="content"></div>
      <div class="bottom">
        <div class="song-info">
          <span class="song">
            {{ currentSong.title }}
          </span>
          <span class="artist">
            - {{ currentSong.artistsNames }}
          </span>
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
  background-image: url(http://photo-resize-zmp3.zadn.vn/w540_r1x1_jpeg/cover/1/f/1/a/1f1ab8428a983f8a7700bfaa5591713b.jpg) no-repeat;
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
}
</style>
