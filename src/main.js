import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles.css';
import router from './router'
import store from '@/store/student'



createApp(App).use(router).mount('#app').use(store)
