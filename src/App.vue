<!-- Based on: PrimeVue/Layouts -->
<template>
  <div id="app" class="flex flex-column">
    <Header class="w-full" />
    
    <main>
      <!-- Контейнер с ограниченной шириной -->
      <div class="grid mx-auto w-full max-w-full">
        <router-view class="col-12 " />
      </div>
    </main>

    <!-- MobileNavbar тільки для мобільних пристроїв -->
    <MobileNavbar class="d-md-none" />
    <Footer class="w-full mt-auto" />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Footer from './layouts/Footer.vue'
import Header from './layouts/Header.vue'
import MobileNavbar from './components/MobileNavbar.vue'
</script>

<style>

</style>
