<script lang="ts">
import { NavBar } from '../../types'
import NavMenu from './nav-menu.vue'
export default {
  components: { NavMenu },
  setup() {
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
    return {
      nav1Items,
      nav2Items,
    }
  },
}
</script>

<template>
  <aside class="sidebar left">
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
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  display: inline-block;
  width: $sidebar-width;
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
}
</style>
