import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/main.css'

createApp(App).use(router).use(ElementPlus).mount('#app')
