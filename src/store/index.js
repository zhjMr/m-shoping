import { createStore } from 'vuex'
import { setToken, removeToken } from '@/composables/auth.js'
import userApi from '@/api/login.js'
const store = createStore({
    state: {
        user: '',//存储用户信息
        asideWitch: '250px',   //侧边栏宽度
        menus: [],//后台返回的菜单数据
        ruleNames: [],//后台返回按钮权限数据
    },
    mutations: {
        //存储用户信息
        USERINFO(state, user) {
            state.user = user
        },
        //侧边栏展开收起宽度切换
        handleAsideWidth(state) {
            state.asideWitch = state.asideWitch === '250px' ? '64px' : '250px'
        },
        //记录后台返回的菜单数据
        SET_MENUS(state, menus) {
            state.menus = menus
        },
        //记录后台返回按钮权限数据
        SET_RULENAMES(state, ruleNames) {
            state.ruleNames = ruleNames
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
                    commit('SET_MENUS', response.menus)
                    commit('SET_RULENAMES', response.ruleNames)
                    resolve(response)
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        //  退出登录
        loginOut({
            commit
        }) {
            // 移除cookie里面的token
            removeToken()
            // 清除vuex的用户信息
            commit("USERINFO", {})
        }
    }
})

export default store;