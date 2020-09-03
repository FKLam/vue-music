import {playMode} from 'common/js/config'
import {loadSearch, loadPlay} from 'common/js/cache'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  currentIndex: -1,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay()
}
export default state