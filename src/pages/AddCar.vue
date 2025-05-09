<template>
  <MainLayout>
    <div class="container mx-auto  p-4">
      <h1 class="text-2xl font-bold mb-4">Додати нове оголошення</h1>
      <AddCarForm />
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import AddCarForm from '@/components/cars/AddCarForm.vue'
</script> 