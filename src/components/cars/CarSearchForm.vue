<!-- Based on: PrimeVue/Form -->
<!-- 
  CarSearchForm компонент
  Базується на:
  - Select (PrimeVue) для вибору марки/моделі
  - InputNumber (PrimeVue) для цін та років
  - FloatLabel (PrimeVue) для лейблів
  - IconField (PrimeVue) для іконок
  - Button (PrimeVue) для кнопки пошуку

  Функціональність:
  - Пошук автомобілів за основними параметрами
  - Каскадний вибір марки та моделі
  - Фільтрація за ціною та роком
  - Валідація введених даних
  - Адаптивний дизайн
  - Підтримка мобільного відображення

  @props {String} mode - Режим форми ('search' | 'filter') (default: 'search')

  @emits {Object} search - Подія при відправці форми пошуку
    @param {Object} brand - Обрана марка
    @param {Object} model - Обрана модель
    @param {Number} yearFrom - Рік від
    @param {Number} yearTo - Рік до
    @param {Number} priceFrom - Ціна від
    @param {Number} priceTo - Ціна до

  @example
  <CarSearchForm
    mode="search"
    @search="handleSearch"
  />
-->

<template>
  <div class="car-search-form">
        <!-- Форма пошуку -->
    <div v-if="mode === 'search'" class="search-form">
      <div class="flex flex-wrap grid justify-content-left ">
        
        <!-- Марка автомобіля -->
        <div class="col-12 w-full pt-3">
      <FloatLabel variant="in">
        <Select 
          v-model="selectedBrand" 
          :options="sortedBrands" 
          filter 
          optionLabel="name" 
          placeholder="Марка автомобіля"
          class="w-full "
          @change="handleBrandChange"
          variant="filled"
          size="large"
          filterMessage="Пошук..."
          emptyFilterMessage="Не знайденно"
          emptyMessage="Немає доступних варіантів"
        />
        <label></label>
      </FloatLabel> 
        </div>

        <!-- Модель автомобіля -->
        <div class="col-12 w-full pb-3">
      <FloatLabel variant="in">
        <Select 
          label="Marka"
          v-model="selectedModel" 
          :options="filteredModels" 
          filter 
          optionLabel="name" 
          class="w-full"
          variant="filled"
          size="large"
          :placeholder="modelPlaceholder"
          :inputStyle="inputStyle"
          :disabled="!selectedBrand"
          filterMessage="Пошук..."
          emptyFilterMessage="Не знайденно"
          emptyMessage="Немає доступних варіантів"
        />
        <label></label>
      </FloatLabel> 
        </div>
        
        <!-- Рік випуску -->
        <div class="col-2 grid mr-0 ml-0 w-full gap-2 pb-3">
          <div class="col p-0 ">
            <FloatLabel variant="in">
              <IconField class="w-full">
                <InputIcon class="pi pi-calendar" />
              <InputNumber 
                id="year_from" 
                v-model="yearFrom" 
                autocomplete="off" 
                variant="filled" 
                size="large" 
                class="w-full min-w-0"
                :min="1900" 
                :max="new Date().getFullYear()" 
              />  
              </IconField>
              <label for="year_from">Рік від</label>
            </FloatLabel>
          </div>
          <div class="col p-0 ">
            <FloatLabel variant="in">
              <IconField class="w-full">
              <InputIcon class="pi pi-calendar" />
              <InputNumber 
                id="year_to" 
                v-model="yearTo" 
                autocomplete="off" 
                variant="filled" 
                size="large" 
                class="w-full min-w-0"
                :min="1900" 
                :max="new Date().getFullYear()" 
              />
              </IconField>
              <label for="year_to">Рік до</label>
            </FloatLabel>
          </div>
        </div>

        <!-- Ціна -->
        <div class="col-2 grid mr-0 ml-0 w-full gap-2 pb-3">
          <div class="col p-0">
            <FloatLabel variant="in">
              <IconField class="w-full">
                <InputIcon class="pi pi-dollar" />
                <InputNumber 
                  id="price_from" 
                  v-model="priceFrom" 
                  autocomplete="off" 
                  variant="filled" 
                  size="large"
                  class="w-full min-w-0"
                />
              </IconField>
              <label for="price_from">Ціна від</label>
            </FloatLabel>
          </div>
          <div class="col p-0">
            <FloatLabel variant="in">
              <IconField class="w-full">
                <InputIcon class="pi pi-dollar" />
                <InputNumber 
                  id="price_to" 
                  v-model="priceTo" 
                  autocomplete="off" 
                  variant="filled" 
                  size="large"
                  class="w-full min-w-0"
                />
              </IconField>
              <label for="price_to">Ціна до</label>
            </FloatLabel>
          </div>
        </div>

        <!-- Кнопка пошуку -->
        <div class="col-12">
          <Button label="Пошук авто" icon="pi pi-search" size="large" class="w-full p-button-primary" @click="handleSearch" />
    
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
/*
ОЧІКУВАНИЙ API-ФОРМАТ:
POST /api/cars/search
Body: {
  brand?: string,
  model?: string,
  yearFrom?: number,
  yearTo?: number,
  priceFrom?: number,
  priceTo?: number
}

JSON-SCHEMA (demoData):
{
  "type": "object",
  "properties": {
    "brand": { "type": "string" },
    "model": { "type": "string" },
    "yearFrom": { "type": "number" },
    "yearTo": { "type": "number" },
    "priceFrom": { "type": "number" },
    "priceTo": { "type": "number" }
  }
}

DEMO ДАНІ (для прикладу):
*/
const demoData = {
  brand: 'BMW',
  model: 'X5',
  yearFrom: 2018,
  yearTo: 2022,
  priceFrom: 20000,
  priceTo: 60000
}
/*
EMITS:
- (search): (filters: object) => void // Подія при натисканні кнопки пошуку
*/

