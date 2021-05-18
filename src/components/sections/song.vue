<script lang="ts">
import SongInline from '@/components/song/inline.vue'
export default {
  components: { SongInline },
  props: {
    title: { type: String },
    songs: { type: Array },
  },
  setup() {

  }
}
</script>
<template>
  <h3>{{ title }}</h3>
  <song-inline
    v-for="(song, index) in songs"
    :key="'song' + index"
    :song="song"
  />
</template>

<style lang="scss" scoped>
h3 {
  font-weight: bold;
  margin: 15px 0;
  font-size: 22px;
}
</style>
