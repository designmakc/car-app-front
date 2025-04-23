<!-- Based on: PrimeVue/Layout -->
<template>
  <div class="home-view">
    <!-- Секція пошуку -->
    <section class="search-section py-4">
      <div class="container">
        <TabView>
          <TabPanel header="Знайти">
            <CarSearchForm />
          </TabPanel>
          <TabPanel header="Продати">
            <CarSellForm />
          </TabPanel>
        </TabView>
      </div>
    </section>
    <p class="text-xl line-height-3 text-700">
        Це головна сторінка нашого додатку. Для перегляду всіх компонентів та стилів, перейдіть на сторінку 
        <router-link to="/design-system" class="text-primary font-medium no-underline hover:text-primary-600 transition-colors transition-duration-150">Дизайн система</router-link>
      </p>
    <!-- Статистика -->
    <section class="stats-section surface-ground py-4 w-full">
      <div class="container">
        <CarStats />
      </div>
    </section>

    <!-- TOP пропозиції -->
    <section class="top-offers-section py-4">
      <div class="container">
        <h2 class="text-3xl mb-4">TOP пропозиції</h2>
        <CarGrid :cars="topOffers" />
      </div>
    </section>

    <!-- Авто на майданчику -->
    <section class="onsite-cars-section surface-ground py-4 w-full">
      <div class="container">
        <h2 class="text-3xl mb-4">Авто на майданчику</h2>
        <CarGrid :cars="onsiteCars" />
        <div class="text-center mt-4">
          <Button label="Дивитися всі авто на майданчику" class="p-button-link" />
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

// Приклад даних для відображення
const topOffers = ref([
  {
    id: 1,
    title: 'Jeep Grand Cherokee 2020',
    price: '19 999$',
    mileage: '240 тис. км',
    fuel: 'Дизель',
    location: 'Дніпро',
    image: '/cars/jeep-grand-cherokee.jpg',
    isTop: true
  },
  // Додайте більше автомобілів...
])

const onsiteCars = ref([
  {
    id: 2,
    title: 'BMW X5 2014',
    price: '19 999$',
    mileage: '240 тис. км',
    fuel: 'Дизель',
    location: 'Дніпро',
    image: '/cars/bmw-x5.jpg',
    isOnSite: true
  },
  // Додайте більше автомобілів...
])
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  background: var(--surface-ground);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style> 