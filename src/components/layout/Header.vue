<template>
  <div class="header-wrapper surface-900 sticky top-0 z-5 w-full ">
    <div class="container">
      <!-- Desktop Header -->
      <div class="hidden lg:flex justify-content-between align-items-center py-4 ">
        <div class="flex align-items-center gap-4">
          <router-link to="/" class="no-underline flex align-items-center">
            <img src="@/assets/logo-orang2.svg" alt="CarMarket Logo" height="32" />
          </router-link>
          <span class="text-500 font-base text-sm">Авторинок без меж ©</span>
        </div>

        <nav class="flex gap-2 align-items-center font-base font-normal text-sm font-weight-400">
          <router-link to="/catalog">
            <Button label="Каталог автомобілів" class="p-button-text text-500 hover:text-white  " />
          </router-link>

          <router-link to="/about">
            <Button label="Про авторинок" class="p-button-text text-500 hover:text-white font-weight-normal" />
          </router-link>

          <router-link to="/terms">
            <Button label="Умови розміщення" class="p-button-text text-500 hover:text-white font-weight-normal" />
          </router-link>

          <router-link to="/design-system">
            <Button label="Авто в кредит" class="p-button-text text-500 hover:text-white font-weight-normal" />
          </router-link>
          
          <div class="flex gap-2 align-items-center">
            <Button label="Обране" icon="pi pi-heart-fill" class="p-button-rounded p-button-outlined border-2 border-primary text-white hover:surface-800" aria-label="Обране" />
            <Button label="Увійти" icon="pi pi-user" class="p-button-rounded p-button-primary " />
          </div>
        </nav>
      </div>

      <!-- Tablet Header -->
      <div class="hidden md:flex lg:hidden justify-content-between align-items-center py-2">
        <div class="flex align-items-center">
          <router-link to="/" class="no-underline">
            <img src="@/assets/logo-orang2.svg" alt="CarMarket Logo" height="32" />
          </router-link>
        </div>

        <div class="flex gap-2 align-items-center">
          <Button icon="pi pi-heart" class="p-button-rounded p-button-outlined border-1 border-gray-700 text-500 hover:surface-800" aria-label="Обране" />
          <Button label="Увійти" class="p-button-rounded p-button-warning" />
          <Button icon="pi pi-bars" class="p-button-rounded p-button-text text-500 hover:text-white" aria-label="Меню" />
        </div>
      </div>

      <!-- Mobile Header -->
      <div class="flex md:hidden justify-content-between align-items-center py-2">
        <router-link to="/" class="no-underline">
          <img src="@/assets/logo-orang2.svg" alt="CarMarket Logo" height="28" />
        </router-link>

        <div class="flex gap-2 align-items-center">
          <Button label="Увійти" class="p-button-rounded p-button-warning text-sm" />
          <Button icon="pi pi-bars" class="p-button-rounded p-button-text text-500 hover:text-white" aria-label="Меню" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
</script>

<style scoped>
.header-wrapper {
  width: 100%;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid var(--surface-800);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
}

@media screen and (max-width: 576px) {
  .container {
    padding: 0 1.5rem;
  }
}

/* Стилі для кнопок */


:deep(.p-button.p-button-text:hover) {
  background: transparent;
}



/* Стилі для логотипу */
.no-underline {
  transition: opacity 0.2s ease;
}

.no-underline:hover {
  opacity: 0.8;
}

.no-underline:focus {
  outline: none;
  box-shadow: none;
}
</style> 