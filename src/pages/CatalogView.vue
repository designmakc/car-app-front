<script setup>
import Mainlayout from '@/layouts/Mainlayout.vue'
import { ref, computed, watch } from 'vue';
import Breadcrumb from 'primevue/breadcrumb';
import SelectButton from 'primevue/selectbutton';
import Chip from 'primevue/chip';
import Tag from 'primevue/tag';
import AdvancedCarFilter from '@/components/cars/AdvancedCarFilter.vue';
import CarList from '@/components/cars/CarList.vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { demoCars } from '@/data/demo/cars.js';

const items = [
    { label: 'Головна', url: '/' },
    { label: 'Каталог', url: '/catalog' }
];

const home = { icon: 'pi pi-home', url: '/' };

const sortOptions = [
    {
        label: 'По ціні',
        items: [
            { label: 'Спочатку дешевші', value: 'price_asc' },
            { label: 'Спочатку дорожчі', value: 'price_desc' }
        ]
    },
    {
        label: 'По даті оголошення',
        items: [
            { label: 'Спочатку новіші', value: 'date_desc' },
            { label: 'Спочатку старіші', value: 'date_asc' }
        ]
    }
];

const selectedSort = ref('date_desc');

const activeFilters = ref([]);
const filterRef = ref(null);
const mobileFilterRef = ref(null);
const showMobileFilters = ref(false);

