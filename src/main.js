import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/data'
import './styles.css';



createApp(App)
.use(router)
.use(store)
.mount('#app')

window.Kakao.init('d52af6bcfd64fffef249b6db43141eb9'); // JavaScript 키