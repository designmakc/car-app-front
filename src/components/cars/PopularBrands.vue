<template>
  <Panel class="brands-panel surface-100 border-none border-round-xl p-0 md:p-4 pt-2 md:pt-auto">
    <template #header>
      <div class="flex align-items-center gap-2">
        <i class="pi pi-car text-primary text-sm md:text-base lg:text-2xl m-0"></i>
        <h2 class="text-sm md:text-base lg:text-lg font-bold m-0">Популярні марки</h2>
      </div>
    </template>
    
    <div class="grid">
      <div v-for="(column, columnIndex) in brandColumns" :key="columnIndex" class="col-6 md:col-3 lg:col-3">
        <div v-for="brand in column" :key="brand.name" class="flex align-items-end justify-content-between mb-3">
          <div class="flex align-items-end">
            <router-link 
              :to="{ name: 'catalog', query: { brand: brand.name }}" 
              class="text-blue-600 hover:text-primary cursor-pointer no-underline hover:underline"
            >
              {{ brand.name }}
            </router-link>
          </div>
          <div class="flex align-items-end gap-2 flex-grow-1 ml-3">
            <div class="brand-dots flex-grow-1"></div>
            <span class="text-500 font-medium whitespace-nowrap">{{ brand.count }}</span>
          </div>
        </div>
      </div>
    </div>

    
  </Panel>
</template>

<script setup>
/*
API Endpoints:
GET /api/brands/popular - отримання популярних брендів
Response: { data: Array<{name: string, count: number}>, total: number }

GET /api/brands/all - отримання всіх брендів
Response: { data: Array<{name: string, count: number}>, total: number }
*/

import { ref, computed, onMounted } from 'vue'
import Panel from 'primevue/panel'
import { carBrands } from '@/data/carFormOptions'

const brands = ref([])
const loading = ref(false)
const showAllBrands = ref(false)
const totalBrands = ref(0)

// Отримання популярних брендів
const fetchPopularBrands = async () => {
  loading.value = true
  try {
    // TODO: API call
    // const response = await fetch('/api/brands/popular')
    // const data = await response.json()
    // brands.value = data.data
    // totalBrands.value = data.total

    // Використовуємо демо-дані
    await new Promise(resolve => setTimeout(resolve, 500)) // Імітація затримки API
    brands.value = carBrands.slice(0, 12).map(brand => ({
      name: brand.name,
      count: Math.floor(Math.random() * 1000) + 100 // Генеруємо випадкову кількість для демо
    }))
    totalBrands.value = carBrands.length
  } catch (error) {
    console.error('Помилка при завантаженні брендів:', error)
  } finally {
    loading.value = false
  }
}

// Завантаження всіх брендів
const loadAllBrands = async () => {
  if (showAllBrands.value) {
    showAllBrands.value = false
    await fetchPopularBrands()
    return
  }

  loading.value = true
  try {
    // TODO: API call
    // const response = await fetch('/api/brands/all')
    // const data = await response.json()
    // brands.value = data.data
    
    // Демо-дані - додаємо всі бренди
    await new Promise(resolve => setTimeout(resolve, 500))
    brands.value = carBrands.map(brand => ({
      name: brand.name,
      count: Math.floor(Math.random() * 1000) + 100 // Генеруємо випадкову кількість для демо
    }))
    showAllBrands.value = true
  } catch (error) {
    console.error('Помилка при завантаженні всіх брендів:', error)
  } finally {
    loading.value = false
  }
}

// Розділяємо бренди на 4 колонки
const brandColumns = computed(() => {
  const columns = [[], [], [], []]
  const itemsPerColumn = Math.ceil(brands.value.length / 4)
  
  brands.value.forEach((brand, index) => {
    const columnIndex = Math.floor(index / itemsPerColumn)
    columns[columnIndex].push(brand)
  })
  
  return columns
})

// Завантажуємо початкові дані при монтуванні компонента
onMounted(fetchPopularBrands)
</script>

<style scoped>
.brands-panel {
  background: var(--p-surface-card);
  margin-bottom: 1rem;
}

.brand-dots {
  border-top: 1px dotted var(--p-surface-300);
  height: 1px;
}

:deep(.p-panel-header) {
  padding: 1rem;
  background: var(--p-surface-section);
  border-bottom: 1px solid var(--p-surface-border);
}

:deep(.p-panel-content) {
  padding: 1.5rem;
}

:deep(.p-panel-footer) {
  padding: 1rem;
  background: var(--p-surface-section);
  border-top: 1px solid var(--p-surface-border);
}
</style> 