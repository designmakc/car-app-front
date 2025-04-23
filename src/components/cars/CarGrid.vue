<!-- Based on: PrimeVue/Grid -->
<template>
  <div class="car-grid">
    <div class="grid">
      <div v-for="car in cars" :key="car.id" class="col-12 md:col-6 lg:col-3">
        <Card class="h-full">
          <template #header>
            <div class="relative">
              <img :src="car.image" :alt="car.title" class="w-full" />
              <div class="absolute top-0 right-0 m-2">
                <Tag v-if="car.isTop" value="TOP" severity="danger" />
                <Tag v-if="car.isOnSite" value="На майданчику" severity="success" />
              </div>
            </div>
          </template>
          <template #title>
            {{ car.title }}
          </template>
          <template #content>
            <div class="grid">
              <div class="col-6">
                <p class="m-0"><i class="pi pi-car mr-2"></i>{{ car.mileage }}</p>
                <p class="m-0"><i class="pi pi-map-marker mr-2"></i>{{ car.location }}</p>
              </div>
              <div class="col-6">
                <p class="m-0"><i class="pi pi-filter mr-2"></i>{{ car.fuel }}</p>
                <p class="m-0 text-xl font-bold">{{ car.price }}</p>
              </div>
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

defineProps({
  cars: {
    type: Array,
    required: true
  }
})
</script> 