<script lang="ts">
export default {
  props: {
    detail: {
      type: Object,
    },
  },
  setup() {},
}
</script>
<template>
  <div class="card">
    <div class="image" :class="{ playing }">
      <img :src="detail.thumbnail" alt="thumbnail" />
      <div class="controls">
        <div class="center">
          <button class="btn">
            <i class="ic-like"></i>
          </button>
          <button class="btn">
            <i class="icon-music-wave" v-if="false"></i>
            <i v-else class="ic-play"></i>
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
.title {
  color: var(--body-text);
  text-decoration: none;
  margin-top: 4px;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  &:hover {
    color: var(--primary);
  }
}
.image {
  overflow: hidden;
  position: relative;
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
    .center {
      line-height: 14;
      text-align: center;
      color: #fff;
      button {
        color: #fff;
        i {
          vertical-align: middle;
          font-size: 18px;
        }
      }
      .ic-play {
        font-size: 32px !important;
        transform: scale(1.8);
        cursor: pointer;
        &:hover {
          transform: scale(2);
        }
      }
    }
  }
}
</style>
