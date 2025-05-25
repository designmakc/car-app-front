import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import Lara from '@primeuix/themes/lara'

// Імпортуємо стилі в правильному порядку
import './style.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'

// Stagewise toolbar
import { initToolbar } from '@stagewise/toolbar'

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
import Ripple from 'primevue/ripple'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import FloatLabel from 'primevue/floatlabel'
import CascadeSelect from 'primevue/cascadeselect'
import Select from 'primevue/select'
import Toast from 'primevue/toast'
import InputMask from 'primevue/inputmask'
import SelectButton from 'primevue/selectbutton'
import MultiSelect from 'primevue/multiselect'
import Slider from 'primevue/slider'
import Panel from 'primevue/panel'
import ToggleButton from 'primevue/togglebutton'
import Chip from 'primevue/chip'
import ToastService from 'primevue/toastservice'
import MegaMenu from 'primevue/megamenu'
import IftaLabel from 'primevue/iftalabel'
import AutoComplete from 'primevue/autocomplete'
import OverlayBadge from 'primevue/overlaybadge'
import Breadcrumb from 'primevue/breadcrumb'
import Galleria from 'primevue/galleria'
import Toolbar from 'primevue/toolbar';
import Editor from 'primevue/editor';


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
    pt: {
        global: {
          font: {
            family: "'Unbounded', sans-serif",
            secondaryFamily: "'Roboto', sans-serif"
          }
        }
    },
    theme: {
        preset: MyPreset,
        options: {
            prefix: 'p',
            darkModeSelector: '.fake-dark-selector'
        }
    }
})

// Підключаємо роутер
app.use(router)

// Реєструємо сервіс ToastService
app.use(ToastService)

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
app.directive('ripple', Ripple)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.component('FloatLabel', FloatLabel)
app.component('CascadeSelect', CascadeSelect)
app.component('Select', Select)
app.component('Toast', Toast)
app.component('InputMask', InputMask)
app.component('SelectButton', SelectButton)
app.component('MultiSelect', MultiSelect)
app.component('Slider', Slider)
app.component('Panel', Panel)
app.component('ToggleButton', ToggleButton)
app.component('Chip', Chip)
app.component('MegaMenu', MegaMenu)
app.component('IftaLabel', IftaLabel)
app.component('AutoComplete', AutoComplete)
app.component('OverlayBadge', OverlayBadge)
app.component('Breadcrumb', Breadcrumb)
app.component('Galleria', Galleria)
app.component('Toolbar', Toolbar)
app.component('Editor', Editor)

// Конфігурація Stagewise toolbar
const stagewiseConfig = {
  plugins: [
    {
      name: 'car-app-plugin',
      description: 'Додає контекст для компонентів автомобільного додатку',
      shortInfoForPrompt: () => {
        const currentRoute = router.currentRoute.value
        const routeInfo = `Поточна сторінка: ${currentRoute.name || currentRoute.path}`
        
        // Додаткова інформація залежно від сторінки
        let contextInfo = routeInfo
        if (currentRoute.name === 'add-car') {
          contextInfo += '\nСторінка додавання нового оголошення про автомобіль'
        } else if (currentRoute.name === 'catalog') {
          contextInfo += '\nКаталог автомобілів з фільтрами та пошуком'
        } else if (currentRoute.name === 'car-details') {
          contextInfo += `\nДетальна сторінка автомобіля ID: ${currentRoute.params.id}`
        }
        
        return contextInfo
      },
      mcp: null,
      actions: [
        {
          name: 'Перейти до каталогу',
          description: 'Швидкий перехід до каталогу автомобілів',
          execute: () => {
            router.push('/catalog')
          },
        },
        {
          name: 'Додати авто',
          description: 'Перейти до форми додавання автомобіля',
          execute: () => {
            router.push('/add-car')
          },
        },
        {
          name: 'Головна сторінка',
          description: 'Повернутися на головну сторінку',
          execute: () => {
            router.push('/')
          },
        },
        {
          name: 'Показати інформацію про додаток',
          description: 'Показує основну інформацію про автомобільний додаток',
          execute: () => {
            window.alert('Car Market App - додаток для продажу автомобілів\nВерсія: 1.0.0\nТехнології: Vue 3, PrimeVue, PrimeFlex')
          },
        },
      ],
    },
  ],
}

// Ініціалізація Stagewise toolbar тільки в режимі розробки
function setupStagewise() {
  if (import.meta.env.DEV) {
    initToolbar(stagewiseConfig)
  }
}

// Монтуємо додаток
app.mount('#app')
document.documentElement.classList.remove('dark')
document.body.classList.remove('dark')

// Викликаємо налаштування Stagewise після монтування
setupStagewise()
