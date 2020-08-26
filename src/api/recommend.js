import axios from 'axios'

export let ERROR_OK = 0
export let NO_LYRIC = -1901
export let NO_FOUND = 404

export function getRecommend (callback) {
  let params = {
    g_tk: 5381,
    uni: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    _: 1545886811612
  }
  axios.post('/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', params)
    .then(data => {
      callback(data)
    }).catch(error => {
      callback(error)
    })
}