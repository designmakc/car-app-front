<!--
/**
 * Компонент кроку форми додавання автомобіля
 * 
 * @component
 */
-->

<template>
  <div class="car-form-step">
    <h3 class="mb-3">{{ title }}</h3>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.car-form-step {
  margin-bottom: 2rem;
}
</style> 