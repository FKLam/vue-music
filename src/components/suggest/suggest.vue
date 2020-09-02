<template>
	<scroll class="suggest" :data="songs" :pullup="pullup" @scrollToEnd="searchMore" ref="suggest" :beforeScroll="beforeScroll" @beforeScroll="listScroll">
		<ul class="suggest-list">
			<li class="suggest-item" v-for="(item, index) of songs" :key="index" @click="selectItem(item)">
				<div class="icon">
					<i :class="getIconCls(item)"></i>
				</div>
				<div class="name">
					<p class="text" v-html="getDisplayName(item)"></p>
				</div>
			</li>
			<loading v-show="hasMore" title=""></loading>
		</ul>
		<div class="no-result-wrapper" v-show="!songs.length">
			<no-result title="抱歉，暂无搜索结果"></no-result>
		</div>
	</scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import NoResult from 'base/no-result/no-result'
import {createSuggestSong} from 'common/js/song'
import {mapMutations, mapActions} from 'vuex'

const TYPE_SINGER = 'singer'

export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  },
  data () {
    return {
      page: 1,
      result: {},
      songs: [],
      hasMore: true,
      pullup: true,
      beforeScroll: true
    }
  },
  watch: {
    query () {
      this.search()
    }
  },
  methods: {
    search () {
      this.page = 1
      this.$refs.suggest.scrollTo(0, 0)
      this._getSearch()
    },
    async _getSearch () {
      if (!this.query) {
        return
      }
      this.hasMore = true
      let params = {
        keywords: this.query,
        offset: this.page
      }
      let res = await this.$mutils.fetchData(`/search`, params)
      console.log(res)
      if (res.data) {
        this._genResult(res.data)
      }
    },
    searchMore () {
      if (!this.hasMore) {
        return
      }
      this.page++
      this._getSearch()
    },
    _genResult (data) {
      if (data && data.result) {
        this.result = data.result
      }
      if (this.result) {
        if (this.page === 1) {
          this.songs = this._normalizeSongs(this.result.songs)
        } else {
          this.songs = this.songs.concat(this._normalizeSongs(this.result.songs))
        }
        this.hasMore = this.result.hasMore
      }
    },
    _normalizeSongs (list) {
      let ret = []
      if (!list) {
        return ret
      }
      list.forEach((musicData) => {
        if (musicData.id) {
          ret.push(createSuggestSong(musicData))
        }
      })
      return ret
    },
    getIconCls (item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName (item) {
      if (item.type === TYPE_SINGER) {
        return ''
      } else {
        return item.name
      }
    },
    selectItem (item) {
      if (item.type === TYPE_SINGER) {
        const singer = Singer({
          id: 11111,
          name: '11111'
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
      this.$emit('select')
    },
    listScroll () {
      this.$emit('listScroll')
    },
    refresh () {
      this.$refs.suggest.refresh()
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	@import "~common/stylus/mixin"
	.suggest
		height: 100%
		overflow: hidden
		.suggest-list
			padding: 0 30px
			.suggest-item
				display: flex
				align-items: center
				padding-bottom: 20px
			.icon
				flex: 0 0 30px
				width: 30px
				[class^="icon-"]
					font-size: 14px
					color: $color-text-d
			.name
				flex: 1
				font-size: $font-size-medium
				color: $color-text-d
				overflow: hidden
				.text
					no-wrap()
		.no-result-wrapper
			position: absolute
			width: 100%
			top: 50%
			transform: translateY(-50%)
</style>