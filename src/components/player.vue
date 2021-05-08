<script lang="ts">
import { usePlayer } from '@/composables'
import { displayDuration } from '@/helpers/utils'
import { ref, watch } from 'vue'
import ProgressBar from '@/components/globals/progress-bar.vue'
export default {
  components: { ProgressBar },
  setup() {
    const player = usePlayer({ watch: true })
    const volume = ref(50)
    const isMute = ref(false)
    let _volume: any = null

    watch(volume, (val) => {
      if (val !== 0) {
        _volume = val
      }
      player.volume(val / 100)
    })

    watch(isMute, val => {
      if (val) {
        volume.value = 0
      } else {
        volume.value = _volume
      }
    })


    function toggleQueuePlaylist() {
      player.isShowQueuePlaylist.value = !player.isShowQueuePlaylist.value
    }

    function handleChangeDuration(percent: number) {
      player.seek(percent / 100 * player.duration())
    }

    function handleProcessDuration(percent: number) {
      player.currentDuration.value = percent / 100 * player.duration()
    }

    return {
      ...player,
      displayDuration,
      toggleQueuePlaylist,
      volume,
      handleChangeDuration,
      handleProcessDuration,
      isMute,
    }
  },
}
</script>
<template>
  <div class="wrapper-player" @click.stop>
    <div class="song-detail">
      <figure class="thumbnail">
        <img
          v-if="currentSong.thumbnail"
          :src="currentSong.thumbnail"
          alt="thumbnail"
        />
      </figure>
      <div class="detail">
        <div>
          <h4 class="title">{{ currentSong.title || '' }}</h4>
          <div class="artists" v-if="Array.isArray(currentSong.artists)">
            <template
              v-for="(artist, index) in currentSong.artists"
              :key="'artist' + index"
            >
              <a href="#">
                {{ artist.name
                }}<span v-if="index !== currentSong.artists.length - 1"
                  >,
                </span>
              </a>
            </template>
          </div>
        </div>
      </div>
      <div class="action">
        <button class="btn">
          <i class="icon ic-like"></i>
        </button>

        <button class="btn">
          <i class="icon ic-more"></i>
        </button>
      </div>
    </div>
    <div class="player">
      <div class="control">
        <div class="center">
          <button
            class="btn"
            :class="{ active: isShuffle }"
            @click="toggleShuffle"
          >
            <i class="icon ic-shuffle"></i></button
          ><button class="btn">
            <i class="icon ic-pre"></i></button
          ><button class="btn play" @click="togglePlay">
            <i
              class="icon"
              :class="
                isPlaying ? 'ic-pause-circle-outline' : 'ic-play-circle-outline'
              "
            ></i></button
          ><button class="btn">
            <i class="icon ic-next"></i></button
          ><button class="btn">
            <i class="icon ic-repeat"></i>
          </button>
        </div>
      </div>
      <div class="timer" v-if="currentSong.encodeId">
        <div class="current-duration">
          {{ displayDuration(currentDuration, 2) }}
        </div>
        <progress-bar
          v-model:percent="progress"
          @change="handleChangeDuration"
          @progress="handleProcessDuration"
          :busy-while-progress="true"
        />
        <div class="total-duration">
          {{ displayDuration(currentSong.duration, 2) }}
        </div>
      </div>
    </div>
    <div class="right-control">
      <div class="item">
        <button class="btn"><i class="icon ic-mv"></i></button>
        <button class="btn"><i class="icon ic-karaoke"></i></button>
        <div class="volume">
          <button class="btn" @click="isMute = !isMute"><i class="icon ic-volume"></i></button>
          <progress-bar
            v-model:percent="volume"
          />
        </div>
        <div class="show-list-btn">
          <button
            class="btn"
            :class="{ active: isShowQueuePlaylist }"
            @click="toggleQueuePlaylist"
          >
            <i class="icon ic-list-music"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-player {
  position: fixed;
  width: 100%;
  height: $player-height;
  bottom: 0;
  left: 0;
  background: var(--background);
  display: flex;
  border-top: 1px solid var(--alpha-bg);
  padding: 0 20px;
  z-index: 1111;
  .song-detail {
    width: 30%;
    display: flex;
    align-items: center;
    .thumbnail {
      margin: 0;
      width: 64px;
      height: 64px;
      overflow: hidden;
      border-radius: 100%;
      img {
        width: 100%;
      }
    }
    .detail {
      flex: 1;
      max-width: 190px;
      display: flex;
      flex-direction: column;
      text-align: left;
      margin-left: 10px;
      line-height: 1.8;
      .title {
        font-weight: 500;
      }
      .artists {
        font-size: 12px;
      }
    }
    .action {
      .btn {
        background: transparent;
        font-size: 18px;
      }
    }
  }
  .player {
    width: 100%;
    max-width: 40vw;
    flex-basis: auto;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: left;
    align-self: center;
    .control {
      display: flex;
      align-items: center;
      .center {
        margin: auto;
        display: flex;
      }
      .btn {
        font-size: 16px;
        background: transparent;
        margin: 0 13px;
        line-height: 0;
        padding: 0;
        &.play > i {
          font-size: 40px;
        }
      }
    }
    .timer {
      margin: 4px;
      display: flex;
      align-items: center;
      user-select: none;
      .current-duration,
      .total-duration {
        padding: 0 14px;
        font-size: 12px;
        min-width: 60px;
      }
    }
  }
  .right-control {
    width: 30%;
    display: flex;
    align-items: center;
    .item {
      margin-left: auto;
      display: flex;
      .btn {
        background: transparent;
        font-size: 17px;
      }
      .volume {
        display: flex;
        align-items: center;
        .progress-bar {
          width: 70px;
          height: 15px;
          display: flex;
          align-items: center;
          .progress-bg {
            width: 100%;
            height: 3px;
            position: relative;
            background: var(--alpha-bg);
            .progress {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              background: var(--primary);
              width: 60%;
            }
          }
        }
      }
      .show-list-btn {
        @include media('<large') {
          display: inline-block;
        }
        display: none;
        padding-left: 10px;
        margin-left: 20px;
        border-left: 1px solid var(--alpha-bg);
      }
    }
  }
}
.btn {
  &.active {
    color: var(--primary);
  }
}
</style>
