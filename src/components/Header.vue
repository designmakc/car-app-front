<template>
  <header class="w-full bg-gray-900">
    <!-- Desktop Header -->
    <div class="hidden lg:flex justify-between items-center py-4 text-white w-full">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <img src="/logo.svg" alt="Car Market" class="h-8" />
        <div class="flex flex-col">
          <span class="font-medium">Авторинок</span>
          <span class="text-gray-400 text-sm">без меж ©</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex items-center gap-8">
        <Button 
          label="Каталог автомобілів" 
          text
          class="text-white hover:text-primary"
        />
        <Button 
          label="Про авторинок" 
          text
          class="text-white hover:text-primary"
        />
        <Button 
          label="Умови розміщення" 
          text
          class="text-white hover:text-primary"
        />
        <Button 
          label="Авто в кредит" 
          text
          class="text-white hover:text-primary"
        />
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <Button 
          label="Обране" 
          icon="pi pi-heart"
          outlined
          class="border-primary text-primary hover:bg-primary hover:text-white"
        />
        <Button 
          label="Увійти" 
          class="bg-primary hover:bg-primary-600"
        />
      </div>
    </div>

    <!-- Mobile Header -->
    <div class="flex lg:hidden justify-between items-center px-4 py-3 text-white w-full">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <img src="/logo.svg" alt="Car Market" class="h-6" />
        <div class="flex flex-col">
          <span class="font-medium text-sm">Авторинок</span>
          <span class="text-gray-400 text-xs">без меж ©</span>
        </div>
      </div>

      <!-- Mobile Actions -->
      <div class="flex items-center gap-3">
        <Button 
          icon="pi pi-heart"
          text
          class="text-white p-2"
        />
        <Button 
          label="Увійти" 
          size="small"
          class="bg-primary hover:bg-primary-600"
        />
        <Button
          icon="pi pi-bars"
          text
          class="text-white p-2"
          @click="showMobileMenu = true"
        />
      </div>
    </div>

    <!-- Mobile Menu Sidebar -->
    <Sidebar 
      v-model:visible="showMobileMenu" 
      position="right"
      class="w-full sm:w-[320px]"
    >
      <div class="flex flex-col gap-4 p-4">
        <Button 
          label="Каталог автомобілів" 
          text
          class="justify-start text-gray-700 hover:text-primary"
        />
        <Button 
          label="Про авторинок" 
          text
          class="justify-start text-gray-700 hover:text-primary"
        />
        <Button 
          label="Умови розміщення" 
          text
          class="justify-start text-gray-700 hover:text-primary"
        />
        <Button 
          label="Авто в кредит" 
          text
          class="justify-start text-gray-700 hover:text-primary"
        />
      </div>
    </Sidebar>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Sidebar from 'primevue/sidebar'

const showMobileMenu = ref(false)
</script>

<style scoped>
:deep(.p-button.p-button-text) {
  padding: 0;
}

:deep(.p-button.p-button-outlined) {
  border-width: 2px;
}

:deep(.p-sidebar-right) {
  margin-top: 60px;
}
</style> 