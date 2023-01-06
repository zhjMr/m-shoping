import request from "@/utils/request.js"
//获取登录接口 
const LoginFrom = (data = {}) => {
    return request({
        url: "admin/login",
        method: "POST",
        data
    })
}
//获取用户信息接口
const userInfo = (data = {}) => {
    return request({
        url: "admin/getinfo",
        method: "POST",
        data
    })
}
export default {
    LoginFrom,
    userInfo
}