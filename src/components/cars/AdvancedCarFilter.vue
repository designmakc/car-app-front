<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import debounce from 'lodash/debounce';

// PrimeVue компоненти
import MultiSelect from 'primevue/multiselect';
import Slider from 'primevue/slider';
import SelectButton from 'primevue/selectbutton';
import Checkbox from 'primevue/checkbox';
import CascadeSelect from 'primevue/cascadeselect';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';

const route = useRoute();
const router = useRouter();
const visible = ref(false);

// Стани фільтрів
const filters = ref({
  status: [],
  brand: null,
  model: null,
  price_from: null,
  price_to: null,
  year_from: null,
  year_to: null,
  mileage: null,
  fuel_type: [],
  drive_type: [],
  color: [],
  exchange_available: false
});

// Опції для селектів
const mileageOptions = [
  { label: 'До 50 тис. км', value: '0-50000' },
  { label: '50-100 тис. км', value: '50000-100000' },
  { label: 'Більше 100 тис. км', value: '100000+' }
];

const fuelTypes = [
  { label: 'Бензин', value: 'petrol' },
  { label: 'Дизель', value: 'diesel' },
  { label: 'Газ/Бензин', value: 'lpg' },
  { label: 'Електро', value: 'electric' },
  { label: 'Гібрид', value: 'hybrid' }
];

const colors = [
  { label: 'Білий', value: 'white' },
  { label: 'Чорний', value: 'black' },
  { label: 'Сірий', value: 'gray' },
  { label: 'Синій', value: 'blue' },
  { label: 'Червоний', value: 'red' },
  { label: 'Зелений', value: 'green' },
  { label: 'Жовтий', value: 'yellow' },
  { label: 'Коричневий', value: 'brown' }
];

const driveTypes = [
  { label: 'Передній', value: 'fwd' },
  { label: 'Задній', value: 'rwd' },
  { label: 'Повний', value: 'awd' }
];

// Обробники подій
const updateFilters = debounce(() => {
  const queryParams = {};
  Object.entries(filters.value).forEach(([key, value]) => {
    if (value !== null && value !== '' && value !== false) {
      queryParams[key] = value;
    }
  });
  router.push({ query: queryParams });
}, 300);

// Синхронізація з URL
watch(route, (newRoute) => {
  Object.entries(newRoute.query).forEach(([key, value]) => {
    if (key in filters.value) {
      filters.value[key] = value;
    }
  });
}, { immediate: true });

watch(filters, () => {
  updateFilters();
}, { deep: true });

const resetFilters = () => {
  filters.value = {
    status: [],
    brand: null,
    model: null,
    price_from: null,
    price_to: null,
    year_from: null,
    year_to: null,
    mileage: null,
    fuel_type: [],
    drive_type: [],
    color: [],
    exchange_available: false
  };
};

const applyFilters = () => {
  // Тут буде логіка застосування фільтрів
  visible.value = false;
};

const foundCarsCount = computed(() => {
  // TODO: Реалізувати логіку підрахунку знайдених авто
  return 356;
});

const updateSlider = () => {
  if (filters.value.price_from && filters.value.price_to) {
    filters.value.price = [filters.value.price_from, filters.value.price_to];
  }
};

watch(() => filters.value.price_from, updateSlider);
watch(() => filters.value.price_to, updateSlider);
</script>

