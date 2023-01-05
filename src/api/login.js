import request from "@/utils/request.js"

const LoginFrom = (data = {}) => {
    return request({
        url: "admin/login",
        method: "POST",
        data
    })
}
export default {
    LoginFrom,
}