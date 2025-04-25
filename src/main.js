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
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Menubar from 'primevue/menubar'
import Textarea from 'primevue/textarea'
import Checkbox from 'primevue/checkbox'
import RadioButton from 'primevue/radiobutton'
import Ripple from 'primevue/ripple';


// Налаштування пресету з оранжевою темою
const MyPreset = definePreset(Lara, {
    semantic: {
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
        }
    }
})

// Створюємо та налаштовуємо додаток
const app = createApp(App)

// Налаштовуємо PrimeVue
app.use(PrimeVue, {
    ripple: true,
    theme: {
        preset: MyPreset,
        options: {
            prefix: 'p',
            darkModeSelector: false
            
        }
    }
})

app.use(router)

// Реєстрація компонентів
app.component('Button', Button)
app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('Dropdown', Dropdown)
app.component('Card', Card)
app.component('Tag', Tag)
app.component('TabView', TabView)
app.component('TabPanel', TabPanel)
app.component('Menubar', Menubar)
app.component('Textarea', Textarea)
app.component('Checkbox', Checkbox)
app.component('RadioButton', RadioButton)

// Монтуємо додаток
app.mount('#app')
