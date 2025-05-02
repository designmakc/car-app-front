<!-- Based on: PrimeVue/Layouts -->
<template>
  <div class="home">
    <!-- Головний банер -->
    <section class="hero-section w-full relative">
      <div class="container py-4">
        
            <h1>Купуй та продавай авто безпечно</h1>
         
      </div>
    </section>
    <div class="container">
      <Message 
        severity="info" 
        :closable="true" 
        :variant="simple" 
        icon="pi pi-info-circle" 
        class="mb-4" 
        :pt="{
          text: 'font-normal text-sm md:text-base',
          content: 'gap-2'
        }"
      >
        <span>Шановні користувачі! Наш сайт працює в тестовому режимі. Дякуємо за розуміння.</span>
      </Message>
    </div>

    <!-- Секція з формою пошуку та статистикою -->
    <section class="flex search-stats-section pb-4 ">
      <div class="container">
        <div class="grid ">
          <!-- Форма пошуку -->
          <div class="col-12 md:col-6 lg:col-6 mb-1 md:mb-4 lg:mb-0">
            <div class="surface-card">
              <Tabs value="search">
                <TabList>
                  <Tab value="search" class="col-6 unbounded-font text-xs md:text-sm lg:text-base"> <i class="pi pi-search mr-0 md:mr-2"></i> <span>Пошук авто</span> </Tab>
                  <Tab value="sell" class="col-6 unbounded-font text-xs md:text-sm lg:text-base"> <i class="pi pi-plus-circle mr-0 md:mr-2"></i> <span>Продати авто</span> </Tab>
                </TabList>
                <TabPanels >
                  <TabPanel value="search"> <CarSearchForm /> </TabPanel>
                  <TabPanel value="sell"> <CarSellForm /> </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </div>

          <!-- Статистика -->
          <div class="col-12 md:col-6 lg:col-6 flex flex-column gap-4
          ">
            <div>
              <StatisticsBlock />
            </div>
            <!-- швидкий пошук -->
            <div>
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
        <div class="flex align-items-center justify-content-between mb-2 md:mb-4">
          <div class="flex align-items-center gap-2">
            <i class="pi pi-star-fill text-yellow-500 text-lg md:text-2xl"></i>
            <h2 class="text-lg md:text-2xl font-bold text-900 m-0">TOP пропозиції</h2>
          </div>
          <Button 
            label="Всі" 
            icon="pi pi-arrow-right "
            
            iconPos="right"
            text
            class="text-primary "
          />
        </div>

        <!-- Список TOP автомобілів -->
        <CarList 
          :limit="8" 
          :perPage="8" 
          :infiniteScroll="false"
          :provide-cars="provideCars"
          :grid="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }"
          class="mt-3"
        />
      </div>
    </section>

    <!-- Популярні марки -->
    <section class="popular-brands-section w-full pt-6">
      <div class="container">

        <PopularBrands />
      </div>
    </section>

    <!-- Авто на майданчику -->
    <section class="regular-offers-section w-full pt-6">
      <div class="container">
        <!-- Заголовок секції -->
        <div class="flex align-items-center justify-content-between mb-6">
          <div class="flex align-items-center gap-2">
            <i class="pi pi-car text-primary text-2xl"></i>
            <h2 class="text-xl sm:text-xl md:text-2xl font-bold text-900 m-0">Авто на майданчику</h2>
          </div>
          <!-- Можна додати кнопку "Всі авто", якщо потрібно -->
        </div>

        <!-- Список автомобілів з кнопкою -->
        <CarList 
          :limit="16" 
          :perPage="8" 
          :infiniteScroll="false"
          :provide-cars="provideRegularCars"
          :grid="{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }"
          class="mt-3"
        />
      </div>
    </section>
    
  </div>
</template>

<script setup>
/*
JSON-SCHEMA (topCars, regularCars):
{
  "type": "object",
  "properties": {
    "id": { "type": "number" },
    "title": { "type": "string" },
    "price": { "type": "number" },
    "image": { "type": "string" },
    "mileage": { "type": "number" },
    "transmission": { "type": "string" },
    "engine": { "type": "string" },
    "location": { "type": "string" },
    "publishedAt": { "type": "string" }
  },
  "required": ["id", "title", "price", "image"]
}

DEMO ДАНІ (topCars, regularCars): див. нижче у файлі

ФУНКЦІЯ-ПРОВАЙДЕР (provideCars, provideRegularCars):
// Очікуваний API: GET /api/cars?type=top|regular&page=1&perPage=8
// Response: { data: Car[], total: number }
*/

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
import Message from 'primevue/message'
import PopularBrands from '../components/cars/PopularBrands.vue'
import { demoCars } from '@/data/demo/cars.js'

const activeTab = ref(0)

// Функція для отримання TOP пропозицій
const provideCars = async (page = 1, perPage = 8) => {
  try {
    // Емулюємо затримку мережі
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Фільтруємо тільки TOP пропозиції
    const topCars = demoCars.filter(car => car.is_top === true)
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    
    // Повертаємо дані у потрібному форматі
    return topCars.slice(startIndex, endIndex).map(car => ({
      ...car,
      link: car.images[0]?.url || ''
    }))
  } catch (error) {
    console.error('Error in provideCars:', error)
    return []
  }
}

// Функція для отримання звичайних пропозицій
const provideRegularCars = async (page = 1, perPage = 8) => {
  try {
    // Емулюємо затримку мережі
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Фільтруємо всі автомобілі, які мають статус "На майданчику"
    const regularCars = demoCars.filter(car => car.status === "На майданчику")
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    
    // Повертаємо дані у потрібному форматі
    return regularCars.slice(startIndex, endIndex).map(car => ({
      ...car,
      link: car.images[0]?.url || ''
    }))
  } catch (error) {
    console.error('Error in provideRegularCars:', error)
    return []
  }
}

</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
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

.regular-offers-section {
  background-color: var(--surface-ground);
}
</style> 