<!-- Based on: PrimeVue/Layout -->
<template>
  <div class="design-system-view">
    <AppHeader />
    <main class="main-content">
      <DesignSystem />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import Header from '@/components/layout/Header.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import DesignSystem from '@/components/design/DesignSystem.vue'
</script> 