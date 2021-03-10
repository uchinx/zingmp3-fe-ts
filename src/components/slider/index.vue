<script lang="ts">
import { ref } from 'vue'
import sliders from './data.json'
import SliderItem from './item.vue'
export default {
  components: { SliderItem },
  setup() {
    const currentIndex = ref(0)
    const slider = sliders[0]
    function handleNext() {
      if (currentIndex.value < sliders.length - 1) {
        currentIndex.value++
      } else {
        currentIndex.value = 0
      }
    }
    function handlePrev() {
      if (currentIndex.value > 0) {
        currentIndex.value--
      } else {
        currentIndex.value = sliders.length - 1
      }
    }
    return { sliders, slider, handleNext, handlePrev, currentIndex }
  },
}
</script>

<template>
  <div class="wrapper">
    <SliderItem
      v-for="(slider, index) in sliders"
      :key="'slider' + index"
      :slider="slider"
      :current-index="currentIndex"
      :index="index"
      :total="sliders.length"
    />
    <SliderItem :slider="slider" hide />
  </div>
  <div class="buttons">
    <button @click="handlePrev">Prev</button>
    <button @click="handleNext">Next</button>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative;
}
</style>
