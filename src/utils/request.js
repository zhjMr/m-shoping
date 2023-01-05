// 首先先引入aixos
import axios from 'axios'
// 创建一个axios 实例
const api = axios.create({
    baseURL: "/api", // 基准地址
    timeout: 5000 // 超时时间
})

// 添加请求拦截器
api.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers["Content-type"] = "application/x-www-form-urlencoded";
    const token = localStorage.getItem('TOKEN')
    config.headers.token = token;
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
api.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 最后导出
export default api