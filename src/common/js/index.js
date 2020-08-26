import Http from './http'

// 通用js 的一些代码
export default {
  fetchData (url, data = {}, type = 'get') {
    return new Promise((resolve, reject) => {
      if (type.toLowerCase() === 'get') {
        Http.get(url, {
          params: {
            ...data
          }
        }).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
        return
      }
      Http.post(url, data).then(res => {
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  },

  // 返回图片的不同宽度的地址
  changeImageSize (src, w = 300) {
    return `${src}?param=${w}y${w}`
  }
}