<!-- Based on: PrimeVue/Card, Tag -->
<template>
  <Card class="car-card">
    <template #header>
      <div class="relative">
        <img :src="car.image" :alt="car.title" class="w-full" />
        <div class="absolute top-0 right-0 m-2">
          <Tag v-if="car.isTop" value="TOP" severity="danger" />
          <Tag v-if="car.isOnSite" value="На майданчику" severity="success" />
          <Tag v-if="car.isSold" value="Продано" severity="warning" />
        </div>
      </div>
    </template>
    <template #title>
      {{ car.title }}
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
</template>

<script setup>
import { defineProps } from 'vue'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Button from 'primevue/button'

const props = defineProps({
  car: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        value.title &&
        value.price &&
        value.year &&
        value.mileage &&
        value.fuel &&
        value.location &&
        value.image
      )
    }
  }
})
</script>

<style scoped>
.car-card {
  height: 100%;
}

.car-card :deep(.p-card-content) {
  padding: 1rem 0;
}

.car-card img {
  height: 200px;
  object-fit: cover;
}
</style> 