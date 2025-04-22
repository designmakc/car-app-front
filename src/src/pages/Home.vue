<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'

const count = ref(0)

const increment = () => {
  count.value++
}
</script>

<template>
  <div class="home">
    <h2>Головна сторінка</h2>
    <div class="card">
      <Button label="Натисни мене" @click="increment" />
      <p>Кількість натискань: {{ count }}</p>
    </div>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
}

.card {
  padding: 2rem;
  margin-top: 2rem;
}
</style> 