<template>
  <div class="flex align-items-center justify-content-center min-h-screen">
    <div class="w-full max-w-8 px-4">
      <h1 class="text-4xl mb-4 font-medium">Ласкаво просимо</h1>
      <p class="text-xl line-height-3">
        Це головна сторінка нашого додатку. Для перегляду всіх компонентів та стилів, перейдіть на сторінку 
        <router-link to="/design-system" class="text-primary-600 no-underline hover:text-primary-700">Дизайн система</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.p-home {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.p-link {
  color: var(--p-primary-600);
  text-decoration: none;
}

.p-link:hover {
  color: var(--p-primary-700);
}
</style> 