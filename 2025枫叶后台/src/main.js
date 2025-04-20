import { createApp } from 'vue'

import pinia from './pinia' // 状态管理器
import router from './router' // 路由管理器
import 'virtual:uno.css'
import '@unocss/reset/normalize.css'
import '@/style/index.scss' // 全局样式入口
import App from './App.vue' // App入口
import './permission' // 路由权限校验
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/style/element/index.scss'
const app = createApp(App)

app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app')
