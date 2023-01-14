import { createRouter, createWebHistory } from 'vue-router'

import Index from '@/views/index.vue'
import NotFound from '@/views/404.vue'
import Login from '@/views/login.vue'
import Admin from '@/layout/admin.vue'
import goodList from '@/views/goods/list.vue'
import category from '@/views/category/list.vue'
import skusList from "@/views/skus/list.vue"
import couponList from '@/views/coupon/list.vue'

//静态路由表（公有）

const routes = [
    {
        path: "/",
        name: 'admin',
        component: Admin,
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

//动态路由表(私有)
const asyncRoutes = [
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
    },
    {
        path: "/category/list",
        component: category,
        meta: {
            title: "分类管理"
        },
    },
    {
        path: "/skus/list",
        component: skusList,
        meta: {
            title: "规格管理"
        },
    },
    {
        path: "/coupon/list",
        component: couponList,
        meta: {
            title: "优惠卷管理"
        },
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
//动态添加路由的方法
export function addRoutes(menus) {
    //定义变量，用来保存是否添加新的路由

     let hasNewRoutes=false

     
    //创建递归方法匹配用户权限
    const findAddRoutesByMenus = (arr) => {
        arr.forEach(m => {
            let item = asyncRoutes.find(o => o.path === m.frontpath)
            if (item && !router.hasRoute(item.path)) {
                router.addRoute('admin', item)
                hasNewRoutes=true
            }
            if (m.child && m.child.length > 0) {
                findAddRoutesByMenus(m.child)
            }
        })

    }
    findAddRoutesByMenus(menus)
    return hasNewRoutes
}