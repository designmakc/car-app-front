<!-- 
  CarList компонент
  Базується на:
  - Grid (PrimeFlex) для адаптивної сітки
  - CarCard для відображення карточок автомобілів
  - ProgressSpinner (PrimeVue) для індикатора завантаження
  - Button (PrimeVue) для кнопки "Показати ще"
  - Skeleton (PrimeVue) для стану завантаження

  Функціональність:
  - Адаптивна сітка з налаштуванням кількості колонок
  - Безкінечний скрол або кнопка "Показати ще"
  - Стан завантаження зі скелетонами
  - Обмеження кількості карток
  - Підтримка демо-режиму з тестовими даними

  @props {Object} grid - Налаштування сітки для різних розмірів екрану
    @param {Number} xs - Кількість колонок для екранів <576px (default: 1)
    @param {Number} sm - Кількість колонок для екранів ≥576px (default: 2)
    @param {Number} md - Кількість колонок для екранів ≥768px (default: 2)
    @param {Number} lg - Кількість колонок для екранів ≥992px (default: 3)
    @param {Number} xl - Кількість колонок для екранів ≥1200px (default: 4)
  @props {Number} limit - Максимальна кількість авто для відображення (default: 12)
  @props {Number} perPage - Кількість авто для підвантаження за раз (default: 8)
  @props {Boolean} infiniteScroll - Режим безкінечного скролу (default: false)
  @props {Function} provideCars - Функція для отримання даних (optional)
  @props {Boolean} demo - Режим демо з тестовими даними (default: true)

  @emits {Object} load-more - Подія при завантаженні нової порції даних
    @param {Number} page - Номер поточної сторінки
    @param {Number} totalItems - Загальна кількість завантажених елементів
    @param {Boolean} hasMore - Чи є ще елементи для завантаження
  @emits {Boolean} loading-change - Подія зміни стану завантаження

  @example
  <CarList 
    :limit="8" 
    :perPage="4" 
    :infiniteScroll="false"
    :grid="{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }"
    :provide-cars="provideCars"
  />
-->


<template>
  <div class="car-list">
    <!-- Скелетони під час початкового завантаження -->
    <div v-if="loading && !cars.length" class="grid justify-content-start">
      <div v-for="n in skeletonCount" 
           :key="n"
           :class="gridClasses">
        <div class="border-round border-1 surface-border surface-card p-3">
          <Skeleton height="10rem" class="mb-3"></Skeleton>
          <Skeleton width="70%" height="1.5rem" class="mb-2"></Skeleton>
          <Skeleton width="40%" height="1.2rem" class="mb-3"></Skeleton>
          <div class="flex justify-content-between">
            <Skeleton width="4rem" height="1rem"></Skeleton>
            <Skeleton width="4rem" height="1rem"></Skeleton>
          </div>
           <div class="flex justify-content-between mt-2">
            <Skeleton width="4rem" height="1rem"></Skeleton>
            <Skeleton width="4rem" height="1rem"></Skeleton>
          </div>
          <Skeleton width="50%" height="0.8rem" class="mt-3"></Skeleton>
        </div>
      </div>
    </div>

    <!-- Адаптивна сітка з автомобілями (відображається після завантаження) -->
    <div v-else class="grid justify-content-start">
      <div v-for="car in displayedCars" 
           :key="car.id"
           :class="[gridClasses, 'p-2 transition-all duration-200']">
        <CarCard v-bind="car" />
      </div>
    </div>

    <!-- Індикатор завантаження (для наступних сторінок) -->
    <div v-if="loading && cars.length" 
         class="flex justify-content-center align-items-center my-4">
      <ProgressSpinner 
        :pt="{ 
          root: { class: 'w-4rem h-4rem' },
          // Динамічно встановлюємо колір та прозорий фон
          circle: { 
            style: {
              stroke: !infiniteScroll ? 'var(--p-primary-color)' : undefined,
              fill: 'transparent' 
            }
          }
        }"
        strokeWidth="2" 
        animationDuration=".5s" 
        aria-label="Завантаження автомобілів"
      />
    </div>

    <!-- Кнопка "Дивитися всі авто" -->
    <div v-if="!infiniteScroll && hasMoreCars && !loading" 
         class="flex justify-content-center my-4">
      <Button
        label="Показати ще" 
        icon="pi pi-arrow-down"
        @click="loadMore"
        :loading="loading" 
        strokeWidth="20"
        class="w-full surface-200 text-cyan-800 border-none"
        
        size="large"
        :pt="{
          root: { class: 'transition-all duration-200' }
        }"
      />
    </div>
  </div>
</template>

