<template>
	<transition name="slide">
		<music-list :title="title" :bg-image="bgImage" :songs="songs" :rank="rank"></music-list>
		<router-view></router-view>
	</transition>
</template>

<script type="text/ecmascript-6">
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {createSong} from 'common/js/song'

export default {
  computed: {
    title () {
      return this.topList.name
    },
    bgImage () {
      if (this.songs.length > 0) {
        return this.songs[0].image
      }
      return this.topList.coverImgUrl
    },
    ...mapGetters([
      'topList'
    ])
  },
  components: {
    MusicList
  },
  created () {
    this._getTopListDetail()
  },
  data () {
    return {
      songs: [],
      rank: true
    }
  },
  methods: {
    async _getTopListDetail () {
      console.log(this.topList)
      if (!this.topList) {
        this.$router.back()
        return
      }
      let id = this.topList.id
      if (!id) {
        this.$router.back()
        return
      }
      let params = {
        id: id
      }
      let res = await this.$mutils.fetchData(`/playlist/detail`, params)
      console.log(res)
      if (res.data && res.data.playlist) {
        this.songs = this._normalizeSong(res.data.playlist.tracks)
      }
    },
    _normalizeSong (list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.id) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	@import "~common/stylus/mixin"
	.slide-enter-active, .slide-leave-active
		transition: all 0.3s ease

	.slide-enter, .slide-leave-to
		transform: translate3d(100%, 0, 0)
	.rank
		position: fixed
		width: 100%
		top: 88px
		bottom: 0
		.toplist
			height: 100%
			overflow: hidden
			.item
				display: flex
				margin: 0 20px
				padding-top: 20px
				height: 100px
				&:last-child
					padding-bottom: 20px
				.icon
					flex: 0 0 100px
					width: 100px
					height: 100px
				.songlist
					display: flex
					flex-direction: column
					justify-content: center
					flex: 1
					padding: 0 20px
					height: 100px
					overflow: hidden
					background: $color-highlight-background
					color: $color-text-d
					font-size: $font-size-small
					.song
						no-wrap()
						line-height: 26px
			.loading-container
				position: absolute
				width: 100%
				top: 50%
				transform: translateY(-50%)
</style>