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
    
    <Footer class="w-full surface-ground mt-auto" />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Footer from './layouts/Footer.vue'
import Header from './layouts/Header.vue'
</script>

<style>

</style>
