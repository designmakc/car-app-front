<!-- Based on: PrimeVue/Form -->
<template>
  <div class="car-sell-form">
    <div class="flex flex-wrap grid">
      <!-- Марка автомобіля -->
      <div class="col-12 w-full">
        <FloatLabel variant="in">
          <Select
            v-model="selectedBrand"
            :options="sortedBrands"
            filter
            optionLabel="name"
            placeholder="Марка автомобіля"
            class="w-full"
            @change="handleBrandChange"
            variant="filled"
            size="large"
            :class="{ 'p-invalid': submitted && !selectedBrand }"
          />
          <label></label>
        </FloatLabel>
        <small v-if="submitted && !selectedBrand" class="p-error">Оберіть марку автомобіля</small>
      </div>

      <!-- Модель автомобіля -->
      <div class="col-12 w-full">
        <FloatLabel variant="in">
          <Select
            v-model="selectedModel"
            :options="filteredModels"
            filter
            optionLabel="name"
            class="w-full"
            variant="filled"
            size="large"
            :placeholder="modelPlaceholder"
            :inputStyle="inputStyle"
            :disabled="!selectedBrand"
            :class="{ 'p-invalid': submitted && !selectedModel }"
          />
          <label></label>
        </FloatLabel>
        <small v-if="submitted && !selectedModel" class="p-error">Оберіть модель автомобіля</small>
      </div>

      <!-- Рік випуску -->
      <div class="col-12 md:col-6">
        <FloatLabel variant="in">
          <InputMask
            v-model="year"
            mask="9999"
            autocomplete="off"
            variant="filled"
            size="large"
            class="w-full"
            :class="{ 'p-invalid': submitted && !year }"
          />
          <label>Рік випуску</label>
        </FloatLabel>
        <small v-if="submitted && !year" class="p-error">Введіть рік випуску</small>
      </div>

      <!-- Ціна -->
      <div class="col-12 md:col-6">
        <FloatLabel variant="in">
          <IconField>
            <InputIcon class="pi pi-dollar" />
            <InputNumber
              v-model="price"
              autocomplete="off"
              variant="filled"
              size="large"
              class="w-full"
              :class="{ 'p-invalid': submitted && !price }"
            />
          </IconField>
          <label>Ціна</label>
        </FloatLabel>
        <small v-if="submitted && !price" class="p-error">Вкажіть ціну</small>
      </div>

      <!-- Телефон -->
      <div class="col-12">
        <FloatLabel variant="in">
          <InputMask
            v-model="phone"
            mask="+38 999 999 99 99"
            autocomplete="off"
            variant="filled"
            size="large"
            class="w-full"
            :class="{ 'p-invalid': submitted && !isValidPhone }"
          />
          <label>Номер телефону</label>
        </FloatLabel>
        <small v-if="submitted && !phone" class="p-error">Введіть номер телефону</small>
        <small v-else-if="submitted && phone && !isValidPhone" class="p-error">Введіть повний номер телефону</small>
      </div>

      <!-- Кнопка -->
      <div class="col-12">
        <Button
          label="Продати авто"
          icon="pi pi-plus-circle"
          size="large"
          severity="success"
          class="w-full"
          @click="validateAndSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import FloatLabel from 'primevue/floatlabel'
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import Button from 'primevue/button'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

const router = useRouter()
const selectedBrand = ref(null)
const selectedModel = ref(null)
const year = ref(null)
const price = ref(null)
const phone = ref('')
const submitted = ref(false)

const brands = ref([
  { name: 'Toyota', code: 'toyota', models: ['Corolla', 'Camry', 'RAV4'] },
  { name: 'BMW', code: 'bmw', models: ['X3', 'X5', '3 Series', '5 Series'] },
  { name: 'Mercedes', code: 'mercedes', models: ['C-Class', 'E-Class', 'GLC', 'GLE'] }
])

const sortedBrands = computed(() => {
  return [...brands.value].sort((a, b) => a.name.localeCompare(b.name))
})

const allModels = computed(() => {
  return brands.value.flatMap(brand =>
    brand.models.map(model => ({
      name: model,
      brandCode: brand.code
    }))
  )
})

const handleBrandChange = () => {
  selectedModel.value = null
}

const filteredModels = computed(() => {
  if (!selectedBrand.value) return []
  return allModels.value
    .filter(model => model.brandCode === selectedBrand.value.code)
    .sort((a, b) => a.name.localeCompare(b.name))
})

const modelPlaceholder = computed(() => {
  return selectedBrand.value ? 'Оберіть модель' : 'Спочатку оберіть марку'
})

const inputStyle = computed(() => {
  return !selectedBrand.value ? { cursor: 'not-allowed', opacity: 0.3 } : null
})

// Перевірка валідності телефонного номера
const isValidPhone = computed(() => {
  if (!phone.value) return false
  // Перевіряємо, чи повністю заповнений номер телефону
  return !phone.value.includes('_')
})

// Перевірка валідності форми
const isFormValid = computed(() => {
  return (
    !!selectedBrand.value &&
    !!selectedModel.value &&
    !!year.value &&
    !!price.value &&
    !!phone.value &&
    isValidPhone.value
  )
})

// Функція валідації і переходу на детальну форму
const validateAndSubmit = () => {
  submitted.value = true

  if (isFormValid.value) {
    // Підготуємо дані для передачі на сторінку з детальною формою
    const carData = {
      brand: selectedBrand.value?.name,
      brandCode: selectedBrand.value?.code,
      model: selectedModel.value?.name,
      year: year.value,
      price: price.value,
      phone: phone.value
    }
    
    // Переходимо на сторінку з детальною формою, передаючи дані через query параметри
    router.push({
      path: '/sell-car-details',
      query: carData
    })
  } else {
    // Прокручуємо до першої помилки
    const firstError = document.querySelector('.p-invalid')
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
}
</script>

<style scoped>
.p-error {
  color: #f44336;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.p-invalid {
  border-color: #f44336 !important;
}
</style> 