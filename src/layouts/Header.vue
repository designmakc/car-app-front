<template>
  <div class="surface-0">
    <!-- Верхня панель -->
    <div class="surface-900">
      <div class="container">
        <div class="flex align-items-center justify-content-between py-3">
          <!-- Логотип -->
          <div class="flex align-items-center gap-3">
            
              <img src="../assets/logo-orang2.svg" alt="CarMarket" class="h-2rem lg:h-3rem" @click="$router.push('/')" style="cursor: pointer;"/>
              <span class="text-500 font-base text-sm hidden lg:block">Авторинок<br>без меж ©</span>
          </div>

          <!-- Пошук -->
          <div class="flex-grow-1 mx-5 hidden md:block">
            <FloatLabel variant="in">
            <IconField >
                <InputIcon class="pi pi-search " />
                <AutoComplete
                fluid=true
                class="w-full block"
                v-model="value1"
                :suggestions="items"
                @complete="search"
                optionLabel="label"
                size="normal"
                
                > 
                  <!-- Кастомний шаблон для кожного результату -->
                  <template #option="slotProps">
                    <div class="
                      flex align-items-center gap-2 md:gap-3 
                      w-full 
                      p-2
                      hover:surface-100
                      
                        ">
                      <img 
                        :src="slotProps.option.image" 
                        :alt="`${slotProps.option.label} ${slotProps.option.year}`"
                        class="
                          w-6rem h-6rem md:w-6rem md:h-6rem
                          border-2 border-300
                          border-round
                          object-cover
                          flex-shrink-0
                          transition-transform
                          hover:scale-105
                        "
                      />
                      
                      <div class="
                        flex-grow-1 
                        flex justify-content-between align-items-center 
                        gap-2 md:gap-3
                      ">
                        <div class="flex flex-column gap-1">
                          <span class="
                            font-semibold 
                            text-900 
                            line-height-3
                            text-sm md:text-base
                          ">
                            {{ slotProps.option.label }}
                          </span>
                          <span class="
                            text-xs md:text-sm 
                            text-500
                          ">
                            {{ slotProps.option.year }}
                          </span>
                        </div>

                        <span class="
                          font-bold 
                          text-primary 
                          whitespace-nowrap
                          text-right
                          text-sm md:text-base
                        ">
                          {{ slotProps.option.price }}
                        </span>
                      </div>
                    </div>
                  </template>

                  <!-- Кнопка внизу -->
                  <template #footer>
                    <div class="flex justify-content-center p-2">
                      <Button
                        label="Дивитись всі результати"
                        class="cursor-pointer w-full"
                        @click="goToCatalog"
                        @keyup.enter="goToCatalog"
                        icon="pi pi-angle-double-right"
                        iconPos="right"
                        variant="outlined"
                        
                      />
                    </div>
                  </template>
                </AutoComplete>
            </IconField>
            <label for="Пошук автомобілів">Пошук автомобілів</label>
            </FloatLabel>
          </div>

          <!-- Праве меню -->
          <div class="flex gap-1 md:gap-3 align-items-center">

            <div class="flex gap-4 px-4 ">
            <OverlayBadge
                v-if="favoritesCount > 0"
                :value="favoritesCount"
                severity="danger"
                @click="$router.push('/favorites')"
                class="cursor-pointer">
                <i class="pi pi-heart text-white text-xl lg:text-2xl" />
            </OverlayBadge>
            
            <i v-else 
               @click="$router.push('/favorites')"
               class="pi pi-heart text-white text-xl lg:text-2xl cursor-pointer" />
            
            
            
            <OverlayBadge
              v-if="isAuthenticated"
              value="2"
              severity="danger"
              size="small"
              @click="$router.push('/profile/notifications')"
              class="cursor-pointer hidden sm:block"
            >
              <i class="pi pi-bell text-white text-xl lg:text-2xl" />
            </OverlayBadge>
            </div>
            
            <Button 
                v-if="!isAuthenticated"
                icon="pi pi-user"
                severity="secondary"
                @click="$router.push('/auth')"
                aria-label="Увійти"
                label="Увійти"
                class="px-2 sm:px-3"
                size="normal"
            />
            
            <Button 
                v-else
                icon="pi pi-user"
                severity="info"
                @click="$router.push('/profile')"
                aria-label="Профіль"
                label="Профіль"
                class="px-2 sm:px-3"
                size="normal"
            />
              

            <Button 
                icon="pi pi-plus-circle"  
              severity="success"
              @click="$router.push('/add-car')"
              label="Продати" 
              class="px-2 sm:px-3"
              size="normal" 

            />
          </div>
        </div>
      </div>
    </div>

    <!-- Нижня панель з категоріями -->
    <div class="bg-primary">
      <div class="container">
        <MegaMenu
        class="px-0"
          :model="categories"
          :pt="{
            root: {
              class: 'bg-primary-500 py-1'
            },
            
            itemContent: ({ context }) => ({
              class: [
                {
                  'text-white': !context.active,
                  'hover:text-orange-500': !context.active,
                  'border-noround md:border-round-md': !context.active
                  
                }
              ]
            }),
            
            itemIcon: ({ context }) => ({
              class: [
                {
                  'text-orange-900': !context.active
                }
              ]
            }),
            buttonIcon: {
              class: 'text-white'

            },
            rootList: {
              class: 'surface-900 lg:bg-primary border-none'
            },
            
            button: {
              class: 'bg-transparent'
            },
            
            menuitem: {
              class: 'group' // потрібно для group-hover ефекту
            }
          }"
        >
        
        <template #end>
            
            <Button
            @click="$router.push('/logbook')"
            label="Бортжурнал"
            severity="contrast"
            icon="pi pi-car"
            
            
            />
            
        </template>
        </MegaMenu>

        <!-- <TabMenu 
          :model="categories" 
          class="border-none w-full custom-tab-menu"
        >
          <template #item="{ item, props }">
            <a v-ripple v-bind="props.action" class="flex align-items-center gap-2 px-4 py-3">
              <span :class="{ 'text-white': props.active, 'font-normal': !props.active }">{{ item.label }}</span>
            </a>
          </template>
        </TabMenu> -->
      </div>
    </div>

    <!-- Додаткове меню -->
    <!-- <div class="surface-100">
      <div class="container">
        <ul class="list-none p-0 m-0 flex flex-wrap gap-3 py-2">
          <li v-for="(item, index) in submenuItems" :key="index">
            <Button 
              severity="secondary"
              :class="['p-button-text', {'': item.active}]"
              @click="$router.push(item.to)"
            >
              {{ item.label }}
            </Button>
          </li>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import TabMenu from 'primevue/tabmenu'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Badge from 'primevue/badge'
