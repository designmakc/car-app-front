import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import Lara from '@primeuix/themes/lara'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
// Імпорт компонентів PrimeVue
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import RadioButton from 'primevue/radiobutton'
import Dropdown from 'primevue/dropdown'
import Message from 'primevue/message'

// Налаштування пресету з orange кольором
const MyPreset = definePreset(Lara, {
    options: {
        darkModeSelector: 'none'
    },
    semantic: {
        font: {
            family: 'Roboto, sans-serif',
            heading: {
                family: 'Futura PT, sans-serif'
            }
        },
        primary: {
            50: '{orange.50}',
            100: '{orange.100}',
            200: '{orange.200}',
            300: '{orange.300}',
            400: '{orange.400}',
            500: '{orange.500}',
            600: '{orange.600}',
            700: '{orange.700}',
            800: '{orange.800}',
            900: '{orange.900}',
            950: '{orange.950}'
        },
        surface: {
            0: '#ffffff',
            50: 'slate-50',
            100: 'slate-100',
            200: 'slate-200',
            300: 'slate-300',
            400: 'slate-400',
            500: 'slate-500',
            600: 'slate-600',
            700: 'slate-700',
            800: 'slate-800',
            900: 'slate-900',
            950: 'slate-950'
        }
    }
})

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            prefix: 'p',
            darkModeSelector: false,
            fontFamily: 'Roboto, sans-serif'
        }
    }
})

app.use(router)

// Реєстрація компонентів
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Checkbox', Checkbox)
app.component('RadioButton', RadioButton)
app.component('Dropdown', Dropdown)
app.component('Message', Message)

app.mount('#app')
