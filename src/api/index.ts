import request from '@/helpers/request'

export function fetchPlaylist(id: string) {
  return request({
    url: '/page/get/playlist?id=' + id
  })
}

export function fetchStreaming(id: string) {
  return request({
    url: '/song/get/streaming?id=' + id
  })
}

export function fetchHome(page = 1) {
  return request({
    url: '/page/get/home?page=' + page
  })
}

export function fetchSong(id: string) {
  return request({
    url: '/page/get/song?id=' + id
  })
}

export function fetchKaraokeLyric(id: string) {
  return request({
    url: '/lyric/get/lyric?id=' + id
  })
}

export function fetchLyric(link: string) {
  return request({
    url: link
  })
}
