<template>
	<div class="rank" ref="rank">
		<scroll class="toplist" :data="topList" ref="toplist">
			<ul>
				<li class="item" v-for="(item, index) of topList" :key="index" @click="selectItem(item)">
					<div class="icon">
						<img width="100" height="100" :src="item.coverImgUrl" />
					</div>
					<ul class="songlist">
						<li class="song" v-for="(innerItem, innerIndex) of item.tracks" :key="innerIndex">
							<span>{{innerIndex + 1}}</span>
							<span>{{innerItem.first}}-{{innerItem.second}}</span>
						</li>
					</ul>
				</li>
			</ul>
			<div class="loading-container" v-show="!topList.length">
				<loading></loading>
			</div>
		</scroll>
		<router-view></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {playlistMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'

export default {
  mixin: [playlistMixin],
  components: {
    Scroll,
    Loading
  },
  created () {
    this._getTopList()
  },
  data () {
    return {
      topList: [],
      showLoading: true
    }
  },
  methods: {
    handlePlayList (playlist) {
      if (!playlist) {
        return
      }
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.rank.style.bottom = bottom
      this.$refs.toplist.refresh()
    },
    async _getTopList () {
      let res = await this.$mutils.fetchData(`/toplist/detail`)
      console.log(res)
      if (res.data && res.data.list) {
        this.topList = res.data.list
      }
    },
    selectItem (item) {
      this.$router.push({
        path: `/rank/${item.id}`
      })
      this.setTopList(item)
    },
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	@import "~common/stylus/mixin"
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