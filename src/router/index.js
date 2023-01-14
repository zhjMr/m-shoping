import { createRouter, createWebHistory } from 'vue-router'

import Index from '@/views/index.vue'
import NotFound from '@/views/404.vue'
import Login from '@/views/login.vue'
import Admin from '@/layout/admin.vue'
import goodList from '@/views/goods/list.vue'
const routes = [
    {
        path: "/",
        component: Admin,
        children: [
            {
                path: "/",
                component: Index,
                meta: {
                    title: "后台首页"
                },
            },
            {
                path: "/goods/list",
                component: goodList,
                meta: {
                    title: "商品管理"
                },
            }
        ]
    },
    {
        path: "/login",
        component: Login,
        meta: {
            title: "登录页"
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

const routerHistory = createWebHistory();
const router = createRouter({
    history: routerHistory,
    routes,
})

export default router