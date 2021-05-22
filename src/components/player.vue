<script lang="ts">
import { usePlayer } from '@/composables'
import { displayDuration } from '@/helpers/utils'
import { onMounted, ref, watch } from 'vue'
import ProgressBar from '@/components/globals/progress-bar.vue'
export default {
  components: { ProgressBar },
  setup() {
    const player = usePlayer()
    const duration = ref(0)
    const first = ref(false)

    function toggleQueuePlaylist() {
      player.isShowQueuePlaylist.value = <any>!player.isShowQueuePlaylist.value
    }

    function handleChangeDuration(percent: number) {
      player.Player.seek(percent)
    }

    onMounted(() => {
      watch(player.progress, (val: number) => {
        if (player.Player) {
          duration.value = player.Player.calculateDuration(val)
        }
      })
      watch(player.isPlaying, (val) => {
        if (val) {
          first.value = true
        }
      })
    })

    function handleMute() {
      player.isMuted.value = !player.isMuted.value
    }

    return {
      ...player,
      displayDuration,
      toggleQueuePlaylist,
      handleChangeDuration,
      handleMute,
      duration,
      first,
    }
  },
}
</script>
<template>
  <div
    class="wrapper-player"
    @click.stop
    v-if="currentSongId"
    :class="{ karaoke: isShowKaraoke }"
  >
    <div class="song-detail" :class="{ first }">
      <div class="thumbnail-wrapper" :class="{ playing: isPlaying }">
        <figure class="thumbnail">
          <img
            v-if="currentSong.thumbnail"
            :src="currentSong.thumbnail"
            alt="thumbnail"
          />
        </figure>
        <svg viewBox="0 0 512 512" class="note note-1">
          <path
            d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"
          ></path></svg
        ><svg viewBox="0 0 384 512" class="note note-2">
          <path
            d="M310.94 1.33l-96.53 28.51A32 32 0 0 0 192 60.34V360a148.76 148.76 0 0 0-48-8c-61.86 0-112 35.82-112 80s50.14 80 112 80 112-35.82 112-80V148.15l73-21.39a32 32 0 0 0 23-30.71V32a32 32 0 0 0-41.06-30.67z"
          ></path></svg
        ><svg viewBox="0 0 512 512" class="note note-3">
          <path
            d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"
          ></path></svg
        ><svg viewBox="0 0 384 512" class="note note-4">
          <path
            d="M310.94 1.33l-96.53 28.51A32 32 0 0 0 192 60.34V360a148.76 148.76 0 0 0-48-8c-61.86 0-112 35.82-112 80s50.14 80 112 80 112-35.82 112-80V148.15l73-21.39a32 32 0 0 0 23-30.71V32a32 32 0 0 0-41.06-30.67z"
          ></path>
        </svg>
      </div>
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
            ></i>
          </button>

          <button class="btn" @click="handleNextSong" id="popup-next-song">
            <tippy :hide-on-click="false" :offset="[0, isShowKaraoke ? 10 : 17]" z-index="11113">
              <i class="icon ic-next"></i>
              <template #content>
                <div
                  class="next-song"
                  v-if="nextSong && Object.keys(nextSong).length"
                >
                  <figure class="left">
                    <img :src="nextSong.thumbnail" alt="thumbnail" />
                  </figure>
                  <div class="right">
                    <div class="name">{{ nextSong.title }}</div>
                    <div class="artists">
                      <template
                        v-for="(artist, index) in nextSong.artists"
                        :key="'artist' + index"
                      >
                        <a href="#">
                          {{ artist.name
                          }}<span v-if="index !== nextSong.artists.length - 1"
                            >,
                          </span>
                        </a>
                      </template>
                    </div>
                  </div>
                </div>
              </template>
            </tippy>
          </button>
          <button
            class="btn"
            :class="{ active: repeat !== 'none' }"
            @click="toggleRepeat"
          >
            <i
              class="icon ic-repeat"
              v-if="['all', 'none', undefined].includes(repeat)"
            ></i>
            <i class="icon ic-repeat-one" v-if="repeat === 'one'"></i>
          </button>
        </div>
      </div>
      <div class="timer" v-if="currentSong.encodeId">
        <div class="current-duration">
          {{ displayDuration(duration, 2) }}
        </div>
        <progress-bar
          v-model:percent="progress"
          @change="handleChangeDuration"
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
        <button class="btn" :class="{ active: isShowKaraoke }">
          <i
            class="icon ic-karaoke"
            @click="isShowKaraoke = !isShowKaraoke"
          ></i>
        </button>
        <div class="volume">
          <button class="btn" @click="handleMute">
            <i class="icon ic-volume"></i>
          </button>
          <progress-bar v-model:percent="volume" />
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
  z-index: 11112;
  transition: background .1s;
  &.karaoke {
    background: transparent !important;
    border-top: unset !important;
    .song-detail,
    .right-control {
      visibility: hidden;
    }
    .player {
      flex-direction: column-reverse;
    }
  }
  .song-detail {
    width: 30%;
    display: flex;
    align-items: center;
    transition: transform 0.3s;
    &.first {
      transform: translateX(20px);
    }
    .thumbnail-wrapper {
      position: relative;
      &.playing {
        .note {
          animation-play-state: running;
        }
        .thumbnail {
          animation-play-state: running;
        }
      }
      .note {
        height: 10px;
        width: 10px;
        position: absolute;
        top: calc(50% - 5px);
        left: calc(50% - 5px);
        opacity: 0;
        -webkit-animation-name: bubble-1;
        animation-name: bubble-1;
        animation-iteration-count: infinite;
        animation-duration: 4.8s;
        animation-timing-function: linear;
        animation-play-state: paused;

        path {
          fill: var(--text-primary);
        }
        &.note-2 {
          animation-delay: 1.2s;
          animation-name: bubble-2;
        }
        &.note-3 {
          animation-delay: 2.4s;
        }
        &.note-4 {
          animation-delay: 3.6s;
          animation-name: bubble-2;
        }
      }
    }
    .thumbnail {
      margin: 0;
      width: 64px;
      height: 64px;
      border-radius: 100%;
      position: relative;
      overflow: hidden;
      animation-name: spinner;
      animation-duration: 12s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      animation-play-state: paused;
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
        > a {
          color: var(--text-secondary);
        }
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
    display: flex;
    flex-direction: column;
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
