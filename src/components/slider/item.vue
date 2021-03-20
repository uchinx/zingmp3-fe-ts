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
      default: 0
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
    <router-link class="card" :to="slider.link" :title="slider.title">
      <div class="image">
        <img :src="slider.banner" alt="banner" />
      </div>
      <div class="content"></div>
    </router-link>
  </div>
</template>
