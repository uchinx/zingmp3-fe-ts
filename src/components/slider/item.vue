<script lang="ts">
import { computed } from 'vue'
export default {
  props: {
    slider: {
      type: Object,
      required: true,
    },
    hide: {
      type: Boolean,
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
    index: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
    },
  },
  setup(props) {
    function checkCtrlClass(action: string): boolean {
      const { currentIndex, total, index } = props
      let localIndex = 0
      if (action === 'prev') {
        localIndex = index + 1
        if (localIndex > Number(total) - 1) {
          localIndex = 0
        }
      } else if (action === 'next') {
        localIndex = index - 1
        if (localIndex < 0) {
          localIndex = Number(total) - 1
        }
      }
      return currentIndex === localIndex
    }
    const isNext = computed(() => checkCtrlClass('next'))
    const isPrev = computed(() => checkCtrlClass('prev'))
    return { isNext, isPrev }
  },
}
</script>

<template>
  <div
    class="item-wrapper"
    :class="{
      hidden: hide,
      current: currentIndex === index,
      prev: isPrev,
      next: isNext,
    }"
  >
    <a class="card" :href="slider.link" :title="slider.title">
      <div class="image">
        <img :src="slider.banner" alt="banner" />
      </div>
      <div class="content"></div>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.item-wrapper {
  width: 41.4%;
  transition: .3s;
  &:not(.hidden) {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    transform: translateX(0);
  }
  &.hidden {
    visibility: hidden;
  }
  &.prev {
    transform: translateX(-77%) scale(.85) !important;
  }
  &.next {
    transform: translateX(77%) scale(.85) !important;
  }
  &.current {
    z-index: 10;
  }
  &:not(.next):not(.prev):not(.current) {
    opacity: 0;
  }
  transform: translateX(0);
  height: auto;
  .card {
    display: inline-block;
    .image > img {
      width: 100%;
      border-radius: 8px;
    }
  }
}
</style>
