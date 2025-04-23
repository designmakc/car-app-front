<!-- Based on: PrimeVue/Layout -->
<template>
  <div class="min-h-screen flex flex-column surface-ground">
    <main class="flex-grow-1">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>
