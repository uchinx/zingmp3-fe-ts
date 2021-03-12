<script lang="ts">
import { ref } from 'vue'
import { NavBar } from '../../types'
import NavMenu from './sidebar-item.vue'
export default {
  components: { NavMenu },
  setup() {
    const isExpanded = ref(false)
    const nav1Items: NavBar[] = [
      { title: 'Cá Nhân', icon: 'ic-library', slug: '/mymusic' },
      { title: 'Khám Phá', icon: 'ic-mn-home', slug: '/', active: true },
      { title: '#zingchart', icon: 'ic-mn-zingchart', slug: '/zing-chart' },
      { title: 'Theo Dõi', icon: 'ic-feed', slug: '' },
    ]
    const nav2Items: NavBar[] = [
      { title: 'Nhạc Mới', icon: 'ic-mn-song', slug: '/mymusic' },
      { title: 'Thể Loại', icon: 'ic-mn-catalogue', slug: '/' },
      { title: 'Top 100', icon: 'ic-mn-top100', slug: '/zing-chart' },
      { title: 'MV', icon: 'ic-mn-mv', slug: '' },
    ]
    function expandSidebar() {
      isExpanded.value = !isExpanded.value
    }
    return {
      nav1Items,
      nav2Items,
      expandSidebar,
      isExpanded
    }
  },
}
</script>

<template>
  <aside class="sidebar left" :class="{ 'is-expanded': isExpanded }">
    <div class="top">
      <router-link to="/">
        <div class="logo"></div>
      </router-link>
    </div>
    <nav class="nav nav-1">
      <nav-menu :items="nav1Items" />
    </nav>
    <div class="devide"></div>
    <div class="middle">
      <nav class="nav nav-2">
        <nav-menu :items="nav2Items" />
      </nav>
    </div>
    <div class="bottom">
      <div class="create-playlist">
        <a href="#">
          <i class="ic-add"></i>
          <span>Tạo playlist mới</span>
        </a>
      </div>

      <div class="expand">
        <button class="btn" @click="expandSidebar">
          <i :class="isExpanded ? 'ic-go-left' : 'ic-go-right'"></i>
        </button>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar:not(.is-expanded) {
  @include media('<medium') {
    width: $sidebar-width-m !important;
    .top {
      padding: 0 13px;
      .logo {
        background-image: var(--logo-url-m) !important;
        width: 45px !important;
        height: 45px !important;
      }
    }
    :deep(.nav) {
      li {
        border-left: unset !important;
        &.is-active {
          background-color: var(--alpha-bg);
        }
      }
      a {
        padding: 15px 23px;
        span {
          display: none;
        }
      }
    }
  }
}
.sidebar.is-expanded {
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 30%);
  z-index: 12;
}
.sidebar {
  display: inline-block;
  width: $sidebar-width;
  transition: width 0.3s;
  height: 100vh;
  background: var(--sidebar-bg);
  position: fixed;
  top: 0;
  left: 0;
  .top {
    padding: 0 25px 0 28px;
    height: $top-height;
    width: 100%;
    align-items: center;
    display: flex;
    * {
      display: inline-block;
    }
    .logo {
      width: 120px;
      height: 40px;
      display: inline-block;
      background: var(--logo-url) 50% / contain no-repeat;
    }
  }
  .devide {
    position: relative;
    height: 1px;
    &::after {
      content: '';
      border-top: 1px solid var(--border-color);
      position: absolute;
      left: 25px;
      right: 25px;
      top: 0;
    }
  }
  .nav-1 {
    margin-bottom: 15px;
  }
}
.middle {
  margin-top: 14px;
}
.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  .create-playlist {
    border-top: 1px solid var(--border-color);
    height: 54px;
    display: flex;
    align-items: center;
    cursor: pointer;
    @include media('<medium') {
      display: none;
    }
    a {
      display: flex;
      padding: 0 25px;
      color: var(--text-primary);
      font-weight: 700;
      align-items: center;
      text-decoration: none;
      &:hover {
        color: var(--primary);
      }
      i {
        font-size: 18px;
        height: 18px;
        margin-right: 10px;
      }
      span {
        flex: 1 1;
      }
    }
  }
  .expand {
    @include media('>medium') {
      display: none;
    }
    float: right;
    padding: 10px;
    .btn {
      background: var(--alpha-bg);
      border-radius: 999px;
      padding: 15px 18px;
    }
  }
}
</style>
