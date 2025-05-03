<script setup>
import Mainlayout from '@/layouts/Mainlayout.vue'
import { ref, computed } from 'vue';
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

function onFiltersUpdate(newFilters) {
  filters.value = { ...newFilters };
  activeFilters.value = [];
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
    
    // Фільтруємо всі автомобілі за статусом "На майданчику"
    const catalogCars = demoCars.filter(car => car.status === "На майданчику")
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    
    // Повертаємо дані у потрібному форматі
    return catalogCars.slice(startIndex, endIndex).map(car => ({
      ...car,
      link: car.images[0]?.url || ''
    }))
  } catch (error) {
    console.error('Error in provideCatalogCars:', error)
    return []
  }
}
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
                          <div class="mobile-filter-footer">
                            <Button 
                              :label="`Показати 356 оголошень`" 
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
                        <span class="text-lg">Знайдено 356</span>
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