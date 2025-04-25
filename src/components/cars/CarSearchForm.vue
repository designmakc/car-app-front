<!-- Based on: PrimeVue/Form -->
<template>
  <div class="car-search-form">
        <!-- Форма пошуку -->
    <div v-if="mode === 'search'" class="search-form">
      <div class="grid">
        <div class="col-12 ">
          <Dropdown
            v-model="selectedBrand"
            :options="brands"
            optionLabel="name"
            placeholder="Марка"
            class="w-full"
          />
        </div>
        <div class="col-12 ">
          <Dropdown
            v-model="selectedModel"
            :options="models"
            placeholder="Оберіть марку"
            class="w-full"
          />
        </div>
        <div class="col-6 ">
          <InputNumber
            v-model="yearFrom"
            placeholder="Рік випуску від"
            class="w-full"
            :min="1900"
            :max="2024"
          />
        </div>
        <div class="col-6 ">
          <InputNumber
            v-model="yearTo"
            placeholder="До"
            class="w-full"
            :min="1900"
            :max="2024"
          />
        </div>
        <div class="col-6 ">
          <InputNumber
            v-model="priceFrom"
            placeholder="Ціна від"
            class="w-full"
            mode="currency"
            currency="USD"
            :min="0"
          />
        </div>
        <div class="col-6 ">
          <InputNumber
            v-model="priceTo"
            placeholder="До"
            class="w-full"
            mode="currency"
            currency="USD"
            :min="0"
          />
        </div>
        <div class="col-12">
          <Button label="Пошук авто" icon="pi pi-search" size="large" class="w-full p-button-primary" @click="handleSearch" />
    
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

const mode = ref('search')

// Поля для пошуку
const selectedBrand = ref(null)
const selectedModel = ref(null)
const yearFrom = ref(null)
const yearTo = ref(null)
const priceFrom = ref(null)
const priceTo = ref(null)

// Довідники
const brands = ref([
  { name: 'Toyota', code: 'toyota' },
  { name: 'BMW', code: 'bmw' },
  { name: 'Mercedes', code: 'mercedes' },
  { name: 'Audi', code: 'audi' },
  { name: 'Volkswagen', code: 'volkswagen' }
])

const models = ref([])
const fuelTypes = ref(['Бензин', 'Дизель', 'Електро', 'Гібрид'])

const handleSearch = () => {
  console.log('Пошук автомобілів:', {
    brand: selectedBrand.value,
    model: selectedModel.value,
    yearFrom: yearFrom.value,
    yearTo: yearTo.value,
    priceFrom: priceFrom.value,
    priceTo: priceTo.value
  })
}

</script>

