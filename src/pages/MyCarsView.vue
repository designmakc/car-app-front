<template>
  <MainLayout>
    <div class="my-cars-page pt-4">
      <!-- Хлебные крошки (десктоп) -->
      <div class="hidden md:flex align-items-center mb-3">
        <Button 
          icon="pi pi-arrow-left" 
          text 
          size="small"
          class="text-primary mr-2"
          @click="goToProfile"
        />
        <span class="text-600 text-sm">Профіль / Мої автомобілі</span>
      </div>

      <!-- Мобильный хедер -->
      <div class="mobile-header md:hidden">
        <Button 
          icon="pi pi-arrow-left" 
          text 
          class="text-white"
          @click="goToProfile"
        />
        <h1 class="text-xl font-semibold text-white m-0">Мої автомобілі</h1>
        <Button 
          icon="pi pi-plus" 
          text 
          class="text-white"
          @click="addNewCar"
        />
      </div>

      <!-- Десктопный заголовок -->
      <div class="hidden md:flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="text-2xl font-bold text-900 m-0">Мої автомобілі</h1>
          <p class="text-600 mt-1 mb-0">Керуйте своїми оголошеннями</p>
        </div>
        <Button
          label="Продати авто"
          icon="pi pi-plus"
          @click="addNewCar"
        />
      </div>

      <!-- Фильтры -->
      <div class="mb-4">
        <div class="flex gap-2 overflow-x-auto pb-2">
          <Button
            :label="`Всі ${totalCars}`"
            :severity="activeFilter === 'all' ? 'primary' : 'secondary'"
            :outlined="activeFilter !== 'all'"
            size="small"
            @click="setFilter('all')"
          />
          <Button
            :label="`Онлайн ${onlineCars}`"
            :severity="activeFilter === 'online' ? 'primary' : 'secondary'"
            :outlined="activeFilter !== 'online'"
            size="small"
            @click="setFilter('online')"
          />
          <Button
            :label="`На майданчику ${parkingCars}`"
            :severity="activeFilter === 'parking' ? 'primary' : 'secondary'"
            :outlined="activeFilter !== 'parking'"
            size="small"
            @click="setFilter('parking')"
          />
        </div>
      </div>

      <!-- Список автомобилей -->
      <div class="cars-content">
        <!-- На майданчику -->
        <div v-if="activeFilter === 'all' || activeFilter === 'parking'" class="mb-5">
          <h3 v-if="activeFilter === 'all'" class="text-lg font-semibold text-900 mb-3">На майданчику</h3>
          
          <div class="grid">
            <div 
              v-for="car in filteredParkingCars" 
              :key="car.id" 
              class="col-12 md:col-6 lg:col-4"
            >
              <Card class="car-card h-full">
                <template #content>
                  <div class="flex md:flex-column gap-3">
                    <img :src="car.image" :alt="car.title" class="car-image flex-shrink-0 md:w-full" />
                    <div class="flex-1">
                      <h4 class="text-lg font-semibold text-900 mb-2">{{ car.title }}</h4>
                      <p class="text-xl font-bold text-primary mb-3">{{ car.price }}</p>
                      <div class="flex justify-content-between align-items-center mb-3">
                        <Tag :value="car.status" severity="info" />
                        <div class="flex gap-3">
                          <span class="flex align-items-center gap-1 text-sm text-600">
                            <i class="pi pi-heart"></i>
                            {{ car.likes }}
                          </span>
                          <span class="flex align-items-center gap-1 text-sm text-600">
                            <i class="pi pi-eye"></i>
                            {{ car.views }}
                          </span>
                        </div>
                      </div>
                      <div class="flex gap-2">
                        <Button 
                          label="Редагувати" 
                          size="small" 
                          outlined 
                          class="flex-1"
                          @click="editCar(car.id)"
                        />
                        <Button 
                          icon="pi pi-ellipsis-v" 
                          size="small" 
                          text
                          @click="showCarMenu(car.id)"
                        />
                      </div>
                    </div>
                  </div>
                </template>
              </Card>
            </div>
          </div>
        </div>

        <!-- Тимчасово вихала -->
        <div v-if="activeFilter === 'all'" class="mb-5">
          <h3 class="text-lg font-semibold text-900 mb-3">Тимчасово вихала</h3>
          
          <div class="grid">
            <div 
              v-for="car in temporaryOfflineCars" 
              :key="car.id" 
              class="col-12 md:col-6 lg:col-4"
            >
              <Card class="car-card h-full">
                <template #content>
                  <div class="flex md:flex-column gap-3">
                    <img :src="car.image" :alt="car.title" class="car-image flex-shrink-0 md:w-full" />
                    <div class="flex-1">
                      <h4 class="text-lg font-semibold text-900 mb-2">{{ car.title }}</h4>
                      <p class="text-xl font-bold text-primary mb-3">{{ car.price }}</p>
                      <div class="flex justify-content-between align-items-center mb-3">
                        <Tag :value="car.status" severity="warning" />
                        <div class="flex gap-3">
                          <span class="flex align-items-center gap-1 text-sm text-600">
                            <i class="pi pi-heart"></i>
                            {{ car.likes }}
                          </span>
                          <span class="flex align-items-center gap-1 text-sm text-600">
                            <i class="pi pi-eye"></i>
                            {{ car.views }}
                          </span>
                        </div>
                      </div>
                      <div class="flex gap-2">
                        <Button 
                          label="Редагувати" 
                          size="small" 
                          outlined 
                          class="flex-1"
                          @click="editCar(car.id)"
                        />
                        <Button 
                          icon="pi pi-ellipsis-v" 
                          size="small" 
                          text
                          @click="showCarMenu(car.id)"
                        />
                      </div>
                    </div>
                  </div>
                </template>
              </Card>
            </div>
          </div>
        </div>

        <!-- Онлайн -->
        <div v-if="activeFilter === 'all' || activeFilter === 'online'" class="mb-5">
          <h3 v-if="activeFilter === 'all'" class="text-lg font-semibold text-900 mb-3">Онлайн</h3>
          
          <div class="grid">
            <div 
              v-for="car in filteredOnlineCars" 
              :key="car.id" 
              class="col-12 md:col-6 lg:col-4"
            >
              <Card class="car-card h-full">
                <template #content>
                  <div class="flex md:flex-column gap-3">
                    <img :src="car.image" :alt="car.title" class="car-image flex-shrink-0 md:w-full" />
                    <div class="flex-1">
                      <h4 class="text-lg font-semibold text-900 mb-2">{{ car.title }}</h4>
                      <p class="text-xl font-bold text-primary mb-3">{{ car.price }}</p>
                      <div class="flex justify-content-between align-items-center mb-3">
                        <Tag :value="car.status" severity="success" />
                        <div class="flex gap-3">
                          <span class="flex align-items-center gap-1 text-sm text-600">
                            <i class="pi pi-heart"></i>
                            {{ car.likes }}
                          </span>
                          <span class="flex align-items-center gap-1 text-sm text-600">
                            <i class="pi pi-eye"></i>
                            {{ car.views }}
                          </span>
                        </div>
                      </div>
                      <div class="flex gap-2">
                        <Button 
                          label="Редагувати" 
                          size="small" 
                          outlined 
                          class="flex-1"
                          @click="editCar(car.id)"
                        />
                        <Button 
                          icon="pi pi-ellipsis-v" 
                          size="small" 
                          text
                          @click="showCarMenu(car.id)"
                        />
                      </div>
                    </div>
                  </div>
                </template>
              </Card>
            </div>
          </div>
        </div>

        <!-- Продано -->
        <div v-if="activeFilter === 'all'" class="mb-5">
          <h3 class="text-lg font-semibold text-900 mb-3">Продано</h3>
          
          <div class="grid">
            <div 
              v-for="car in soldCars" 
              :key="car.id" 
              class="col-12 md:col-6 lg:col-4"
            >
              <Card class="car-card h-full opacity-70">
                <template #content>
                  <div class="flex md:flex-column gap-3">
                    <img :src="car.image" :alt="car.title" class="car-image flex-shrink-0 md:w-full" />
                    <div class="flex-1">
                      <h4 class="text-lg font-semibold text-900 mb-2">{{ car.title }}</h4>
                      <p class="text-xl font-bold text-primary mb-3">{{ car.price }}</p>
                      <div class="flex justify-content-between align-items-center mb-3">
                        <Tag :value="car.status" severity="secondary" />
                        <div class="flex gap-3">
                          <span class="flex align-items-center gap-1 text-sm text-600">
                            <i class="pi pi-heart"></i>
                            {{ car.likes }}
                          </span>
                          <span class="flex align-items-center gap-1 text-sm text-600">
                            <i class="pi pi-eye"></i>
                            {{ car.views }}
                          </span>
                        </div>
                      </div>
                      <Button 
                        label="Архівовано" 
                        size="small" 
                        severity="secondary"
                        outlined
                        disabled
                        class="w-full"
                      />
                    </div>
                  </div>
                </template>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <!-- Кнопка добавления (мобильная) -->
      <div class="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-top-1 surface-border">
        <Button 
          label="Продати авто" 
          icon="pi pi-plus"
          class="w-full"
          @click="addNewCar"
        />
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import MainLayout from '@/layouts/Mainlayout.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

