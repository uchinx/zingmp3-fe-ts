<script lang="ts">
import { usePlayer } from '@/composables'
import { onMounted, ref } from 'vue'
import { fetchKaraokeLyric } from '@/api'
import { head, last } from 'lodash-es'
import { Sentence } from '@/types'
import { normalize } from '@/helpers/lyric'
const KARAOKE_DELAY = 1500
export default {
  setup() {
    const player = usePlayer()
    let sentences: [Sentence]
    const canvasEle = ref()
    let _countSentence = 0
    let _countWord = 0
    let _isKaraoke = false
    let width = 0
    let height = 0
    let _sentenceIndex = 1
    const _sentences: Sentence[] = []
    let ctx: CanvasRenderingContext2D = null

    function handleOnSeek() {
      const seek = <number>player.Player.seek() * 1000
      console.log(seek)

    }

    onMounted(() => {
      loadKaraokeLyric().then(() => {
        doKaraoke()
        player.Player._howler.on('seek', handleOnSeek)
        ctx = canvasEle.value.getContext('2d')
        width = canvasEle.value.width
        height = canvasEle.value.height
        sentences = normalize(sentences, ctx)
      })
    })

    async function loadKaraokeLyric() {
      const result: any = await fetchKaraokeLyric(
        player.currentSongId.value
      ).catch(() => false)
      if (result && result.data) {
        if (result.data.sentences) {
          sentences = result.data.sentences
        }
      }
      _isKaraoke = Array.isArray(sentences) && sentences.length > 0
    }

    function pushSentence(sentence: Sentence) {
      if (_sentenceIndex === 0) {
        _sentences[1] = sentence
        _sentenceIndex = 1
      } else {
        _sentences[0] = sentence
        _sentenceIndex = 0
      }
    }

    function drawSentence(seek?: number) {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#000'
      ctx.textAlign = 'center'
      ctx.font = 'bold 50px sans-serif'
      ctx.textBaseline = 'hanging'
      ctx.globalAlpha = 1
      for (let i = 0; i < _sentences.length; i++) {
        const sentence = _sentences[i]
        if (sentence && Array.isArray(sentence.words)) {
          ctx.fillText(
            sentence.words.map((word) => word.data).join(' '),
            width / 2,
            60 * (i + 2)
          )
          // check is ended
          const endTime = last(sentence.words).endTime + KARAOKE_DELAY
          if (seek > endTime) {
            _sentences[i] = undefined
          }
        }
      }
    }

    function doKaraoke() {
      if (player.isPlaying.value && _isKaraoke) {
        const seek = <number>player.Player.seek() * 1000
        const sentence = sentences[_countSentence]
        if (sentence && Array.isArray(sentence.words)) {
          const startTime = head(sentence.words).startTime - KARAOKE_DELAY || -1
          if (seek > startTime) {
            pushSentence(sentence)
            _countSentence++
          }
        }
        if (ctx) {
          drawSentence(seek)
        }
      }
      requestAnimationFrame(doKaraoke)
    }
    return { ...player, sentences, canvasEle }
  },
}
</script>
<template>
  <div class="karaoke-content">
    <div class="content">
      <canvas id="canvas" width="1500" height="700" ref="canvasEle"></canvas>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.karaoke-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .content {
    text-align: center;
    flex: 1;
    #canvas {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
