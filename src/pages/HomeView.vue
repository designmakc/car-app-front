<!-- Based on: PrimeVue/Layout -->
<template>
  <div class="home">
    <!-- Головний банер -->
    <section class="hero-section w-full relative">
      <div class="container">
        <div class="grid">
          <div class="col-12">
            <h1 class="text-4xl font-bold mb-3 text-900">Знайдіть своє ідеальне авто</h1>
            <p class="text-xl text-700 line-height-3 mb-4">
              Найбільший вибір автомобілів в Україні з перевіреною історією
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Секція з формою пошуку та статистикою -->
    <section class="search-stats-section w-full">
      <div class="container">
        <div class="grid">
          <!-- Форма пошуку -->
          <div class="col-12 lg:col-6 mb-4 lg:mb-0">
            <div class="surface-card border-round shadow-2">
              <Tabs value="search" >
                <TabList>
                  <Tab value="search" class=" col-6 " > <i class="pi pi-search mr-2"></i> <span>Пошук авто</span> </Tab>
                  <Tab value="sell" class=" col-6 "> <i class="pi pi-plus-circle mr-2"></i> <span>Продати авто</span> </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel value="search"> <CarSearchForm /> </TabPanel>
                  <TabPanel value="sell"> <CarSellForm /> </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </div>

          <!-- Статистика -->
          <div class="col-12 lg:col-6">
            <div class="surface-card p-4 border-round shadow-2 h-full">
              <CarStats />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Популярні авто -->
    <section class="popular-cars-section w-full mt-6">
      <div class="container">
        <div class="flex justify-content-between align-items-center mb-4">
          <h2 class="text-2xl font-semibold text-900 m-0">Популярні пропозиції</h2>
          <router-link to="/catalog" class="no-underline">
            <Button label="Дивитись всі" class="p-button-text" icon="pi pi-arrow-right" iconPos="right" />
          </router-link>
        </div>
        <CarGrid :cars="popularCars" />
      </div>
    </section>

    <!-- Переваги -->
    <section class="features-section w-full mt-6">
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
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Button from 'primevue/button'
import CarSearchForm from '@/components/cars/CarSearchForm.vue'
import CarSellForm from '@/components/cars/CarSellForm.vue'
import CarStats from '@/components/cars/CarStats.vue'
import CarGrid from '@/components/cars/CarGrid.vue'

const activeTab = ref(0)

// Приклад даних для відображення
const popularCars = ref([
  // ... ваші дані ...
])
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero-section {
  padding: 3rem 0;
  background: linear-gradient(to right, var(--surface-ground), var(--surface-50));
}

.search-stats-section {
  margin-top: -2rem;
  position: relative;
  z-index: 1;
}

@media screen and (max-width: 576px) {
  .container {
    padding: 0 1.5rem;
  }
  
  .hero-section {
    padding: 2rem 0;
  }
}

/* Стилі для Tabs */
:deep(.p-tabview-nav) {
  border: none;
  margin-bottom: 1rem;
}

:deep(.p-tabview-nav-link) {
  padding: 1rem 1.5rem;
  color: var(--text-600);
  font-weight: 600;
  border: none;
  border-bottom: 2px solid var(--surface-200);
  border-radius: 0;
  transition: all 0.2s;
}

:deep(.p-tabview-nav-link:not(.p-disabled):focus) {
  box-shadow: none;
}

:deep(.p-tabview-nav-link.p-highlight) {
  border-bottom-color: var(--primary-color);
  color: var(--primary-color);
}

:deep(.p-tabview-panels) {
  padding: 0;
}

/* Додаткові стилі для активного стану */
.text-primary {
  color: var(--primary-color);
}


</style> 