import { ref, computed } from 'vue'
import { carBrands, getModelsByBrand } from '@/data/carFormOptions';

// Дані про марки
const selectedBrand = ref();
const brands = carBrands.map(brand => ({
  name: brand.name,
  code: brand.name.toLowerCase().replace(/\s+/g, '-'),
  models: brand.models
}));

// Дані про моделі
const selectedModel = ref();
const allModels = computed(() => {
  return brands.flatMap(brand => 
    brand.models.map(model => ({
      name: model,
      brandCode: brand.code
    }))
  );
});

// Обробник зміни марки
const handleBrandChange = () => {
  selectedModel.value = null;
};

// Відсортовані марки
const sortedBrands = computed(() => {
  return [...brands].sort((a, b) => a.name.localeCompare(b.name));
});

// Фільтровані моделі
const filteredModels = computed(() => {
  if (!selectedBrand.value) return [];
  return allModels.value
    .filter(model => model.brandCode === selectedBrand.value.code)
    .sort((a, b) => a.name.localeCompare(b.name));
});

// Плейсхолдер для моделі
const modelPlaceholder = computed(() => {
  return selectedBrand.value ? 'Оберіть модель' : 'Спочатку оберіть марку';
});

// Стилі для інпуту
const inputStyle = computed(() => {
  return !selectedBrand.value ? { cursor: 'not-allowed', opacity: 0.3 } : null;
});

const mode = ref('search') // режим пошуку

// Поля для пошуку
const yearFrom = ref(null)
const yearTo = ref(null)
const priceFrom = ref(null)
const priceTo = ref(null)

// Довідники


const handleSearch = () => {
  const filters = {
    brand: selectedBrand.value,
    model: selectedModel.value,
    yearFrom: yearFrom.value,
    yearTo: yearTo.value,
    priceFrom: priceFrom.value,
    priceTo: priceTo.value
  }
  // emit('search', filters) // Бекендер: ця подія має бути оброблена сторінкою
  console.log('EMIT search', filters) // Для тестування: вивід у консоль

  // TODO: API call (бекендер: тут буде реальний запит)
}



















</script>

<style scoped>
:deep(.p-inputnumber) {
  width: 100%;
}

:deep(.p-inputnumber-input) {
  width: 100% !important;
  min-width: 0 !important;
}

:deep(.p-float-label) {
  width: 100%;
}

:deep(.p-input-icon-left) {
  width: 100%;
}

:deep(.p-input-icon-left > .p-inputtext) {
  width: 100%;
}
</style>

