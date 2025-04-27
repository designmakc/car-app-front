<!-- Based on: PrimeVue/Layouts -->
<template>
  <div id="app" class="flex flex-column min-h-screen">
    <Header class="w-full fixed top-0 z-5 shadow-1" />
    
    <main class="flex-grow-1 mt-0 pt-0">
      <!-- Контейнер с ограниченной шириной -->
      <div class="grid mx-auto w-full" style="max-width: 1200px;">
        <router-view class="col-12 " />
      </div>
    </main>
    
    <Footer class="w-full surface-ground mt-auto" />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Footer from './layouts/Footer.vue'
import Header from './layouts/Header.vue'
</script>

<style>
.app-wrapper {
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

/* Глобальні стилі */
:root {
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
  width: 100vw;
  overflow-x: hidden;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
}

@media screen and (max-width: 576px) {
  .container {
    padding: 0 0.5rem;
  }
}
</style>
