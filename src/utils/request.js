// 首先先引入aixos
import axios from 'axios'
//消息提示
import { taost } from '@/composables/utils.js'

import store from '@/store'

//引入cookies
import { getToken } from '@/composables/auth.js'

// 创建一个axios 实例
const service = axios.create({
    baseURL: "/api", // 基准地址
    timeout: 5000 // 超时时间
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {

    //获取cookie的数据
    const token = getToken()
    //判断token是否存在存在则在header头添加字段
    if (token) {
        config.headers['token'] = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data.data
}, function (error) {
    const msg = error.response.data.msg || "数据找不到了~"
    if (msg == '非法token,请先登录') {
        store.dispatch('loginOut').finally(() => {
            location.reload()
        })
    }
    //错误进行提示
    taost(msg, 'error')
    return Promise.reject(error);
});

// 最后导出
export default service