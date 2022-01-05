export default {
  namespaced: true,
  state: () => ({
    sidebarOpen: true,
    lang: localStorage.getItem('lang') === 'zh' ? 'zh' : 'en',
    mainColor: localStorage.getItem('mainColor') ? localStorage.getItem('mainColor') : '#409eff',
    tagsViewList: localStorage.getItem('tagsList') ? JSON.parse(localStorage.getItem('tagsList')) : []
  }),
  mutations: {
    trigger(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    handlerLang (state, info) {
      state.lang = info
    },
    addTagsViewList (state, tag) {
      // 当是重复的
      const isFind = state.tagsViewList.find(item => {
        return item.path === tag.path
      })
      if (!isFind) {
        state.tagsViewList.push(tag)
        localStorage.setItem('tagsList', JSON.stringify(state.tagsViewList))
      }
    },
    changeTagsViewList(state, { index, tag }) {
      console.log(tag)
      state.tagsViewList[index] = tag
      // localStorage.setItem('tagsList', JSON.stringify(state.tagsViewList))
    },
    removeTagsView (state, { type, index }) {
      console.log(type, index)
      if (type === 'index') { // 删除当前项
        state.tagsViewList.splice(index, 1)
      } else if (type === 'other') { // 删除其他
        state.tagsViewList.splice(index + 1, state.tagsViewList.length - index + 1)
        state.tagsViewList.splice(0, index)
      } else if (type === 'right') { // 删除右侧
        state.tagsViewList.splice(index + 1, state.tagsViewList.length - index + 1)
      }
      localStorage.setItem('tagsList', JSON.stringify(state.tagsViewList))
    }
  }
}
