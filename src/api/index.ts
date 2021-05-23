import request from '@/helpers/request'

export function fetchPlaylist(id: string) {
  return request({
    url: '/playlist/getDetail?id=' + id
  })
}

export function fetchStreaming(id: string) {
  return request({
    url: '/song/getStreaming?id=' + id
  })
}

export function fetchHome(page = 1) {
  return request({
    url: '/home?page=' + page
  })
}

export function fetchSong(id: string) {
  return request({
    url: '/song/getDetail?id=' + id
  })
}

export function fetchKaraokeLyric(id: string) {
  return request({
    url: '/lyric?id=' + id
  })
}

export function fetchLyric(link: string) {
  return request({
    url: link
  })
}
