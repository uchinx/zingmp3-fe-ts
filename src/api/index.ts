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
