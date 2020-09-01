<template>
	<transition name="slide">
		<music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
	</transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'
export default {
  data () {
    return {
      songs: []
    }
  },
  components: {
    MusicList
  },
  computed: {
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    this._getDetail()
  },
  methods: {
    async _getDetail () {
      if (!this.singer.id) {
        this.$router.push(`/singer`)
        return
      }
      let params = {
        id: this.singer.id
      }
      let res = await this.$mutils.fetchData(`/artists`, params)
      console.log(res.data)
      this.songs = this._normalizeSongs(res.data.hotSongs)
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        ret.push(createSong(item))
      })
      return ret
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.slide-enter-active, .slide-leave-active
		transition: all 0.3s
	.slide-enter, .slide-leave-to
		transform: translate3d(100%, 0, 0)
		opacity: 0
	.singer-detail
		position: fixed
		z-index: 100
		top: 0
		left: 0
		right: 0
		bottom: 0
		background: $color-background
</style>