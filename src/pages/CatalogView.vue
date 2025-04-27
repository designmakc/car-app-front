<script setup>
import { ref, computed } from 'vue';
import Breadcrumb from 'primevue/breadcrumb';
import SelectButton from 'primevue/selectbutton';
import Tag from 'primevue/tag';
import AdvancedCarFilter from '@/components/cars/AdvancedCarFilter.vue';
import CarList from '@/components/cars/CarList.vue';

const items = [
    { label: 'Головна', url: '/' },
    { label: 'Каталог', url: '/catalog' }
];

const home = { icon: 'pi pi-home', url: '/' };

const sortOptions = [
    { label: 'За ціною ↑', value: 'price_asc' },
    { label: 'За ціною ↓', value: 'price_desc' },
    { label: 'За датою ↑', value: 'date_asc' },
    { label: 'За датою ↓', value: 'date_desc' }
];

const selectedSort = ref('date_desc');

const activeFilters = computed(() => {
    // TODO: Отримати активні фільтри з AdvancedCarFilter
    return [
        { label: 'Ціна: $10000 - $20000', value: 'price' },
        { label: 'Рік: 2020 - 2023', value: 'year' },
        { label: 'Пробіг: до 50 тис. км', value: 'mileage' }
    ];
});

const removeFilter = (filter) => {
    // TODO: Реалізувати логіку видалення фільтру
    console.log('Removing filter:', filter);
};
</script>

<template>
    <div class="catalog-page">
        <!-- Хедер -->
        <header class="surface-0 shadow-1 relative">
            <div class="container">
                <!-- TODO: Додати компонент Header -->
            </div>
        </header>

        <div class="container mt-4">
            <!-- Breadcrumb -->
            <Breadcrumb :home="home" :model="items" class="mb-4 surface-ground p-2 border-round" />

            <!-- Заголовок -->
            <h1 class="text-4xl font-bold mb-4">Каталог автомобілів</h1>

            <!-- Основний контент -->
            <div class="grid">
                <!-- Фільтри (ліва колонка) -->
                <div class="col-12 lg:col-3">
                    <AdvancedCarFilter class="sticky top-0" />
                </div>

                <!-- Список авто (права колонка) -->
                <div class="col-12 lg:col-9">
                    <!-- Активні фільтри -->
                    <div v-if="activeFilters.length" class="mb-4">
                        <div class="flex align-items-center flex-wrap gap-2">
                            <Tag v-for="filter in activeFilters" 
                                 :key="filter.value" 
                                 :value="filter.label" 
                                 severity="info"
                                 class="p-2"
                                :removable="true"
                                 @remove="removeFilter(filter)" />
                        </div>
                    </div>

                    <!-- Сортування -->
                    <div class="flex justify-content-between align-items-center mb-4">
                        <span class="text-lg">Знайдено 356 автомобілів</span>
                        <SelectButton v-model="selectedSort" 
                                    :options="sortOptions" 
                                    optionLabel="label"
                                    class="p-buttonset-sm" />
                    </div>

                    <!-- Список авто -->
                    <div class="car-list">
                        <CarList 
                        :grid="{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }"/>
                    </div>
                </div>
            </div>
        </div>

        <!-- Футер -->
        <footer class="surface-ground mt-8 p-8">
            <div class="container">
                <!-- TODO: Додати компонент Footer -->
            </div>
        </footer>
    </div>
</template>

<style scoped>
.container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
}

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
</style> 