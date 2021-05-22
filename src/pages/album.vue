<script lang="ts">
import SongInline from '@/components/song/inline.vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchPlaylist } from '@/api'
import { computed, onMounted, provide, ref } from 'vue'
import { usePlayer } from '@/composables'
export default {
  components: { SongInline },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const player = usePlayer()
    const { id } = route.params
    const album = ref()
    const isLiked = ref(false)

    onMounted(async () => {
      const result = await fetchPlaylist(<string>id)
      if (result && result.data) {
        album.value = result.data
      } else {
        router.push('/404.html')
      }
    })

    provide('album', album)

    function toggleLike() {
      isLiked.value = !isLiked.value
    }

    const isCurrent = computed(() => player.currentPlaylistId.value === album.value.encodeId)
    const isPlaying = computed(() => isCurrent.value && player.isPlaying.value)

    return {
      album,
      isLiked,
      toggleLike,
      isPlaying,
      playPlaylist: player.playPlaylist,
      togglePlay: player.togglePlay,
    }
  },
}
</script>

<template>
  <div class="album-page" v-if="album">
    <div class="album-info">
      <div class="sticky md-flex">
        <div class="cover" :class="{ 'is-playing': isPlaying }">
          <img :src="album.thumbnailM" alt="cover" />
          <div class="overlay" :class="{ 'is-playing': isPlaying }">
            <div class="center">
              <button class="btn border" @click.stop="playPlaylist(album, true)">
                <i
                  class="icon"
                  :class="isPlaying ? 'ic-gif-playing-white' : 'ic-play'"
                ></i>
              </button>
            </div>
          </div>
        </div>
        <div class="md-right">
          <div class="name">
            <h1>{{ album.title }}</h1>
          </div>
          <div class="info">
            <p>
              Cập nhật:
              {{
                new Date(album.contentLastUpdate * 1000).toLocaleDateString()
              }}
            </p>
            <p>{{ album.like }} Người yêu thích</p>
          </div>
          <div class="md-action">
            <div class="action">
              <button class="btn zing" @click.stop="playPlaylist(album, true)">
                <div class="d-flex" v-if="isPlaying">
                  <i class="icon ic-pause"></i>
                  <span>Tạm dừng</span>
                </div>
                <div class="d-flex" v-else>
                  <i class="icon ic-play"></i>
                  <span>Phát ngẫu nhiên</span>
                </div>
              </button>
            </div>
            <div class="bottom">
              <button class="btn rounded" @click="toggleLike">
                <i
                  class="icon"
                  :class="isLiked ? 'ic-like-full' : 'ic-like'"
                ></i>
              </button>
              <button class="btn rounded">
                <i class="icon ic-more"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="album">
      <div class="description" v-if="album.description">
        <p>
          <span class="text-secondary">Lời tựa: </span>
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
$large-width: 300px;
.album-page {
  display: flex;
  @include media('<1200px') {
    flex-direction: column;
    .album-info {
      width: 100% !important;
      text-align: left !important;
      margin-bottom: 20px;
      .md-flex {
        display: flex !important;
        .cover {
          width: 200px !important;
        }
        .md-right {
          margin-left: 20px;
        }
        .md-action {
          display: flex;
          align-items: center;
          margin: 20px 0;
        }
      }
    }
  }
  .album-info {
    width: $large-width;
    text-align: center;
    margin-right: 32px;
    top: 100px;
    .sticky {
      position: sticky;
      top: 90px;
    }
    .cover {
      width: $large-width;
      overflow: hidden;
      border-radius: $border-radius;
      box-shadow: 0 5px 8px 0 rgb(0 0 0 / 20%);
      display: flex;
      position: relative;
      transition: 0.8s;
      transform: rotate(0deg);
      &.is-playing {
        border-radius: 100% !important;
        animation: spinner infinite 15s linear 1s;
      }
      img {
        border-radius: $border-radius;
        width: 100%;
        height: auto;
        transition: 0.5s;
      }
      &:hover {
        img {
          transform: scale(1.1);
        }
        .overlay {
          visibility: visible;
        }
      }
      .overlay.is-playing {
        visibility: visible !important;
      }
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        z-index: 111;
        visibility: hidden;
        display: flex;
        align-items: center;
        .center {
          text-align: center;
          z-index: 1111;
          flex: 1;
          .btn {
            font-size: 18px;
            color: #fff;
            // padding: 13px;
            border: 1px solid #fff;
            border-radius: 100%;
          }
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
