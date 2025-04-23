<!-- Based on: PrimeVue/Dialog, Toast -->
<template>
  <Dialog
    v-model:visible="visible"
    modal
    :style="{ width: '90vw', maxWidth: '600px' }"
    :header="isEdit ? 'Редагувати оголошення' : 'Додати оголошення'"
  >
    <div class="grid">
      <div class="col-12">
        <div class="p-fluid">
          <div class="field">
            <label for="title">Назва автомобіля</label>
            <InputText id="title" v-model="car.title" required />
          </div>

          <div class="field">
            <label for="brand">Марка</label>
            <Dropdown
              id="brand"
              v-model="car.brand"
              :options="brands"
              optionLabel="name"
              placeholder="Виберіть марку"
            />
          </div>

          <div class="field">
            <label for="year">Рік випуску</label>
            <InputNumber id="year" v-model="car.year" :min="1900" :max="2024" />
          </div>

          <div class="field">
            <label for="price">Ціна (€)</label>
            <InputNumber id="price" v-model="car.price" :min="0" mode="currency" currency="EUR" />
          </div>

          <div class="field">
            <label for="mileage">Пробіг (км)</label>
            <InputNumber id="mileage" v-model="car.mileage" :min="0" />
          </div>

          <div class="field">
            <label for="fuel">Тип палива</label>
            <Dropdown
              id="fuel"
              v-model="car.fuel"
              :options="fuelTypes"
              placeholder="Виберіть тип палива"
            />
          </div>

          <div class="field">
            <label for="location">Місцезнаходження</label>
            <InputText id="location" v-model="car.location" />
          </div>

          <div class="field">
            <label for="description">Опис</label>
            <Textarea id="description" v-model="car.description" rows="5" />
          </div>

          <div class="field">
            <label for="images">Фотографії</label>
            <FileUpload
              mode="basic"
              :multiple="true"
              accept="image/*"
              :maxFileSize="10000000"
              @upload="onUpload"
              chooseLabel="Додати фото"
            />
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <Button
        label="Скасувати"
        icon="pi pi-times"
        @click="visible = false"
        class="p-button-text"
      />
      <Button
        label="Зберегти"
        icon="pi pi-check"
        @click="saveCar"
        :loading="loading"
      />
    </template>
  </Dialog>

  <Toast />
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false
  },
  initialData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['save', 'update:visible'])
const toast = useToast()

const visible = ref(false)
const loading = ref(false)

const car = ref({
  title: '',
  brand: null,
  year: null,
  price: null,
  mileage: null,
  fuel: null,
  location: '',
  description: '',
  images: []
})

const brands = ref([
  { name: 'Toyota', code: 'toyota' },
  { name: 'Honda', code: 'honda' },
  { name: 'BMW', code: 'bmw' }
])

const fuelTypes = ref(['Бензин', 'Дизель', 'Електро', 'Гібрид'])

const onUpload = (event) => {
  car.value.images = [...car.value.images, ...event.files]
}

const saveCar = async () => {
  loading.value = true
  try {
    // Тут буде логіка збереження
    emit('save', car.value)
    toast.add({
      severity: 'success',
      summary: 'Успіх',
      detail: 'Оголошення успішно збережено',
      life: 3000
    })
    visible.value = false
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Не вдалося зберегти оголошення',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 1.5rem;
}

.field label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color-secondary);
}
</style> 