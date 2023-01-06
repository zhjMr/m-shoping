import { createStore } from 'vuex'
import { setToken, removeToken } from '@/composables/auth.js'
import userApi from '@/api/login.js'
const store = createStore({
    state: {
        user: '',//存储用户信息
    },
    mutations: {
        //存储用户信息
        USERINFO(state, user) {
            state.user = user
        }
    },
    getters: {

    },
    actions: {
        //登录
        login({ commit }, form) {
            return new Promise((resolve, reject) => {
                userApi.LoginFrom(form).then((response) => {
                    setToken(response.token)
                    resolve(response)
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        //获取当前用户信息
        userinfo({ commit }) {
            return new Promise((resolve, reject) => {
                userApi.userInfo().then((response) => {
                    commit('USERINFO', response)
                    resolve(response)
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        // 退出登录
        loginOut({ commit }) {
            return new Promise((resolve, reject) => {
                userApi.logout().then((response) => {
                    //清空cookie数据
                    removeToken()
                    commit('USERINFO', {})
                    resolve(response)
                }).catch((error) => {
                    reject(error);
                })
            })
        },
    }
})

export default store;