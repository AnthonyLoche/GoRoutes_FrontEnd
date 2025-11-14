import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { md3 } from 'vuetify/blueprints'
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { createVuetify } from 'vuetify'
import  VueGoogleMaps from '@fawmi/vue-google-maps'

const vuetify = createVuetify({
    blueprint: md3,
    theme: {
        defaultTheme: 'meuTemaClaro', 
        themes: {
            meuTemaEscuro: {
                dark: true,
                colors: {
                    background: '#FFFFFF',
                    surface: '#1E1E1E',
                    primary: '#021F35',
                    secondary: '#03DAC6',
                    error: '#CF6679',
                    success: '#4CAF50',
                    warning: '#FB8C00',
                    info: '#2196F3',
                },
            },
            meuTemaClaro: {
                dark: false,
                colors: {
                    background: '#FFFFFF',
                    surface: '#F5F5F5',
                    primary: '#021F35',
                    secondary: '#03DAC6',
                    error: '#B00020',
                    success: '#4CAF50',
                    warning: '#FB8C00',
                    info: '#2196F3',
                },
            },
        },
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
})

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin)
app.use(vuetify)

app.use(VueGoogleMaps, {
    load: {
        key: import.meta.env.VITE_GOOGLE_API_KEY,
        libraries: 'places,geometry', // necessary for places input
    },
})


app.mount('#app')
