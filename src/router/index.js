import { createRouter, createWebHistory } from 'vue-router'

import Index from '@/views/index.vue'
import NotFound from '@/views/404.vue'
import Login from '@/views/login.vue'
const routes = [
    {
        path: "/",
        component: Index
    },
    {
        path: "/login",
        component: Login
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