<template>
  <!-- Мобільна версія -->
  <div class="md:hidden">
    <Button label="Всі фільтри" icon="pi pi-filter" @click="visible = true" />
    
    <Dialog v-model:visible="visible" modal header="Фільтри" class="w-full md:w-8" :breakpoints="{ '960px': '75vw', '640px': '100vw' }">
      <div class="filter-container">
        <div class="grid">
          <!-- Копія десктопних фільтрів -->
          <div class="col-12">
            <div class="flex align-items-center">
              <Checkbox v-model="filters.status" :binary="true" />
              <label class="ml-2">На майданчику</label>
            </div>
          </div>
          
          <div class="col-12">
            <h3>Основні параметри</h3>
            <div class="field mb-4">
              <label>Марка</label>
              <MultiSelect v-model="filters.brand" :options="[]" optionLabel="name" placeholder="Оберіть марку" class="w-full" />
            </div>

            <div class="field mb-4">
              <label>Модель</label>
              <MultiSelect v-model="filters.model" :options="[]" optionLabel="name" placeholder="Оберіть модель" class="w-full" :disabled="!filters.brand" />
            </div>

            <div class="field mb-4">
              <label>Ціна ($)</label>
              <div class="filter-container p-3" style="max-width: 100%; overflow: visible;">
                <div class="flex gap-2 w-full" style="min-width: 0;">
                  <InputNumber 
                    v-model="filters.price_from" 
                    placeholder="Від"
                    class="flex-1 min-w-0"
                    :min="0"
                    :max="filters.price_to || 100000"
                    inputClass="w-full"
                  />
                  <span class="text-500 mx-1">—</span>
                  <InputNumber 
                    v-model="filters.price_to" 
                    placeholder="До"
                    class="flex-1 min-w-0"
                    :min="filters.price_from || 0"
                    :max="100000"
                    inputClass="w-full"
                  />
                </div>
                <div class="slider-container mt-3 px-2" style="width: calc(100% - 1rem);">
                  <Slider 
                    v-model="filters.price" 
                    range 
                    class="w-full"
                    :min="0" 
                    :max="100000" 
                  />
                </div>
              </div>
            </div>

            <div class="field mb-4">
              <label>Рік випуску</label>
              <div class="filter-container p-3" style="max-width: 100%; overflow: visible;">
                <div class="flex gap-2 w-full" style="min-width: 0;">
                  <InputNumber 
                    v-model="filters.year_from" 
                    placeholder="Від"
                    class="flex-1 min-w-0"
                    :min="2010"
                    :max="filters.year_to || 2024"
                    inputClass="w-full"
                  />
                  <span class="text-500 mx-1">—</span>
                  <InputNumber 
                    v-model="filters.year_to" 
                    placeholder="До"
                    class="flex-1 min-w-0"
                    :min="filters.year_from || 2010"
                    :max="2024"
                    inputClass="w-full"
                  />
                </div>
                <div class="slider-container mt-3 px-2" style="width: calc(100% - 1rem);">
                  <Slider 
                    v-model="filters.year" 
                    range 
                    class="w-full"
                    :min="2010" 
                    :max="2024" 
                  />
                </div>
              </div>
            </div>

            <div class="field mb-4">
              <label>Пробіг</label>
              <SelectButton v-model="filters.mileage" :options="mileageOptions" optionLabel="label" class="w-full" />
            </div>
          </div>

          <div class="col-12">
            <h3>Технічні характеристики</h3>
            <div class="field mb-4">
              <label>Тип палива</label>
              <MultiSelect v-model="filters.fuel_type" :options="fuelTypes" optionLabel="label" placeholder="Оберіть тип палива" class="w-full" />
            </div>
            
            <div class="field mb-4">
              <label>Тип приводу</label>
              <MultiSelect v-model="filters.drive_type" :options="driveTypes" optionLabel="label" placeholder="Оберіть тип приводу" class="w-full" />
            </div>
          </div>
          
          <div class="col-12">
            <h3>Додаткові параметри</h3>
            <div class="field mb-4">
              <label>Колір</label>
              <div class="grid">
                <div v-for="color in colors" :key="color.value" class="col-6 mb-2">
                  <div class="flex align-items-center">
                    <Checkbox v-model="filters.color" :value="color.value" :binary="false" />
                    <label class="ml-2">{{ color.label }}</label>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="field mb-4">
              <div class="flex align-items-center">
                <Checkbox v-model="filters.exchange_available" :binary="true" />
                <label class="ml-2">Можливий обмін</label>
              </div>
            </div>
          </div>
          
          <div class="col-12 flex justify-content-between">
            <Button label="Скинути" severity="secondary" text @click="resetFilters" />
            <Button label="Застосувати" @click="applyFilters" />
          </div>
        </div>
      </div>
    </Dialog>
  </div>

  <!-- Десктопна версія -->
  <div class="hidden md:block">
    <div class="surface-card pr-2 border-round">
      <div class="grid">
        <!-- Статус -->
        <div class="col-12">
          <div class="flex align-items-center">
            <Checkbox v-model="filters.status" :binary="true" />
            <label class="ml-2">На майданчику</label>
          </div>
        </div>

        <!-- Основні параметри -->
        <div class="col-12">
          <h3>Основні параметри</h3>
          
          <div class="field mb-4">
            <label>Марка</label>
            <MultiSelect v-model="filters.brand" :options="[]" optionLabel="name" placeholder="Оберіть марку" class="w-full" />
          </div>

          <div class="field mb-4">
            <label>Модель</label>
            <MultiSelect v-model="filters.model" :options="[]" optionLabel="name" placeholder="Оберіть модель" class="w-full" :disabled="!filters.brand" />
          </div>

          <div class="field mb-4">
            <label>Ціна ($)</label>
            <div class="filter-container " style="max-width: 100%; overflow: visible;">
              <div class="flex gap-2 w-full" style="min-width: 0;">
                <InputNumber 
                  v-model="filters.price_from" 
                  placeholder="Від"
                  class="flex-1 min-w-0"
                  :min="0"
                  :max="filters.price_to || 100000"
                  inputClass="w-full"
                />
                
                <InputNumber 
                  v-model="filters.price_to" 
                  placeholder="До"
                  class="flex-1 min-w-0"
                  :min="filters.price_from || 0"
                  :max="100000"
                  inputClass="w-full"
                />
              </div>
              <div class="slider-container mx-auto py-4 px-1" style="width: calc(100% - 1rem);">
                <Slider 
                  v-model="filters.price" 
                  range 
                  class="w-full"
                  :min="0" 
                  :max="100000" 
                />
              </div>
            </div>
          </div>

          <div class="field mb-4">
            <label>Рік випуску</label>
            <div class="filter-container " style="max-width: 100%; overflow: visible;">
              <div class="flex gap-2 w-full" style="min-width: 0;">
                <InputNumber 
                  v-model="filters.year_from" 
                  placeholder="Від"
                  class="flex-1 min-w-0"
                  :min="2010"
                  :max="filters.year_to || 2024"
                  inputClass="w-full"
                />
                <InputNumber 
                  v-model="filters.year_to" 
                  placeholder="До"
                  class="flex-1 min-w-0"
                  :min="filters.year_from || 2010"
                  :max="2024"
                  inputClass="w-full"
                />
              </div>
              <div class="slider-container mx-auto py-4 px-1" style="width: calc(100% - 1rem);">
                <Slider 
                  v-model="filters.year" 
                  range 
                  class="w-full"
                  :min="2010" 
                  :max="2024" 
                />
              </div>
            </div>
          </div>

          <div class="field mb-4">
            <label>Пробіг</label>
            <SelectButton v-model="filters.mileage" :options="mileageOptions" optionLabel="label" class="w-full" />
          </div>
        </div>

        <!-- Технічні характеристики -->
        <div class="col-12">
          <h3>Технічні характеристики</h3>
          
          <div class="field mb-4">
            <label>Тип палива</label>
            <MultiSelect v-model="filters.fuel_type" :options="fuelTypes" optionLabel="label" placeholder="Оберіть тип палива" class="w-full" />
          </div>

          <div class="field mb-4">
            <label>Тип приводу</label>
            <MultiSelect v-model="filters.drive_type" :options="driveTypes" optionLabel="label" placeholder="Оберіть тип приводу" class="w-full" />
          </div>
        </div>

        <!-- Додаткові фільтри -->
        <div class="col-12">
          <h3>Додаткові параметри</h3>
          
          <div class="field mb-4">
            <label>Колір</label>
            <div class="grid">
              <div v-for="color in colors" :key="color.value" class="col-6 mb-2">
                <div class="flex align-items-center">
                  <Checkbox v-model="filters.color" :value="color.value" :binary="false" />
                  <label class="ml-2">{{ color.label }}</label>
                </div>
              </div>
            </div>
          </div>

          <div class="field mb-4">
            <div class="flex align-items-center">
              <Checkbox v-model="filters.exchange_available" :binary="true" />
              <label class="ml-2">Можливий обмін</label>
            </div>
          </div>
        </div>

        <!-- Кнопки управління -->
        <div class="col-12 flex justify-content-between">
          <Button label="Скинути" icon="pi pi-refresh" @click="resetFilters" outlined />
          <Button :label="'Показати ' + foundCarsCount + ' оголошень'" icon="pi pi-search" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-container {
  max-height: 80vh;
  overflow-y: auto;
}

:deep(.p-selectbutton) {
  display: flex;
  flex-wrap: wrap;
}

:deep(.p-selectbutton .p-button) {
  flex: 1;
  white-space: nowrap;
}

@media screen and (max-width: 768px) {
  :deep(.p-dialog) {
    width: 90vw !important;
    max-width: none !important;
  }
}

.field {
  max-width: 100%;
  overflow: hidden;
}

.p-inputnumber {
  width: 100%;
}

.p-inputnumber-input {
  width: 100%;
  min-width: 0; /* Важливо для flex-елементів */
}

/* Додаткові стилі для фільтрів */
.filter-container {
  background: var(--surface-ground);
  border-radius: var(--border-radius);
}

:deep(.p-inputnumber) {
  width: 100%;
}

:deep(.p-inputnumber-input) {
  width: 100% !important;
  min-width: 0 !important;
}

:deep(.p-slider) {
  margin: 0;
}

/* Медіа-запити */
@media screen and (max-width: 768px) {
  .filter-container {
    padding: 0.5rem !important;
  }
  
  .slider-container {
    padding: 0 0.5rem !important;
  }
}
</style> 