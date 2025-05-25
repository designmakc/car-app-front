<template>
  <MainLayout>
    <!-- Прогрес-бар -->
    <div class="sticky top-0 surface-0 z-5 border-bottom-1 surface-border">
      <div class="container mx-auto px-3 py-2">
        <div class="flex align-items-center justify-content-between mb-2">
          <h1 class="text-lg lg:text-xl font-bold m-0">Додати оголошення</h1>
          <div class="flex align-items-center gap-2">
            <span class="text-sm text-500">Крок {{ currentStep }} з {{ totalSteps }}</span>
            <Button
              v-if="currentStep > 1"
              icon="pi pi-times"
              size="small"
              severity="secondary"
              text
              @click="showExitDialog = true"
              class="hidden lg:inline-flex"
            />
          </div>
        </div>
        
        <!-- Прогрес-бар -->
        <div class="w-full surface-200 border-round h-1rem">
          <div 
            class="bg-primary border-round h-full transition-all transition-duration-300"
            :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>

    <div class="container mx-auto p-3 lg:p-4">
      <div class="grid">
        <!-- Основний контент -->
        <div class="col-12 lg:col-8">
          <!-- Крок 1: Основна інформація -->
          <div v-show="currentStep === 1" class="step-content">
            <Card class="mb-4">
              <template #title>
                <div class="flex align-items-center gap-2">
                  <i class="pi pi-car text-primary"></i>
                  <span>Основна інформація</span>
                </div>
              </template>
              <template #content>
                <div class="grid gap-4">
                  <div class="col-12 md:col-6">
                    <FloatLabel>
                      <Dropdown
                        v-model="form.brand"
                        :options="brands"
                        optionLabel="name"
                        filter
                        showClear
                        class="w-full"
                        :class="{ 'p-invalid': errors.brand }"
                      />
                      <label>Марка автомобіля *</label>
                    </FloatLabel>
                    <small v-if="errors.brand" class="p-error">{{ errors.brand }}</small>
                  </div>

                  <div class="col-12 md:col-6">
                    <FloatLabel>
                      <Dropdown
                        v-model="form.model"
                        :options="models"
                        optionLabel="name"
                        filter
                        showClear
                        class="w-full"
                        :disabled="!form.brand"
                        :class="{ 'p-invalid': errors.model }"
                      />
                      <label>Модель *</label>
                    </FloatLabel>
                    <small v-if="errors.model" class="p-error">{{ errors.model }}</small>
                  </div>

                  <div class="col-12 md:col-6">
                    <FloatLabel>
                      <InputNumber
                        v-model="form.year"
                        :min="1990"
                        :max="new Date().getFullYear() + 1"
                        class="w-full"
                        :class="{ 'p-invalid': errors.year }"
                      />
                      <label>Рік випуску *</label>
                    </FloatLabel>
                    <small v-if="errors.year" class="p-error">{{ errors.year }}</small>
                  </div>

                  <div class="col-12 md:col-6">
                    <FloatLabel>
                      <InputNumber
                        v-model="form.price"
                        mode="currency"
                        currency="USD"
                        locale="en-US"
                        class="w-full"
                        :class="{ 'p-invalid': errors.price }"
                      />
                      <label>Ціна *</label>
                    </FloatLabel>
                    <small v-if="errors.price" class="p-error">{{ errors.price }}</small>
                  </div>
                </div>
              </template>
            </Card>
          </div>

          <!-- Крок 2: Технічні характеристики -->
          <div v-show="currentStep === 2" class="step-content">
            <Card class="mb-4">
              <template #title>
                <div class="flex align-items-center gap-2">
                  <i class="pi pi-cog text-primary"></i>
                  <span>Технічні характеристики</span>
                </div>
              </template>
              <template #content>
                <div class="grid gap-4">
                  <div class="col-12 md:col-6">
                    <FloatLabel>
                      <Dropdown
                        v-model="form.bodyType"
                        :options="bodyTypesList"
                        optionLabel="name"
                        class="w-full"
                      />
                      <label>Тип кузова</label>
                    </FloatLabel>
                  </div>

                  <div class="col-12 md:col-6">
                    <FloatLabel>
                      <Dropdown
                        v-model="form.fuelType"
                        :options="fuelTypesList"
                        optionLabel="name"
                        class="w-full"
                      />
                      <label>Тип палива</label>
                    </FloatLabel>
                  </div>

                  <div class="col-12 md:col-6">
                    <FloatLabel>
                      <Dropdown
                        v-model="form.transmission"
                        :options="transmissionsList"
                        optionLabel="name"
                        class="w-full"
                      />
                      <label>Коробка передач</label>
                    </FloatLabel>
                  </div>

                  <div class="col-12 md:col-6">
                    <FloatLabel>
                      <Dropdown
                        v-model="form.driveType"
                        :options="driveTypesList"
                        optionLabel="name"
                        class="w-full"
                      />
                      <label>Привід</label>
                    </FloatLabel>
                  </div>

                  <div class="col-12 md:col-6">
                    <FloatLabel>
                      <InputNumber
                        v-model="form.mileage"
                        suffix=" км"
                        class="w-full"
                      />
                      <label>Пробіг</label>
                    </FloatLabel>
                  </div>

                  <div class="col-12 md:col-6">
                    <FloatLabel>
                      <Dropdown
                        v-model="form.color"
                        :options="colorsList"
                        optionLabel="name"
                        class="w-full"
                      />
                      <label>Колір</label>
                    </FloatLabel>
                  </div>
                </div>
              </template>
            </Card>
          </div>

          <!-- Крок 3: Фото та медіа -->
          <div v-show="currentStep === 3" class="step-content">
            <Card class="mb-4">
              <template #title>
                <div class="flex align-items-center gap-2">
                  <i class="pi pi-camera text-primary"></i>
                  <span>Фото та відео</span>
                </div>
              </template>
              <template #content>
                <div class="grid gap-4">
                  <!-- Головне фото -->
                  <div class="col-12">
                    <h3 class="text-lg mb-3">Головне фото *</h3>
                    <div 
                      class="border-2 border-dashed border-300 border-round p-4 text-center cursor-pointer hover:border-primary transition-colors"
                      @click="$refs.mainPhotoInput.click()"
                      @dragover.prevent
                      @drop.prevent="handleMainPhotoDrop"
                    >
                      <div v-if="!mainPhotoPreview">
                        <i class="pi pi-cloud-upload text-4xl text-400 mb-3"></i>
                        <p class="text-600 mb-2">Перетягніть фото сюди або натисніть для вибору</p>
                        <small class="text-500">JPG, PNG до 5MB</small>
                      </div>
                      <div v-else class="relative">
                        <img :src="mainPhotoPreview" alt="Головне фото" class="max-w-full h-12rem object-fit-cover border-round" />
                        <Button
                          icon="pi pi-times"
                          size="small"
                          severity="danger"
                          rounded
                          class="absolute top-0 right-0 m-2"
                          @click.stop="removeMainPhoto"
                        />
                      </div>
                    </div>
                    <input
                      ref="mainPhotoInput"
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="handleMainPhotoSelect"
                    />
                  </div>

                  <!-- Додаткові фото -->
                  <div class="col-12">
                    <h3 class="text-lg mb-3">Додаткові фото (до 10)</h3>
                    <div class="grid gap-2">
                      <div 
                        v-for="(photo, index) in additionalPhotos" 
                        :key="index"
                        class="col-6 md:col-4 lg:col-3"
                      >
                        <div class="relative">
                          <img :src="photo.preview" alt="Фото" class="w-full h-8rem object-fit-cover border-round" />
                          <Button
                            icon="pi pi-times"
                            size="small"
                            severity="danger"
                            rounded
                            class="absolute top-0 right-0 m-1"
                            @click="removeAdditionalPhoto(index)"
                          />
                        </div>
                      </div>
                      
                      <div 
                        v-if="additionalPhotos.length < 10"
                        class="col-6 md:col-4 lg:col-3"
                      >
                        <div 
                          class="border-2 border-dashed border-300 border-round h-8rem flex align-items-center justify-content-center cursor-pointer hover:border-primary transition-colors"
                          @click="$refs.additionalPhotosInput.click()"
                        >
                          <i class="pi pi-plus text-2xl text-400"></i>
                        </div>
                      </div>
                    </div>
                    <input
                      ref="additionalPhotosInput"
                      type="file"
                      accept="image/*"
                      multiple
                      class="hidden"
                      @change="handleAdditionalPhotosSelect"
                    />
                  </div>
                </div>
              </template>
            </Card>
          </div>

          <!-- Крок 4: Опис та контакти -->
          <div v-show="currentStep === 4" class="step-content">
            <Card class="mb-4">
              <template #title>
                <div class="flex align-items-center gap-2">
                  <i class="pi pi-file-edit text-primary"></i>
                  <span>Опис та контакти</span>
                </div>
              </template>
              <template #content>
                <div class="grid gap-4">
                  <div class="col-12">
                    <FloatLabel>
                      <Textarea
                        v-model="form.description"
                        rows="4"
                        class="w-full"
                        autoResize
                      />
                      <label>Опис автомобіля</label>
                    </FloatLabel>
                  </div>

                  <div class="col-12 md:col-6">
                    <FloatLabel>
                      <InputText
                        v-model="form.phone"
                        class="w-full"
                        :class="{ 'p-invalid': errors.phone }"
                      />
                      <label>Телефон *</label>
                    </FloatLabel>
                    <small v-if="errors.phone" class="p-error">{{ errors.phone }}</small>
                  </div>

                  <div class="col-12 md:col-6">
                    <FloatLabel>
                      <InputText
                        v-model="form.email"
                        type="email"
                        class="w-full"
                      />
                      <label>Email</label>
                    </FloatLabel>
                  </div>

                  <div class="col-12 md:col-6">
                    <FloatLabel>
                      <Dropdown
                        v-model="form.region"
                        :options="regionsList"
                        optionLabel="name"
                        filter
                        class="w-full"
                        :class="{ 'p-invalid': errors.region }"
                      />
                      <label>Область *</label>
                    </FloatLabel>
                    <small v-if="errors.region" class="p-error">{{ errors.region }}</small>
                  </div>

                  <div class="col-12 md:col-6">
                    <FloatLabel>
                      <Dropdown
                        v-model="form.city"
                        :options="citiesList"
                        optionLabel="name"
                        filter
                        class="w-full"
                        :disabled="!form.region"
                        :class="{ 'p-invalid': errors.city }"
                      />
                      <label>Місто *</label>
                    </FloatLabel>
                    <small v-if="errors.city" class="p-error">{{ errors.city }}</small>
                  </div>
                </div>
              </template>
            </Card>
          </div>

          <!-- Навігація -->
          <div class="flex justify-content-between align-items-center mt-4">
            <Button
              v-if="currentStep > 1"
              label="Назад"
              icon="pi pi-chevron-left"
              severity="secondary"
              @click="previousStep"
            />
            <div v-else></div>

            <div class="flex gap-2">
              <Button
                v-if="currentStep < totalSteps"
                label="Далі"
                icon="pi pi-chevron-right"
                iconPos="right"
                @click="nextStep"
                :disabled="!canProceed"
              />
              <Button
                v-else
                label="Опублікувати"
                icon="pi pi-check"
                severity="success"
                @click="submitForm"
                :loading="isSubmitting"
              />
            </div>
          </div>
        </div>

        <!-- Превью (тільки на десктопі) -->
        <div class="col-12 lg:col-4 hidden lg:block">
          <div class="sticky top-6">
            <Card>
              <template #title>
                <div class="flex align-items-center gap-2">
                  <i class="pi pi-eye text-primary"></i>
                  <span>Превью оголошення</span>
                </div>
              </template>
              <template #content>
                <CarPreviewCard :formData="form" :mainPhoto="mainPhotoPreview" />
              </template>
            </Card>
          </div>
        </div>
      </div>
    </div>

    <!-- Мобільне превью -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 surface-0 border-top-1 surface-border p-3 z-4">
      <Button
        label="Переглянути превью"
        icon="pi pi-eye"
        class="w-full"
        severity="secondary"
        @click="showMobilePreview = true"
      />
    </div>

    <!-- Діалог виходу -->
    <Dialog
      v-model:visible="showExitDialog"
      modal
      header="Вийти з редагування?"
      :style="{ width: '25rem' }"
    >
      <p class="mb-4">Ваші зміни не будуть збережені. Ви впевнені, що хочете вийти?</p>
      <div class="flex justify-content-end gap-2">
        <Button label="Скасувати" severity="secondary" @click="showExitDialog = false" />
        <Button label="Вийти" severity="danger" @click="exitForm" />
      </div>
    </Dialog>

    <!-- Мобільне превью діалог -->
    <Dialog
      v-model:visible="showMobilePreview"
      modal
      header="Превью оголошення"
      class="lg:hidden"
      :style="{ width: '95vw', maxWidth: '400px' }"
    >
      <CarPreviewCard :formData="form" :mainPhoto="mainPhotoPreview" />
    </Dialog>
  </MainLayout>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import MainLayout from '@/layouts/MainLayout.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import FloatLabel from 'primevue/floatlabel'
