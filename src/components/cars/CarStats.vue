<!-- Based on: PrimeVue/Card -->
<template>
  <div class="car-stats">
    <div class="grid">
      <div class="col-12">
        <h3 class="mb-3">Статистика на сьогодні</h3>
      </div>
      <div class="col-4 text-center">
        <div class="text-4xl text-primary font-bold">273</div>
        <div class="text-sm">авто на майданчику</div>
      </div>
      <div class="col-4 text-center">
        <div class="text-4xl text-primary font-bold">72</div>
        <div class="text-sm">продано авто</div>
      </div>
      <div class="col-4 text-center">
        <div class="text-4xl text-primary font-bold">3368</div>
        <div class="text-sm">продано всього</div>
      </div>
    </div>

    <div class="mt-4">
      <h4 class="mb-3">Нові авто за</h4>
      <div class="flex gap-2 mb-3">
        <Button label="Сьогодні" class="p-button-outlined" />
        <Button label="Два дні" class="p-button-outlined" />
        <Button label="Три дні" class="p-button-outlined" />
        <Button label="Тиждень" class="p-button-outlined" />
      </div>
      <div class="flex gap-2">
        <Button label="Автомат до 5000$" class="p-button-outlined" />
        <Button label="5000-7000$" class="p-button-outlined" />
        <Button label="Електро" class="p-button-outlined" />
        <Button label="Універсал" class="p-button-outlined" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
</script> 