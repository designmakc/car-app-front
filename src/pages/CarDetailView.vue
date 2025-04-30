<!-- 
  CarDetailView компонент
  Базується на:
  - CarDetailCard для відображення детальної інформації
  - ProgressSpinner для стану завантаження
  - Toast для сповіщень
-->
<template>
  <div class="car-detail-view">
    <!-- Індикатор завантаження -->
    <div v-if="loading" class="flex justify-content-center align-items-center h-30rem">
      <ProgressSpinner />
    </div>

    <!-- Помилка -->
    <div v-else-if="error" class="flex flex-column justify-content-center align-items-center h-30rem">
      <i class="pi pi-exclamation-triangle text-6xl text-500 mb-4"></i>
      <h2 class="text-2xl font-bold text-700 mb-2">Помилка завантаження</h2>
      <p class="text-600 mb-4">{{ error }}</p>
      <Button 
        label="Повернутись до каталогу" 
        icon="pi pi-arrow-left" 
        @click="router.push('/catalog')"
      />
    </div>

    <!-- Детальна картка -->
    <CarDetailCard 
      v-else
      v-bind="carData"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CarDetailCard from '@/components/cars/CarDetailCard.vue'
import ProgressSpinner from 'primevue/progressspinner'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

// Ініціалізація
const route = useRoute()
const router = useRouter()
const toast = useToast()

// Стан компонента
const loading = ref(true)
const error = ref(null)
const carData = ref(null)

// Завантаження даних
const fetchCarData = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Тут буде реальний запит до API
    // Зараз використовуємо тестові дані
    carData.value = {
      id: route.params.id,
      brand: 'BMW',
      model: 'X5',
      year: 2023,
      price: 45000,
      mileage: 15,
      gearbox: 'Автомат',
      engine_capacity: 3.0,
      engine_unit: 'л',
      city: 'Київ',
      color: 'Чорний',
      fuel_type: 'Бензин',
      description: 'Новий автомобіль у відмінному стані. Повний пакет опцій. Гарантія дилера.',
      mainImage: 'https://example.com/car1.jpg',
      images: [
        'https://example.com/car2.jpg',
        'https://example.com/car3.jpg',
        'https://example.com/car4.jpg'
      ],
      videoUrl: 'https://example.com/car-video.mp4',
      isNew: true,
      isTop: true,
      sellerName: 'Іван Петренко',
      sellerType: 'private',
      phone: '+380501234567',
      location: 'Київ, вул. Хрещатик, 1',
      specifications: {
        'Тип кузова': 'Позашляховик',
        'Привід': 'Повний',
        'Кількість дверей': '5',
        'Кількість місць': '5',
        'Об\'єм багажника': '650 л',
        'Розгін до 100 км/год': '6.5 с',
        'Максимальна швидкість': '245 км/год'
      },
      history: [
        {
          date: '01.01.2023',
          description: 'Постановка на облік'
        },
        {
          date: '15.03.2023',
          description: 'Прохідження ТО'
        }
      ]
    }
  } catch (err) {
    error.value = 'Не вдалося завантажити дані про автомобіль'
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: error.value,
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

// Завантаження даних при монтажі компонента
onMounted(() => {
  fetchCarData()
})
</script>

<style scoped>
.car-detail-view {
  min-height: calc(100vh - 4rem);
  padding: 2rem 0;
}
</style> 