<script lang="ts">
import SidebarComponent from './default/sidebar.vue'
import HeaderComponent from './default/header.vue'
import QueuePlaylist from '../components/queue-playlist.vue'
export default {
  components: { SidebarComponent, HeaderComponent, QueuePlaylist }
}
</script>


<template>
  <div class="default-layout">
    <sidebar-component/>
    <section class="content">
      <header-component/>
      <div class="wrapper">
        <router-view/>
      </div>
    </section>
    <queue-playlist/>
  </div>
</template>

<style lang="scss" scoped>
.content {
  margin-left: $sidebar-width;
  width: calc(100% - 560px);
}
.wrapper {
  padding: 30px;
}
</style>
