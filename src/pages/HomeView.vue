<!-- Based on: PrimeVue/Layouts -->
<template>
  <div class="home">
    <!-- Головний банер -->
    <section class="hero-section w-full relative">
      <div class="container">
        
            <h1 class="text-4xl font-bold text-900">Купуй та продавай авто безпечно</h1>
         
      </div>
    </section>
    <div class="container">
      <Message severity="info" :closable="true" class="mb-4">
        <span>Шановні користувачі! Наш сайт працює в тестовому режимі. Дякуємо за розуміння.</span>
      </Message>
    </div>

    <!-- Секція з формою пошуку та статистикою -->
    <section class="flex search-stats-section w-full pb-4 align-items-stretch">
      <div class="container">
        <div class="grid">
          <!-- Форма пошуку -->
          <div class="col-12 lg:col-6 mb-4 lg:mb-0">
            <div class="surface-card h-full">
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
            <h2 class="text-xl sm:text-xl md:text-2xl font-bold text-900 m-0">TOP пропозиції</h2>
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
          :perPage="4" 
          :infiniteScroll="false" 
          :provide-cars="provideRegularCars"
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
import Message from 'primevue/message';

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

// Функція-провайдер для TOP пропозицій
const provideCars = async (page, perPage) => {
  // Емуляція затримки мережі
  await new Promise(resolve => setTimeout(resolve, 500))
  const start = (page - 1) * perPage
  const end = start + perPage
  return topCars.value.slice(start, end)
}

// Приклади даних для звичайних пропозицій (Авто на майданчику)
const regularCars = ref([
  {
    id: 101,
    title: 'Jeep Grand Cherokee 2020',
    price: 19999,
    image: carDemoImage, 
    mileage: 240,
    transmission: 'Автомат',
    engine: 'Дизель 2.0',
    location: 'Житомир',
    publishedAt: '2024-03-01'
  },
  {
    id: 102,
    title: 'Citroen Berlingo пасс. 2009',
    price: 19999,
    image: carDemoImage, 
    mileage: 240,
    transmission: 'Автомат',
    engine: 'Дизель 2.0',
    location: 'Житомир',
    publishedAt: '2024-03-02'
  },
  {
    id: 103,
    title: 'Dodge Journey 2018',
    price: 12100,
    image: carDemoImage, 
    mileage: 240,
    transmission: 'Автомат',
    engine: 'Дизель 2.0',
    location: 'Житомир',
    publishedAt: '2024-03-03'
  },
  {
    id: 104,
    title: 'Ford Fusion 2010',
    price: 19999,
    image: carDemoImage, 
    mileage: 240,
    transmission: 'Автомат',
    engine: 'Дизель 2.0',
    location: 'Житомир',
    publishedAt: '2024-03-04'
  },
  {
    id: 105,
    title: 'Hyundai Kona 2022',
    price: 19999,
    image: carDemoImage, 
    mileage: 240,
    transmission: 'Автомат',
    engine: 'Дизель 2.0',
    location: 'Житомир',
    publishedAt: '2024-03-05'
  },
  {
    id: 106,
    title: 'Jeep Grand Cherokee 2015',
    price: 23500,
    image: carDemoImage, 
    mileage: 240,
    transmission: 'Автомат',
    engine: 'Дизель 2.0',
    location: 'Житомир',
    publishedAt: '2024-03-06'
  },
  {
    id: 107,
    title: 'Jeep Grand Cherokee 2015',
    price: 23500,
    image: carDemoImage, 
    mileage: 240,
    transmission: 'Автомат',
    engine: 'Дизель 2.0',
    location: 'Житомир',
    publishedAt: '2024-03-07'
  },
  {
    id: 108,
    title: 'Jeep Grand Cherokee 2015',
    price: 23500,
    image: carDemoImage, 
    mileage: 240,
    transmission: 'Автомат',
    engine: 'Дизель 2.0',
    location: 'Житомир',
    publishedAt: '2024-03-08'
  },
   // Можна додати більше автомобілів для демонстрації пагінації
   {
    id: 109,
    title: 'Skoda Octavia 2018',
    price: 17800,
    image: carDemoImage, 
    mileage: 150,
    transmission: 'Механіка',
    engine: 'Бензин 1.8',
    location: 'Київ',
    publishedAt: '2024-03-09'
  },
  {
    id: 110,
    title: 'Renault Megane 2019',
    price: 16500,
    image: carDemoImage, 
    mileage: 120,
    transmission: 'Автомат',
    engine: 'Дизель 1.5',
    location: 'Львів',
    publishedAt: '2024-03-10'
  },
  {
    id: 111,
    title: 'Nissan Qashqai 2017',
    price: 18200,
    image: carDemoImage, 
    mileage: 90,
    transmission: 'Автомат',
    engine: 'Бензин 2.0',
    location: 'Одеса',
    publishedAt: '2024-03-11'
  },
  {
    id: 112,
    title: 'Kia Sportage 2019',
    price: 21000,
    image: carDemoImage, 
    mileage: 80,
    transmission: 'Автомат',
    engine: 'Бензин 2.0',
    location: 'Харків',
    publishedAt: '2024-03-12'
  },
  {
    id: 113,
    title: 'Ford Kuga 2018',
    price: 20500,
    image: carDemoImage, 
    mileage: 110,
    transmission: 'Автомат',
    engine: 'Дизель 2.0',
    location: 'Дніпро',
    publishedAt: '2024-03-13'
  },
  {
    id: 114,
    title: 'Peugeot 3008 2019',
    price: 22300,
    image: carDemoImage, 
    mileage: 75,
    transmission: 'Автомат',
    engine: 'Дизель 1.6',
    location: 'Запоріжжя',
    publishedAt: '2024-03-14'
  },
  {
    id: 115,
    title: 'Mitsubishi Outlander 2017',
    price: 19600,
    image: carDemoImage, 
    mileage: 130,
    transmission: 'Автомат',
    engine: 'Бензин 2.4',
    location: 'Вінниця',
    publishedAt: '2024-03-15'
  },
  {
    id: 116,
    title: 'Subaru Forester 2018',
    price: 24000,
    image: carDemoImage, 
    mileage: 95,
    transmission: 'Автомат',
    engine: 'Бензин 2.5',
    location: 'Полтава',
    publishedAt: '2024-03-16'
  }
])

// Функція-провайдер для звичайних пропозицій
const provideRegularCars = async (page, perPage) => {
  // Емуляція затримки мережі
  await new Promise(resolve => setTimeout(resolve, 500)) 
  const start = (page - 1) * perPage
  const end = start + perPage
  // Важливо: повертаємо тільки частину даних для поточної сторінки
  return regularCars.value.slice(start, end)
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