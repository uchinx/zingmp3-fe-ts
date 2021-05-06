<script lang="ts">
import { ref } from 'vue'
import { usePlayer } from '@/composables'
import QueueSong from './song/queue.vue'
export default {
  components: { QueueSong },
  setup() {
    const current = ref('playing')
    const player = usePlayer()
    return { current, ...player }
  },
}
</script>
<template>
  <aside>
    <perfect-scrollbar>
      <div class="header">
        <div class="tab">
          <button
            @click="current = 'playing'"
            class="btn"
            :class="{ current: current === 'playing' }"
          >
            {{ $t('playlist') }}
          </button>
          <button
            @click="current = 'listen_recently'"
            class="btn"
            :class="{ current: current === 'listen_recently' }"
          >
            {{ $t('listen_recently') }}
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
        <div class="list">
          <queue-song
            v-for="(item, index) in recentItems"
            :key="'item' + index"
            :is-active="item.encodeId === currentSongId"
            :song="item"
            :overlay="true"
          ></queue-song>
        </div>
        <div class="next-up">
          <div class="text-title">{{ $t('next_up') }}</div>
          <div class="from" v-if="currentPlaylist">
            {{ $t('from_playlist') }}
            <a href="#" class="text-primary">{{ currentPlaylist.title }}</a>
          </div>
          <div class="list">
            <queue-song
              v-for="(item, index) in queues"
              :key="'item' + index"
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
  & > .ps {
    height: 100vh;
  }
  // overflow-y: auto;
  @include media('<large') {
    right: -$queue-playlist-width !important;
  }
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
.playlist {
  padding: 0 8px;
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
