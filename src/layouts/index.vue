<script lang="ts">
import SidebarComponent from './default/sidebar.vue'
import HeaderComponent from './default/header.vue'
import QueuePlaylist from '../components/queue-playlist.vue'
export default {
  components: { SidebarComponent, HeaderComponent, QueuePlaylist },
}
</script>

<template>
  <div class="default-layout">
    <sidebar-component />
    <section class="content">
      <header-component />
      <div class="wrapper">
        <router-view />
      </div>
    </section>
    <queue-playlist />
  </div>
</template>

<style lang="scss" scoped>
$additional-width: $sidebar-width + $queue-playlist-width;
.content {
  margin-left: $sidebar-width;
  width: calc(100% - #{$additional-width});
  transition: width 0.3s;
  @include media('<large', '>medium') {
    width: calc(100% - #{$sidebar-width}) !important;
  }
  @include media('<medium') {
    margin-left: $sidebar-width-m !important;
    width: calc(100% - #{$sidebar-width-m}) !important;
  }

  min-width: 720px;
}
.wrapper {
  padding: 42px 45px 42px 58px;
  @include media('<large') {
    padding: 20px 38px !important;
  }
}
</style>
