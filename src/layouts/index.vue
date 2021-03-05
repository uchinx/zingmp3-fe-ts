<script lang="ts">
import SidebarComponent from './default/sidebar.vue'
import HeaderComponent from './default/header.vue'
export default {
  components: { SidebarComponent, HeaderComponent }
}
</script>


<template>
  <div class="default-layout">
    <sidebar-component/>
    <section class="content">
      <header-component/>
      <router-view/>
      <div>Default Layout</div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  margin-left: $sidebar-width;
}
</style>
