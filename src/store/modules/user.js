import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),//用户TOKEN
    name: '',//用户名
    avatar: ''//用户头像
  }
}
const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name+'--jcl'
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}
const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password ,verificCode} = userInfo
    return new Promise((resolve, reject) => {
      var data = {token:'admin-token'}
      commit('SET_TOKEN', data.token)
      setToken(data.token)
      resolve()
      // login({ username: username.trim(), password: password, verificCode: verificCode, })
      // .then(response => {
      //   // const { data } = response
      //   // commit('SET_TOKEN', data.token)
      //   // setToken(data.token)
      //   // resolve()
      // }).catch(error => {
      //   console.log(error)
      //   reject(error)
      // })
    })
  },
  // 获取用户登录信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      var response = 
      {
        "code": 200,
        "data": {
          "roles": ["admin"],
          "introduction": "I am a super administrator",
          "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
          "name": "Super Admin"
        }
      }
      const { data } = response
      if (!data) {
        return reject('Verification failed, please Login again.')
      }
      const { name, avatar } = data
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      resolve(data)
      // getInfo(state.token)
      // .then(response => {
      //   const { data } = response
      //   if (!data) {
      //     return reject('Verification failed, please Login again.')
      //   }
      //   const { name, avatar } = data
      //   commit('SET_NAME', name)
      //   commit('SET_AVATAR', avatar)
      //   resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // 登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 移除token 
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

