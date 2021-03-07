<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    const current = ref('playing')
    const items = [{
      name: 'Let Her go',
      thumbnail: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/covers/b/8/b892777a7b309b6f9f85cfca17e65c9c_1334993877.jpg',
      artists: ['Passenger']
    }, {
      name: 'Marry You',
      thumbnail: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/covers/9/4/94988ad7edf7e749e7117188a09160de_1288751887.jpg',
      artists: ['Bruno Mars']
    }, {
      name: 'Because I Love You',
      thumbnail: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/avatars/9/f/9fe66b65ff8aa87a19607e35ba54e464_1298545783.jpg',
      artists: ['Shakin\' Stevens']
    }, {
      name: 'My Love',
      thumbnail: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/covers/9/5/95680cac41bafb8d12b506c4140af63f_1302606184.jpg',
      artists: ['Westlife']
    }, {
      name: 'No Promises',
      thumbnail: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/covers/d/b/db9e5d42c9372e69b3c1b252ed9b0833_1293122686.jpg',
      artists: ['Shayne Ward']
    }, {
      name: 'Yesterday Once More',
      thumbnail: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/covers/7/0/7014824a73ba9e48258e1fdd40c56fdc_1328009644.jpg',
      artists: ['Yao Si Ting'],
      is_active: true
    }]
    return { current, items }
  }
}
</script>
<template>
  <aside>
    <div class="header">
      <div class="tab">
        <button @click="current = 'playing'" class="btn" :class="{ current: current === 'playing' }">{{ $t('playlist') }}</button>
        <button @click="current = 'listen_recently'" class="btn" :class="{ current: current === 'listen_recently' }">{{ $t('listen_recently') }}</button>
      </div>
      <div class="others">
        <button class="rounded btn alarm is-active">
          <i class="ic-clock"></i>
        </button>
        <button class="rounded btn">
          <i class="ic-more"></i>
        </button>
      </div>
    </div>
    <div class="queue">
      <div class="list">
        <div v-for="(item, index) in items" :key="'item' + index" class="item" :class="{ 'is-active': item.is_active }">
          <div class="left">
            <img :src="item.thumbnail" alt="thumbnail">
          </div>
          <div class="right">
            <div class="name">{{ item.name }}</div>
            <div class="artists">{{ item.artists.join(', ') }}</div>
          </div>
          <div class="cover"></div>
        </div>
      </div>
      <div class="next-up">
        <div class="text-title">{{ $t('next_up') }}</div>
        <div class="from">{{ $t('from_playlist') }} <a href="#" class="text-primary">Radio Westlife</a></div>
        <div class="list">
        <div v-for="(item, index) in items" :key="'item' + index" class="item" :class="{ 'is-active': item.is_active }">
          <div class="left">
            <img :src="item.thumbnail" alt="thumbnail">
          </div>
          <div class="right">
            <div class="name">{{ item.name }}</div>
            <div class="artists">{{ item.artists.join(', ') }}</div>
          </div>
          <div class="cover"></div>
        </div>
      </div>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
$border-radius: 999px;
aside {
  width: $queue-playlist-width;
  height: 100vh;
  right: 0;
  top: 0;
  position: fixed;
  border-left: 1px solid var(--border-color);
  background: var(--background);
  .header {
    width: 100%;
    height: $top-height;
    display: flex;
    align-items: center;
    padding: 0 10px;
    .tab {
      flex: 1 1;
      display: flex;
      background: var(--alpha-bg);
      padding: 3px;
      border-radius: $border-radius;
      & > button {
        border-radius: $border-radius;
        flex: 1;
        background: transparent;
        font-size: 12px;
        flex-grow: 1;
        padding: 8px 5px;
        font-weight: 500;
        &.current {
          color: var(--primary-text);
          background: var(--tab-active);
        }
      }
    }
    .others {
      button {
        margin-left: 4px;
        line-height: 1;
        padding: 6px 8px;
        i {
          display: inline-block;
          font-size: 16px;
          margin-top: 1.5px;
        }
      }
    }
  }
}
.queue {
  padding: 0 8px;
  .item {
    padding: 8px;
    display: flex;
    border-radius: 4px;
    position: relative;
    &.is-active {
      background: var(--primary) !important;
      color: #fff;
    }
    &:not(.is-active) .cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--background);
      opacity: .5;
    }
    &:hover {
      background: var(--alpha-bg);
      .cover {
        opacity: 0 !important;
        z-index: -1;
      }
    }
    .left {
      width: 40px;
      height: 40px;
      cursor: pointer;
      img {
        border-radius: 4px;
      }
    }
    .right {
      padding-left: 10px;
      .name {
        font-weight: 600;
      }
      .artists {
        margin-top: 5px;
        font-size: 12px;
        color: var(--text-secondary);
      }
    }
  }
}
.next-up {
  margin-top: 15px;
  .text-title {
    font-weight: bold;
    margin-bottom: 4px;
  }
  .from {
    color: var(--text-secondary);
  }
  .list {
    margin-top: 10px;
  }
}
</style>
