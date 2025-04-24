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
    <section class="search-stats-section w-full pb-6">
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
import StatisticsBlock from '../components/cars/StatisticsBlock.vue'
import QuickFilters from '../components/cars/QuickFilters.vue'

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