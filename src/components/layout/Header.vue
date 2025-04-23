<template>
  <header class="surface-900 sticky top-0 z-5">
    <div class="container">
      <!-- Desktop Header -->
      <div class="hidden lg:flex justify-content-between align-items-center py-3">
        <div class="flex align-items-center gap-4">
          <router-link to="/" class="no-underline flex align-items-center">
            <img src="@/assets/logo-orang2.svg" alt="CarMarket Logo" height="40" />
          </router-link>
          <span class="text-500 font-medium">Авторинок без меж ©</span>
        </div>

        <nav class="flex gap-4 align-items-center">
          <router-link to="/catalog">
            <Button label="Каталог автомобілів" variant="text" />
          </router-link>

          <router-link to="/about">
            <Button label="Про авторинок" variant="text" to="/about" />
          </router-link>

          <router-link to="/terms">
            <Button label="Умови розміщення" variant="text" />
          </router-link>
          <router-link to="/credit">
            <Button label="Авто в кредит" variant="text" />
          </router-link>
          
          <div class="flex gap-2 align-items-center">
            <Button icon="pi pi-heart" class="p-button-rounded " severity="secondary" aria-label="Обране" />
            <Button label="Увійти" icon="pi pi-user" severity="warning" />
          </div>
        </nav>
      </div>

      <!-- Tablet Header -->
      <div class="hidden md:flex lg:hidden justify-content-between align-items-center py-3">
        <div class="flex align-items-center">
          <router-link to="/" class="no-underline">
            <img src="@/assets/logo-orang2.svg" alt="CarMarket Logo" height="40" />
          </router-link>
        </div>

        <div class="flex gap-2 align-items-center">
          <Button icon="pi pi-heart" class="p-button-rounded p-button-outlined" severity="secondary" aria-label="Обране" />
          <Button label="Увійти" icon="pi pi-user" class="p-button-rounded" severity="warning" />
          <Button icon="pi pi-bars" class="p-button-rounded p-button-text" severity="secondary" aria-label="Меню" />
        </div>
      </div>

      <!-- Mobile Header -->
      <div class="flex md:hidden justify-content-between align-items-center py-3">
        <router-link to="/" class="no-underline">
          <img src="@/assets/logo-orang2.svg" alt="CarMarket Logo" height="32" />
        </router-link>

        <div class="flex gap-2 align-items-center">
          <Button label="Увійти" class="p-button-rounded" severity="warning" />
          <Button icon="pi pi-bars" class="p-button-rounded p-button-text" severity="secondary" aria-label="Меню" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
</script>

<style scoped>

</style> 