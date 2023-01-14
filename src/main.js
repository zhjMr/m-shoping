import { createApp } from 'vue'
import App from './App.vue'
//引入vue-router
import {router} from './router/index'
//引入vuex
import store from './store/index'
//引入element-ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//引入element图标
const app = createApp(App)
app.use(router)
app.use(store)
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
app.use(ElementPlus)
import './permission'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
import 'virtual:windi.css'
import 'nprogress/nprogress.css'
app.mount('#app')
