<!-- Based on: PrimeVue/Layouts -->
<template>
  <div id="app" class="flex flex-column">
    <Header2 class="w-full" />
    
    <main>
      <!-- Контейнер с ограниченной шириной -->
      <div class="grid mx-auto w-full max-w-full">
        <router-view class="col-12 " />
      </div>
    </main>

    
    <!-- MobileNavbar для sm та md екранів -->
    <MobileNavbar class="block lg:hidden" /> 
    <Footer class="w-full mt-auto" />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Footer from './layouts/Footer.vue'
//import Header from './layouts/Header.vue'
import Header2 from './components/Header2.vue'
import MobileNavbar from './components/MobileNavbar.vue'
import PopularBrands from './components/cars/PopularBrands.vue'
</script>

<style>

</style>
