<!-- Based on: PrimeVue/Form -->
<template>
  <div class="car-search-form">
        <!-- Форма пошуку -->
    <div v-if="mode === 'search'" class="search-form">
      <div class="flex flex-wrap grid">

    <!-- Марка автомобіля -->
    <div class="col-12 w-full">
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
        />
        <label></label>
      </FloatLabel> 
    </div>

    <!-- Модель автомобіля -->
    <div class="col-12 w-full">
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
        />
        <label></label>
      </FloatLabel> 
    </div>
        <div class="col-12 md:col-6">
          <FloatLabel variant="in">
            <InputNumber id="in_label" v-model="yearFrom" autocomplete="off" variant="filled" size="large" class="w-full" :min="1900" :max="new Date().getFullYear()" />
          <label for="in_label">Рік випуску від</label>
          </FloatLabel>
        </div>
        <div class="col-12 md:col-6">
          <FloatLabel variant="in">
            <InputNumber id="in_label" v-model="yearTo" autocomplete="off" variant="filled" size="large" class="w-full" :min="1900" :max="new Date().getFullYear()" />
          <label for="in_label">Рік випуску до</label>
          </FloatLabel>
        </div>
        <div class="col-12 md:col-6">
          <FloatLabel variant="in">
            <IconField>
              <InputIcon class="pi pi-dollar" />
              <InputNumber id="in_label" v-model="priceFrom" autocomplete="off" variant="filled" size="small md:large" class="w-full"/>
            </IconField>
          <label for="in_label">Ціна від</label>
          </FloatLabel>
        </div>
        <div class="col-12 md:col-6">
          <FloatLabel variant="in">
            <IconField>
              <InputIcon class="pi pi-dollar" />
              <InputNumber id="in_label" v-model="priceTo" autocomplete="off" variant="filled" size="small md:large" class="w-full" />
            </IconField>
          <label for="in_label">Ціна до</label>
          </FloatLabel>
        </div>
        <div class="col-12">
          <Button label="Пошук авто" icon="pi pi-search" size="large" class="w-full p-button-primary" @click="handleSearch" />
    
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>

import { ref, computed } from 'vue'

// Дані про марки
const selectedBrand = ref();
const brands = ref([
  { name: 'Audi', code: 'AUDI', models: ['A4', 'A6', 'Q5', 'Q7'] },
  { name: 'BMW', code: 'BMW', models: ['X3', 'X5', '3 Series', '5 Series'] },
  { name: 'Mercedes', code: 'MB', models: ['C-Class', 'E-Class', 'GLC', 'GLE'] },
  // Інші марки...
]);

// Дані про моделі
const selectedModel = ref();
const allModels = computed(() => {
  return brands.value.flatMap(brand => 
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
  return [...brands.value].sort((a, b) => a.name.localeCompare(b.name));
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

