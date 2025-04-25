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
    <div v-if="loading && !cars.length" class="grid">
      <div v-for="n in skeletonCount" 
           :key="n"
           class="col-12 sm:col-6 lg:col-4 xl:col-3 p-2">
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
    <div v-else class="grid">
      <div v-for="car in displayedCars" 
           :key="car.id"
           class="col-12 sm:col-6 lg:col-4 xl:col-3 p-2 transition-all duration-200">
        <CarCard :car="car" />
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
        label="Дивитися всі авто" 
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
import Skeleton from 'primevue/skeleton' // Імпортуємо Skeleton

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
    required: true
  }
})

// Події
const emit = defineEmits(['load-more', 'loading-change'])

// Стан
const cars = ref([])
const loading = ref(false)
const page = ref(1)
const hasMoreCars = ref(true)

// Обчислювані властивості
const displayedCars = computed(() => {
  // Показуємо тільки завантажені машини, а не обрізаємо по page * perPage,
  // оскільки пагінація тепер обробляється кнопкою/скролом
  return cars.value.slice(0, props.limit)
})

// Кількість скелетонів для відображення
const skeletonCount = computed(() => props.perPage)

// Методи
const loadCars = async () => {
  if (loading.value || !hasMoreCars.value || cars.value.length >= props.limit) return
  
  loading.value = true
  emit('loading-change', true)
  
  try {
    // Передаємо поточну сторінку та кількість на сторінку
    const newCars = await props.provideCars(page.value, props.perPage)
    
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

/* Видаляємо попереднє правило для .spinner-primary, оскільки стиль тепер інлайновий */
/* 
:deep(.spinner-primary .p-progressspinner-circle) {
  stroke: var(--p-primary-color);
}
*/
</style> 