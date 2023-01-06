// 首先先引入aixos
import axios from 'axios'
//消息提示
import { ElNotification } from 'element-plus'
//引入cookies
import { useCookies } from '@vueuse/integrations/useCookies'
// 创建一个axios 实例
const service = axios.create({
    baseURL: "/api", // 基准地址
    timeout: 5000 // 超时时间
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    //初始化cookies
    const Cookie = useCookies()
    //获取cookie的数据
    const token = Cookie.get('admin-token')
    //判断token是否存在存在则进行header添加字段
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
    //错误进行提示
    ElNotification({
        message: error.response.data.msg || "数据找不到了~",
        type: 'error',
        duration: 1500
    })
    return Promise.reject(error);
});

// 最后导出
export default service