<script lang="ts">
import SidebarComponent from './default/sidebar.vue'
import HeaderComponent from './default/header.vue'
import QueuePlaylist from '@/components/queue-playlist.vue'
import PlayerComponent from '@/components/player.vue'
import LyricComponent from '@/components/lyric.vue'
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { setTheme } from '@/helpers/dom'
export default {
  components: {
    SidebarComponent,
    HeaderComponent,
    QueuePlaylist,
    PlayerComponent,
    LyricComponent,
  },
  setup() {
    const store = useStore()
    onMounted(() => {
      setTheme(store.state.settings.theme)
    })
  },
}
</script>

<template>
  <div class="default-layout">
    <sidebar-component />
    <section class="content">
      <perfect-scrollbar>
        <header-component />
        <div class="wrapper">
          <router-view />
        </div>
      </perfect-scrollbar>
    </section>
    <queue-playlist />
    <player-component />
    <lyric-component/>
  </div>
</template>

<style lang="scss" scoped>
$additional-width: $sidebar-width + $queue-playlist-width;
.default-layout {
  position: relative;
}
.content {
  margin-left: $sidebar-width;
  width: calc(100% - #{$additional-width});
  transition: width 0.3s;

  & > .ps {
    height: 100vh;
  }
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
  padding: 42px 45px 100px 58px;
  @include media('<large') {
    padding: 20px 38px 100px 38px !important;
  }
}
</style>
