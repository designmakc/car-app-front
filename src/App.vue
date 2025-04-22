<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <Header />
  <RouterView />
</template>

<style scoped>
.p-app {
  min-height: 100vh;
}

.p-nav {
  padding: 1rem 2rem;
  background-color: var(--p-surface-0);
  border-bottom: 1px solid var(--p-surface-200);
}

.p-nav-link {
  margin-right: 1rem;
  color: var(--p-primary-600);
  text-decoration: none;
  font-weight: 500;
}

.p-nav-link:hover {
  color: var(--p-primary-700);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.button-demo {
  margin: 2rem 0;
}

.ml-2 {
  margin-left: 0.5rem;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
