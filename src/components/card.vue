<script lang="ts">
import { usePlayer } from '@/composables'
import { computed } from 'vue'
export default {
  props: {
    detail: {
      type: Object,
    },
  },
  setup({ detail }) {
    const player = usePlayer()
    const isCurrent = computed(
      () => player.currentPlaylistId.value === detail.encodeId
    )
    const isPlaying = computed(() => isCurrent.value && player.isPlaying.value)
    return {
      ...player,
      isPlaying,
    }
  },
}
</script>
<template>
  <div class="card">
    <div class="image" :class="{ playing: isPlaying }">
      <img :src="detail.thumbnail" alt="thumbnail" />
      <div class="controls">
        <div class="center">
          <button class="btn">
            <i class="ic-like"></i>
          </button>
          <button class="btn play" @click="playPlaylist(detail)">
            <i
              class="icon"
              :class="isPlaying ? 'ic-gif-playing-white' : 'ic-play'"
            ></i>
          </button>
          <button class="btn">
            <i class="ic-more"></i>
          </button>
        </div>
      </div>
    </div>
    <router-link :to="detail.link" class="title" :title="detail.title">{{
      detail.title
    }}</router-link>
  </div>
</template>

<style lang="scss" scoped>
.card {
  overflow: hidden;
  border-radius: 10px;
}
.title {
  color: var(--body-text);
  text-decoration: none;
  margin-top: 4px;
  font-size: 14px;
  font-weight: 500;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2;
  &:hover {
    color: var(--primary);
  }
}
.image {
  overflow: hidden;
  position: relative;
  border-radius: 10px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: none;
  }
  &:hover,
  &.playing {
    &::after {
      display: block;
    }
    img[alt='thumbnail'] {
      transform: scale(1.05);
    }
    .controls {
      visibility: visible;
    }
  }
  img[alt='thumbnail'] {
    transition: transform 0.4s ease-out;
    width: 100%;
    border-radius: 10px;
  }
  .controls {
    visibility: hidden;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1111;
    display: flex;
    align-items: center;
    .center {
      color: #fff;
      text-align: center;
      margin: auto;
      display: flex;
      align-items: center;
      button {
        color: #fff;
        background: transparent !important;
        i {
          vertical-align: middle;
          font-size: 20px;
        }

        &.play {
          border-radius: 999px;
          border: 1px solid #fff;
          padding: 8px;
          margin: 0 8px;
          i {
            font-size: 20px !important;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
