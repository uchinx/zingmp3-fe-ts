<script lang="ts">
import { onMounted, ref } from 'vue'
import ThemeIcon from './theme-icon.vue'
import { useRouter } from 'vue-router'
export default {
  components: { ThemeIcon },
  setup() {
    const isSticky = ref(false)
    const router = useRouter()
    const historyState = ref(history.state)
    onMounted(() => {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
          isSticky.value = true
        } else {
          isSticky.value = false
        }
      })
      window.addEventListener('popstate', (ev) => {
        historyState.value = ev.state
      })
    })
    function routerBack() {
      router.back()
    }
    function routerForward() {
      router.forward()
    }
    return {
      isSticky,
      routerForward,
      routerBack,
      historyState
    }
  }
}
</script>

<template>
  <header :class="{ 'is-sticky': isSticky }">
    <div class="navigation">
      <button @click="routerBack" class="btn" :disabled="!historyState.back">
        <i class="ic-back"></i>
      </button>
      <button class="btn" @click="routerForward" :disabled="!historyState.forward">
        <i class="ic-forward"></i>
      </button>
    </div>
    <div class="search-bar">
      <div class="search">
        <i class="ic-search"></i>
        <input type="text" :placeholder="$t('search')" />
      </div>
    </div>
    <div class="left">
      <button class="profile-action btn rounded">
        <i class="icon">
          <theme-icon />
        </i>
      </button>
      <button class="profile-action btn rounded">
        <i class="icon ic-upload"></i>
      </button>
      <button class="profile-action btn rounded">
        <i class="icon ic-settings"></i>
      </button>
      <div class="profile-action profile">
        <img
          src="https://s120-ava-talk.zadn.vn/2/4/9/3/21/120/58a03ada3f14043029fe8b521af00648.jpg"
          alt="logo"
          width="45"
        />
        <i class="ic-svg-vip-label icon"></i>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  padding: 0 20px;
  height: $top-height;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 111;
  &.is-sticky {
    background: var(--background);
    box-shadow: 0 3px 5px var(--sticky-header-box-shadow);
  }
  .navigation {
    .btn {
      background: transparent !important;
      &[disabled=""] {
        opacity: .4;
      }
      i {
        font-size: 25px;
      }
    }
  }
  .search-bar {
    flex: 1 1;
    margin-left: 10px;
    .search {
      padding: 7px 10px;
      background: var(--alpha-bg);
      max-width: 540px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      &:focus-within {
        background: #fff;
      }
      i {
        font-size: 20px;
        color: var(--text-secondary);
        padding-right: 8px;
        margin-top: 5px;
      }
      input {
        background: transparent !important;
        outline: none !important;
        border: none !important;
        color: var(--text-secondary);
        font-size: 15px;
        width: 100%;
        display: block;
      }
    }
  }
  &.is-sticky {
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.08);
  }
  .left {
    margin-right: 15px;
    display: flex;
    align-items: center;
    .profile-action {
      display: inline-block;
      margin-left: 10px;
      img {
        border-radius: 50%;
        border: 2px solid #fccc2e;
      }
      &.profile {
        position: relative;
        padding: 5px 0;
        .icon {
          position: absolute;
          bottom: 5px;
          left: 0;
          right: 0;
          margin: auto;
          height: 10px;
          width: 22px;
          background-repeat: no-repeat;
          background-size: cover;
        }
      }
    }
  }
  .btn {
    padding: 10px;
    i {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