<script setup>
/*
ОЧІКУВАНИЙ API-ФОРМАТ:
GET /api/cars?limit=12&page=1
Response: {
  data: [
    {
      id: number,
      user_id: number,
      brand: string,
      model: string,
      year: number,
      gearbox: string,
      fuel_type: string,
      engine_capacity: number,
      engine_unit: string,
      body_type: string,
      mileage: number,
      drive_type: string,
      color: string,
      city: string,
      price: number,
      status: string,
      is_top: boolean,
      link: string,
      created_at: string
    }
  ],
  total: number
}

JSON-SCHEMA (demoCarsList):
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "id": { "type": "number" },
      "user_id": { "type": "number" },
      "brand": { "type": "string" },
      "model": { "type": "string" },
      "year": { "type": "number" },
      "gearbox": { "type": "string" },
      "fuel_type": { "type": "string" },
      "engine_capacity": { "type": "number" },
      "engine_unit": { "type": "string" },
      "body_type": { "type": "string" },
      "mileage": { "type": "number" },
      "drive_type": { "type": "string" },
      "color": { "type": "string" },
      "city": { "type": "string" },
      "price": { "type": "number" },
      "status": { "type": "string" },
      "is_top": { "type": "boolean" },
      "link": { "type": "string" },
      "created_at": { "type": "string" }
    },
    "required": ["id", "brand", "model", "year", "price"]
  }
}

DEMO ДАНІ (demoCarsList): // Див. нижче у файлі

PROPS:
- limit: number (default: 12)
- perPage: number (default: 8)
- infiniteScroll: boolean (default: false)
- provideCars: function (optional)
- demo: boolean (default: true)
- grid: object (default: { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 })

EMITS:
- (load-more): (page: number, totalItems: number, hasMore: boolean) => void // Подія при завантаженні нової порції даних
- (loading-change): (loading: boolean) => void // Подія зміни стану завантаження
*/

import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import CarCard from './CarCard.vue'
import ProgressSpinner from 'primevue/progressspinner'
import Button from 'primevue/button'
import Skeleton from 'primevue/skeleton'

// Імпортуємо тільки існуючі зображення
import audiImage from '@/assets/cars/audi-a4.jpg'
import bmwImage from '@/assets/cars/bmw-x5.jpg'
import mercedesImage from '@/assets/cars/mercedes-c.jpg'
import toyotaImage from '@/assets/cars/toyota-camry.jpg'

// Пропси з валідацією
const props = defineProps({
  // Максимальна кількість авто для відображення
  limit: {
    type: Number,
    required: false,
    default: 20,
    validator: (value) => value > 0
  },
  // Кількість авто для підвантаження за раз
  perPage: {
    type: Number,
    required: false,
    default: 8,
    validator: (value) => value > 0 && value <= 20
  },
  // Режим підвантаження: безкінечний скрол чи кнопка
  infiniteScroll: {
    type: Boolean,
    required: false,
    default: true
  },
  // Функція для отримання даних
  provideCars: {
    type: Function,
    required: true
  },
  // Режим демо (для відображення демо-даних)
  demo: {
    type: Boolean,
    default: true
  },
  // Кількість карток в ряд для різних розмірів екрану
  grid: {
    type: Object,
    default: () => ({
      xs: 1,  // <576px - одна картка
      sm: 2,  // ≥576px - дві картки
      md: 3,  // ≥768px - три картки
      lg: 4,  // ≥992px - чотири картки
      xl: 4   // ≥1200px - чотири картки
    }),
    validator: (value) => {
      return ['xs', 'sm', 'md', 'lg', 'xl'].every(size => 
        typeof value[size] === 'number' && 
        value[size] > 0 && 
        value[size] <= 12
      );
    }
  }
})

// Події
const emit = defineEmits(['load-more', 'loading-change'])

// Стан
const cars = ref([])
const loading = ref(false)
const currentPage = ref(1)
const hasMoreCars = ref(true)

// Обчислювані властивості
const displayedCars = computed(() => {
  return cars.value
})

// Кількість скелетонів для відображення
const skeletonCount = computed(() => props.perPage)

// Обчислюємо класи для сітки
const gridClasses = computed(() => {
  const { xs, sm, md, lg, xl } = props.grid;
  return `col-${12/xs} sm:col-${12/sm} md:col-${12/md} lg:col-${12/lg} xl:col-${12/xl}`;
});

// Методи
const loadCars = async () => {
  if (loading.value || !hasMoreCars.value) return

  try {
    loading.value = true
    const newCars = await props.provideCars(currentPage.value, props.perPage)
    
    // Перевіряємо, чи є нові автомобілі
    if (newCars && newCars.length > 0) {
      cars.value = [...cars.value, ...newCars]
      currentPage.value++
      hasMoreCars.value = cars.value.length < props.limit
    } else {
      hasMoreCars.value = false
    }
  } catch (error) {
    console.error('Error loading cars:', error)
  } finally {
    loading.value = false
  }
}

const loadMore = () => {
  loadCars()
}

// Обробник скролу
const handleScroll = () => {
  if (!props.infiniteScroll) return

  const scrollHeight = document.documentElement.scrollHeight
  const scrollTop = document.documentElement.scrollTop
  const clientHeight = document.documentElement.clientHeight

  if (scrollTop + clientHeight >= scrollHeight - 100) {
    loadCars()
  }
}

// Скидання списку при зміні фільтрів або сортування
const resetList = () => {
  cars.value = []
  currentPage.value = 1
  hasMoreCars.value = true
  loadCars()
}

// Життєвий цикл
onMounted(() => {
  loadCars()
  if (props.infiniteScroll) {
    window.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  if (props.infiniteScroll) {
    window.removeEventListener('scroll', handleScroll)
  }
})

// Спостерігаємо за змінами пропсів
watch(() => props.provideCars, resetList)
</script>

<!-- Мінімальні стилі для анімації -->
<style scoped>
.car-list {
  container-type: inline-size;
}

.grid {
  margin: -0.5rem; /* Компенсуємо padding карток */
}

:deep(.car-card) {
  height: 100%; /* Щоб всі картки в ряду були однакової висоти */
  transition: transform 0.2s, box-shadow 0.2s;
}

:deep(.car-card:hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Адаптивні відступи */
@media screen and (max-width: 576px) {
  .grid {
    margin: -0.25rem;
  }
  
  .p-2 {
    padding: 0.25rem;
  }
}
</style> 