import Dialog from 'primevue/dialog'
import CarPreviewCard from '@/components/cars/CarPreviewCard.vue'

import {
  getAllBrands,
  getModelsByBrand,
  bodyTypes,
  fuelTypes,
  transmissions,
  driveTypes,
  colors,
  regions,
  cities
} from '@/data/carFormOptions'

const router = useRouter()
const toast = useToast()

// Стан форми
const currentStep = ref(1)
const totalSteps = ref(4)
const isSubmitting = ref(false)
const showExitDialog = ref(false)
const showMobilePreview = ref(false)

// Дані форми
const form = ref({
  // Основна інформація
  brand: null,
  model: null,
  year: null,
  price: null,
  
  // Технічні характеристики
  bodyType: null,
  fuelType: null,
  transmission: null,
  driveType: null,
  mileage: null,
  color: null,
  
  // Контакти
  description: '',
  phone: '',
  email: '',
  region: null,
  city: null
})

// Помилки валідації
const errors = ref({})

// Фото
const mainPhotoPreview = ref(null)
const additionalPhotos = ref([])

// Списки даних
const brands = ref(getAllBrands())
const models = ref([])
const bodyTypesList = ref(bodyTypes)
const fuelTypesList = ref(fuelTypes)
const transmissionsList = ref(transmissions)
const driveTypesList = ref(driveTypes)
const colorsList = ref(colors)
const regionsList = ref(regions)
const citiesList = ref([])

