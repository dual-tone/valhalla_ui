
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/main.css'


// Components
import App from './app.vue'
import router from './router'
import vuetify from './plugins/vuetify'

createApp(App).use(createPinia())
    .use(router).use(vuetify).mount('#app')
