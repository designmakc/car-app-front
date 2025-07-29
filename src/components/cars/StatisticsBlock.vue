<template>
  <div class="grid gap-3 md:gap-4 bg-orange-500 p-3 md:p-4 text-white border-round-lg m-0">
    <h3 class="text-xl md:text-2xl font-bold mt-0 w-full">Статистика на сьогодні</h3>
    <div class="flex text-sm w-full">
      <i class="pi pi-map-marker mr-2"></i>
      <span>Житомир</span> <!-- Поки що статично, можна зробити пропсом -->
    </div>
    <div class="col-12 p-0 flex">
      <div class="col-4 p-0  m-0 flex-none lg:flex gap-2   align-items-center ">
        <h4 class="text-xl sm:text-3xl md:text-4xl lg:text-5xl text-900 font-text-black-alpha-90 font-bold m-0">273</h4>
        <div class="text-xs sm:text-xs md:text-sm lg:text-sm text-left text-orange-100 line-height-2">Авто на <br/> майданчику</div>
      </div>
      <div class="col-4 p-0 m-0 flex-none lg:flex gap-2  align-items-center">
        <h4 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-900 font-text-black-alpha-90 font-bold m-0">72</h4>
        <div class="text-xs sm:text-xs md:text-sm lg:text-sm text-left text-orange-100 line-height-2">Продано <br/> за місяць</div>
      </div>
      <div class="col-4 p-0 m-0 flex-none lg:flex gap-2  align-items-center">
        <h4 class="text-2xl md:text-3xl lg:text-5xl text-900 font-text-black-alpha-90 font-bold m-0">3368</h4>
        <div class="text-xs sm:text-xs md:text-sm lg:text-sm text-left text-orange-100 line-height-2">Продано <br/> всього</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Поки що без скриптів, якщо дані будуть динамічними, додамо props
</script>

<style scoped>


</style> 