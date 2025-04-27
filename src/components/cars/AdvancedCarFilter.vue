<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import debounce from 'lodash/debounce';
import Panel from 'primevue/panel'
import SelectButton from 'primevue/selectbutton'
import MultiSelect from 'primevue/multiselect'
import InputNumber from 'primevue/inputnumber'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Slider from 'primevue/slider'
import Button from 'primevue/button'
import Select from 'primevue/select'
import { useRoute } from 'vue-router'

const props = defineProps({
  activeFilters: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:activeFilters'])

const visible = ref(false);
const filters = ref({
  status: [],
  brand: null,
  model: null,
  price_from: null,
  price_to: null,
  year_from: null,
  year_to: null,
  mileage: {},
  fuel_type: {},
  drive_type: {},
  color: [],
  exchange_available: false,
  price: null,
  year: null
});

const StatusValue = ref('all');

const currentYear = new Date().getFullYear();

const StatusOptions = [
  { label: 'Всі', value: 'all' },
  { label: 'На майданчику', value: 'in_stock' },
  { label: 'Онлайн', value: 'online' }
];

const mileageOptions = [
  { label: 'До 50', value: '0-50000' },
  { label: '50-100', value: '50000-100000' },
  { label: '100-150', value: '100000-150000' },
  { label: '150-200', value: '150000-200000' },
  { label: 'Більше 200', value: '200000+' }
];

const fuelTypes = [
  { label: 'Дизель', value: 'diesel' },
  { label: 'Бензин', value: 'petrol' },
  { label: 'Бензин/Газ', value: 'gas' },
  { label: 'Газ', value: 'lpg' },
  { label: 'Гібрид', value: 'hybrid' },
  { label: 'Електро', value: 'electric' }
];

const colors = [
  { label: 'Білий', value: 'white' },
  { label: 'Чорний', value: 'black' },
  { label: 'Сірий', value: 'gray' },
  { label: 'Синій', value: 'blue' },
  { label: 'Червоний', value: 'red' },
  { label: 'Зелений', value: 'green' },
  { label: 'Жовтий', value: 'yellow' },
  { label: 'Коричневий', value: 'brown' },
  { label: 'Сріблястий', value: 'silver' },
  { label: 'Бежевий', value: 'beige' }
];

const driveTypes = [
  { label: 'Передній', value: 'fwd' },
  { label: 'Задній', value: 'rwd' },
  { label: 'Повний', value: 'awd' }
];

const brandOptions = [
  { 
    name: 'BMW', 
    code: 'bmw',
    models: [
      { name: '3 Series', code: '3' },
      { name: '5 Series', code: '5' },
      { name: 'X5', code: 'x5' },
      { name: 'X6', code: 'x6' }
    ]
  },
  { 
    name: 'Mercedes-Benz', 
    code: 'mercedes',
    models: [
      { name: 'C-Class', code: 'c' },
      { name: 'E-Class', code: 'e' },
      { name: 'S-Class', code: 's' },
      { name: 'GLE', code: 'gle' }
    ]
  },
  { name: 'Audi', code: 'audi' },
  { name: 'Toyota', code: 'toyota' },
  { name: 'Volkswagen', code: 'vw' }
];

const modelOptions = {
  bmw: [
    { name: '3 Series', code: '3' },
    { name: '5 Series', code: '5' },
    { name: 'X5', code: 'x5' },
    { name: 'X6', code: 'x6' }
  ],
  mercedes: [
    { name: 'C-Class', code: 'c' },
    { name: 'E-Class', code: 'e' },
    { name: 'S-Class', code: 's' },
    { name: 'GLE', code: 'gle' }
  ],
  audi: [
    { name: 'A4', code: 'a4' },
    { name: 'A6', code: 'a6' },
    { name: 'Q5', code: 'q5' },
    { name: 'Q7', code: 'q7' }
  ],
  toyota: [
    { name: 'Camry', code: 'camry' },
    { name: 'RAV4', code: 'rav4' },
    { name: 'Land Cruiser', code: 'lc' },
    { name: 'Corolla', code: 'corolla' }
  ],
  vw: [
    { name: 'Golf', code: 'golf' },
    { name: 'Passat', code: 'passat' },
    { name: 'Tiguan', code: 'tiguan' },
    { name: 'Touareg', code: 'touareg' }
  ]
};

const priceRange = {
  min: 0,
  max: 200000,
  step: 100
};

const yearRange = {
  min: 1990,
  max: new Date().getFullYear(),
  step: 1
};

const yearOptions = Array.from(
  { length: currentYear - 1900 + 1 }, 
  (_, i) => ({
    label: String(currentYear - i),
    value: currentYear - i
  })
);

const year_from = ref(null);
const year_to = ref(null);

const foundCarsCount = 356;

const filteredModels = computed(() => {
  if (!filters.value.brand) return [];
  const brand = brandOptions.find(b => b.code === filters.value.brand);
  return brand ? brand.models : [];
});

const selectedMileage = computed(() => {
  return Object.entries(filters.value.mileage)
    .filter(([_, selected]) => selected)
    .map(([value]) => value);
});

const selectedFuelTypes = computed(() => {
  return Object.entries(filters.value.fuel_type)
    .filter(([_, selected]) => selected)
    .map(([value]) => value);
});

const selectedDriveTypes = computed(() => {
  return Object.entries(filters.value.drive_type)
    .filter(([_, selected]) => selected)
    .map(([value]) => value);
});

const activeFilters = computed(() => {
  const filtersArray = [];

  // Статус автомобіля
  if (StatusValue.value && StatusValue.value !== 'all') {
    const statusOption = StatusOptions.find(opt => opt.value === StatusValue.value);
    if (statusOption) {
      filtersArray.push({
        type: 'status',
        value: StatusValue.value,
        label: `Статус: ${statusOption.label}`
      });
    }
  }

  // Марка
  if (filters.value.brand) {
    const brandOption = brandOptions.find(b => b.code === filters.value.brand);
    if (brandOption) {
      filtersArray.push({
        type: 'brand',
        value: filters.value.brand,
        label: `Марка: ${brandOption.name}`
      });
    }
  }

  // Модель
  if (filters.value.model) {
    const brandModels = modelOptions[filters.value.brand] || [];
    const modelOption = brandModels.find(m => m.code === filters.value.model);
    if (modelOption) {
      filtersArray.push({
        type: 'model',
        value: filters.value.model,
        label: `Модель: ${modelOption.name}`
      });
    }
  }

  // Пробіг
  Object.entries(filters.value.mileage)
    .filter(([_, selected]) => selected)
    .forEach(([value]) => {
      const option = mileageOptions.find(opt => opt.value === value);
      if (option) {
        filtersArray.push({
          type: 'mileage',
          value,
          label: `Пробіг: ${option.label} тис. км`
        });
      }
    });

  // Тип палива
  Object.entries(filters.value.fuel_type)
    .filter(([_, selected]) => selected)
    .forEach(([value]) => {
      const option = fuelTypes.find(opt => opt.value === value);
      if (option) {
        filtersArray.push({
          type: 'fuel_type',
          value,
          label: `Паливо: ${option.label}`
        });
      }
    });

  // Тип приводу
  Object.entries(filters.value.drive_type)
    .filter(([_, selected]) => selected)
    .forEach(([value]) => {
      const option = driveTypes.find(opt => opt.value === value);
      if (option) {
        filtersArray.push({
          type: 'drive_type',
          value,
          label: `Привід: ${option.label}`
        });
      }
    });

  // Ціна
  if (filters.value.price && filters.value.price.length === 2) {
    filtersArray.push({
      type: 'price',
      value: 'price',
      label: `Ціна: $${filters.value.price[0].toLocaleString()} - $${filters.value.price[1].toLocaleString()}`
    });
  }

  // Рік
  if (filters.value.year_from || filters.value.year_to) {
    filtersArray.push({
      type: 'year',
      value: 'year',
      label: `Рік: ${filters.value.year_from || ''} - ${filters.value.year_to || ''}`
    });
  }

  // Колір
  if (Array.isArray(filters.value.color)) {
    filters.value.color.forEach(colorValue => {
      const colorOption = colors.find(c => c.value === colorValue);
      if (colorOption) {
        filtersArray.push({
          type: 'color',
          value: colorValue,
          label: `Колір: ${colorOption.label}`
        });
      }
    });
  }

  // Можливість обміну
  if (filters.value.exchange_available) {
    filtersArray.push({
      type: 'exchange',
      value: 'exchange',
      label: 'Можливий обмін'
    });
  }

  emit('update:activeFilters', filtersArray);
  return filtersArray;
});

const removeFilter = (filter) => {
  let updated = false;

  switch (filter.type) {
    case 'status':
      StatusValue.value = 'all';
      updated = true;
      break;
    case 'brand':
      filters.value.brand = null;
      filters.value.model = null;
      updated = true;
      break;
    case 'model':
      filters.value.model = null;
      updated = true;
      break;
    case 'mileage':
      if (filter.value) {
        filters.value.mileage = {
          ...filters.value.mileage,
          [filter.value]: false
        };
        updated = true;
      } else {
        filters.value.mileage = {};
        updated = true;
      }
      break;
    case 'fuel_type':
      if (filter.value) {
        filters.value.fuel_type = {
          ...filters.value.fuel_type,
          [filter.value]: false
        };
        updated = true;
      } else {
        filters.value.fuel_type = {};
        updated = true;
      }
      break;
    case 'drive_type':
      if (filter.value) {
        filters.value.drive_type = {
          ...filters.value.drive_type,
          [filter.value]: false
        };
        updated = true;
      } else {
        filters.value.drive_type = {};
        updated = true;
      }
      break;
    case 'color':
      if (filter.value) {
        filters.value.color = filters.value.color.filter(c => c !== filter.value);
        updated = true;
      } else {
        filters.value.color = [];
        updated = true;
      }
      break;
    case 'price':
      filters.value.price = null;
      filters.value.price_from = null;
      filters.value.price_to = null;
      updated = true;
      break;
    case 'year':
      filters.value.year = null;
      filters.value.year_from = null;
      filters.value.year_to = null;
      updated = true;
      break;
    case 'exchange':
      filters.value.exchange_available = false;
      updated = true;
      break;
  }

  if (updated) {
    // Перераховуємо активні фільтри
    emit('update:activeFilters', activeFilters.value);
  }
};

// Додаємо спостерігач за змінами фільтрів
watch(
  filters,
  () => {
    emit('update:activeFilters', activeFilters.value);
  },
  { deep: true }
);

const updateFilters = debounce(() => {
  const queryParams = {};
  Object.entries(filters.value).forEach(([key, value]) => {
    if (value !== null && value !== '' && value !== false) {
      queryParams[key] = value;
    }
  });
  const route = useRoute();
  route.push({ query: queryParams });
}, 300);

const resetFilters = () => {
  filters.value = {
    status: [],
    brand: null,
    model: null,
    price_from: null,
    price_to: null,
    year_from: null,
    year_to: null,
    mileage: {},
    fuel_type: {},
    drive_type: {},
    color: [],
    exchange_available: false,
    price: null,
    year: null
  };
  StatusValue.value = 'all';
};

const applyFilters = () => {
  visible.value = false;
};

const updateSlider = () => {
  if (filters.value.price_from && filters.value.price_to) {
    filters.value.price = [filters.value.price_from, filters.value.price_to];
  }
};

const updatePrice = (value, index) => {
  // Перевіряємо, чи значення не null/undefined
  if (value === null || value === undefined) {
    return;
  }

  // Ініціалізуємо масив, якщо він пустий
  if (!Array.isArray(filters.value.price)) {
    filters.value.price = [priceRange.min, priceRange.max];
  }

  const newPrice = [...filters.value.price];
  
  // Обмежуємо значення в межах діапазону
  value = Math.max(priceRange.min, Math.min(value, priceRange.max));
  
  newPrice[index] = value;

  // Логіка для збереження правильного діапазону
  if (index === 0) { // Змінюється мінімальна ціна
    if (newPrice[1] && value > newPrice[1]) {
      newPrice[1] = value;
    }
  } else { // Змінюється максимальна ціна
    if (newPrice[0] && value < newPrice[0]) {
      newPrice[0] = value;
    }
  }

  filters.value.price = newPrice;
};

const updateYear = (value, index) => {
  // Перевіряємо, чи значення не null/undefined
  if (value === null || value === undefined) {
    return;
  }

  // Ініціалізуємо масив, якщо він пустий
  if (!Array.isArray(filters.value.year)) {
    filters.value.year = [yearRange.min, yearRange.max];
  }

  const newYear = [...filters.value.year];
  
  // Обмежуємо значення в межах діапазону
  value = Math.max(yearRange.min, Math.min(value, yearRange.max));
  
  newYear[index] = value;

  // Логіка для збереження правильного діапазону
  if (index === 0) { // Змінюється мінімальний рік
    if (newYear[1] && value > newYear[1]) {
      newYear[1] = value;
    }
  } else { // Змінюється максимальний рік
    if (newYear[0] && value < newYear[0]) {
      newYear[0] = value;
    }
  }

  filters.value.year = newYear;
};

const filterYears = (event, type) => {
  let filtered = [];
  let query = event.query.trim();
  const currentYear = new Date().getFullYear();
  
  // Якщо введено число
  if (/^\d+$/.test(query)) {
    let year = parseInt(query);
    
    // Обмеження діапазону
    if (type === 'from') {
      year = Math.max(1900, Math.min(year, filters.value.year_to || currentYear));
    } else {
      year = Math.max(filters.value.year_from || 1900, Math.min(year, currentYear));
    }
    
    // Додаємо точне співпадіння якщо воно в межах діапазону
    if (year >= 1900 && year <= currentYear) {
      filtered.push({
        label: String(year),
        value: year
      });
    }
  }
  
  // Додаємо інші роки, що містять введений текст
  filtered = [...filtered, ...yearOptions.filter(option => 
    option.label.includes(query) && !filtered.some(f => f.value === option.value)
  )];
  
  event.filterCallback(filtered);
};

const handleBrandChange = () => {
  // Скидаємо вибрану модель при зміні марки
  filters.value.model = null;
};

onMounted(() => {
  StatusValue.value = filters.value.status ? 'in_stock' : 'all';
  
  const route = useRoute();
  if (route.query) {
    Object.entries(route.query).forEach(([key, value]) => {
      if (key in filters.value) {
        filters.value[key] = value;
      }
    });
  }
});

// Експортуємо функцію removeFilter
defineExpose({
  removeFilter
});
</script>

<template>
  <div class="md:col-4 lg:hidden">
    <Button label="Всі фільтри" icon="pi pi-filter" @click="visible = true" class="w-full"/>
    
    <Dialog v-model:visible="visible" modal header="Фільтри" class="w-full md:w-8">
      <div class="filter-container">
        <div class="grid gap-4">
          <Panel header="Статус автомобіля" class="w-full">
            <SelectButton v-model="StatusValue" :options="StatusOptions" optionLabel="label" class="w-full"/>
          </Panel>

          <Panel header="Основні параметри" toggleable class="w-full">
            <div class="field mb-4">
              <label>Марка</label>
              <Select 
                v-model="filters.brand"
                :options="brandOptions"
                optionLabel="name"
                optionValue="code"
                placeholder="Оберіть марку"
                class="w-full"
                @change="handleBrandChange"
                variant="filled"
                size="large"
                :showClear="true"
              />
            </div>

            <div class="field mb-4">
              <label>Модель</label>
              <Select 
                v-model="filters.model"
                :options="filteredModels"
                optionLabel="name"
                optionValue="code"
                placeholder="Оберіть модель"
                class="w-full"
                :disabled="!filters.brand"
                variant="filled"
                size="large"
                :showClear="true"
              />
            </div>

            <div class="field mb-4">
              <label>Ціна ($)</label>
              <div class="flex flex-column gap-2">
                <div class="flex gap-2 align-items-center">
                  <div class="flex-auto">
                    <IconField class="w-full">
                      <InputIcon class="pi pi-dollar" />
                      <InputNumber 
                        id="price_from" 
                        :model-value="filters.price ? filters.price[0] : null"
                        @update:model-value="value => updatePrice(value, 0)"
                        autocomplete="off" 
                        variant="filled" 
                        size="large"
                        class="w-full"
                        :min="priceRange.min"
                        :max="priceRange.max"
                        :step="priceRange.step"
                        placeholder="0"
                      />
                    </IconField>
                  </div>
                  <div class="flex-auto">
                    <IconField class="w-full">
                      <InputIcon class="pi pi-dollar" />
                      <InputNumber 
                        id="price_to" 
                        :model-value="filters.price ? filters.price[1] : null"
                        @update:model-value="value => updatePrice(value, 1)"
                        autocomplete="off" 
                        variant="filled" 
                        size="large"
                        class="w-full"
                        :min="priceRange.min"
                        :max="priceRange.max"
                        :step="priceRange.step"
                        placeholder="200 000"
                      />
                    </IconField>
                  </div>
                </div>
                <Slider 
                  v-model="filters.price" 
                  range 
                  :min="priceRange.min" 
                  :max="priceRange.max" 
                  :step="priceRange.step" 
                  class="w-full"
                />
              </div>
            </div>

            <div class="field mb-4">
              <label>Рік випуску</label>
              <div class="flex flex-column gap-2">
                <div class="flex gap-2 align-items-center">
                  <div class="flex-auto">
                    <IconField class="w-full">
                      <InputIcon class="pi pi-calendar" />
                      <Select
                        v-model="filters.year_from"
                        :options="yearOptions"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Від"
                        class="w-full"
                        editable
                        :filter="true"
                        filterMatchMode="contains"
                        @filter="filterYears($event, 'from')"
                        variant="filled"
                        size="large"
                      />
                    </IconField>
                  </div>
                  <div class="flex-auto">
                    <IconField class="w-full">
                      <InputIcon class="pi pi-calendar" />
                      <Select
                        v-model="filters.year_to"
                        :options="yearOptions"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="До"
                        class="w-full"
                        editable
                        :filter="true"
                        filterMatchMode="contains"
                        @filter="filterYears($event, 'to')"
                        variant="filled"
                        size="large"
                      />
                    </IconField>
                  </div>
                </div>
              </div>
            </div>

            <div class="field mb-4">
              <label>Пробіг (тис. км)</label>
              <div class="flex flex-wrap gap-2">
                <ToggleButton 
                  v-for="option in mileageOptions"
                  :key="option.value"
                  v-model="filters.mileage[option.value]"
                  :onLabel="option.label"
                  :offLabel="option.label" 
                  :value="option.value"
                />
              </div>
            </div>
          </Panel>

          <Panel header="Технічні характеристики" toggleable class="w-full">
            <div class="field mb-4">
              <label>Тип палива</label>
              <div class="flex flex-wrap gap-2">
                <ToggleButton 
                  v-for="type in fuelTypes" 
                  :key="type.value"
                  v-model="filters.fuel_type[type.value]"
                  :onLabel="type.label" 
                  :offLabel="type.label"
                  :value="type.value"
                />
              </div>
            </div>
            
            <div class="field mb-4">
              <label>Тип приводу</label>
              <div class="flex flex-wrap gap-2">
                <ToggleButton 
                  v-for="type in driveTypes" 
                  :key="type.value"
                  v-model="filters.drive_type[type.value]"
                  :onLabel="type.label" 
                  :offLabel="type.label"
                  :value="type.value"
                />
              </div>
            </div>
          </Panel>

          <Panel header="Додаткові параметри" toggleable class="w-full">
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
          </Panel>

          <div class="flex justify-content-between">
            <Button label="Скинути" @click="resetFilters" />
            <Button label="Застосувати" @click="applyFilters" />
          </div>
        </div>
      </div>
    </Dialog>
  </div>

  <!-- desktop -->
  <div class="hidden lg:block col-12">
    <div class="surface-card border-round">
      <div class="grid gap-4">
        
        <!-- Статус -->
        <div>
          <SelectButton 
            v-model="StatusValue" 
            :options="StatusOptions" 
            optionLabel="label" 
            class="w-full" 
          />
        </div>

        <!-- Основні параметри -->
        <Panel header="Основні параметри" toggleable class="w-full px-0 m-0">
          <div class="flex flex-column gap-4">
            
            <!-- Марка -->
            <div class="flex flex-column gap-2">
              <label>Марка</label>
              <Select 
                v-model="filters.brand"
                :options="brandOptions"
                optionLabel="name"
                optionValue="code"
                placeholder="Оберіть марку"
                class="w-full"
                @change="handleBrandChange"
                variant="filled"
                size="large"
                :showClear="true"
              />
            </div>

            <!-- Модель -->
            <div class="flex flex-column gap-2">
              <label>Модель</label>
              <Select 
                v-model="filters.model"
                :options="filteredModels"
                optionLabel="name"
                optionValue="code"
                placeholder="Оберіть модель"
                class="w-full"
                :disabled="!filters.brand"
                variant="filled"
                size="large"
                :showClear="true"
              />
            </div>

            <!-- Ціна -->
            <div class="flex flex-column gap-2">
              <label>Ціна ($)</label>
              <div class="flex gap-2 align-items-center pb-3">
                <div class="flex-auto">
                  <IconField class="w-full">
                    <InputIcon class="pi pi-dollar" />
                    <InputNumber 
                      id="price_from" 
                      :model-value="filters.price ? filters.price[0] : null"
                      @update:model-value="value => updatePrice(value, 0)"
                      autocomplete="off" 
                      variant="filled" 
                      size="large"
                      class="w-full"
                      :min="priceRange.min"
                      :max="priceRange.max"
                      :step="priceRange.step"
                      placeholder="0"
                    />
                  </IconField>
                </div>
                <div class="flex-auto">
                  <IconField class="w-full">
                    <InputIcon class="pi pi-dollar" />
                    <InputNumber 
                      id="price_to" 
                      :model-value="filters.price ? filters.price[1] : null"
                      @update:model-value="value => updatePrice(value, 1)"
                      autocomplete="off" 
                      variant="filled" 
                      size="large"
                      class="w-full"
                      :min="priceRange.min"
                      :max="priceRange.max"
                      :step="priceRange.step"
                      placeholder="200 000"
                    />
                  </IconField>
                </div>
              </div>
              <Slider 
                v-model="filters.price" 
                range 
                :min="priceRange.min" 
                :max="priceRange.max" 
                :step="priceRange.step" 
                class="w-full"
              />
            </div>

            <!-- Рік випуску -->
            <div class="flex flex-column gap-2">
              <label>Рік випуску</label>
              <div class="flex gap-2 align-items-center">
                <div class="flex-auto">
                  <IconField class="w-full">
                      <Select
                      v-model="filters.year_from"
                      :options="yearOptions"
                      optionLabel="label"
                      optionValue="value"
                      placeholder="Від"
                      class="w-full"
                      editable
                      :filter="true"
                      filterMatchMode="contains"
                      @filter="filterYears($event, 'from')"
                      variant="filled"
                      size="large"
                    />
                  </IconField>
                </div>
                <div class="flex-auto">
                  <IconField class="w-full">
                    <Select
                      v-model="filters.year_to"
                      :options="yearOptions"
                      optionLabel="label"
                      optionValue="value"
                      placeholder="До"
                      class="w-full"
                      editable
                      :filter="true"
                      filterMatchMode="contains"
                      @filter="filterYears($event, 'to')"
                      variant="filled"
                      size="large"
                    />
                  </IconField>
                </div>
              </div>
            </div>

            <!-- Пробіг -->
            <div class="field">
              <label>Пробіг (тис. км)</label>
              <div class="flex flex-wrap gap-2">
                <ToggleButton 
                  v-for="option in mileageOptions"
                  :key="option.value"
                  v-model="filters.mileage[option.value]"
                  :onLabel="option.label"
                  :offLabel="option.label" 
                  :value="option.value"
                />
              </div>
            </div>

          </div>
        </Panel>

        <!-- Технічні характеристики -->
        <Panel header="Технічні характеристики" toggleable class="w-full">
          <div class="field mb-4">
            <label>Тип палива</label>
            <div class="flex flex-wrap gap-2">
              <ToggleButton 
                v-for="type in fuelTypes" 
                :key="type.value"
                v-model="filters.fuel_type[type.value]"
                :onLabel="type.label" 
                :offLabel="type.label"
                :value="type.value"
              />
            </div>
          </div>

          <div class="field mb-4">
            <label>Тип приводу</label>
            <div class="flex flex-wrap gap-2">
              <ToggleButton 
                v-for="type in driveTypes" 
                :key="type.value"
                v-model="filters.drive_type[type.value]"
                :onLabel="type.label" 
                :offLabel="type.label"
                :value="type.value"
              />
            </div>
          </div>
        </Panel>

        <!-- Додаткові параметри -->
        <Panel header="Додаткові параметри" toggleable class="w-full">
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
        </Panel>

        <!-- Кнопки -->
        <div class="grid gap-4 w-full m-0">
          <Button 
            :label="'Показати ' + foundCarsCount + ' оголошень'" 
            icon="pi pi-search" 
            size="large" 
            class="w-full"
          />
          <Button 
            label="Скинути" 
            icon="pi pi-refresh" 
            @click="resetFilters" 
            outlined 
            class="w-full"
          />
        </div>

      </div>
    </div>
  </div>
</template> 


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