<!-- Based on: PrimeVue/Grid -->
<template>
  <div class="car-grid">
    <div class="grid">
      <div v-for="car in cars" :key="car.id" class="col-12 md:col-6 lg:col-3">
        <Card class="h-full shadow-2 hover:shadow-4 transition-shadow transition-duration-150">
          <template #header>
            <div class="relative">
              <img :src="car.image" :alt="car.title" class="w-full car-image" />
              <div class="absolute top-0 right-0 m-2">
                <Tag v-if="car.isTop" value="TOP" severity="danger" />
                <Tag v-if="car.isOnSite" value="На майданчику" severity="success" />
                <Tag v-if="car.isSold" value="Продано" severity="warning" />
              </div>
            </div>
          </template>
          <template #title>
            <span class="text-xl font-medium text-900">{{ car.title }}</span>
          </template>
          <template #content>
            <div class="grid">
              <div class="col-6">
                <p class="m-0"><i class="pi pi-calendar mr-2"></i>{{ car.year }}</p>
                <p class="m-0"><i class="pi pi-car mr-2"></i>{{ car.mileage }} км</p>
              </div>
              <div class="col-6">
                <p class="m-0"><i class="pi pi-filter mr-2"></i>{{ car.fuel }}</p>
                <p class="m-0"><i class="pi pi-map-marker mr-2"></i>{{ car.location }}</p>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex justify-content-between align-items-center">
              <span class="text-xl font-bold">{{ car.price }} €</span>
              <Button label="Деталі" icon="pi pi-arrow-right" class="p-button-text" />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Button from 'primevue/button'

defineProps({
  cars: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.car-grid {
  margin: 0 -0.5rem;
}

.car-image {
  height: 200px;
  object-fit: cover;
}

/* Hover ефекти */
.hover\:shadow-4:hover {
  box-shadow: var(--shadow-4);
}

/* Переходи */
.transition-shadow {
  transition: box-shadow 0.2s ease-in-out;
}

.transition-duration-150 {
  transition-duration: 150ms;
}
</style> 