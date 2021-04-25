<script lang="ts">
import SongInline from '@/components/song/inline.vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchAlbum } from '@/api'
import { onMounted, ref } from 'vue'
export default {
  components: { SongInline },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { id } = route.params
    const album = ref()

    onMounted(async () => {
      const result = await fetchAlbum(<string>id)
      if (result && result.data) {
        album.value = result.data
      } else {
        router.push('/404.html')
      }
    })
    return { album }
  },
}
</script>

<template>
  <div class="album-page" v-if="album">
    <div class="album-info">
      <div class="sticky">
        <div class="cover">
          <img :src="album.thumbnailM" alt="cover" />
        </div>
        <div class="name">
          <h1>{{ album.title }}</h1>
        </div>
        <div class="info">
          <p>
            {{ $t('updated_at') }}:
            {{ new Date(album.contentLastUpdate * 1000).toLocaleDateString() }}
          </p>
          <p>{{ album.like }} {{ $t('lover') }}</p>
        </div>
        <div class="action">
          <button class="btn zing">
            <div class="d-flex">
              <i class="icon ic-play"></i>
              <span>{{ $t('play_random') }}</span>
            </div>
          </button>
        </div>
        <div class="bottom">
          <button class="btn rounded">
            <i class="icon ic-like"></i>
          </button>
          <button class="btn rounded">
            <i class="icon ic-more"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="album">
      <div class="description">
        <p>
          <span class="text-secondary">{{ $t('quote') }}: </span>
          <span>{{ album.description }}</span>
        </p>
      </div>
      <div class="song-list">
        <song-inline
          v-for="(song, index) in album.song.items"
          :key="'song' + index"
          :song="song"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$border-radius: 8px;
.album-page {
  display: flex;
  .album-info {
    width: 300px;
    text-align: center;
    margin-right: 32px;
    top: 100px;
    .sticky {
      position: sticky;
      top: 111px;
    }
    .cover {
      overflow: hidden;
      border-radius: $border-radius;
      box-shadow: 0 5px 8px 0 rgb(0 0 0 / 20%);
      display: flex;
      img {
        border-radius: $border-radius;
        width: 100%;
        height: auto;
        transition: 0.5s;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    .name {
      margin-top: 10px;
    }
    .name > h1 {
      font-weight: bold;
      font-size: 1.4em;
    }
    .info {
      color: var(--text-secondary);
      padding: 5px 0;
      p {
        font-size: 13px;
        line-height: 1.5;
      }
    }
    .action {
      margin: 10px 0;
      .btn {
        font-size: 14px;
        text-transform: uppercase;
        & i.icon {
          font-size: 15px;
          margin-right: 8px;
        }
      }
    }
    .bottom {
      .btn {
        font-size: 17px;
        margin: 5px;
      }
    }
  }
  .album {
    flex: 1 1;
    .song-list {
      margin-top: 15px;
    }
  }
}
</style>
