<script lang="ts">
import { ref, watch } from 'vue'
import { usePlayer } from '@/composables'
import QueueSong from './song/queue.vue'
export default {
  components: { QueueSong },
  setup() {
    const current = ref('playing')
    const scrollbar = ref()
    const recent = ref()
    const isSticky = ref(false)
    const player = usePlayer()

    watch(player.currentSongId, () => {
      setTimeout(() => {
        const target: any = Array.from(recent.value.children).find((ele: any) =>
          ele.classList.contains('active')
        )
        if (target) {
          const ele = scrollbar.value.$el
          let y = target.offsetTop - target.offsetHeight * 2.5
          if (y < 0) y = 0
          ele.scroll({
            behavior: 'smooth',
            left: 0,
            top: y,
          })
        }
      }, 500)
    })

    function clickAway() {
      player.isShowQueuePlaylist.value = false
    }
    watch(player.isShowQueuePlaylist, (val) => {
      if (val) {
        setTimeout(() => {
          document.addEventListener('click', clickAway)
        }, 1000)
      } else {
        document.removeEventListener('click', clickAway)
      }
    })

    function handleScroll(ev: any) {
      const target = ev.target
      if (target.scrollTop > 10) {
        isSticky.value = true
      } else {
        isSticky.value = false
      }
    }
    return {
      current,
      ...player,
      isSticky,
      scrollbar,
      handleScroll,
      recent,
    }
  },
}
</script>
<template>
  <aside :class="{ fixed: isShowQueuePlaylist }" @click.stop>
    <perfect-scrollbar @ps-scroll-y="handleScroll" ref="scrollbar">
      <div class="header" :class="{ 'is-sticky': isSticky }">
        <div class="tab">
          <button
            @click="current = 'playing'"
            class="btn"
            :class="{ current: current === 'playing' }"
          >
            Danh sách phát
          </button>
          <button
            @click="current = 'listen_recently'"
            class="btn"
            :class="{ current: current === 'listen_recently' }"
          >
            Nghe gần đây
          </button>
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
      <div class="playlist">
        <div class="list" ref="recent">
          <queue-song
            v-for="item in recentItems"
            :key="item.encodeId"
            :is-active="item.encodeId === currentSongId"
            :song="item"
            :overlay="true"
          ></queue-song>
        </div>
        <div class="next-up">
          <div class="text-title">Tiếp theo</div>
          <div class="from" v-if="currentPlaylist">
            Từ danh sách phát
            <a href="#" class="text-primary">{{ currentPlaylist.title }}</a>
          </div>
          <div class="list">
            <queue-song
              v-for="item in queues"
              :key="item.encodeId"
              :class="{ 'is-active': item.is_active }"
              :song="item"
            ></queue-song>
          </div>
        </div>
      </div>
    </perfect-scrollbar>
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
  transition: right 0.3s;
  z-index: 1111;
  & > .ps {
    height: 100vh;
  }
  // overflow-y: auto;
  @include media('<large') {
    right: -$queue-playlist-width !important;
  }
  &.fixed {
    right: 0 !important;
  }
  .header {
    width: 100%;
    height: $top-height;
    display: flex;
    align-items: center;
    padding: 0 10px;
    background: var(--background);
    z-index: 1111;
    &.is-sticky {
      background: var(--background);
      box-shadow: 0 3px 5px var(--sticky-header-box-shadow);
      position: sticky;
      top: 0;
    }
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
.playlist {
  padding: 8px 8px 100px 8px;
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
