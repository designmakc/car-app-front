<template>
  <div class="home">
    <h1>Ласкаво просимо</h1>
    <p>Це головна сторінка нашого додатку. Для перегляду всіх компонентів та стилів, перейдіть на сторінку 
      <router-link to="/design-system">Дизайн система</router-link>
    </p>
  </div>
</template>

<style scoped>
.home {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

a {
  color: var(--p-primary-600);
  text-decoration: none;
}

a:hover {
  color: var(--p-primary-700);
}
</style> 