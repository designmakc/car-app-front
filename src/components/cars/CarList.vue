<!-- 
  CarList компонент
  Базується на:
  - Grid (PrimeFlex) для адаптивної сітки
  - Button з PrimeVue для кнопки "Дивитися всі"
  - ProgressSpinner з PrimeVue для індикатора завантаження
  - Skeleton з PrimeVue для відображення стану завантаження
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
        label="Показати ще авто" 
        icon="pi pi-arrow-down"
        @click="loadMore"
        :loading="loading" 
        strokeWidth="20"
        size="large"
        :pt="{
          root: { class: 'transition-all duration-200' }
        }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import CarCard from './CarCard.vue'
import ProgressSpinner from 'primevue/progressspinner'
import Button from 'primevue/button'
import Skeleton from 'primevue/skeleton'

// Імпортуємо тільки існуючі зображення
import audiImage from '@/assets/cars/audi-a4.jpg'
import bmwImage from '@/assets/cars/bmw-x5.jpg'
import mercedesImage from '@/assets/cars/mercedes-c.jpg'
import toyotaImage from '@/assets/cars/toyota-camry.jpg'

// Демо-дані автомобілів
const demoCarsList = [
  {
    id: 1,
    user_id: 101,
    brand: 'Audi',
    model: 'A4',
    year: 2019,
    gearbox: 'Автомат',
    fuel_type: 'Бензин',
    engine_capacity: 2.0,
    engine_unit: 'л',
    body_type: 'Седан',
    mileage: 45,
    drive_type: 'Передній',
    color: 'Сірий',
    city: 'Київ',
    price: 25999,
    status: 'На майданчику',
    is_top: true,
    link: audiImage,
    created_at: '2023-10-15T12:30:00'
  },
  {
    id: 2,
    user_id: 102,
    brand: 'BMW',
    model: 'X5',
    year: 2020,
    gearbox: 'Автомат',
    fuel_type: 'Дизель',
    engine_capacity: 3.0,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 30,
    drive_type: 'Повний',
    color: 'Чорний',
    city: 'Львів',
    price: 65000,
    status: 'На майданчику',
    is_top: false,
    link: bmwImage,
    created_at: '2023-11-05T15:45:00'
  },
  {
    id: 3,
    user_id: 103,
    brand: 'Mercedes',
    model: 'C-Class',
    year: 2021,
    gearbox: 'Автомат',
    fuel_type: 'Бензин',
    engine_capacity: 2.0,
    engine_unit: 'л',
    body_type: 'Седан',
    mileage: 60,
    drive_type: 'Задній',
    color: 'Сріблястий',
    city: 'Одеса',
    price: 45500,
    status: '',
    is_top: true,
    link: mercedesImage,
    created_at: '2023-12-10T09:15:00'
  },
  {
    id: 4,
    user_id: 104,
    brand: 'Toyota',
    model: 'Camry',
    year: 2018,
    gearbox: 'Автомат',
    fuel_type: 'Гібрид',
    engine_capacity: 2.5,
    engine_unit: 'л',
    body_type: 'Седан',
    mileage: 15,
    drive_type: 'Передній',
    color: 'Білий',
    city: 'Харків',
    price: 28999,
    status: 'На майданчику',
    is_top: false,
    link: toyotaImage,
    created_at: '2023-09-20T18:00:00'
  },
  {
    id: 5,
    user_id: 105,
    brand: 'Audi',
    model: 'Q7',
    year: 2017,
    gearbox: 'Автомат',
    fuel_type: 'Дизель',
    engine_capacity: 3.0,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 55,
    drive_type: 'Повний',
    color: 'Синій',
    city: 'Дніпро',
    price: 32500,
    status: 'На майданчику',
    is_top: true,
    link: audiImage, // Повторно використовуємо існуюче зображення
    created_at: '2023-08-15T10:20:00'
  },
  {
    id: 6,
    user_id: 106,
    brand: 'BMW',
    model: '3 Series',
    year: 2020,
    gearbox: 'Автомат',
    fuel_type: 'Бензин',
    engine_capacity: 2.0,
    engine_unit: 'л',
    body_type: 'Седан',
    mileage: 25,
    drive_type: 'Задній',
    color: 'Чорний',
    city: 'Запоріжжя',
    price: 29999,
    status: 'На майданчику',
    is_top: false,
    link: bmwImage, // Повторно використовуємо існуюче зображення
    created_at: '2023-10-05T14:30:00'
  },
  {
    id: 7,
    user_id: 107,
    brand: 'Mercedes',
    model: 'GLC',
    year: 2019,
    gearbox: 'Автомат',
    fuel_type: 'Дизель',
    engine_capacity: 2.0,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 40,
    drive_type: 'Повний',
    color: 'Білий',
    city: 'Київ',
    price: 33500,
    status: 'На майданчику',
    is_top: true,
    link: mercedesImage, // Повторно використовуємо існуюче зображення
    created_at: '2023-11-20T11:10:00'
  },
  {
    id: 8,
    user_id: 108,
    brand: 'Toyota',
    model: 'RAV4',
    year: 2021,
    gearbox: 'Автомат',
    fuel_type: 'Гібрид',
    engine_capacity: 2.5,
    engine_unit: 'л',
    body_type: 'Кросовер',
    mileage: 10,
    drive_type: 'Повний',
    color: 'Червоний',
    city: 'Одеса',
    price: 31999,
    status: '',
    is_top: false,
    link: toyotaImage, // Повторно використовуємо існуюче зображення
    created_at: '2023-12-01T09:45:00'
  }
]

