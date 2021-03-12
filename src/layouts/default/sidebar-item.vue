<script lang="ts">
import { PropType } from 'vue'
import { NavBar } from '../../types'
export default {
  props: {
    items: {
      type: Array as PropType<Array<NavBar>>,
    },
  },
}
</script>

<template>
  <ul class="nav">
    <li
      v-for="(item, index) in items"
      :key="'item' + index"
      :class="{ 'is-active': item.active }"
    >
      <a href="#">
        <i :class="item.icon"></i>
        <span>{{ item.title }}</span>
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
$font-size: 24px;
.nav {
  list-style: none;
  padding: 0;
  display: block;
  li {
    border-left: 3px solid transparent;
    font-weight: 500;
    cursor: pointer;
    &.is-active {
      border-left-color: var(--primary) !important;
      background-color: var(--alpha-bg);
    }
    &.is-active,
    &:hover {
      a {
        color: var(--text-primary);
      }
    }
  }
  a {
    display: flex;
    align-items: center;
    color: var(--text-secondary);
    text-decoration: none;
    padding: 10px 25px;
    i {
      font-size: $font-size;
      width: $font-size;
      height: $font-size;
      margin-right: 10px;
    }
    span {
      white-space: nowrap;
      line-height: normal;
    }
  }
}
</style>
