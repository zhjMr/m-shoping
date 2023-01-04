import { createRouter, createWebHistory } from 'vue-router'

import Index from '@/views/index.vue'
import About from '@/views/about.vue'
import NotFound from '@/views/404.vue'
const routes = [
    {
        path: "/",
        component: Index
    },
    {
        path: "/about",
        component: About
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