const filters = ref({
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

// Додайте новий реактивний параметр для відстеження змін фільтрів
const filterChangeCounter = ref(0)

// Додайте до існуючого лічильника змін також відстеження сортування
const listUpdateTrigger = computed(() => `${filterChangeCounter.value}-${selectedSort.value}`)

function onFiltersUpdate(newFilters) {
  filters.value = { ...newFilters }
  activeFilters.value = []
  // Збільшуємо лічильник при кожній зміні фільтрів
  filterChangeCounter.value++
}

const hasActiveFilters = computed(() => {
    return activeFilters.value && activeFilters.value.length > 0;
});

const removeFilter = (filter) => {
    if (filterRef.value) {
        filterRef.value.removeFilter(filter);
    }
};

const openMobileFilters = () => {
    showMobileFilters.value = true;
};

const closeMobileFilters = () => {
    showMobileFilters.value = false;
};

// Функція для отримання всіх автомобілів для каталогу
const provideCatalogCars = async (page = 1, perPage = 12) => {
  try {
    // Емулюємо затримку мережі
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Фільтруємо автомобілі
    let filteredCars = demoCars.filter(car => car.status === "На майданчику")

    // Застосовуємо фільтри
    if (filters.value) {
      if (filters.value.brand) {
        filteredCars = filteredCars.filter(car => car.brand === filters.value.brand)
      }
      if (filters.value.model) {
        filteredCars = filteredCars.filter(car => car.model === filters.value.model)
      }
      if (filters.value.fuel_type && Object.keys(filters.value.fuel_type).length > 0) {
        filteredCars = filteredCars.filter(car => {
          const fuelTypeMap = {
            'Бензин': 'petrol',
            'Дизель': 'diesel',
            'Гібрид': 'hybrid',
            'Електро': 'electric'
          };
          const normalizedFuelType = fuelTypeMap[car.fuel_type];
          return filters.value.fuel_type[normalizedFuelType] === true;
        });
      }
      if (filters.value.drive_type && Object.values(filters.value.drive_type).some(v => v)) {
        filteredCars = filteredCars.filter(car => 
          filters.value.drive_type[car.drive_type]
        )
      }
      if (filters.value.year_from) {
        filteredCars = filteredCars.filter(car => car.year >= filters.value.year_from)
      }
      if (filters.value.year_to) {
        filteredCars = filteredCars.filter(car => car.year <= filters.value.year_to)
      }
      if (filters.value.price_from) {
        filteredCars = filteredCars.filter(car => car.price >= filters.value.price_from)
      }
      if (filters.value.price_to) {
        filteredCars = filteredCars.filter(car => car.price <= filters.value.price_to)
      }
      if (filters.value.color && filters.value.color.length > 0) {
        filteredCars = filteredCars.filter(car => 
          filters.value.color.includes(car.color)
        )
      }
    }

    // Покращена логіка сортування
    if (selectedSort.value) {
      filteredCars = [...filteredCars].sort((a, b) => {
        switch (selectedSort.value) {
          case 'price_asc':
            return a.price - b.price
          case 'price_desc':
            return b.price - a.price
          case 'date_desc':
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          case 'date_asc':
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          default:
            return 0
        }
      })
    }

    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    
    // Повертаємо дані у потрібному форматі
    return filteredCars.slice(startIndex, endIndex).map(car => ({
      ...car,
      link: car.images[0]?.url || ''
    }))
  } catch (error) {
    console.error('Error in provideCatalogCars:', error)
    return []
  }
}

// Функція для підрахунку відфільтрованих авто
const filteredCarsCount = computed(() => {
  let filteredCars = demoCars.filter(car => car.status === "На майданчику")

  if (filters.value) {
    if (filters.value.brand) {
      filteredCars = filteredCars.filter(car => car.brand === filters.value.brand)
    }
    if (filters.value.model) {
      filteredCars = filteredCars.filter(car => car.model === filters.value.model)
    }
    if (filters.value.fuel_type && Object.values(filters.value.fuel_type).some(v => v)) {
      filteredCars = filteredCars.filter(car => {
        const carFuelType = car.fuel_type === "Бензин" ? "petrol" : 
                          car.fuel_type === "Дизель" ? "diesel" : 
                          car.fuel_type === "Гібрид" ? "hybrid" : 
                          car.fuel_type === "Електро" ? "electric" : "";
        return filters.value.fuel_type[carFuelType];
      })
    }
    if (filters.value.drive_type && Object.values(filters.value.drive_type).some(v => v)) {
      filteredCars = filteredCars.filter(car => 
        filters.value.drive_type[car.drive_type]
      )
    }
    if (filters.value.mileage && Object.values(filters.value.mileage).some(v => v)) {
      filteredCars = filteredCars.filter(car => {
        return Object.entries(filters.value.mileage)
          .filter(([_, selected]) => selected)
          .some(([range]) => {
            const [min, max] = range.split('-').map(Number)
            if (max === '+') {
              return car.mileage >= min
            }
            return car.mileage >= min && car.mileage <= max
          })
      })
    }
    if (filters.value.year_from) {
      filteredCars = filteredCars.filter(car => car.year >= filters.value.year_from)
    }
    if (filters.value.year_to) {
      filteredCars = filteredCars.filter(car => car.year <= filters.value.year_to)
    }
    if (filters.value.price_from) {
      filteredCars = filteredCars.filter(car => car.price >= filters.value.price_from)
    }
    if (filters.value.price_to) {
      filteredCars = filteredCars.filter(car => car.price <= filters.value.price_to)
    }
    if (filters.value.color && filters.value.color.length > 0) {
      filteredCars = filteredCars.filter(car => 
        filters.value.color.includes(car.color)
      )
    }
    if (filters.value.exchange_available) {
      filteredCars = filteredCars.filter(car => car.exchange_available)
    }
  }

  return filteredCars.length;
});

// Додайте watch для відстеження змін фільтрів
watch(
  () => filters.value,
  () => {
    filterChangeCounter.value++;
  },
  { deep: true }
);

// Додайте watch для selectedSort
watch(selectedSort, () => {
  filterChangeCounter.value++
})
</script>

<template>
  <Mainlayout>
    <div class="catalog-page">
        <!-- Хедер -->
        <header class="surface-0 shadow-1 relative">
            <div class="">
                <!-- TODO: Додати компонент Header -->
            </div>
        </header>

        <div class="mt-4">
            <!-- Breadcrumb -->
            <Breadcrumb :home="home" :model="items" class="mb-4 p-2 border-round" />

            <!-- Заголовок -->
            <h1>Каталог автомобілів</h1>

            <!-- Основний контент -->
            <div class="grid">
                <!-- Фільтри (ліва колонка) -->
                <div class="col-12 lg:col-3">
                    <!-- Десктопний фільтр -->
                    <div class="hidden lg:block">
                        <AdvancedCarFilter 
                            ref="filterRef"
                            v-model:filters="filters"
                            v-model:activeFilters="activeFilters"
                            @update:filters="onFiltersUpdate"
                            class="sticky top-0" 
                        />
                    </div>
                </div>

                <!-- Список авто (права колонка) -->
                <div class="col-12 lg:col-9">
                    <!-- Мобільна кнопка "Всі фільтри" -->
                    <div class="block lg:hidden mb-3">
                        <Button 
                            label="Всі фільтри" 
                            icon="pi pi-sliders-h"
                            class="w-full p-button-outlined"
                            @click="openMobileFilters"
                        />
                    </div>

                    <!-- Модальне вікно з фільтром для мобільних -->
                    <Dialog 
                        v-model:visible="showMobileFilters" 
                        modal 
                        header="Всі фільтри"
                        position="bottom"
                        :style="{ width: '100vw', maxWidth: '100vw', height: '100vh', maxHeight: '100vh', margin: 0, borderRadius: '1.5rem 1.5rem 0 0' }"
                        :contentStyle="{ padding: '0', height: 'calc(100vh - 4rem)', overflow: 'auto', paddingBottom: '5.5rem' }"
                        :breakpoints="{ '960px': '100vw' }"
                        class="mobile-filters-dialog"
                        :unmountOnHide="false"
                    >
                        <div style="padding: 1rem;">
                          <AdvancedCarFilter 
                              ref="mobileFilterRef"
                              v-model:filters="filters"
                              v-model:activeFilters="activeFilters"
                              @update:filters="onFiltersUpdate"
                              class="block"
                              :found-cars-count="356"
                              @reset="closeMobileFilters"
                          />
                        </div>
                        <template #footer>
                          <div class="mobile-filter-footer w-full">
                            <Button 
                              :label="`Показати ${filteredCarsCount} авто`"
                              icon="pi pi-search" 
                              size="large" 
                              class="w-full mb-2"
                              @click="closeMobileFilters"
                            />
                            <Button 
                              label="Скинути" 
                              icon="pi pi-refresh" 
                              outlined 
                              class="w-full"
                              @click="mobileFilterRef?.resetFilters?.()"
                            />
                          </div>
                        </template>
                    </Dialog>

                    <!-- Активні фільтри -->
                    <template v-if="hasActiveFilters">
                        <div class="mb-4">
                            <div class="flex align-items-center flex-wrap gap-2">
                                <Chip v-for="filter in activeFilters"
                                     :key="`${filter.type}-${filter.value}`"
                                     :label="filter.label"
                                     class="p-2"
                                     :removable="true"
                                     @remove="removeFilter(filter)" />
                            </div>
                        </div>
                    </template>

                    <!-- Сортування -->
                    <div class="flex justify-content-between align-items-center mb-4">
                        <span class="text-lg">
                          Знайдено {{ filteredCarsCount }} авто
                        </span>
                        <Select
                            v-model="selectedSort"
                            :options="sortOptions"
                            optionLabel="label"
                            optionValue="value"
                            placeholder="Сортувати"
                            class="min-w-12rem"
                            style="min-width: 12rem"
                            optionGroupLabel="label" 
                            optionGroupChildren="items"
                        >
                            <template #optiongroup="slotProps">
                                <div style="color: var(--p-surface-300); font-weight: 400;">
                                    {{ slotProps.option.label }}
                                </div>
                            </template>
                        </Select>
                    </div>

                    <!-- Список авто -->
                    <div class="car-list pb-8">
                        <CarList 
                        :key="listUpdateTrigger"
                        :grid="{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }"
                        :provide-cars="provideCatalogCars"
                        :limit="20"
                        :perPage="8"
                        :infiniteScroll="true"
                        />
                    </div>
                </div>
            </div>
        </div>

        
    </div>
  </Mainlayout>
</template>

<style scoped>


@media screen and (max-width: 992px) {
    .sticky {
        position: relative !important;
        top: 0 !important;
    }
}

:deep(.p-selectbutton) {
    .p-button {
        padding: 0.5rem;
    }
}

:deep(.p-tag) {
    .p-tag-icon {
        margin-left: 0.5rem;
    }
}

.mobile-filters-dialog .p-dialog-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  background: var(--surface-ground, #fff);
  z-index: 1002;
  box-shadow: 0 -2px 16px 0 rgba(0,0,0,0.08);
  padding: 1rem 1rem 1.5rem 1rem;
  border-radius: 1.5rem 1.5rem 0 0;
}
.mobile-filters-dialog .p-dialog-content {
  padding-bottom: 6.5rem !important;
}
</style> 