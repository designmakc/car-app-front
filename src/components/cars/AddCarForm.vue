<template>
    <Stepper value="1" class="grid col-12 gap-4">
      <!-- Крок 1: Характеристики -->
      <StepItem value="1" class="col-12 lg:col-8">
        <Step class="text-2xl font-bold">Характеристики</Step>
        <StepPanel v-slot="{ activateCallback }">
          <Card class="surface-100">
            <template #content>
              <div class="flex col gap-4">
                <div class="flex flex-column gap-4 w-full">
                  <div class="flex gap-3 align-items-start">
                    <FloatLabel class="flex-1" variant="in">
                      <Dropdown
                        v-model="form.vehicleType"
                        filter
                        showClear
                        :options="vehicleTypes"
                        optionLabel="name"
                        fluid="true"
                        class="w-full"
                        scrollHeight="20rem"
                      />
                      <label>Тип транспорту</label>
                    </FloatLabel>
                    <small class="hidden lg:block text-500 text-sm mt-3 w-12rem">Оберіть категорію транспортного засобу</small>
                  </div>

                  <div class="flex gap-3 align-items-start">
                    <FloatLabel class="flex-1" variant="in">
                      <Dropdown
                        v-model="form.brand"
                        filter
                        showClear
                        :options="brands"
                        optionLabel="name"
                        fluid="true"
                        class="w-full"
                        scrollHeight="20rem"
                      />
                      <label>Марка авто</label>
                    </FloatLabel>
                    <small class="hidden lg:block text-500 text-sm mt-3 w-12rem">Виробник автомобіля (BMW, Audi, Toyota тощо)</small>
                  </div>

                  <div class="flex gap-3 align-items-start">
                    <FloatLabel class="flex-1" variant="in">
                      <Dropdown
                        v-model="form.model"
                        filter
                        showClear
                        :options="models"
                        optionLabel="name"
                        fluid="true"
                        class="w-full"
                        scrollHeight="20rem"
                      />
                      <label>Модель авто</label>
                    </FloatLabel>
                    <small class="hidden lg:block text-500 text-sm mt-3 w-12rem">Конкретна модель обраної марки</small>
                  </div>

                  <div class="flex gap-3 align-items-start">
                    <FloatLabel class="flex-1" variant="in">
                      <InputNumber
                        v-model="form.year"
                        class="w-full"
                        :min="1900"
                        :max="new Date().getFullYear()"
                      />
                      <label>Рік випуску</label>
                    </FloatLabel>
                    <small class="hidden lg:block text-500 text-sm mt-3 w-12rem">Рік виготовлення автомобіля</small>
                  </div>

                  <div class="flex gap-3 align-items-start">
                    <FloatLabel class="flex-1" variant="in">
                      <Dropdown
                        v-model="form.bodyType"
                        filter
                        showClear
                        :options="bodyTypesList"
                        optionLabel="name"
                        fluid="true"
                        class="w-full"
                      />
                      <label>Тип кузова</label>
                    </FloatLabel>
                    <small class="text-500 text-sm mt-3 w-12rem">Седан, хетчбек, універсал тощо</small>
                  </div>

                  <div class="flex gap-3 align-items-start">
                    <FloatLabel class="flex-1" variant="in">
                      <Dropdown
                        v-model="form.generation"
                        filter
                        showClear
                        :options="generationsList"
                        optionLabel="name"
                        fluid="true"
                        class="w-full"
                        scrollHeight="20rem"
                      />
                      <label>Покоління</label>
                    </FloatLabel>
                    <small class="text-500 text-sm mt-3 w-12rem">Покоління моделі (рестайлінг)</small>
                  </div>

                  <div class="flex gap-3 align-items-start">
                    <FloatLabel class="flex-1" variant="in">
                      <Dropdown
                        v-model="form.fuelType"
                        filter
                        showClear
                        :options="fuelTypesList"
                        optionLabel="name"
                        fluid="true"
                        class="w-full"
                        scrollHeight="20rem"
                      />
                      <label>Двигун (топливо)</label>
                    </FloatLabel>
                    <small class="text-500 text-sm mt-3 w-12rem">Тип палива: бензин, дизель, гібрид</small>
                  </div>

                  <div class="flex gap-3 align-items-start">
                    <FloatLabel class="flex-1" variant="in">
                      <Dropdown
                        v-model="form.driveType"
                        filter
                        showClear
                        :options="driveTypesList"
                        optionLabel="name"
                        fluid="true"
                        class="w-full"
                        scrollHeight="20rem"
                      />
                      <label>Привід</label>
                    </FloatLabel>
                    <small class="text-500 text-sm mt-3 w-12rem">Передній, задній або повний привід</small>
                  </div>

                  <div class="flex gap-3 align-items-start">
                    <FloatLabel class="flex-1" variant="in">
                      <Dropdown
                        v-model="form.transmission"
                        filter
                        showClear
                        :options="transmissionsList"
                        optionLabel="name"
                        fluid="true"
                        class="w-full"
                        scrollHeight="20rem"
                      />
                      <label>Коробка передач</label>
                    </FloatLabel>
                    <small class="text-500 text-sm mt-3 w-12rem">Механічна, автоматична, варіатор</small>
                  </div>

                  <div class="flex gap-3 align-items-start">
                    <FloatLabel class="flex-1" variant="in">
                      <Dropdown
                        v-model="form.modification"
                        filter
                        showClear
                        :options="modifications"
                        optionLabel="name"
                        fluid="true"
                        class="w-full"
                        scrollHeight="20rem"
                      />
                      <label>Модифікація</label>
                    </FloatLabel>
                    <small class="text-500 text-sm mt-3 w-12rem">Об'єм та потужність двигуна</small>
                  </div>

                  <div class="flex gap-3 align-items-start">
                    <FloatLabel class="flex-1" variant="in">
                      <Dropdown
                        v-model="form.color"
                        filter
                        showClear
                        :options="colorsList"
                        optionLabel="name"
                        fluid="true"
                        class="w-full"
                        scrollHeight="20rem"
                      />
                      <label>Колір</label>
                    </FloatLabel>
                    <small class="text-500 text-sm mt-3 w-12rem">Колір кузова автомобіля</small>
                  </div>
                </div>
              </div>
            </template>
          </Card>
          <div class="py-6">
            <Button label="Далі" @click="activateCallback('2')" />
          </div>
        </StepPanel>
      </StepItem>

      <!-- Крок 2: Пробіг -->
      <StepItem value="2" class="col-12 lg:col-8">
        <Step class="text-2xl font-bold">Пробіг</Step>
        <StepPanel v-slot="{ activateCallback }">
          <Card class="surface-100">
            <template #content>
              <div class="flex col gap-4">
                <div class="flex gap-3 align-items-start">
                  <FloatLabel class="flex-1" variant="in">
                    <InputNumber
                      v-model="form.mileage"
                      class="w-full"
                      suffix=" км"
                      :min="0"
                    />
                    <label>Пробіг</label>
                  </FloatLabel>
                  <small class="text-500 text-sm mt-3 w-12rem">Кількість пройдених кілометрів</small>
                </div>

                <div class="flex gap-3 align-items-start">
                  <FloatLabel class="flex-1" variant="in">
                    <InputNumber
                      v-model="form.price"
                      class="w-full"
                      suffix=" $"
                      :min="0"
                    />
                    <label>Ціна</label>
                  </FloatLabel>
                  <small class="text-500 text-sm mt-3 w-12rem">Вартість автомобіля в доларах США</small>
                </div>
              </div>
            </template>
          </Card>
          <div class="flex py-6 gap-2">
            <Button label="Назад" severity="secondary" @click="activateCallback('1')" />
            <Button label="Далі" @click="activateCallback('3')" />
          </div>
        </StepPanel>
      </StepItem>

      <!-- Крок 3: Фото -->
      <StepItem value="3" class="col-12 lg:col-8">
        <Step class="text-2xl font-bold">Фото</Step>
        <StepPanel v-slot="{ activateCallback }">
          <Card class="surface-100">
            <template #content>
              <div class="flex flex-column gap-4">
                <div>
                  <h3 class="text-lg mb-2">Головне фото</h3>
                  <FileUpload
                    mode="basic"
                    accept="image/*"
                    :maxFileSize="1000000"
                    chooseLabel="Додати головне фото"
                    class="w-full"
                    @select="handleMainPhotoSelect"
                  />
                  <div v-if="previewImage" class="mt-2">
                    <img :src="previewImage" alt="Превью" class="w-full h-8rem object-fit-cover border-round" />
                  </div>
                </div>

                <div>
                  <h3 class="text-lg mb-2">Додаткові фото</h3>
                  <FileUpload
                    mode="basic"
                    :multiple="true"
                    accept="image/*"
                    :maxFileSize="1000000"
                    chooseLabel="Додати фото"
                    class="w-full"
                  />
                </div>

                <div>
                  <h3 class="text-lg mb-2">Відео</h3>
                  <FileUpload
                    mode="basic"
                    accept="video/*"
                    :maxFileSize="10000000"
                    chooseLabel="Додати відео"
                    class="w-full"
                  />
                </div>
              </div>
            </template>
          </Card>
          <div class="flex py-6 gap-2">
            <Button label="Назад" severity="secondary" @click="activateCallback('2')" />
            <Button label="Далі" @click="activateCallback('4')" />
          </div>
        </StepPanel>
      </StepItem>

      <!-- Крок 4: Комплектація -->
      <StepItem value="4" class="col-12 lg:col-8">
        <Step class="text-2xl font-bold">Комплектація</Step>
        <StepPanel v-slot="{ activateCallback }">
          <Card class="surface-100">
            <template #content>
              <div class="flex flex-column gap-4">
                <div v-for="category in equipmentCategories" :key="category.id">
                  <h3 class="text-lg mb-2">{{ category.name }}</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div v-for="option in category.options" :key="option.id" class="flex align-items-center">
                      <Checkbox v-model="form.equipment[option.id]" :binary="true" />
                      <label class="ml-2">{{ option.name }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Card>
          <div class="flex py-6 gap-2">
            <Button label="Назад" severity="secondary" @click="activateCallback('3')" />
            <Button label="Далі" @click="activateCallback('5')" />
          </div>
        </StepPanel>
      </StepItem>

      <!-- Крок 5: Опис -->
      <StepItem value="5" class="col-12 lg:col-8">
        <Step class="text-2xl font-bold">Опис</Step>
        <StepPanel v-slot="{ activateCallback }">
          <Card class="surface-100">
            <template #content>
              <div class="flex col gap-4">
                <div class="flex gap-3 align-items-start">
                  <FloatLabel class="flex-1" variant="in">
                    <Textarea
                      v-model="form.description"
                      rows="5"
                      class="w-full"
                      autoResize
                    />
                    <label>Опис автомобіля</label>
                  </FloatLabel>
                  <small class="text-500 text-sm mt-3 w-12rem">Детальний опис стану та особливостей авто</small>
                </div>
              </div>
            </template>
          </Card>
          <div class="flex py-6 gap-2">
            <Button label="Назад" severity="secondary" @click="activateCallback('4')" />
            <Button label="Далі" @click="activateCallback('6')" />
          </div>
        </StepPanel>
      </StepItem>

      <!-- Крок 6: Контакти -->
      <StepItem value="6" class="col-12 lg:col-8">
        <Step class="text-2xl font-bold">Контакти</Step>
        <StepPanel v-slot="{ activateCallback }">
          <Card class="surface-100">
            <template #content>
              <div class="flex col gap-4">
                <div class="flex flex-column gap-4">
                  <FloatLabel class="w-full" variant="in">
                    <InputText
                      v-model="form.phone"
                      class="w-full"
                      mask="+38 (999) 999-99-99"
                    />
                    <label>Номер телефону</label>
                  </FloatLabel>

                  <FloatLabel class="w-full" variant="in">
                    <InputText
                      v-model="form.firstName"
                      class="w-full"
                    />
                    <label>Ім'я</label>
                  </FloatLabel>

                  <FloatLabel class="w-full" variant="in">
                    <InputText
                      v-model="form.lastName"
                      class="w-full"
                    />
                    <label>Прізвище</label>
                  </FloatLabel>

                  <FloatLabel class="w-full" variant="in">
                    <InputText
                      v-model="form.email"
                      class="w-full"
                      type="email"
                    />
                    <label>Email</label>
                  </FloatLabel>

                  <FloatLabel class="w-full" variant="in">
                    <Dropdown
                      v-model="form.region"
                      filter
                      showClear
                      :options="regionsList"
                      optionLabel="name"
                      fluid="true"
                      class="w-full"
                    />
                    <label>Область</label>
                  </FloatLabel>

                  <FloatLabel class="w-full" variant="in">
                    <Dropdown
                      v-model="form.city"
                      filter
                      showClear
                      :options="citiesList"
                      optionLabel="name"
                      fluid="true"
                      class="w-full"
                    />
                    <label>Місто</label>
                  </FloatLabel>
                </div>
              </div>
            </template>
          </Card>
          <div class="flex py-6 gap-2">
            <Button label="Назад" severity="secondary" @click="activateCallback('5')" />
            <Button label="Опублікувати" severity="success" @click="handleSubmit" />
          </div>
        </StepPanel>
      </StepItem>
    </Stepper>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Stepper from 'primevue/stepper'
import StepItem from 'primevue/stepitem'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import FileUpload from 'primevue/fileupload'
import Checkbox from 'primevue/checkbox'
import Card from 'primevue/card'
import FloatLabel from 'primevue/floatlabel'

import {
  transportTypes,
  getAllBrands,
  getModelsByBrand,
  bodyTypes,
  driveTypes,
  fuelTypes,
  transmissions,
  generations,
  engines,
  colors,
  regions,
  cities,
  optionsList
} from '@/data/carFormOptions'

const router = useRouter()
const toast = useToast()

// Форма
const form = ref({
  // Характеристики
  vehicleType: null,
  brand: null,
  model: null,
  year: null,
  bodyType: null,
  generation: null,
  fuelType: null,
  driveType: null,
  transmission: null,
  modification: null,
  color: null,
  
  // Пробіг
  mileage: null,
  
  // Ціна
  price: null,
  
  // Комплектація
  equipment: {},
  
  // Опис
  description: '',
  
  // Контакти
  phone: '',
  firstName: '',
  lastName: '',
  email: '',
  region: null,
  city: null
})

// Стан для превью фото
const previewImage = ref(null)

// Експортуємо дані форми для превью
defineExpose({
  form,
  previewImage
})

// Списки даних
const vehicleTypes = ref(transportTypes)
const brands = ref(getAllBrands())
const models = ref([])
const bodyTypesList = ref(bodyTypes)
const generationsList = ref(generations)
const fuelTypesList = ref(fuelTypes)
const driveTypesList = ref(driveTypes)
const transmissionsList = ref(transmissions)
const modifications = ref(engines)
const colorsList = ref(colors)
const regionsList = ref(regions)
const citiesList = ref([])

// Категорії комплектації
const equipmentCategories = ref([
  {
    id: 1,
    name: 'Безпека',
    options: optionsList.filter(option => 
      option.name.includes('система') || 
      option.name.includes('датчик') || 
      option.name.includes('контроль') ||
      option.name.includes('безпека')
    )
  },
  {
    id: 2,
    name: 'Комфорт',
    options: optionsList.filter(option => 
      !option.name.includes('система') && 
      !option.name.includes('датчик') && 
      !option.name.includes('контроль') &&
      !option.name.includes('безпека')
    )
  }
])

// Спостерігач за зміною марки для оновлення списку моделей
watch(() => form.value.brand, (newBrand) => {
  if (newBrand) {
    models.value = getModelsByBrand(newBrand.name).map(model => ({
      name: model,
      value: model
    }))
  } else {
    models.value = []
  }
  form.value.model = null
})

// Спостерігач за зміною регіону для оновлення списку міст
watch(() => form.value.region, (newRegion) => {
  if (newRegion) {
    citiesList.value = cities.filter(city => city.regionId === newRegion.id)
  } else {
    citiesList.value = []
  }
  form.value.city = null
})

// Обробка завантаження головного фото
const handleMainPhotoSelect = (event) => {
  const file = event.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Обробка відправки форми
const handleSubmit = async () => {
  try {
    // TODO: Додати логіку відправки форми
    toast.add({
      severity: 'success',
      summary: 'Успішно',
      detail: 'Оголошення створено',
      life: 3000
    })
    router.push('/')
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Не вдалося створити оголошення',
      life: 3000
    })
  }
}
</script>

<style scoped>
:deep(.p-step-title) {
  font-family: Unbounded;
  font-size: large;
  font-weight: bold;
}
</style> 