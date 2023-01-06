import { createStore } from 'vuex'

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

    }
})

export default store;