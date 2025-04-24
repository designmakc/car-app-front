<template>
  <footer class="footer-wrapper surface-900">
    <div class="container">
      <!-- Логотип та опис -->
      <div class="mb-4">
        <router-link to="/" class="no-underline">
          <img src="@/assets/logo-grey.svg" alt="CarMarket Logo" height="32" />
        </router-link>
        <p class="text-500 mt-2 mb-4 text-sm">
          Авторинок без меж © Продавай та купуй авто безпечно
        </p>
      </div>

      <!-- Основний контент -->
      <div class="grid">
        <!-- Для покупців -->
        <div class="col-12 sm:col-6 lg:col-3 mb-4">
          <h6 class="text-white mb-3">Для покупців</h6>
          <ul class="list-none p-0 m-0">
            <li class="mb-2">
              <router-link to="/catalog" class="text-500 no-underline hover:text-primary text-sm">Каталог автомобілів</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/diagnostics" class="text-500 no-underline hover:text-primary text-sm">Комп'ютерна діагностика</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/inspection" class="text-500 no-underline hover:text-primary text-sm">Огляд авто на підйомнику</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/consultation" class="text-500 no-underline hover:text-primary text-sm">Тестдрайв та консультація</router-link>
            </li>
          </ul>
        </div>

        <!-- Для продавців -->
        <div class="col-12 sm:col-6 lg:col-3 mb-4">
          <h6 class="text-white mb-3">Для продавців</h6>
          <ul class="list-none p-0 m-0">
            <li class="mb-2">
              <router-link to="/account" class="text-500 no-underline hover:text-primary text-sm">Персональний кабінет</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/register" class="text-500 no-underline hover:text-primary text-sm">Реєстрація</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/add-listing" class="text-500 no-underline hover:text-primary text-sm">Додати оголошення</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/pricing" class="text-500 no-underline hover:text-primary text-sm">Вартість розміщення</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/video" class="text-500 no-underline hover:text-primary text-sm">Відео реклама авто</router-link>
            </li>
          </ul>
        </div>

        <!-- Про нас -->
        <div class="col-12 sm:col-6 lg:col-3 mb-4">
          <h6 class="text-white mb-3">Про нас</h6>
          <ul class="list-none p-0 m-0">
            <li class="mb-2">
              <router-link to="/about" class="text-500 no-underline hover:text-primary text-sm">Про CAR MARKET</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/market" class="text-500 no-underline hover:text-primary text-sm">Авторинок</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/services" class="text-500 no-underline hover:text-primary text-sm">Додаткові послуги</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/jobs" class="text-500 no-underline hover:text-primary text-sm">Вакансії</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/contacts" class="text-500 no-underline hover:text-primary text-sm">Контакти</router-link>
            </li>
          </ul>
        </div>

        <!-- Контакти -->
        <div class="col-12 sm:col-6 lg:col-3 mb-4">
          <h6 class="text-white mb-3">Працюємо щодня</h6>
          <ul class="list-none p-0 m-0">
            <li class="mb-2 flex align-items-center gap-2">
              <i class="pi pi-map-marker text-500"></i>
              <span class="text-500 text-sm">Житомир, Петровська 271</span>
            </li>
            <li class="mb-2">
              <div class="text-500 text-sm">Пн-Пт 09:00 - 18:00</div>
              <div class="text-500 text-sm">Сб-Нд 08:00 - 18:00</div>
            </li>
            <li class="mt-3">
              <div class="flex flex-column gap-2">
                <a href="tel:067 730 08 09" class="text-500 no-underline hover:text-primary text-sm">067 730 08 09</a>
                <a href="tel:050 730 08 09" class="text-500 no-underline hover:text-primary text-sm">050 730 08 09</a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Копірайт -->
      <Divider />
      <div class="text-500 text-sm">
        © 2024 CAR MARKET. Всі права захищені
      </div>
    </div>
  </footer>
</template>

<script setup>
import Divider from 'primevue/divider';
</script>

<style scoped>
.footer-wrapper {
  width: 100%;
  margin: 0;
  padding: 2rem 0 1rem 0;
  background-color: var(--surface-900);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
}

/* Стилі для посилань */
a {
  transition: color 0.2s ease;
}

a:hover {
  color: var(--primary-color);
}

/* Адаптивні стилі */
@media screen and (max-width: 576px) {
  .footer-wrapper {
    padding: 1.5rem 0 1rem 0;
  }
  
  .container {
    padding: 0 1.5rem;
  }
}

/* Стилі для іконок */
.pi {
  font-size: 1rem;
}

:deep(.p-divider) {
  border-top: 1px solid var(--surface-500);
  margin: 1rem 0;
  opacity: 0.2;
}
</style> 