const router = useRouter()
const toast = useToast()

// Реактивные данные
const activeFilter = ref('all')

// Тестовые данные
const cars = ref([
  {
    id: 1,
    title: 'Volkswagen Golf Plus 2009',
    price: '19 999$',
    image: 'https://via.placeholder.com/300x200/007bff/ffffff?text=VW+Golf',
    status: 'На майданчику',
    category: 'parking',
    likes: 2,
    views: 24
  },
  {
    id: 2,
    title: 'Ford Fusion 2016',
    price: '19 999$',
    image: 'https://via.placeholder.com/300x200/28a745/ffffff?text=Ford',
    status: 'Тимчасово вихала',
    category: 'temporary-offline',
    likes: 2,
    views: 24
  },
  {
    id: 3,
    title: 'Volkswagen Golf Plus 2009',
    price: '19 999$',
    image: 'https://via.placeholder.com/300x200/dc3545/ffffff?text=VW+Golf',
    status: 'Онлайн',
    category: 'online',
    likes: 2,
    views: 24
  },
  {
    id: 4,
    title: 'Volkswagen Tiguan 2009',
    price: '19 999$',
    image: 'https://via.placeholder.com/300x200/6c757d/ffffff?text=VW+Tiguan',
    status: 'Продано',
    category: 'sold',
    likes: 2,
    views: 24
  },
  {
    id: 5,
    title: 'Citroen Nemo 2008',
    price: '19 999$',
    image: 'https://via.placeholder.com/300x200/ffc107/ffffff?text=Citroen',
    status: 'На майданчику',
    category: 'parking',
    likes: 2,
    views: 24
  },
  {
    id: 6,
    title: 'Volkswagen Tiguan 2009',
    price: '19 999$',
    image: 'https://via.placeholder.com/300x200/17a2b8/ffffff?text=VW+Tiguan',
    status: 'Продано',
    category: 'sold',
    likes: 2,
    views: 24
  },
  {
    id: 7,
    title: 'Citroen Nemo 2008',
    price: '19 999$',
    image: 'https://via.placeholder.com/300x200/6f42c1/ffffff?text=Citroen',
    status: 'Онлайн',
    category: 'online',
    likes: 2,
    views: 24
  },
  {
    id: 8,
    title: 'Citroen Nemo 2008',
    price: '19 999$',
    image: 'https://via.placeholder.com/300x200/e83e8c/ffffff?text=Citroen',
    status: 'На майданчику',
    category: 'parking',
    likes: 2,
    views: 24
  }
])

