<script lang="ts">
import { computed, onMounted, Ref, ref, watch } from 'vue'
import { usePlayer } from '@/composables'
import { fetchLyric } from '@/api'
import { lyricParser } from '@/helpers/lyric'
import { cloneDeep } from 'lodash-es'
export default {
  props: {
    lyricUrl: { type: String },
  },
  setup({ lyricUrl }) {
    const player = usePlayer()
    const sentences: any = ref([])
    const currentIndex: Ref<number> = ref(-1)
    let _sentences: any = []
    let _isLyric = false

    async function loadLyric() {
      _sentences = await fetchLyric(lyricUrl)
        .then((body: any) => {
          if (body) {
            return lyricParser(body)
          }
        })
        .catch(() => [])
      _isLyric = _sentences.length
      sentences.value = cloneDeep(_sentences)
      doLyric()
    }

    watch(currentIndex, (val) => {
      const el = document.getElementById(`s${val}entence`)
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        })
      }
    })

    function doLyric() {
      const seek = player.Player.seek() as number
      if (player.Player.isPlaying && _isLyric) {
        currentIndex.value = _sentences.findIndex((s: any, i: number) => {
          const _next = _sentences[i + 1]
          return seek >= s.time && (_next ? seek < _next.time : true)
        })
      }
      setTimeout(doLyric, 100)
    }

    onMounted(() => {
      if (lyricUrl) {
        loadLyric()
      }
    })
    const songImage = computed(() => {
      if (player.currentSongId.value) {
        return player.currentSong.value.thumbnailM.replace(
          'w240_r1x1_jpeg',
          'w512_r1x1_jpeg'
        )
      }
      return ''
    })

    function handleSeek(val: number) {
      if (player.Player._howler) {
        player.Player._howler.seek(val)
        if (!player.isPlaying.value) {
          player.isPlaying.value = true
        }
      }
    }

    return {
      ...player,
      songImage,
      sentences,
      currentIndex,
      handleSeek,
    }
  },
}
</script>
<template>
  <div class="lyric">
    <div class="lyric-1">
      <div class="content" v-if="currentSongId">
        <figure class="image">
          <img :src="songImage" alt="image" />
          <div class="playing-icon" v-if="isPlaying">
            <i class="icon ic-gif-playing-white"></i>
          </div>
        </figure>
        <div class="lyric-body">
          <div class="sentences" v-if="sentences.length">
            <template
              v-for="(sentence, index) in sentences"
              :key="'sentence' + index"
            >
              <div
                class="sentence"
                @click="handleSeek(sentence.time)"
                :class="{ active: index === currentIndex }"
                :id="`s${index}entence`"
              >
                {{ sentence.content }}
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="info">
        <h3 class="title">{{ currentSong.title }}</h3>
        <div class="artists">{{ currentSong.artistsNames }}</div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.lyric {
  width: 85%;
  height: 100%;
  min-width: 800px;
  max-width: 1000px;
  margin: auto;
  display: flex;
  align-items: center;
  .lyric-1 {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .content {
    display: flex;
    width: 100%;
    .image {
      position: relative;
      margin: 0;
      border-radius: 10px;
      overflow: hidden;
      width: 400px;
      max-width: 400px;
      img {
        border-radius: 10px;
        overflow: hidden;
        width: 100%;
        height: 100%;
      }
      .playing-icon {
        position: absolute;
        bottom: 25px;
        left: 20px;
        i.icon {
          background-size: 28px !important;
          width: 28px !important;
          height: 28px !important;
        }
      }
    }
    .lyric-body {
      flex: 1;
      padding: 0 20px;
      overflow: hidden;
      width: 100%;
      height: 100%;
      .sentences {
        max-height: 400px;
        user-select: none;
        overflow-y: scroll;
        box-sizing: content-box;
        padding-right: 45px;
        width: 100%;
        height: 100%;
        .sentence {
          font-weight: bold;
          font-size: 23px;
          color: var(--text-secondary);
          background: transparent;
          padding: 10px;
          margin-bottom: 12px;
          border-radius: 10px;
          cursor: default;
          &:hover,
          &.active {
            background: var(--alpha-bg);
          }
          &.active {
            color: var(--primary);
          }
        }
      }
    }
  }

  .info {
    line-height: 1.7;
    width: 100%;
    margin-top: 10px;
    .title {
      font-size: 20px;
      font-weight: bold;
    }
    .artists {
      color: var(--text-secondary);
    }
  }
}
</style>