// Обчислювані властивості
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      return form.value.brand && form.value.model && form.value.year && form.value.price
    case 2:
      return true // Технічні характеристики опціональні
    case 3:
      return mainPhotoPreview.value // Головне фото обов'язкове
    case 4:
      return form.value.phone && form.value.region && form.value.city
    default:
      return false
  }
})

// Спостерігачі
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

watch(() => form.value.region, (newRegion) => {
  if (newRegion) {
    const { cities } = await import('@/data/carFormOptions')
    citiesList.value = cities.filter(city => city.regionId === newRegion.id)
  } else {
    citiesList.value = []
  }
  form.value.city = null
})

// Методи навігації
const nextStep = () => {
  if (validateCurrentStep()) {
    currentStep.value++
    scrollToTop()
  }
}

const previousStep = () => {
  currentStep.value--
  scrollToTop()
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Валідація
const validateCurrentStep = () => {
  errors.value = {}
  
  switch (currentStep.value) {
    case 1:
      if (!form.value.brand) errors.value.brand = 'Оберіть марку'
      if (!form.value.model) errors.value.model = 'Оберіть модель'
      if (!form.value.year) errors.value.year = 'Вкажіть рік'
      if (!form.value.price) errors.value.price = 'Вкажіть ціну'
      break
    case 4:
      if (!form.value.phone) errors.value.phone = 'Вкажіть телефон'
      if (!form.value.region) errors.value.region = 'Оберіть область'
      if (!form.value.city) errors.value.city = 'Оберіть місто'
      break
  }
  
  return Object.keys(errors.value).length === 0
}

// Робота з фото
const handleMainPhotoSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    processMainPhoto(file)
  }
}

