<!-- Based on: PrimeVue/Button -->
<template>
  <footer class="surface-900 border-top-1 surface-border">
    <div class="container py-6">
      <div class="grid">
        <div class="col-12 md:col-6 lg:col-3">
          <h3 class="text-xl font-medium text-0 mb-4">Про нас</h3>
          <ul class="list-none p-0">
            <li class="mb-2">
              <a href="#" class="text-500 hover:text-0 no-underline transition-colors transition-duration-200">Про компанію</a>
            </li>
            <li class="mb-2">
              <a href="#" class="text-500 hover:text-0 no-underline transition-colors transition-duration-200">Контакти</a>
            </li>
            <li class="mb-2">
              <a href="#" class="text-500 hover:text-0 no-underline transition-colors transition-duration-200">Вакансії</a>
            </li>
          </ul>
        </div>
        
        <div class="col-12 md:col-6 lg:col-3">
          <h3 class="text-xl font-medium text-0 mb-4">Послуги</h3>
          <ul class="list-none p-0">
            <li class="mb-2">
              <a href="#" class="text-500 hover:text-0 no-underline transition-colors transition-duration-200">Продаж авто</a>
            </li>
            <li class="mb-2">
              <a href="#" class="text-500 hover:text-0 no-underline transition-colors transition-duration-200">Купівля авто</a>
            </li>
            <li class="mb-2">
              <a href="#" class="text-500 hover:text-0 no-underline transition-colors transition-duration-200">Оцінка авто</a>
            </li>
          </ul>
        </div>

        <div class="col-12 md:col-6 lg:col-3">
          <h3 class="text-xl font-medium text-0 mb-4">Інформація</h3>
          <ul class="list-none p-0">
            <li class="mb-2">
              <a href="#" class="text-500 hover:text-0 no-underline transition-colors transition-duration-200">Умови використання</a>
            </li>
            <li class="mb-2">
              <a href="#" class="text-500 hover:text-0 no-underline transition-colors transition-duration-200">Політика конфіденційності</a>
            </li>
            <li class="mb-2">
              <a href="#" class="text-500 hover:text-0 no-underline transition-colors transition-duration-200">Cookie політика</a>
            </li>
          </ul>
        </div>

        <div class="col-12 md:col-6 lg:col-3">
          <h3 class="text-xl font-medium text-0 mb-4">Слідкуйте за нами</h3>
          <div class="flex gap-3">
            <a href="#" class="text-500 hover:text-0 transition-colors transition-duration-200">
              <i class="pi pi-facebook text-2xl"></i>
            </a>
            <a href="#" class="text-500 hover:text-0 transition-colors transition-duration-200">
              <i class="pi pi-instagram text-2xl"></i>
            </a>
            <a href="#" class="text-500 hover:text-0 transition-colors transition-duration-200">
              <i class="pi pi-telegram text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="border-top-1 surface-border-200">
      <div class="container py-3">
        <div class="text-500 text-center">
          © 2024 CarMarket. Всі права захищені.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Button from 'primevue/button'
</script>

<style scoped>
.app-footer {
  background: var(--surface-card);
  padding: 2rem;
  margin-top: 2rem;
}

.app-footer h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.app-footer p {
  color: var(--text-color-secondary);
  line-height: 1.5;
}
</style> 