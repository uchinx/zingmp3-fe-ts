<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { setTheme } from '@/helpers/dom'
export default {
  setup() {
    const store = useStore()
    const settings = store.state.settings
    const current = computed(() => settings.theme)
    const themes = [
      {
        name: 'Tối',
        code: 'dark',
        url:
          'https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme/dark.jpg',
      },
      {
        name: 'Sáng',
        code: 'light',
        url:
          'https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme/light.jpg',
      },
    ]

    function handleChangeTheme(code) {
      settings.theme = code
      setTheme(code)
    }
    return {
      themes,
      current,
      handleChangeTheme,
    }
  },
}
</script>
<template>
  <div class="theming">
    <h3>Chủ đề</h3>
    <div class="themes">
      <div
        class="theme"
        v-for="(theme, index) in themes"
        :key="'theme' + index"
      >
        <figure
          @click="handleChangeTheme(theme.code)"
          :class="{ active: current === theme.code }"
        >
          <img :src="theme.url" alt="image" />
        </figure>
        <div class="name">
          {{ theme.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.theming {
  h3 {
    font-weight: bold;
    margin-bottom: 15px;
  }
  .themes {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    flex-wrap: wrap;
    .theme {
      width: 21%;
      margin-right: 15px;
      margin-bottom: 15px;
      overflow: hidden;
      .name {
        margin-top: 5px;
      }
      figure {
        margin: 0;
        display: flex;
        border: 1px solid transparent;
        line-height: 0;
        border-radius: 5px;
        flex-shrink: 0;
        overflow: hidden;
        cursor: pointer;
        img {
          border-radius: 5px;
        }
        &:hover,
        &.active {
          border-color: #7200a1 !important;
        }
      }
    }
  }
}
</style>