const handleMainPhotoDrop = (event) => {
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    processMainPhoto(file)
  }
}

const processMainPhoto = (file) => {
  if (file.size > 5 * 1024 * 1024) {
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Розмір файлу не повинен перевищувати 5MB',
      life: 3000
    })
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    mainPhotoPreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const removeMainPhoto = () => {
  mainPhotoPreview.value = null
}

const handleAdditionalPhotosSelect = (event) => {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    if (additionalPhotos.value.length < 10 && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        additionalPhotos.value.push({
          file,
          preview: e.target.result
        })
      }
      reader.readAsDataURL(file)
    }
  })
}

const removeAdditionalPhoto = (index) => {
  additionalPhotos.value.splice(index, 1)
}

// Відправка форми
const submitForm = async () => {
  if (!validateCurrentStep()) return
  
  isSubmitting.value = true
  
  try {
    // TODO: Логіка відправки форми
    await new Promise(resolve => setTimeout(resolve, 2000)) // Імітація запиту
    
    toast.add({
      severity: 'success',
      summary: 'Успішно',
      detail: 'Оголошення створено та відправлено на модерацію',
      life: 5000
    })
    
    router.push('/')
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Не вдалося створити оголошення',
      life: 3000
    })
  } finally {
    isSubmitting.value = false
  }
}

const exitForm = () => {
  router.push('/')
}

// Автозбереження
const saveFormData = () => {
  localStorage.setItem('carFormDraft', JSON.stringify(form.value))
}

const loadFormData = () => {
  const saved = localStorage.getItem('carFormDraft')
  if (saved) {
    form.value = { ...form.value, ...JSON.parse(saved) }
  }
}

// Ініціалізація
onMounted(() => {
  loadFormData()
})

// Автозбереження при зміні форми
watch(form, saveFormData, { deep: true })
</script>

<style scoped>
.step-content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.container {
  max-width: 1200px;
}
</style>