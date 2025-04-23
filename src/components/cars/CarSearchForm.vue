<!-- Based on: PrimeVue/Form -->
<template>
  <div class="car-search-form">
    <div class="grid">
      <div class="col-12">
        <Dropdown
          v-model="selectedBrand"
          :options="brands"
          optionLabel="name"
          placeholder="Марка"
          class="w-full"
        />
      </div>
      <div class="col-12">
        <Dropdown
          v-model="selectedModel"
          :options="models"
          placeholder="Оберіть модель"
          class="w-full"
        />
      </div>
      <div class="col-6">
        <InputNumber
          v-model="priceFrom"
          placeholder="Рік"
          class="w-full"
        />
      </div>
      <div class="col-6">
        <InputNumber
          v-model="priceTo"
          placeholder="Ціна"
          class="w-full"
        />
      </div>
      <div class="col-12">
        <Dropdown
          v-model="selectedRegion"
          :options="regions"
          placeholder="Привід"
          class="w-full"
        />
      </div>
      <div class="col-12">
        <Button label="Додати оголошення" class="w-full" @click="handleSearch" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

const selectedBrand = ref(null)
const selectedModel = ref(null)
const priceFrom = ref(null)
const priceTo = ref(null)
const selectedRegion = ref(null)

const brands = ref([
  { name: 'Toyota', code: 'toyota' },
  { name: 'BMW', code: 'bmw' },
  { name: 'Mercedes', code: 'mercedes' }
])

const models = ref([])
const regions = ref(['Передній', 'Задній', 'Повний'])

const handleSearch = () => {
  // Тут буде логіка пошуку
  console.log('Пошук автомобілів:', {
    brand: selectedBrand.value,
    model: selectedModel.value,
    yearFrom: priceFrom.value,
    yearTo: priceTo.value,
    priceFrom: priceFrom.value,
    priceTo: priceTo.value,
    fuelType: null,
    transmission: null,
    location: selectedRegion.value
  })
}

const handleReset = () => {
  selectedBrand.value = null
  selectedModel.value = null
  priceFrom.value = null
  priceTo.value = null
  selectedRegion.value = null
}
</script> 