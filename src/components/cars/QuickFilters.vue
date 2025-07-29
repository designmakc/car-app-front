<template>
  <div class="flex flex-wrap gap-3 quick-filters mt-4">
    <div>
      <h4 class="mb-3 text-lg font-semibold mt-0">Нові авто за</h4>
      <div class="flex flex-wrap gap-2 mb-2"> <!-- flex-wrap для переносу на малих екранах -->
        <Button type="button" class="p-button-rounded border-2" label="Сьогодні" severity="secondary" variant="outlined" badge="2" badgeSeverity="contrast" outlined />

        <Button type="button" label="Два дні" severity="secondary" variant="outlined" class="p-button-rounded border-2"  badge="2" badgeSeverity="contrast" outlined />

        <Button type="button" label="Три дні" severity="secondary" variant="outlined" class="p-button-rounded border-2"  badge="2" badgeSeverity="contrast" outlined />

        <Button type="button" label="Тиждень" severity="secondary" variant="outlined" class="p-button-rounded border-2"  badge="2" badgeSeverity="contrast" outlined />
          
          
        
      </div>
    </div>
    <div>
       <h4 class="mb-3 text-lg font-semibold">Популярні запити</h4>
       <div class="flex flex-wrap gap-2 mb-2">
        <Button type="button" label="Автомат до 5000$" severity="secondary" variant="outlined" class="p-button-rounded border-2"  />
        <Button type="button" label="5000-7000$" severity="secondary" variant="outlined" class="p-button-rounded border-2" />
        <Button type="button" label="Електро" severity="success" variant="outlined" class="p-button-rounded border-2" icon="pi pi-bolt"/>
        <Button type="button" label="Універсал" severity="secondary" variant="outlined" class="p-button-rounded border-2" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import Badge from 'primevue/badge';
</script>

<style scoped>


/* Стилізація кнопок для кращої відповідності макету */

</style> 