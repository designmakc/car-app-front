<!-- Based on: PrimeVue/Layouts -->
<template>
  <div id="app" class="flex flex-column min-h-screen">
    <Header class="w-full"/>
    <div class="flex-grow-1 mx-auto w-full px-4 xl:px-0  " style="max-width: 1200px;">
    <router-view></router-view>
    </div>
    <Footer class="w-full" />
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
</style>
