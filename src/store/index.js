import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loading: false,
    logged: false,
    user: '',
    token: '',
  },
  mutations: {
    loading (state, value) {
      state.loading = value
    },
    logged (state, value) {
      state.logged = value
    },
    user (state, value) {
      state.user = value
    },    
    token (state, value) {
      state.token = value
    },
  },
  actions: {
    startLoading () {
      this.commit('loading', true)
    },
    endLoading () {
      this.commit('loading', false)
    },
    setLogin (context, loginData) {
      context.commit('user', loginData.user)
      context.commit('logged', true)
      context.commit('token', loginData.token)
    },   
    logout(context) {
      context.commit('user', null)
      context.commit('token', null)
      context.commit('logged', false)
    }, 
  },
  getters: {
    isLoading: state => {
      return state.loading
    },
    isLogged: state => {
      return state.logged
    },
    getUser: state => {
      return state.user
    },
    getToken: state => {
      return state.token
    },
  }
})