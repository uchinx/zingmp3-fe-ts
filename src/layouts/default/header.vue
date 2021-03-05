<script lang="ts">
import ThemeIcon from './theme-icon.vue'
export default {
  components: { ThemeIcon },
}
</script>

<template>
  <header>
    <div class="navigation">
      <button @click="toggle">
        <i class="ic-back"></i>
      </button>
      <button>
        <i class="ic-forward"></i>
      </button>
    </div>
    <div class="search-bar">
      <div class="search">
        <input type="text" :placeholder="$t('search')" />
      </div>
    </div>
    <div class="left">
      <button class="header-btn">
        <i class="icon">
          <theme-icon />
        </i>
      </button>
      <button class="header-btn">
        <i class="icon ic-upload"></i>
      </button>
      <button class="header-btn">
        <i class="icon ic-settings"></i>
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  padding: 0 30px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.08);
  height: 70px;
  display: flex;
  align-items: center;
  .search-bar {
    flex: 1 1;
  }
}
</style>
