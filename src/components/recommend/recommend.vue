<template>
	<div class="recommend" ref="recommend">
		<scroll ref="scroll" class="recommend-content" :data="discList">
			<div>
				<div v-if="banners.length" class="slider-wrapper" ref="sliderWrapper">
					<slider>
						<div v-for="item of banners" :key="item.imageUrl">
							<a>
								<img class="needclick" @load="loadImage" :src="item.imageUrl" />
							</a>
						</div>
					</slider>
				</div>
				<div class="recommend-list">
					<h1 class="list-title">热门歌单推荐</h1>
					<ul>
						<li @click="selectItem(item)" class="item" v-for="(item, index) of discList" :key="index">
							<div class="icon">
								<img width="60" height="60" :src="item.picUrl">
							</div>
							<div class="text">
								<h2 class="name" v-html="item.copywriter"></h2>
								<p class="desc" v-html="item.name"></p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="loading-container" v-show="!discList.length">
				<loading></loading>
			</div>
		</scroll>
		<router-view></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import {playlistMixin} from 'common/js/mixin'
import Loading from 'base/loading/loading'

export default {
  mixins: [playlistMixin],
  data () {
    return {
      banners: [],
      discList: []
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  },
  mounted () {
    this._getBanner()
    this._getDiscList()
  },
  methods: {
    async _getBanner () {
      let res = await this.$mutils.fetchData('/banner')
      console.log(res.data)
      if (res.data && res.data.banners) {
        this.banners = res.data.banners
      }
    },
    async _getDiscList () {
      let res = await this.$mutils.fetchData('/personalized')
      console.log(res.data)
      if (res.data && res.data.result) {
        this.discList = res.data.result
      }
    },
    loadImage () {
      if (!this.checkloaded) {
        this.checkloaded = true
        this.$refs.scroll.refresh()
      }
    },
    selectItem (item) {
    },
    handlePlayList (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	@import "~common/stylus/mixin"
	.recommend
		position: fixed
		width: 100%
		top: 88px
		bottom: 0
		z-index: 100
		.recommend-content
			height: 100%
			width: 100%
			overflow: hidden
			.slider-wrapper
				width: 96%
				margin: 0 auto
				border-radius: 5px
				position: relative
				width: 100%
				overflow: hidden
			.recommend-list
				.list-title
					height: 65px
					line-height: 65px
					text-align: center
					font-size: $font-size-medium
					color: $color-theme
				.item
					display: flex
					box-sizing: border-box
					align-items: center
					padding: 0 20px 20px 20px
					.icon
						flex: 0 0 60px
						width: 60px
						padding-right: 20px
					.text
						display: flex
						flex-direction: column
						justify-content: center
						flex: 1
						line-height: 20px
						overflow: hidden
						font-size: $font-size-medium
						.name
							margin-bottom: 10px
							color: $color-text
						.desc
							color: $color-text-d
			.loading-container
				position: absolute
				width: 100%
				top: 50%
				transform: translateY(-50%)
</style>