import { useRouter } from 'vue-router'
import AutoComplete from 'primevue/autocomplete'
import { demoSearchSuggestions } from '@/data/demo/cars'

const router = useRouter()

// Проверка авторизации
const isAuthenticated = ref(false)

const checkAuth = () => {
  isAuthenticated.value = !!localStorage.getItem('isAuthenticated')
}

// Слушаем изменения в localStorage
const handleStorageChange = () => {
  checkAuth()
}

onMounted(() => {
  checkAuth()
  window.addEventListener('storage', handleStorageChange)
})

// Также проверяем при изменении маршрута
watch(() => router.currentRoute.value, () => {
  checkAuth()
})

// Демо-дані
const searchQuery = ref('')
const compareCount = ref(2)
const messageCount = ref(5)

// Додаткове меню
const submenuItems = ref([
  { label: 'Оголошення', to: '/listings', active: true },
  { label: 'Каталог', to: '/catalog' },
  { label: 'Дилери', to: '/dealers' },
  { label: 'Відео', to: '/videos' },
  { label: 'Відгуки', to: '/reviews' },
  { label: 'Бортжурнал', to: '/blog' }
])

const categories = ref([
  {
    label: 'Легкові',
    
    to: '/catalog',
    command: () => router.push('/catalog')
  },
  {
    label: 'Вантажівки',
    
    to: '/commercial',
    command: () => router.push('/commercial')
  },
  {
    label: 'Електро',
    icon: 'pi pi-bolt',
    to: '/electric',
    command: () => router.push('/electric')
  },
  
  {
    label: 'Мото',
    
    to: '/moto',
    command: () => router.push('/moto')
  },
  
  {
    label: 'Кредити',
    icon: 'pi pi-credit-card',
    to: '/credits',
    command: () => router.push('/credits')
  },
  {
    label: 'Оцінка авто',
    icon: 'pi pi-calculator',
    to: '/evaluation',
    command: () => router.push('/evaluation')
  },
  {
    label: 'Страхування',
    icon: 'pi pi-shield',
    to: '/insurance',
    command: () => router.push('/insurance')
  }
  
])

/**
 * Демо-дані для автозаповнення (мають відповідати майбутній API-структурі)
 * @type {Array<{ label: string, value: string }>}
 */
import carDemoImage from '@/assets/cars/car-demo.png'
const demoData = [
  {
    label: 'Toyota Camry',
    value: 'toyota-camry',
    image: carDemoImage,
    year: 2020,
    price: '18 500 $'
  },
  {
    label: 'Volkswagen Passat',
    value: 'vw-passat',
    image: carDemoImage,
    year: 2019,
    price: '15 200 $'
  },
  {
    label: 'Renault Duster',
    value: 'renault-duster',
    image: carDemoImage,
    year: 2021,
    price: '17 500 $'
  },
  {
    label: 'Skoda Octavia',
    value: 'skoda-octavia',
    image: carDemoImage,
    year: 2020,
    price: '16 800 $'
  },
  {
    label: 'Nissan Leaf',
    value: 'nissan-leaf',
    image: carDemoImage,
    year: 2022,
    price: '19 000 $'
  },
  {
    label: 'Tesla Model 3',
    value: 'tesla-model-3',
    image: carDemoImage,
    year: 2021,
    price: '25 000 $'
  }
]

// Значення пошуку
const value1 = ref('')

// Масив підказок для автозаповнення
const items = ref([])

/**
 * Пошук по демо-даним (UI-фільтрація)
 * TODO: Замінити на API-запит
 * GET /api/search/suggestions?query=${event.query}
 */
function search(event) {
  items.value = demoSearchSuggestions.filter(item =>
    item.label.toLowerCase().includes(event.query.toLowerCase())
  )
}

function goToCatalog() {
  router.push('/catalog')
}

// Замість store використовуємо API
const favoritesCount = ref(0)

// Отримання кількості обраних
const getFavoritesCount = async () => {
  try {
    // TODO: API call
    // const response = await fetch('/api/favorites/count')
    // const { count } = await response.json()
    // favoritesCount.value = count
  } catch (error) {
    console.error('Помилка при отриманні кількості обраних:', error)
  }
}

onMounted(getFavoritesCount)
</script>

<style scoped>
.footer-wrapper {
  width: 100%;
  margin: 0;
  padding: 2rem 0 1rem 0;
  background-color: var(--surface-900);
}
</style> 