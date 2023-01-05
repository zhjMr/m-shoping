import { createStore } from 'vuex'

const store = createStore({
    state: {
        TOKEN: localStorage.getItem('TOKEN') || ''
    },
    mutations: {
        Maptoken(state, token) {
            console.log(token);
            //将token信息存储vuex
            state.TOKEN = token
            //将token信息存储到本地
            localStorage.setItem('TOKEN', token)
        }
    },
    getters: {

    },
    actions: {

    }
})

export default store;