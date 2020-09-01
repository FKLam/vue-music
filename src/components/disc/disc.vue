<template>
	<transition name="slide">
		<music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
	</transition>
</template>

<script type="text/ecmascript-6">
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {createSong} from 'common/js/song'

export default {
  data () {
    return {
      songs: null
    }
  },
  computed: {
    title () {
      return this.disc.name
    },
    bgImage () {
      return this.disc.picUrl
    },
    ...mapGetters([
      'disc'
    ])
  },
  created () {
    this._getSongList()
  },
  methods: {
    async _getSongList () {
      if (!this.disc) {
        this.$router.back()
        return
      }
      let id = this.disc.id
      if (!id) {
        this.$router.back()
        return
      }
      let params = {
        id: this.disc.id
      }
      let res = await this.$mutils.fetchData(`/playlist/detail`, params)
      console.log(res.data)
      if (res.data && res.data.playlist) {
        this.songs = this._normalizeSongs(res.data.playlist.tracks)
      }
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.id) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	@import "~common/stylus/mixin"
	.slide-enter-active,
	.slide-leave-active
		transition: all 0.3s

	.slide-enter,
	.slide-leave-to
		opacity: 0
		transform: translate3d(100%, 0, 0)
</style>