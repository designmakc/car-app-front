<!-- Based on: PrimeVue/Form -->
<template>
  <div class="car-sell-form">
    <div class="grid">
      <div class="col-12">
        <Dropdown
          v-model="selectedBrand"
          :options="brands"
          optionLabel="name"
          placeholder="Марка"
          class="w-full"
        />
      </div>
      <div class="col-12">
        <Dropdown
          v-model="selectedModel"
          :options="models"
          placeholder="Оберіть модель"
          class="w-full"
        />
      </div>
      <div class="col-6">
        <InputNumber
          v-model="year"
          placeholder="Рік випуску"
          class="w-full"
        />
      </div>
      <div class="col-6">
        <InputNumber
          v-model="price"
          placeholder="Ціна"
          mode="currency"
          currency="USD"
          class="w-full"
        />
      </div>
      <div class="col-12">
        <InputText
          v-model="phone"
          placeholder="Номер телефону"
          class="w-full"
        />
      </div>
      <div class="col-12">
        <Button label="Продати авто" severity="success" class="w-full" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const selectedBrand = ref(null)
const selectedModel = ref(null)
const year = ref(null)
const price = ref(null)
const phone = ref('')

const brands = ref([
  { name: 'Toyota', code: 'toyota' },
  { name: 'BMW', code: 'bmw' },
  { name: 'Mercedes', code: 'mercedes' }
])

const models = ref([])
</script> 