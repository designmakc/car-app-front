<!-- Based on: PrimeVue/Layout -->
<template>
  <div class="home-view">
    <!-- Секція пошуку -->
    <section class="search-section w-full">
      <div class="container">
        <TabView class="shadow-2">
          <TabPanel header="Знайти">
            <CarSearchForm />
          </TabPanel>
          <TabPanel header="Продати">
            <CarSellForm />
          </TabPanel>
        </TabView>
      </div>
    </section>

    <!-- Статистика -->
    <section class="stats-section surface-ground w-full">
      <div class="container">
        <CarStats />
      </div>
    </section>

    <!-- TOP пропозиції -->
    <section class="top-offers-section w-full">
      <div class="container">
        <div class="flex justify-content-between align-items-center mb-4">
          <h2 class="text-3xl font-bold m-0">TOP пропозиції</h2>
          <Button label="Всі пропозиції" icon="pi pi-arrow-right" class="p-button-text" />
        </div>
        <CarGrid :cars="topOffers" />
      </div>
    </section>

    <!-- Авто на майданчику -->
    <section class="onsite-cars-section surface-ground w-full">
      <div class="container">
        <div class="flex justify-content-between align-items-center mb-4">
          <h2 class="text-3xl font-bold m-0">Авто на майданчику</h2>
          <Button label="Всі авто на майданчику" icon="pi pi-arrow-right" class="p-button-text" />
        </div>
        <CarGrid :cars="onsiteCars" />
      </div>
    </section>

    <!-- Переваги -->
    <section class="features-section w-full">
      <div class="container">
        <div class="grid">
          <div class="col-12 md:col-4">
            <div class="surface-card p-4 border-round shadow-2 text-center">
              <i class="pi pi-shield text-4xl text-primary mb-3"></i>
              <h3 class="text-xl font-medium mb-2">Безпечні угоди</h3>
              <p class="text-600 line-height-3">
                Всі автомобілі проходять перевірку перед продажем
              </p>
            </div>
          </div>
          <div class="col-12 md:col-4">
            <div class="surface-card p-4 border-round shadow-2 text-center">
              <i class="pi pi-car text-4xl text-primary mb-3"></i>
              <h3 class="text-xl font-medium mb-2">Широкий вибір</h3>
              <p class="text-600 line-height-3">
                Понад 1000 автомобілів з усієї України
              </p>
            </div>
          </div>
          <div class="col-12 md:col-4">
            <div class="surface-card p-4 border-round shadow-2 text-center">
              <i class="pi pi-users text-4xl text-primary mb-3"></i>
              <h3 class="text-xl font-medium mb-2">Перевірені продавці</h3>
              <p class="text-600 line-height-3">
                Всі продавці проходять верифікацію
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Button from 'primevue/button'
import CarSearchForm from '@/components/cars/CarSearchForm.vue'
import CarSellForm from '@/components/cars/CarSellForm.vue'
import CarStats from '@/components/cars/CarStats.vue'
import CarGrid from '@/components/cars/CarGrid.vue'
import Tag from 'primevue/tag'
import Header from '../components/layout/Header.vue'

// Приклад даних для відображення
const topOffers = ref([
  {
    id: 1,
    title: 'Mercedes-Benz C-Class',
    price: '25,000',
    year: '2020',
    mileage: '45,000',
    fuel: 'Бензин',
    location: 'Київ',
    image: '/src/assets/cars/car-demo.png',
    isTop: true,
    isOnSite: true,
    isSold: false
  },
  {
    id: 2,
    title: 'BMW X5',
    price: '35,000',
    year: '2021',
    mileage: '30,000',
    fuel: 'Дизель',
    location: 'Львів',
    image: '/src/assets/cars/car-demo.png',
    isTop: true,
    isOnSite: false,
    isSold: false
  },
  {
    id: 3,
    title: 'Audi Q7',
    price: '40,000',
    year: '2019',
    mileage: '60,000',
    fuel: 'Дизель',
    location: 'Одеса',
    image: '/src/assets/cars/car-demo.png',
    isTop: true,
    isOnSite: true,
    isSold: false
  }
])

const onsiteCars = ref([
  {
    id: 4,
    title: 'Volkswagen Golf',
    price: '15,000',
    year: '2018',
    mileage: '80,000',
    fuel: 'Бензин',
    location: 'Харків',
    image: '/src/assets/cars/car-demo.png',
    isTop: false,
    isOnSite: true,
    isSold: false
  },
  {
    id: 5,
    title: 'Toyota Camry',
    price: '20,000',
    year: '2019',
    mileage: '50,000',
    fuel: 'Бензин',
    location: 'Дніпро',
    image: '/src/assets/cars/car-demo.png',
    isTop: false,
    isOnSite: true,
    isSold: false
  },
  {
    id: 6,
    title: 'Honda CR-V',
    price: '22,000',
    year: '2020',
    mileage: '40,000',
    fuel: 'Бензин',
    location: 'Запоріжжя',
    image: '/src/assets/cars/car-demo.png',
    isTop: false,
    isOnSite: true,
    isSold: false
  }
])
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

section {
  padding: 2rem 0;
}

.surface-ground {
  background-color: var(--surface-ground);
}
</style> 