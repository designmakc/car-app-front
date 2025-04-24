<template>
  <div class="bg-orange-500 p-4 text-white shadow-2 border-round-lg">
    <h3 class="mt-0 mb-2 text-xl font-bold">Статистика на сьогодні</h3>
    <div class="flex align-items-center text-sm mb-2">
      <i class="pi pi-map-marker mr-2"></i>
      <span>Житомир</span> <!-- Поки що статично, можна зробити пропсом -->
    </div>
    <div class="grid text-center">
      <div class="col-4 flex align-items-center gap-2">
        <div class="text-5xl text-900 font-bold">273</div>
        <div class="text-sm text-left text-orange-100 line-height-2">Авто на <br/> майданчику</div>
      </div>
      <div class="col-4 flex align-items-center gap-2">
        <div class="text-5xl text-900 text-black-alpha-90 font-bold">72</div>
        <div class="text-sm text-left text-orange-100 line-height-2">Продано <br/> за місяць</div>
      </div>
      <div class="col-4 flex align-items-center gap-2">
        <div class="text-5xl text-900 text-black-alpha-90 font-bold">3368</div>
        <div class="text-sm text-left text-orange-100 line-height-2">Продано <br/> всього</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Поки що без скриптів, якщо дані будуть динамічними, додамо props
</script>

<style scoped>


</style> 