// Пропси з валідацією
const props = defineProps({
  // Максимальна кількість авто для відображення
  limit: {
    type: Number,
    required: false,
    default: 12,
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
    default: false
  },
  // Функція для отримання даних
  provideCars: {
    type: Function,
    required: false,
    default: null
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
      md: 2,  // ≥768px - дві картки
      lg: 3,  // ≥992px - три картки
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
const page = ref(1)
const hasMoreCars = ref(true)

// Функція для надання демо-даних
const getDemodCars = async (currentPage, itemsPerPage) => {
  // Імітуємо затримку API
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // Вираховуємо початковий та кінцевий індекси
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  
  // Повертаємо частину демо-даних
  return demoCarsList.slice(startIndex, endIndex)
}

// Обчислювані властивості
const displayedCars = computed(() => {
  // Показуємо тільки завантажені машини, а не обрізаємо по page * perPage,
  // оскільки пагінація тепер обробляється кнопкою/скролом
  return cars.value.slice(0, props.limit)
})

// Функція для надання авто в залежності від режиму (демо чи реальні дані)
const actualProvideCarsFn = computed(() => {
  return props.demo || !props.provideCars ? getDemodCars : props.provideCars
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
  if (loading.value || !hasMoreCars.value || cars.value.length >= props.limit) return
  
  loading.value = true
  emit('loading-change', true)
  
  try {
    // Передаємо поточну сторінку та кількість на сторінку
    const newCars = await actualProvideCarsFn.value(page.value, props.perPage)
    
    // Додаємо нові машини до списку
    cars.value = [...cars.value, ...newCars]
    
    // Перевіряємо, чи є ще машини для завантаження
    hasMoreCars.value = newCars.length === props.perPage && cars.value.length < props.limit
    
    // Збільшуємо номер сторінки для наступного запиту
    page.value++
    
    emit('load-more', {
      page: page.value,
      totalItems: cars.value.length,
      hasMore: hasMoreCars.value
    })
  } catch (error) {
    console.error('Помилка завантаження авто:', error)
    hasMoreCars.value = false // Зупиняємо завантаження при помилці
  } finally {
    loading.value = false
    emit('loading-change', false)
  }
}

const loadMore = () => {
  loadCars()
}

// Обробник безкінечного скролу
const handleScroll = () => {
  if (!props.infiniteScroll || loading.value) return
  
  const scrollPosition = window.innerHeight + window.scrollY
  const threshold = document.documentElement.scrollHeight - 200 // Збільшено поріг
  
  if (scrollPosition >= threshold) {
    loadCars()
  }
}

// Життєвий цикл
onMounted(() => {
  loadCars() // Завантажуємо першу порцію
  if (props.infiniteScroll) {
    window.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  if (props.infiniteScroll) {
    window.removeEventListener('scroll', handleScroll)
  }
})
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