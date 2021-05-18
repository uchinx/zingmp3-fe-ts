<script>
import { ref, watch } from 'vue'
import CardComponent from '@/components/card.vue'
export default {
  props: {
    title: { type: String },
    items: { type: Array },
  },
  components: { CardComponent },
  setup({ items }) {
    const carousel = ref(null)
    const current = ref(0)
    const maxCount = Math.ceil(items.length / 5)
    function handleNext() {
      if (maxCount > current.value + 1) current.value++
    }
    function handlePrev() {
      if (current.value > 0) current.value--
    }
    watch(current, (i) => {
      carousel.value.scrollLeft = i * carousel.value.offsetWidth
    })
    return {
      handleNext,
      handlePrev,
      carousel,
      maxCount,
      current,
    }
  },
}
</script>

<template>
  <h3 class="carousel-title">
    <span>{{ title }}</span>
    <div class="controls">
      <button
        @click="handlePrev"
        :class="0 === current ? 'disabled' : null"
      >
        <i class="ic-go-left"></i>
      </button>
      <button
        @click="handleNext"
        :class="maxCount - 1 <= current ? 'disabled' : null"
      >
        <i class="ic-go-right"></i>
      </button>
    </div>
  </h3>
  <div class="carousel" ref="carousel">
    <card-component
      v-for="(item, index) in items"
      :key="'item' + index"
      :detail="item"
    />
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap !important;
  scroll-behavior: smooth;
  overflow: hidden;
  margin: 0 -15px;
  & > :deep(div) {
    width: calc(100% / 6);
    transition: width 0.3s;
    @include media('<1350px', '>1226px') {
      width: calc(100% / 5) !important;
    }
    @include media('<1225px') {
      width: calc(100% / 4) !important;
    }
    flex-shrink: 0;
    padding: 0 15px;
  }
}
.carousel-title {
  margin-top: 20px;
  display: flex;
  margin-bottom: 13px;
  font-weight: bold;
  font-size: 18px;
  .controls {
    margin-left: auto;
    button {
      background: transparent;
      outline: none;
      border: none;
      cursor: pointer;
      &.disabled {
        opacity: .1;
      }
      i {
        font-size: 17px;
      }
      &:last-child {
        margin-left: 12px;
      }
    }
  }
}
</style>
