// Copy from Zing Mp3 Web Worker
import { Sentence } from '@/types'

const fadeout = 0.4
const fadein = 0.4

export function normalize(sentences: Sentence[] = [], context: any) {
  context.font = 'bold 50px sans-serif'
  const n = sentences.length - 1
  const _sections: any = []
  let _sentences: any = []
  let preEnd = 0
  let setenceIndex = 0

  sentences.forEach((sentence, index) => {
    const sentenceText = sentence.words
      .reduce((results, value) => results + value.data + ' ', '')
      .trim()

    if (!sentenceText) {
      return
    }

    const sentenceTextWidth = context.measureText(sentenceText).width

    let wordText = ''
    const words = sentence.words.map((word) => {
      const startAt = context.measureText(wordText).width / sentenceTextWidth
      const perInSentence =
        context.measureText(word.data).width / sentenceTextWidth
      wordText = wordText + word.data + ' '

      return {
        start: word.startTime,
        end: word.endTime,
        duration: word.endTime - word.startTime,
        text: word.data,
        startAt,
        perInSentence,
      }
    })

    const start = sentence.words[0].startTime
    const end = sentence.words[sentence.words.length - 1].endTime
    const preSentence = _sentences[index - 1]

    if (preSentence && start < preSentence.end) {
      preSentence.end = start
    }

    let countdown
    if (start - preEnd > 10000) {
      const items = [1, 2, 3].map((count) => ({
        count,
        start: start - 1000 * (count + 1),
        end: start - 1000 * count,
      }))

      countdown = {
        items,
        sentenceTextWidth,
      }
    }

    preEnd = end

    if (_sentences.length && countdown) {
      _sections.push({
        sentences: _sentences,
        start: _sentences[0].start,
        end: _sentences[_sentences.length - 1].end,
      })
      _sentences = []
      setenceIndex = 0
    }

    _sentences.push({
      index: setenceIndex,
      start: start,
      end: end,
      duration: end - start,
      text: sentenceText,
      words: words,
      alpha: 1,
      countdown,
    })
    setenceIndex++

    if (index === n) {
      _sections.push({
        sentences: _sentences,
        start: _sentences[0].start,
        end: _sentences[_sentences.length - 1].end,
      })
    }
  })

  return _sections
}

export function buildSentences(sections: any, time: number) {
  const section = sections.find((section: any) => time < section.end)
  return findSentences(section, time)
}

function findSentences({ sentences = [], start, end }: any = {}, time: number) {
  const n = sentences.length
  let _sentences: any = []
  if (!n || start - time > 6000 || time > end) {
    return _sentences
  }

  if (time < sentences[1].start) {
    _sentences = sentences.slice(0, 2)
    _sentences.forEach((i: any) => (i.alpha = 1))
    return _sentences
  }

  if (time > sentences[n - 2].end) {
    _sentences = sentences.slice(n - 2)
    _sentences.forEach((i: any) => (i.alpha = 1))
    return _sentences
  }

  for (let i = 0; i < n; i++) {
    const sentence = sentences[i]

    if (time >= sentence.start && time < sentence.end) {
      _sentences.push(sentence)
      const deta = (time - sentence.start) / sentence.duration

      if (deta <= fadeout) {
        const preSentence = sentences[i - 1]
        if (preSentence) {
          const alpha = 1 - deta / fadeout
          preSentence.alpha = alpha
          _sentences.push(preSentence)
        }
        break
      }

      if (deta >= fadein) {
        const nextSentence = sentences[i + 1]
        if (nextSentence) {
          const alpha = (deta - fadein) / fadein
          nextSentence.alpha = alpha
          _sentences.push(nextSentence)
        }
        break
      }
      break
    }

    if (time < sentence.end) {
      _sentences.push(sentence)
      _sentences.push(sentences[i - 1])
      _sentences.forEach((i: any) => (i.alpha = 1))
      break
    }
  }
  return _sentences
}
