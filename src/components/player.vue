<script lang="ts">
import { usePlayer } from '@/composables'
export default {
  setup() {
    const player = usePlayer({ watch: true })
    return { ...player }
  },
}
</script>
<template>
  <div class="wrapper-player">
    <div class="song-detail">
      <figure class="thumbnail">
        <img
          src="https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/c/6/d/e/c6de70008188e15bf88ebcf15205b97f.jpg"
          alt="thumbnail"
        />
      </figure>
      <div class="detail">
        <div>
          <h4 class="title">Xin Goi Nhau La Co Nhan</h4>
          <div class="artists">Doan Minh, Quynh Trang</div>
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
          <button class="btn">
            <i class="icon ic-shuffle"></i></button
          ><button class="btn">
            <i class="icon ic-pre"></i></button
          ><button class="btn play" @click="playSong">
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
      <div class="timer">
        <div class="current-duration">01:22</div>
        <div class="progress-bar">
          <div class="progress-bg">
            <div class="progress"></div>
          </div>
        </div>
        <div class="total-duration">04:26</div>
      </div>
    </div>
    <div class="right-control">
      <div class="item">
        <button class="btn"><i class="icon ic-mv"></i></button>
        <button class="btn"><i class="icon ic-karaoke"></i></button>
        <div class="volume">
          <button class="btn"><i class="icon ic-volume"></i></button>
          <div class="progress-bar">
            <div class="progress-bg">
              <div class="progress"></div>
            </div>
          </div>
        </div>
        <div class="show-list-btn">
          <button class="btn"><i class="icon ic-list-music"></i></button>
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
      .current-duration,
      .total-duration {
        padding: 0 14px;
        font-size: 12px;
      }
      .progress-bar {
        width: 100%;
        height: 15px;
        display: flex;
        align-items: center;
        .progress-bg {
          width: 100%;
          height: 3px;
          position: relative;
          background: var(--alpha-bg);
        }
        .progress {
          position: absolute;
          left: 0;
          top: 0;
          width: 40%;
          height: 3px;
          background: var(--primary);
        }
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
</style>

  function usePlayer() {
    throw new Error('Function not implemented.')
  }

  function usePlayer() {
    throw new Error('Function not implemented.')
  }
