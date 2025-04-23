<!-- Based on: PrimeVue/Dropdown, Slider, InputText -->
<template>
  <div class="car-filters p-3">
    <div class="grid">
      <div class="col-12 md:col-4">
        <Dropdown
          v-model="selectedBrand"
          :options="brands"
          optionLabel="name"
          placeholder="Виберіть марку"
          class="w-full"
        />
      </div>
      <div class="col-12 md:col-4">
        <Dropdown
          v-model="selectedYear"
          :options="years"
          placeholder="Виберіть рік"
          class="w-full"
        />
      </div>
      <div class="col-12 md:col-4">
        <Dropdown
          v-model="selectedFuel"
          :options="fuelTypes"
          placeholder="Тип палива"
          class="w-full"
        />
      </div>
    </div>

    <div class="grid mt-3">
      <div class="col-12 md:col-6">
        <label>Ціна</label>
        <Slider v-model="priceRange" :min="0" :max="100000" class="w-full" />
      </div>
      <div class="col-12 md:col-6">
        <label>Пробіг</label>
        <Slider v-model="mileageRange" :min="0" :max="500000" class="w-full" />
      </div>
    </div>

    <div class="grid mt-3">
      <div class="col-12">
        <span class="p-input-icon-left w-full">
          <i class="pi pi-search" />
          <InputText v-model="searchQuery" placeholder="Пошук за ключовими словами" class="w-full" />
        </span>
      </div>
    </div>

    <div class="flex justify-content-center mt-3">
      <Button label="Знайти" icon="pi pi-search" class="mr-2" />
      <Button label="Продати" icon="pi pi-plus" severity="success" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import Slider from 'primevue/slider'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const selectedBrand = ref(null)
const selectedYear = ref(null)
const selectedFuel = ref(null)
const priceRange = ref([0, 100000])
const mileageRange = ref([0, 500000])
const searchQuery = ref('')

const brands = ref([
  { name: 'Toyota', code: 'toyota' },
  { name: 'Honda', code: 'honda' },
  { name: 'BMW', code: 'bmw' }
])

const years = ref(Array.from({ length: 24 }, (_, i) => 2024 - i))
const fuelTypes = ref(['Бензин', 'Дизель', 'Електро', 'Гібрид'])
</script>

<style scoped>
.car-filters {
  background: var(--surface-card);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
}
</style> 