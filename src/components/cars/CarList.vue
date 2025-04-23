<!-- Based on: PrimeVue/DataView -->
<template>
  <div class="car-list">
    <DataView
      :value="cars"
      :layout="layout"
      :paginator="true"
      :rows="9"
      :sortOrder="sortOrder"
      :sortField="sortField"
      :loading="loading"
    >
      <template #header>
        <div class="flex justify-content-between align-items-center">
          <div class="flex align-items-center">
            <Button
              icon="pi pi-th-large"
              @click="layout = 'grid'"
              :class="{ 'p-button-text': layout !== 'grid' }"
              class="mr-2"
            />
            <Button
              icon="pi pi-list"
              @click="layout = 'list'"
              :class="{ 'p-button-text': layout !== 'list' }"
            />
          </div>
          <Dropdown
            v-model="sortField"
            :options="sortOptions"
            optionLabel="label"
            placeholder="Сортування"
            class="w-full md:w-14rem"
          />
        </div>
      </template>

      <template #list="slotProps">
        <div class="col-12">
          <CarCard :car="slotProps.data" />
        </div>
      </template>

      <template #grid="slotProps">
        <div class="col-12 md:col-6 lg:col-4">
          <CarCard :car="slotProps.data" />
        </div>
      </template>

      <template #empty>
        <div class="flex justify-content-center p-4">
          <i class="pi pi-search text-4xl text-500"></i>
          <p class="text-500 ml-2">Автомобілів не знайдено</p>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataView from 'primevue/dataview'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import CarCard from './CarCard.vue'

const layout = ref('grid')
const loading = ref(false)
const sortOrder = ref(-1)
const sortField = ref('price')

const sortOptions = ref([
  { label: 'Ціна (від дешевших)', value: 'price' },
  { label: 'Ціна (від дорожчих)', value: '-price' },
  { label: 'Рік (новіші)', value: '-year' },
  { label: 'Пробіг (менший)', value: 'mileage' }
])

// Приклад даних
const cars = ref([
  {
    id: 1,
    title: 'Toyota Camry 2.5',
    price: '25,000',
    year: 2020,
    mileage: 45000,
    fuel: 'Бензин',
    location: 'Київ',
    image: '/cars/camry.jpg',
    isTop: true,
    isOnSite: true
  }
  // Додайте більше автомобілів тут
])
</script>

<style scoped>
.car-list {
  margin-top: 1rem;
}
</style> 