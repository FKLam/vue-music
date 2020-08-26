<template>
	<div class="singer">
	</div>
</template>

<script type="text/ecmascript-6">
const HOT_NAME = '热门'
const HOT_SINGERS = 10
export default {
  data () {
    return {
      singers: []
    }
  },
  mounted () {
    this._getSingerList()
  },
  methods: {
    async _getSingerList () {
      let params = {
        limit: 100,
        offset: 0,
        type: 1
      }
      let res = await this.$mutils.fetchData('/top/artists', params)
      console.log(res.data)
      if (res.data && res.data.result && res.data.result.artists) {
        this.singers = res.data.result.artists
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	@import "~common/stylus/mixin"
	.singer
		position: fixed
		top: 88px
		bottom: 0
		width: 100%
</style>