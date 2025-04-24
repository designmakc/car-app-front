<!-- Based on: PrimeVue/Layouts -->
<template>
  <div class="home">
    <!-- Головний банер -->
    <section class="hero-section w-full relative">
      <div class="container">
        <div class="grid">
          <div class="col-12 mb-4">
            <h1 class="text-4xl font-bold text-900">Купуй та продавай авто безпечно</h1>
          </div>
        </div>
      </div>
    </section>

    <!-- Секція з формою пошуку та статистикою -->
    <section class="search-stats-section w-full pb-4">
      <div class="container">
        <div class="grid">
          <!-- Форма пошуку -->
          <div class="col-12 lg:col-6 mb-4 lg:mb-0">
            <div class="surface-card">
              <Tabs value="search">
                <TabList>
                  <Tab value="search" class=" col-6 " > <i class="pi pi-search mr-2"></i> <span>Пошук авто</span> </Tab>
                  <Tab value="sell" class=" col-6 "> <i class="pi pi-plus-circle mr-2"></i> <span>Продати авто</span> </Tab>
                </TabList>
                <TabPanels >
                  <TabPanel value="search"> <CarSearchForm /> </TabPanel>
                  <TabPanel value="sell"> <CarSellForm /> </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </div>

          <!-- Статистика -->
          <div class="col-12 lg:col-6">
            <div class="surface-card">
              <StatisticsBlock />
            </div>
            <!-- швидкий пошук -->
            <div class="surface-card">
              <QuickFilters />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TOP пропозиції -->
    <section class="top-offers-section w-full">
      <div class="container">
        <!-- Заголовок секції -->
        <div class="flex align-items-center justify-content-between mb-6">
          <div class="flex align-items-center gap-2">
            <i class="pi pi-star-fill text-yellow-500 text-2xl"></i>
            <h2 class="text-3xl font-bold text-900 m-0">TOP пропозиції</h2>
          </div>
          <Button 
            label="Всі пропозиції" 
            icon="pi pi-arrow-right" 
            iconPos="right"
            text
            class="text-primary font-semibold"
          />
        </div>

        <!-- Список TOP автомобілів -->
        <CarList 
          :limit="8" 
          :perPage="8" 
          :infiniteScroll="true"
          :provide-cars="provideCars"
          class="mt-3"
        />
      </div>
    </section>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Button from 'primevue/button'
import CarSearchForm from '@/components/cars/CarSearchForm.vue'
import CarSellForm from '@/components/cars/CarSellForm.vue'
import StatisticsBlock from '../components/cars/StatisticsBlock.vue'
import QuickFilters from '../components/cars/QuickFilters.vue'
import CarList from '../components/cars/CarList.vue'
import CarCard from '../components/cars/CarCard.vue'
import carDemoImage from '@/assets/cars/car-demo.png'

const activeTab = ref(0)

// Приклади даних для TOP пропозицій
const topCars = ref([
  {
    id: 1,
    title: 'Audi A4 2020',
    price: 25999,
    image: carDemoImage,
    mileage: 45,
    transmission: 'Автомат',
    engine: 'Дизель 2.0',
    location: 'Київ',
    publishedAt: '2024-03-15'
  },
  {
    id: 2,
    title: 'BMW X5 2021',
    price: 65000,
    image: carDemoImage,
    mileage: 30,
    transmission: 'Автомат',
    engine: 'Бензин 3.0',
    location: 'Львів',
    publishedAt: '2024-03-14'
  },
  {
    id: 3,
    title: 'Mercedes-Benz E-Class 2019',
    price: 45500,
    image: carDemoImage,
    mileage: 60,
    transmission: 'Автомат',
    engine: 'Дизель 2.0',
    location: 'Одеса',
    publishedAt: '2024-03-13'
  },
  {
    id: 4,
    title: 'Volkswagen Golf 2022',
    price: 28999,
    image: carDemoImage,
    mileage: 15,
    transmission: 'Механіка',
    engine: 'Бензин 1.4',
    location: 'Харків',
    publishedAt: '2024-03-12'
  },
  {
    id: 5,
    title: 'Toyota Camry 2021',
    price: 32500,
    image: carDemoImage,
    mileage: 25,
    transmission: 'Автомат',
    engine: 'Гібрид 2.5',
    location: 'Дніпро',
    publishedAt: '2024-03-11'
  },
  {
    id: 6,
    title: 'Honda CR-V 2020',
    price: 29999,
    image: carDemoImage,
    mileage: 40,
    transmission: 'Автомат',
    engine: 'Бензин 2.0',
    location: 'Запоріжжя',
    publishedAt: '2024-03-10'
  },
  {
    id: 7,
    title: 'Hyundai Tucson 2022',
    price: 33500,
    image: carDemoImage,
    mileage: 20,
    transmission: 'Автомат',
    engine: 'Дизель 1.6',
    location: 'Вінниця',
    publishedAt: '2024-03-09'
  },
  {
    id: 8,
    title: 'Mazda CX-5 2021',
    price: 31999,
    image: carDemoImage,
    mileage: 35,
    transmission: 'Автомат',
    engine: 'Бензин 2.5',
    location: 'Полтава',
    publishedAt: '2024-03-08'
  }
])

// Передаємо дані в CarList через проп
const provideCars = (page, perPage) => {
  const start = (page - 1) * perPage
  const end = start + perPage
  return Promise.resolve(topCars.value.slice(start, end))
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}


.search-stats-section {
  margin-top: -2rem;
  position: relative;
  z-index: 1;
}

@media screen and (max-width: 576px) {

  
}

/* Стилі для Tabs */

/* Стилі Табів*/

.p-tabs {
  border-radius: 8px !important;
}

.p-tab {
  background-color: var(--p-surface-500) !important;
  color: var(--p-surface-200) !important;
  border-radius: 8px 8px 0 0 !important;
  
  }

.p-tabpanels {
  background-color: var(--p-surface-900) !important;
  border-radius: 0 0 8px 8px !important;
}

.p-tab-active {
  background-color: var(--p-surface-900) !important;
  color: var(--p-surface-0) !important;
  border-radius: 8px 8px 0 0 !important;

}

</style> 