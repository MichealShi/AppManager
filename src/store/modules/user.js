import {
  loginByUsername,
  getUserInfo
} from '../../mock/login'
import {
  getToken,
  setToken,
  removeToken
} from '../../utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername(
      {
        commit
      },
      userInfo
    ) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        // loginByUsername(username, userInfo.password).then(response => {
        //   console.log(`response.data == ${response.data}`)
        //   const data = response.data
        //   commit('SET_TOKEN', data.token)
        //   setToken(response.data.token)
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
        const response = loginByUsername(username, userInfo.password)
        console.log(`response.data == ${response.token}`)
        commit('SET_TOKEN', response.token)
        setToken(response.token)
        resolve()
      })
    },

    // 获取用户信息
    GetUserInfo(
      {
        commit,
        state
      }
    ) {
      return new Promise((resolve, reject) => {
        // getUserInfo(state.token).then(response => {
        //   if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
        //     reject('error')
        //   }
        //   const data = response.data
        //
        //   if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        //     commit('SET_ROLES', data.roles)
        //   } else {
        //     reject('getInfo: roles must be a non-null array !')
        //   }
        //
        //   commit('SET_NAME', data.name)
        //   commit('SET_AVATAR', data.avatar)
        //   commit('SET_INTRODUCTION', data.introduction)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })

        const response = getUserInfo(state.token)
        if (response.roles && response.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          commit('SET_ROLES', response.roles)
        } else {
          reject('getInfo: roles must be a non-null array !')
        }

        commit('SET_NAME', response.name)
        commit('SET_AVATAR', response.avatar)
        commit('SET_INTRODUCTION', response.introduction)
        resolve(response)
      })
    },

    // 登出
    LogOut(
      {
        commit,
        state
      }
    ) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut(
      {
        commit
      }
    ) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles(
      {
        commit
      },
      role
    ) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        // getUserInfo(role).then(response => {
        //   const data = response.data
        //   commit('SET_ROLES', data.roles)
        //   commit('SET_NAME', data.name)
        //   commit('SET_AVATAR', data.avatar)
        //   commit('SET_INTRODUCTION', data.introduction)
        //   resolve()
        // })
        const response = getUserInfo(role)
        if (response.roles && response.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          commit('SET_ROLES', response.roles)
        } else {
          // reject('getInfo: roles must be a non-null array !')
        }

        commit('SET_NAME', response.name)
        commit('SET_AVATAR', response.avatar)
        commit('SET_INTRODUCTION', response.introduction)
      })
    }
  }
}

export default user
