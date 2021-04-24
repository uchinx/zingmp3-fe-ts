import request from '@/helpers/request'

export function fetchAlbum(id: string) {
  return request({
    url: '/playlist/getDetail?id=' + id
  })
}
