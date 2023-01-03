import { createRouter, createWebHistory } from 'vue-router'
// 开启历史模式
// vue2中使用 mode: history 实现
const routerHistory = createWebHistory();
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: () => import('../views/login.vue')
        },
    ]
})

export default router