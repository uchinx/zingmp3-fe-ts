<script lang="ts">
import { displayDuration } from '@/helpers/utils'
import { computed, inject, ref } from 'vue'
import { usePlayer } from '@/composables'
export default {
  props: {
    song: {
      type: Object,
      default: () => {}
    },
  },
  setup({ song }) {
    const player = usePlayer()
    const isLiked = ref(false)
    function toggleLike() {
      isLiked.value = !isLiked.value
    }
    const album = inject('album', null)
    const isCurrent = computed(() => player.currentSongId.value === song.encodeId)
    const isPlaying = computed(() => isCurrent.value && player.isPlaying.value)
    return {
      ...player,
      displayDuration,
      isLiked,
      toggleLike,
      isPlaying,
      isCurrent,
      album
    }
  },
}
</script>
<template>
  <div class="song" :class="{ 'is-playing': isPlaying, 'is-current': isCurrent }" @dblclick="playSong(song, album)">
    <div class="left">
      <figure class="thumbnail" @click.stop="playSong(song, album)">
        <img :src="song.thumbnail" alt="thumbnail" />
        <div class="overlay">
          <div class="center">
            <button class="btn">
              <i class="icon" :class="isPlaying ? 'ic-gif-playing-white' : 'ic-play'"></i>
            </button>
          </div>
        </div>
      </figure>
      <div class="title">
        <h4>{{ song.title }}</h4>
        <div class="artists">
          <template
            v-for="(artist, index) in song.artists"
            :key="'artist' + index"
          >
            <a href="#">
              {{ artist.name
              }}<span v-if="index !== song.artists.length - 1">, </span>
            </a>
          </template>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="duration">{{ displayDuration(song.duration, 2) }}</div>
      <div class="action">
        <button class="btn" v-if="song.mvlink">
          <i class="icon ic-mv"></i>
        </button>
        <button class="btn" v-if="song.hasLyric">
          <i class="icon ic-karaoke"></i>
        </button>
        <button class="btn" @click="toggleLike">
          <i class="icon ic-like" :class="isLiked ? 'ic-like-full' : 'ic-like'"></i>
        </button>
        <button class="btn">
          <i class="icon ic-more"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.song {
  user-select: none;
  width: 100%;
  display: flex;
  padding: 8px 10px;
  border-top: 1px solid var(--alpha-bg);
  border-radius: 3px;
  align-items: center;
  &:hover, &.is-current {
    background-color: var(--alpha-bg);
    .left .thumbnail .overlay {
      visibility: visible;
    } 
  }
  & > div {
    flex: 1;
  }
  .left {
    display: flex;
    .thumbnail {
      width: 40px;
      margin: 0;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      display: inline-flex;
      img {
        width: 100%;
      }
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        z-index: 10;
        display: flex;
        align-items: center;
        visibility: hidden;
        .center {
          flex: 1;
          text-align: center;
          .btn {
            color: #fff;
            font-size: 17px;
            & > i:hover {
              opacity: .7;
            }
          }
        }
      }
    }
    .title {
      margin-left: 10px;
      line-height: 1.4;
      h4 {
        font-weight: 500;
        font-size: 14px;
      }
      .artists > a {
        font-size: 12px;
        color: var(--text-secondary);
      }
    }
  }
  .right {
    display: flex;
    .duration {
      margin-right: auto;
      font-size: 12px;
      flex: 1;
      line-height: 2.5;
    }
    .action {
      padding-right: 5px;
      .btn {
        background: transparent;
        margin-left: 8px;
        border-radius: 999px;
        padding: 8px;
        &:hover {
          background: var(--alpha-bg) !important;
        }
        i.icon {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
