<script lang="ts">
import SliderComponent from '@/components/slider/index.vue'
import Carousel from '@/components/carousel/index.vue'
import { onMounted, ref } from 'vue'
import { fetchHome } from '@/api'
export default {
  components: { SliderComponent, Carousel },
  setup() {
    const sections = ref([])
    async function loadHome(page = 1) {
      const res = await fetchHome(page)
      if (res && res.data && Array.isArray(res.data.items)) {
        sections.value.push(...res.data.items)
      }
    }

    onMounted(() => {
      loadHome(1).then(() => {
        loadHome(2)
      })
    })
    return {
      sections,
    }
  },
}
</script>
<template>
  <div>
    <template v-for="(section, index) in sections" :key="'section' + index">
      <SliderComponent
        v-if="section.sectionType === 'banner'"
        :sliders="section.items"
      />
      <Carousel
        v-else-if="section.sectionType === 'playlist'"
        :title="section.title"
        :items="section.items"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
</style>
