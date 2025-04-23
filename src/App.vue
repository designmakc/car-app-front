<!-- Based on: PrimeVue/Layout -->
<template>
  <div id="app" class="app-wrapper">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Footer from './components/layout/Footer.vue'
import Header from './components/layout/Header.vue'
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
</style>
