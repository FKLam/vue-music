export const singer = state => state.singer
export const playList = state => state.playList
export const sequenceList = state => state.sequenceList
export const fullScreen = state => state.fullScreen
export const currentIndex = state => state.currentIndex
export const playing = state => state.playing
export const currentSong = (state) => {
  if (!state.playList) {
    return {}
  }
  if (state.playList.length <= state.currentIndex || state.currentIndex < 0) {
    return {}
  }
  return state.playList[state.currentIndex]
}
export const mode = state => state.mode
export const disc = state => state.disc
export const topList = state => state.topList
export const searchHistory = state => state.searchHistory
export const playHistory = state => state.playHistory
export const favoriteList = state => state.favoriteList