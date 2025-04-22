<script setup>
import { ref } from 'vue'

const title = ref('Моє Vue 3 Додаток')
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>{{ title }}</h1>
    </header>
    
    <main class="main">
      <p>Ласкаво просимо до Vue 3 додатку!</p>
    </main>
  </div>
</template>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.main {
  background-color: var(--surface-card);
  padding: 2rem;
  border-radius: 6px;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,0.2),
              0 1px 1px 0 rgba(0,0,0,0.14),
              0 1px 3px 0 rgba(0,0,0,0.12);
}
</style> 