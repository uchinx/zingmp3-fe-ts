<script lang="ts">
import { displayDuration } from '@/helpers/utils'
export default {
  props: {
    song: {
      type: Object,
    },
  },
  setup() {
    return {
      displayDuration,
    }
  },
}
</script>
<template>
  <div class="song" v-if="song">
    <div class="left">
      <figure class="thumbnail">
        <img :src="song.thumbnail" alt="thumbnail" />
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
        <button class="btn">
          <i class="icon ic-like"></i>
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
  &:hover {
    background-color: var(--alpha-bg);
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
      img {
        width: 100%;
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
