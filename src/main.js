import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/data'
import './styles.css';


createApp(App)
.use(router)
.use(store)
.mount('#app')

window.Kakao.init('da502da2fd42d70c0e81840ed1a15096'); // JavaScript 키