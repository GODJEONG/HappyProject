import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/data'
import './styles.css';



createApp(App).use(router).mount('#app')
createApp(App)
.use(router)
.use(store)
.mount('#app')
