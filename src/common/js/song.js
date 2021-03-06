export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong (musicData) {
  return new Song({
    id: musicData.id,
    mid: musicData.id,
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    album: musicData.al.name,
    duration: musicData.dt,
    image: musicData.al.picUrl
  })
}

export function createSuggestSong (musicData) {
  return new Song({
    id: musicData.id,
    mid: musicData.id,
    singer: filterSinger(musicData.artists),
    name: musicData.name,
    album: musicData.album.name,
    duration: musicData.duration,
    image: musicData.artists[0].img1v1Url
  })
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}