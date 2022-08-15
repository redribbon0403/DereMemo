export const auth = {
  namespaced: true,
  state: {
    isLogin: false,
  },
  getters: {
    isLogin(state) {
      return state.isLogin
    },
  },
  mutations: {
    login(state) {
      state.isLogin = true
    },
    logout(state) {
      state.isLogin = false
    },
  },
  actions: {
  },
}