import router from '@/router'
import store from '@/store'
import { getToken } from '@/composables/auth.js'

router.beforeEach(async (to, from, next) => {
    //获取token
    const token = getToken()

    //用户没有登录强制跳转登录页面
    if (!token && to.path !== "/login") {
        return next({ path: '/login' })
    }
    //用户进行登录不能重复登录
    if (token && to.path === '/login') {
        return next({
            path: from.path ? from.path : '/'
        })
    }
    //如果用户登录了，则调用用户信息接口，并存储到vuex
    if (token) {
        await store.dispatch('userinfo')
    }
    next()
})