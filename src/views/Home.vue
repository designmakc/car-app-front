<template>
  <div class="flex align-items-center justify-content-center min-h-screen surface-ground">
    <div class="w-full max-w-8 px-4 py-8 surface-card border-round shadow-2">
      <h1 class="text-4xl mb-4 font-medium text-900">Ласкаво просимо</h1>
      <p class="text-xl line-height-3 text-700">
        Це головна сторінка нашого додатку. Для перегляду всіх компонентів та стилів, перейдіть на сторінку 
        <router-link to="/design-system" class="text-primary font-medium no-underline hover:text-primary-600 transition-colors transition-duration-150">Дизайн система</router-link>
      </p>
      <div class="mt-5 flex align-items-center gap-3">
        <router-link to="/cars" class="p-button p-component text-xl">
          Переглянути автомобілі
        </router-link>
        <router-link to="/about" class="p-button p-component p-button-outlined text-xl">
          Про нас
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// ... existing code ...
</script>

<!-- Видаляємо секцію зі стилями, оскільки використовуємо тільки класи PrimeVue/PrimeFlex --> 