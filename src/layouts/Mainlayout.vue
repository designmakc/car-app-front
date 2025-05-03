<!-- Based on: PrimeVue/Layouts -->
<template>
  <div id="app" class="flex flex-column">
    <Header class="w-full" />
    
    <main>
      <div class="container">
        <slot />
      </div>
    </main>

    <!-- MobileNavbar для sm та md екранів -->
    <MobileNavbar class="block lg:hidden" /> 
    <Footer class="w-full mt-auto" />
  </div>
</template>

<script setup>
import Footer from '@/layouts/Footer.vue'
import Header from '@/layouts/Header.vue'
import MobileNavbar from '@/components/MobileNavbar.vue'
import PopularBrands from '@/components/cars/PopularBrands.vue'
</script>

<style>

</style>

  