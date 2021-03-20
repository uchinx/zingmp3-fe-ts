<script lang="ts">
import SliderComponent from '@/components/slider/index.vue'
import Carousel from '@/components/carousel/index.vue'
export default {
  components: { SliderComponent, Carousel },
}
</script>
<template>
  <div>
    <SliderComponent />
    <div class="albums">
      <Carousel />
      <Carousel />
    </div>
    Home Page
  </div>
</template>

<style lang="scss" scoped>
</style>