// Вычисляемые свойства
const totalCars = computed(() => cars.value.length)
const onlineCars = computed(() => cars.value.filter(car => car.category === 'online').length)
const parkingCars = computed(() => cars.value.filter(car => car.category === 'parking').length)

const filteredParkingCars = computed(() => {
  return cars.value.filter(car => car.category === 'parking')
})

const temporaryOfflineCars = computed(() => {
  return cars.value.filter(car => car.category === 'temporary-offline')
})

const filteredOnlineCars = computed(() => {
  return cars.value.filter(car => car.category === 'online')
})

const soldCars = computed(() => {
  return cars.value.filter(car => car.category === 'sold')
})

// Методы
const goToProfile = () => {
  router.push('/profile')
}

const setFilter = (filter) => {
  activeFilter.value = filter
}

const editCar = (carId) => {
  toast.add({
    severity: 'info',
    summary: 'В розробці',
    detail: `Редагування автомобіля #${carId}`,
    life: 3000
  })
}

const showCarMenu = (carId) => {
  toast.add({
    severity: 'info',
    summary: 'Меню',
    detail: `Додаткові дії для автомобіля #${carId}`,
    life: 3000
  })
}

const addNewCar = () => {
  router.push('/add-car')
}
</script>

<style scoped>
.my-cars-page {
  min-height: 100vh;
  padding-bottom: 6rem;
}

.mobile-header {
  background: linear-gradient(135deg, var(--primary-color) 0%, #f7931e 100%);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0 0 1.5rem 1.5rem;
  margin: -1rem -1rem 1.5rem -1rem;
}

.car-image {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: var(--border-radius);
}

.car-card {
  transition: all 0.2s ease;
}

.car-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-3);
}

/* Адаптивность */
@media (max-width: 768px) {
  .my-cars-page {
    padding: 0 0 6rem 0;
  }
  
  .car-image {
    width: 80px;
    height: 60px;
  }
}

@media (min-width: 768px) {
  .my-cars-page {
    padding-bottom: 2rem;
  }
  
  .car-image {
    width: 100%;
    height: 200px;
  }
}
</style> 