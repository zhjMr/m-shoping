import { router, addRoutes } from '@/router'
import store from '@/store'
import { getToken } from '@/composables/auth.js'
import { showFullloading, hideFullloading } from '@/composables/utils.js'

let hasUserInfo = false
router.beforeEach(async (to, from, next) => {
    //开启loading进度条
    showFullloading()
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
    let hasNewRoutes = false
    //如果用户登录了，则调用用户信息接口，并存储到vuex
    if (token && !hasUserInfo) {
        const { menus } = await store.dispatch('userinfo')

        hasUserInfo = true

        hasNewRoutes = addRoutes(menus)
    }

    //动态甚至页面标题
    let title = (to.meta.title ? to.meta.title : '') + " - 后台商城系统"
    document.title = title
    hasNewRoutes ? next(to.fullPath) : next()
})
//全局后置守卫
router.afterEach((to, from) => {
    //关闭loading进度条
    hideFullloading()
})