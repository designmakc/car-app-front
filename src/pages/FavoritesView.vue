<template>
  <MainLayout>
    <div class="favorites-page pt-4">
      <ProfileBreadcrumb 
        title="Обране" 
        subtitle="Ваші збережені автомобілі"
        breadcrumb-text="Профіль / Обране"
      >
        <template #mobile-action>
          <Button 
            icon="pi pi-filter" 
            text 
            class="text-white"
            @click="toggleFilters"
          />
        </template>
        <template #desktop-action>
          <div class="flex gap-2">
            <Button
              label="Фільтри"
              severity="secondary"
              outlined
              icon="pi pi-filter"
              @click="toggleFilters"
            />
            <Button
              label="Очистити все"
              severity="danger"
              outlined
              icon="pi pi-trash"
              @click="clearAllFavorites"
            />
          </div>
        </template>
      </ProfileBreadcrumb>

      <!-- Фильтры -->
      <div v-if="showFilters" class="mb-4">
        <Card>
          <template #content>
            <div class="grid">
              <div class="col-12 md:col-3">
                <label class="block text-sm font-medium text-900 mb-2">Марка</label>
                <Dropdown
                  v-model="filters.brand"
                  :options="brandOptions"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Всі марки"
                  class="w-full"
                  @change="applyFilters"
                />
              </div>
              
              <div class="col-12 md:col-3">
                <label class="block text-sm font-medium text-900 mb-2">Ціна від</label>
                <InputNumber
                  v-model="filters.priceFrom"
                  placeholder="0"
                  class="w-full"
                  @input="applyFilters"
                />
              </div>
              
              <div class="col-12 md:col-3">
                <label class="block text-sm font-medium text-900 mb-2">Ціна до</label>
                <InputNumber
                  v-model="filters.priceTo"
                  placeholder="Без обмежень"
                  class="w-full"
                  @input="applyFilters"
                />
              </div>
              
              <div class="col-12 md:col-3">
                <label class="block text-sm font-medium text-900 mb-2">Рік від</label>
                <InputNumber
                  v-model="filters.yearFrom"
                  placeholder="Будь-який"
                  class="w-full"
                  @input="applyFilters"
                />
              </div>
            </div>
            
            <div class="flex justify-content-end mt-3">
              <Button
                label="Скинути фільтри"
                severity="secondary"
                outlined
                size="small"
                @click="resetFilters"
              />
            </div>
          </template>
        </Card>
      </div>

      <!-- Список избранных автомобилей -->
      <div class="favorites-content">
        <div v-if="filteredFavorites.length === 0" class="text-center py-8">
          <i class="pi pi-heart text-6xl text-400 mb-4"></i>
          <h3 class="text-xl font-semibold text-600 mb-2">Немає обраних автомобілів</h3>
          <p class="text-600 mb-4">Додайте автомобілі в обране, щоб вони з'явилися тут</p>
          <Button
            label="Перейти до каталогу"
            @click="goToCatalog"
          />
        </div>

        <div v-else class="grid">
          <div 
            v-for="car in filteredFavorites" 
            :key="car.id" 
            class="col-12 md:col-6 lg:col-4"
          >
            <Card class="car-card h-full cursor-pointer transition-all transition-duration-200 hover:shadow-3">
              <template #content>
                <div class="relative">
                  <!-- Кнопка удаления из избранного -->
                  <Button
                    icon="pi pi-heart-fill"
                    class="absolute top-0 right-0 m-2 z-1 bg-white text-red-500 border-circle"
                    size="small"
                    @click.stop="removeFromFavorites(car.id)"
                  />
                  
                  <img 
                    :src="car.image" 
                    :alt="car.title" 
                    class="w-full h-12rem object-cover border-round mb-3 cursor-pointer"
                    @click="goToCarDetails(car.id)"
                  />
                  
                  <div @click="goToCarDetails(car.id)">
                    <h4 class="text-lg font-semibold text-900 mb-2">{{ car.title }}</h4>
                    <p class="text-xl font-bold text-primary mb-3">${{ car.price.toLocaleString() }}</p>
                    
                    <div class="flex justify-content-between align-items-center mb-3">
                      <div class="flex flex-column gap-1">
                        <span class="text-sm text-600">{{ car.year }} • {{ car.mileage }} км</span>
                        <span class="text-sm text-600">{{ car.location }}</span>
                      </div>
                      <Tag 
                        :value="car.condition" 
                        :severity="car.condition === 'Новий' ? 'success' : 'info'"
                      />
                    </div>
                    
                    <div class="flex justify-content-between align-items-center">
                      <small class="text-600">Додано: {{ formatDate(car.addedToFavorites) }}</small>
                      <div class="flex gap-3">
                        <span class="flex align-items-center gap-1 text-sm text-600">
                          <i class="pi pi-eye"></i>
                          {{ car.views }}
                        </span>
                        <span class="flex align-items-center gap-1 text-sm text-600">
                          <i class="pi pi-phone"></i>
                          {{ car.calls }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import MainLayout from '@/layouts/Mainlayout.vue'
import ProfileBreadcrumb from '@/components/ProfileBreadcrumb.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'

const router = useRouter()
const toast = useToast()

// Реактивные данные
const showFilters = ref(false)

// Фильтры
const filters = ref({
  brand: null,
  priceFrom: null,
  priceTo: null,
  yearFrom: null
})

// Опции для фильтров
const brandOptions = ref([
  { label: 'Всі марки', value: null },
  { label: 'Volkswagen', value: 'volkswagen' },
  { label: 'Ford', value: 'ford' },
  { label: 'BMW', value: 'bmw' },
  { label: 'Mercedes-Benz', value: 'mercedes' },
  { label: 'Audi', value: 'audi' },
  { label: 'Toyota', value: 'toyota' }
])

// Тестовые данные избранных автомобилей
const favorites = ref([
  {
    id: 1,
    title: 'Volkswagen Golf Plus 2009',
    price: 19999,
    year: 2009,
    mileage: 150000,
    location: 'Київ',
    condition: 'Вживаний',
    brand: 'volkswagen',
    image: 'https://via.placeholder.com/300x200/007bff/ffffff?text=VW+Golf',
    views: 245,
    calls: 12,
    addedToFavorites: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) // 2 дня назад
  },
  {
    id: 2,
    title: 'Ford Fusion 2016',
    price: 25999,
    year: 2016,
    mileage: 89000,
    location: 'Львів',
    condition: 'Вживаний',
    brand: 'ford',
    image: 'https://via.placeholder.com/300x200/28a745/ffffff?text=Ford+Fusion',
    views: 189,
    calls: 8,
    addedToFavorites: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) // 5 дней назад
  },
  {
    id: 3,
    title: 'BMW X5 2018',
    price: 45999,
    year: 2018,
    mileage: 65000,
    location: 'Одеса',
    condition: 'Вживаний',
    brand: 'bmw',
    image: 'https://via.placeholder.com/300x200/dc3545/ffffff?text=BMW+X5',
    views: 567,
    calls: 23,
    addedToFavorites: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 день назад
  },
  {
    id: 4,
    title: 'Mercedes-Benz C-Class 2020',
    price: 52999,
    year: 2020,
    mileage: 35000,
    location: 'Харків',
    condition: 'Новий',
    brand: 'mercedes',
    image: 'https://via.placeholder.com/300x200/6c757d/ffffff?text=Mercedes',
    views: 423,
    calls: 19,
    addedToFavorites: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) // 7 дней назад
  }
])

