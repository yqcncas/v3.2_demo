const getters = {
  token: state => state.user.token,
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) === '{}'
  },
  userInfo: state => state.user.userInfo,
  siderOpenFlag: state => state.app.sidebarOpen,
  lang: state => state.app.lang,
  mainColor: state => state.app.mainColor,
  tagsViewList: state => state.app.tagsViewList
}

export default getters
