import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import { handle } from "./common/promise";
import store from "./store"
createApp(App)
    .mixin({
        methods: {
            handle,
        }
    })
    .use(router)
    .use(store)
    .mount('#app')