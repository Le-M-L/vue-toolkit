import { createApp } from 'vue'
import App from './App.vue'
import { setupI18n } from './locales/index'
import { initStores } from './store'

async function bootstrap() {
    const app = createApp(App)

    await setupI18n(app, {
        defaultLocale: 'zh-CN'
    })
    await initStores(app, { namespace: 'test' })

    createApp(App).mount('#app')



}

bootstrap()