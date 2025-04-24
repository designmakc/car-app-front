<!-- 
  CarList компонент
  Базується на:
  - Grid (PrimeFlex) для адаптивної сітки
  - Button з PrimeVue для кнопки "Дивитися всі"
  - ProgressSpinner з PrimeVue для індикатора завантаження
-->
<template>
  <div class="car-list">
    <!-- Адаптивна сітка з автомобілями -->
    <div class="grid">
      <div v-for="car in displayedCars" 
           :key="car.id"
           class="col-12 sm:col-6 lg:col-4 xl:col-3 p-2 transition-all duration-200">
        <CarCard :car="car" />
      </div>
    </div>

    <!-- Індикатор завантаження -->
    <div v-if="loading" 
         class="flex justify-content-center align-items-center my-4">
      <ProgressSpinner 
        :pt="{ root: { class: 'w-4rem h-4rem' } }"
        strokeWidth="3" 
      />
    </div>

    <!-- Кнопка "Дивитися всі" -->
    <div v-if="!infiniteScroll && hasMoreCars" 
         class="flex justify-content-center my-4">
      <Button
        label="Дивитися всі авто"
        icon="pi pi-arrow-down"
        @click="loadMore"
        :loading="loading"
        severity="primary"
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
  const end = page.value * props.perPage
  return cars.value.slice(0, Math.min(end, props.limit))
})

// Методи
const loadCars = async () => {
  if (loading.value || !hasMoreCars.value) return
  
  loading.value = true
  emit('loading-change', true)
  
  try {
    const newCars = await props.provideCars(page.value, props.perPage)
    
    cars.value = [...cars.value, ...newCars]
    hasMoreCars.value = newCars.length === props.perPage && cars.value.length < props.limit
    page.value++
    
    emit('load-more', {
      page: page.value,
      totalItems: cars.value.length,
      hasMore: hasMoreCars.value
    })
  } catch (error) {
    console.error('Помилка завантаження авто:', error)
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
  if (!props.infiniteScroll) return
  
  const scrollPosition = window.innerHeight + window.scrollY
  const threshold = document.documentElement.scrollHeight - 100
  
  if (scrollPosition >= threshold) {
    loadCars()
  }
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
</script>

<!-- Мінімальні стилі для анімації -->
<style scoped>
.car-list {
  container-type: inline-size;
}
</style> 