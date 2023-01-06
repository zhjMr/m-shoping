import { useCookies } from '@vueuse/integrations/useCookies'
//初始化 cookies 
const Cookie = useCookies()
const TOKENKEY = 'admin-token'
//存储token
export const setToken = (token) => {
    Cookie.set(TOKENKEY, token)

}
//获取token
export const getToken = () => {
    return Cookie.get(TOKENKEY)
}
//删除token
export const removeToken = () => {
    Cookie.remove(TOKENKEY)
}