// Вычисляемые свойства
const filteredFavorites = computed(() => {
  let filtered = [...favorites.value]
  
  if (filters.value.brand) {
    filtered = filtered.filter(car => car.brand === filters.value.brand)
  }
  
  if (filters.value.priceFrom) {
    filtered = filtered.filter(car => car.price >= filters.value.priceFrom)
  }
  
  if (filters.value.priceTo) {
    filtered = filtered.filter(car => car.price <= filters.value.priceTo)
  }
  
  if (filters.value.yearFrom) {
    filtered = filtered.filter(car => car.year >= filters.value.yearFrom)
  }
  
  return filtered
})

// Методы
const goToCatalog = () => {
  router.push('/catalog')
}

const goToCarDetails = (carId) => {
  router.push(`/car/${carId}`)
}

const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

const applyFilters = () => {
  // Фильтры применяются автоматически через computed
}

const resetFilters = () => {
  filters.value = {
    brand: null,
    priceFrom: null,
    priceTo: null,
    yearFrom: null
  }
  
  toast.add({
    severity: 'info',
    summary: 'Фільтри скинуті',
    detail: 'Всі фільтри очищені',
    life: 2000
  })
}

const removeFromFavorites = (carId) => {
  const carIndex = favorites.value.findIndex(car => car.id === carId)
  if (carIndex !== -1) {
    const car = favorites.value[carIndex]
    favorites.value.splice(carIndex, 1)
    
    toast.add({
      severity: 'success',
      summary: 'Видалено з обраного',
      detail: `${car.title} видалено з обраного`,
      life: 3000
    })
  }
}

const clearAllFavorites = () => {
  if (favorites.value.length === 0) return
  
  favorites.value = []
  
  toast.add({
    severity: 'info',
    summary: 'Обране очищено',
    detail: 'Всі автомобілі видалені з обраного',
    life: 3000
  })
}

const formatDate = (date) => {
  const now = new Date()
  const diff = now - date
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) {
    return 'Сьогодні'
  } else if (days === 1) {
    return 'Вчора'
  } else if (days < 7) {
    return `${days} дн тому`
  } else {
    return date.toLocaleDateString('uk-UA')
  }
}

onMounted(() => {
  // Проверяем авторизацию
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  if (!isAuthenticated) {
    router.push('/auth')
  }
})
</script>

<style scoped>
.favorites-page {
  min-height: 100vh;
}



.car-card {
  transition: all 0.2s ease;
}

.car-card:hover {
  transform: translateY(-2px);
}

/* Адаптивность */
@media (max-width: 768px) {
  .favorites-page {
    padding: 0;
  }
}
</style> 