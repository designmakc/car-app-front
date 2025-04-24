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
          <Button label="Пошук авто" icon="pi pi-search" class="w-full p-button-primary" @click="handleSearch" />
    
        </div>
      </div>
    </div>

    <!-- Форма продажу -->
    <div v-else class="sell-form">
      <div class="grid">
        <div class="col-12 mb-3">
          <Dropdown
            v-model="selectedBrand"
            :options="brands"
            optionLabel="name"
            placeholder="Марка"
            class="w-full"
          />
        </div>
        <div class="col-12 mb-3">
          <Dropdown
            v-model="selectedModel"
            :options="models"
            placeholder="Оберіть марку"
            class="w-full"
          />
        </div>
        <div class="col-6 mb-3">
          <InputNumber
            v-model="year"
            placeholder="Рік випуску"
            class="w-full"
            :min="1900"
            :max="2024"
          />
        </div>
        <div class="col-6 mb-3">
          <InputNumber
            v-model="price"
            placeholder="Ціна"
            class="w-full"
            mode="currency"
            currency="USD"
            :min="0"
          />
        </div>
        <div class="col-6 mb-3">
          <Dropdown
            v-model="selectedFuel"
            :options="fuelTypes"
            placeholder="Паливо"
            class="w-full"
          />
        </div>
        <div class="col-6 mb-3">
          <InputNumber
            v-model="engineVolume"
            placeholder="Об'єм двигуна"
            class="w-full"
            :min="0"
            :step="0.1"
          />
        </div>
        <div class="col-12">
          <Button label="Додати оголошення" icon="pi pi-search" class="w-full p-button-primary" @click="handleSell" />
          />
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

// Додаткові поля для продажу
const year = ref(null)
const price = ref(null)
const selectedFuel = ref(null)
const engineVolume = ref(null)

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

const handleSell = () => {
  console.log('Додавання оголошення:', {
    brand: selectedBrand.value,
    model: selectedModel.value,
    year: year.value,
    price: price.value,
    fuelType: selectedFuel.value,
    engineVolume: engineVolume.value
  })
}
</script>

