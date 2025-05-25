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
              icon="pi pi-refresh"
              size="small"
              severity="secondary"
              text
              @click="clearForm"
              class="hidden lg:inline-flex"
              title="Очистити форму"
            />
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
            <Panel header="Основна інформація" class="mb-4">
              <div class="flex flex-column gap-4">
                <!-- Марка -->
                <div class="flex flex-column gap-2">
                  <label class="font-medium">Марка автомобіля *</label>
                  <Skeleton v-if="isLoading" height="3rem" />
                  <Select 
                    v-else
                    v-model="form.brand"
                    :options="brands"
                    optionLabel="name"
                    optionValue="name"
                    placeholder="Оберіть марку"
                    class="w-full"
                    @change="handleBrandChange"
                    variant="filled"
                    size="large"
                    :showClear="true"
                    :class="{ 'p-invalid': errors.brand }"
                  />
                  <small v-if="errors.brand" class="p-error">{{ errors.brand }}</small>
                </div>

                <!-- Модель -->
                <div class="flex flex-column gap-2">
                  <label class="font-medium">Модель *</label>
                  <Skeleton v-if="isLoading" height="3rem" />
                  <Select 
                    v-else
                    v-model="form.model"
                    :options="models"
                    optionLabel="name"
                    optionValue="name"
                    placeholder="Оберіть модель"
                    class="w-full"
                    :disabled="!form.brand"
                    variant="filled"
                    size="large"
                    :showClear="true"
                    :class="{ 'p-invalid': errors.model }"
                  />
                  <small v-if="errors.model" class="p-error">{{ errors.model }}</small>
                </div>

                <!-- Рік випуску -->
                <div class="flex flex-column gap-2">
                  <label class="font-medium">Рік випуску *</label>
                  <Skeleton v-if="isLoading" height="3rem" />
                  <Select
                    v-else
                    v-model="form.year"
                    :options="yearOptions"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Оберіть рік"
                    class="w-full"
                    editable
                    :filter="true"
                    filterMatchMode="contains"
                    variant="filled"
                    size="large"
                    :class="{ 'p-invalid': errors.year }"
                  />
                  <small v-if="errors.year" class="p-error">{{ errors.year }}</small>
                </div>

                <!-- Ціна -->
                <div class="flex flex-column gap-2">
                  <label class="font-medium">Ціна *</label>
                  <div v-if="isLoading" class="flex gap-2">
                    <Skeleton height="3rem" class="flex-auto" />
                    <Skeleton height="3rem" width="5rem" />
                  </div>
                  <div v-else class="flex gap-2 align-items-center">
                    <div class="flex-auto">
                      <IconField class="w-full">
                        <InputIcon class="pi pi-dollar" />
                        <InputNumber 
                          v-model="form.price"
                          autocomplete="off" 
                          variant="filled" 
                          size="large"
                          class="w-full"
                          :min="100"
                          :max="1000000"
                          :step="100"
                          placeholder="Введіть ціну"
                          :class="{ 'p-invalid': errors.price }"
                        />
                      </IconField>
                    </div>
                    <div class="flex gap-2">
                      <ToggleButton 
                        v-model="form.negotiable"
                        onLabel="Торг" 
                        offLabel="Торг"
                        onIcon="pi pi-handshake"
                        offIcon="pi pi-handshake"
                      />
                    </div>
                  </div>
                  <small v-if="errors.price" class="p-error">{{ errors.price }}</small>
                </div>
              </div>
            </Panel>
          </div>

          <!-- Крок 2: Технічні характеристики -->
          <div v-show="currentStep === 2" class="step-content">
            <Panel header="Технічні характеристики" class="mb-4">
              <div class="flex flex-column gap-4">
                <!-- Тип кузова -->
                <div class="flex flex-column gap-2">
                  <label class="font-medium">Тип кузова</label>
                  <Skeleton v-if="isLoading" height="3rem" />
                  <Select 
                    v-else
                    v-model="form.bodyType"
                    :options="bodyTypesList"
                    optionLabel="name"
                    placeholder="Оберіть тип кузова"
                    class="w-full"
                    variant="filled"
                    size="large"
                    :showClear="true"
                  />
                </div>

                <!-- Тип палива -->
                <div class="flex flex-column gap-2">
                  <label class="font-medium">Тип палива</label>
                  <Skeleton v-if="isLoading" height="3rem" />
                  <Select 
                    v-else
                    v-model="form.fuelType"
                    :options="fuelTypesList"
                    optionLabel="name"
                    placeholder="Оберіть тип палива"
                    class="w-full"
                    variant="filled"
                    size="large"
                    :showClear="true"
                  />
                </div>

                <!-- Об'єм двигуна -->
                <div class="flex flex-column gap-2">
                  <label class="font-medium">Об'єм двигуна</label>
                  <div v-if="isLoading" class="flex gap-2">
                    <Skeleton height="3rem" class="flex-auto" />
                    <Skeleton height="3rem" width="2rem" />
                  </div>
                  <div v-else class="flex gap-2 align-items-center">
                    <div class="flex-auto">
                      <InputNumber 
                        v-model="form.engineCapacity"
                        :minFractionDigits="1"
                        :maxFractionDigits="1"
                        :min="0.8"
                        :max="8.0"
                        :step="0.1"
                        variant="filled"
                        size="large"
                        class="w-full"
                        placeholder="2.0"
                      />
                    </div>
                    <span class="text-500">л</span>
                  </div>
                </div>

                <!-- Коробка передач -->
                <div class="flex flex-column gap-2">
                  <label class="font-medium">Коробка передач</label>
                  <Skeleton v-if="isLoading" height="3rem" />
                  <Select 
                    v-else
                    v-model="form.transmission"
                    :options="transmissionsList"
                    optionLabel="name"
                    placeholder="Оберіть коробку передач"
                    class="w-full"
                    variant="filled"
                    size="large"
                    :showClear="true"
                  />
                </div>

                <!-- Тип приводу -->
                <div class="flex flex-column gap-2">
                  <label class="font-medium">Тип приводу</label>
                  <Skeleton v-if="isLoading" height="3rem" />
                  <Select 
                    v-else
                    v-model="form.driveType"
                    :options="driveTypesList"
                    optionLabel="name"
                    placeholder="Оберіть тип приводу"
                    class="w-full"
                    variant="filled"
                    size="large"
                    :showClear="true"
                  />
                </div>

                <!-- Пробіг -->
                <div class="flex flex-column gap-2">
                  <label class="font-medium">Пробіг</label>
                  <div v-if="isLoading" class="flex gap-2">
                    <Skeleton height="3rem" class="flex-auto" />
                    <Skeleton height="3rem" width="3rem" />
                  </div>
                  <div v-else class="flex gap-2 align-items-center">
                    <div class="flex-auto">
                      <InputNumber 
                        v-model="form.mileage"
                        :min="0"
                        :max="999999"
                        :step="1000"
                        variant="filled"
                        size="large"
                        class="w-full"
                        placeholder="50000"
                      />
                    </div>
                    <span class="text-500">км</span>
                  </div>
                </div>

                <!-- Колір -->
                <div class="flex flex-column gap-2">
                  <label class="font-medium">Колір</label>
                  <Skeleton v-if="isLoading" height="3rem" />
                  <Select 
                    v-else
                    v-model="form.color"
                    :options="colorsList"
                    optionLabel="name"
                    placeholder="Оберіть колір"
                    class="w-full"
                    variant="filled"
                    size="large"
                    :showClear="true"
                  >
                    <template #value="slotProps">
                      <div v-if="slotProps.value" class="flex align-items-center gap-2">
                        <div 
                          class="color-dot"
                          :style="{ backgroundColor: getColorValue(slotProps.value.name) }"
                        ></div>
                        <span>{{ slotProps.value.name }}</span>
                      </div>
                      <span v-else>{{ slotProps.placeholder }}</span>
                    </template>
                    <template #option="slotProps">
                      <div class="flex align-items-center gap-2">
                        <div 
                          class="color-dot"
                          :style="{ backgroundColor: getColorValue(slotProps.option.name) }"
                        ></div>
                        <span>{{ slotProps.option.name }}</span>
                      </div>
                    </template>
                  </Select>
                </div>

                <!-- Додаткові опції -->
                <div class="flex flex-column gap-2">
                  <label class="font-medium">Додаткові опції</label>
                  <div v-if="isLoading" class="grid">
                    <div v-for="i in 12" :key="i" class="col-12 md:col-6 lg:col-4">
                      <div class="flex align-items-center gap-2">
                        <Skeleton width="1rem" height="1rem" />
                        <Skeleton height="1rem" class="flex-auto" />
                      </div>
                    </div>
                  </div>
                  <div v-else class="grid">
                    <div v-for="option in optionsListData" :key="option.id" class="col-12 md:col-6 lg:col-4">
                      <div class="flex align-items-center">
                        <Checkbox 
                          v-model="form.selectedOptions" 
                          :inputId="`option-${option.id}`"
                          :value="option"
                        />
                        <label :for="`option-${option.id}`" class="ml-2 cursor-pointer text-sm">
                          {{ option.name }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </div>

          <!-- Крок 3: Фото та медіа -->
          <div v-show="currentStep === 3" class="step-content">
            <Panel header="Фото та відео" class="mb-4">
              <div class="flex flex-column gap-4">
                <!-- Головне фото -->
                <div class="flex flex-column gap-2">
                  <label class="font-medium">Головне фото *</label>
                  <Skeleton v-if="isLoading" height="12rem" />
                  <div 
                    v-else
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
                <div class="flex flex-column gap-2">
                  <label class="font-medium">Додаткові фото (до 10)</label>
                  <div v-if="isLoading" class="grid gap-2">
                    <div v-for="i in 4" :key="i" class="col-6 md:col-4 lg:col-3">
                      <Skeleton height="8rem" />
                    </div>
                  </div>
                  <div v-else class="grid gap-2">
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
            </Panel>
          </div>

          <!-- Крок 4: Опис та контакти -->
          <div v-show="currentStep === 4" class="step-content">
            <Panel header="Опис та контакти" class="mb-4">
              <div class="flex flex-column gap-4">
                <!-- Опис -->
                <div class="flex flex-column gap-2">
                  <label class="font-medium">Опис автомобіля</label>
                  <Skeleton v-if="isLoading" height="6rem" />
                  <Textarea
                    v-else
                    v-model="form.description"
                    rows="4"
                    class="w-full"
                    autoResize
                    variant="filled"
                    placeholder="Розкажіть про особливості автомобіля, його стан, історію..."
                  />
                </div>

                <!-- Контактна інформація -->
                <div v-if="isLoading" class="grid gap-4">
                  <div class="col-12 md:col-6">
                    <div class="flex flex-column gap-2">
                      <label class="font-medium">Телефон *</label>
                      <Skeleton height="3rem" />
                    </div>
                  </div>
                  <div class="col-12 md:col-6">
                    <div class="flex flex-column gap-2">
                      <label class="font-medium">Email</label>
                      <Skeleton height="3rem" />
                    </div>
                  </div>
                </div>
                <div v-else class="grid gap-4">
                  <div class="col-12 md:col-6">
                    <div class="flex flex-column gap-2">
                      <label class="font-medium">Телефон *</label>
                      <InputText
                        v-model="form.phone"
                        class="w-full"
                        variant="filled"
                        size="large"
                        placeholder="+380 XX XXX XX XX"
                        :class="{ 'p-invalid': errors.phone }"
                      />
                      <small v-if="errors.phone" class="p-error">{{ errors.phone }}</small>
                    </div>
                  </div>

                  <div class="col-12 md:col-6">
                    <div class="flex flex-column gap-2">
                      <label class="font-medium">Email</label>
                      <InputText
                        v-model="form.email"
                        type="email"
                        class="w-full"
                        variant="filled"
                        size="large"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                <!-- Локація -->
                <div v-if="isLoading" class="grid gap-4">
                  <div class="col-12 md:col-6">
                    <div class="flex flex-column gap-2">
                      <label class="font-medium">Область *</label>
                      <Skeleton height="3rem" />
                    </div>
                  </div>
                  <div class="col-12 md:col-6">
                    <div class="flex flex-column gap-2">
                      <label class="font-medium">Місто *</label>
                      <Skeleton height="3rem" />
                    </div>
                  </div>
                </div>
                <div v-else class="grid gap-4">
                  <div class="col-12 md:col-6">
                    <div class="flex flex-column gap-2">
                      <label class="font-medium">Область *</label>
                      <Select 
                        v-model="form.region"
                        :options="regionsList"
                        optionLabel="name"
                        placeholder="Оберіть область"
                        class="w-full"
                        filter
                        variant="filled"
                        size="large"
                        :showClear="true"
                        :class="{ 'p-invalid': errors.region }"
                      />
                      <small v-if="errors.region" class="p-error">{{ errors.region }}</small>
                    </div>
                  </div>

                  <div class="col-12 md:col-6">
                    <div class="flex flex-column gap-2">
                      <label class="font-medium">Місто *</label>
                      <Select 
                        v-model="form.city"
                        :options="citiesList"
                        optionLabel="name"
                        placeholder="Оберіть місто"
                        class="w-full"
                        :disabled="!form.region"
                        filter
                        variant="filled"
                        size="large"
                        :showClear="true"
                        :class="{ 'p-invalid': errors.city }"
                      />
                      <small v-if="errors.city" class="p-error">{{ errors.city }}</small>
                    </div>
                  </div>
                </div>

                <!-- Додаткові опції -->
                <div class="flex flex-column gap-2">
                  <label class="font-medium">Додаткові опції</label>
                  <div v-if="isLoading" class="flex flex-wrap gap-3">
                    <div v-for="i in 2" :key="i" class="flex align-items-center gap-2">
                      <Skeleton width="1rem" height="1rem" />
                      <Skeleton height="1rem" width="8rem" />
                    </div>
                  </div>
                  <div v-else class="flex flex-wrap gap-3">
                    <div class="flex align-items-center">
                      <Checkbox v-model="form.exchangeAvailable" :binary="true" />
                      <label class="ml-2 cursor-pointer" @click="form.exchangeAvailable = !form.exchangeAvailable">Можливий обмін</label>
                    </div>
                    <div class="flex align-items-center">
                      <Checkbox v-model="form.isTop" :binary="true" />
                      <label class="ml-2 cursor-pointer" @click="form.isTop = !form.isTop">TOP оголошення</label>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </div>

          <!-- Навігація -->
          <div v-if="isLoading" class="flex justify-content-between align-items-center mt-4">
            <Skeleton height="2.5rem" width="6rem" />
            <Skeleton height="2.5rem" width="6rem" />
          </div>
          <div v-else class="flex justify-content-between align-items-center mt-4">
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
            <Panel header="Превью оголошення">
              <div v-if="isLoading" class="p-4">
                <Skeleton height="12rem" class="mb-3" />
                <Skeleton height="2rem" class="mb-2" />
                <Skeleton height="1.5rem" width="60%" class="mb-3" />
                <div class="flex flex-column gap-2">
                  <Skeleton height="1rem" width="80%" />
                  <Skeleton height="1rem" width="70%" />
                  <Skeleton height="1rem" width="90%" />
                </div>
              </div>
              <CarPreviewCard 
                v-else-if="previewData" 
                :formData="previewData" 
                :mainPhoto="mainPhotoPreview" 
              />
              <div v-else class="text-center p-4 text-500">
                <i class="pi pi-car text-4xl mb-3"></i>
                <p>Заповніть форму для перегляду</p>
              </div>
            </Panel>
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
      <CarPreviewCard 
        v-if="previewData" 
        :formData="previewData" 
        :mainPhoto="mainPhotoPreview" 
      />
      <div v-else class="text-center p-4 text-500">
        <i class="pi pi-car text-4xl mb-3"></i>
        <p>Заповніть форму для перегляду</p>
      </div>
    </Dialog>
  </MainLayout>
</template>

<script setup>
// Vue імпорти
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// PrimeVue імпорти
import { useToast } from 'primevue/usetoast'
import Panel from 'primevue/panel'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import Dialog from 'primevue/dialog'
import Checkbox from 'primevue/checkbox'
import ToggleButton from 'primevue/togglebutton'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Skeleton from 'primevue/skeleton'


// Власні компоненти
import MainLayout from '@/layouts/MainLayout.vue'
import CarPreviewCard from '@/components/cars/CarPreviewCard.vue'

// Дані та утиліти
import {
  getAllBrands,
  getModelsByBrand,
  bodyTypes,
  fuelTypes,
  transmissions,
  driveTypes,
  colors,
  regions,
  cities,
  technicalConditions,
  optionsList
} from '@/data/carFormOptions'

const router = useRouter()
const toast = useToast()



// Стан форми
const currentStep = ref(1)
const totalSteps = ref(4)
const isSubmitting = ref(false)
const showExitDialog = ref(false)
const showMobilePreview = ref(false)
const isLoading = ref(true)

// Дані форми
const form = ref({
  // Основна інформація
  brand: null,
  model: null,
  year: null,
  price: null,
  negotiable: false,
  
  // Технічні характеристики
  bodyType: null,
  fuelType: null,
  engineCapacity: null,
  transmission: null,
  driveType: null,
  mileage: null,
  color: null,
  
      // Контакти та додаткове
    description: '',
    phone: '',
    email: '',
    region: null,
    city: null,
    exchangeAvailable: false,
    isTop: false,
    
    // Додаткові опції
    selectedOptions: []
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
const technicalConditionsList = ref(technicalConditions)
const optionsListData = ref(optionsList)

// Роки для Select
const currentYear = new Date().getFullYear()
const yearOptions = Array.from(
  { length: currentYear - 1990 + 2 }, 
  (_, i) => ({
    label: String(currentYear - i + 1),
    value: currentYear - i + 1
  })
)

// Мапа кольорів відповідно до даних з файлу
const colorMap = {
  'Бежевий': '#F5F5DC',
  'Білий': '#FFFFFF', 
  'Жовтий': '#FFFF00',
  'Зелений': '#008000',
  'Коричневий': '#A52A2A',
  'Помаранчевий': '#FFA500',
  'Синій': '#0000FF',
  'Сірий': '#808080',
  'Фіолетовий': '#800080',
  'Червоний': '#FF0000',
  'Чорний': '#000000'
}

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

// Дані для превью компонента
const previewData = computed(() => {
  try {
    return {
      ...form.value,
      brand: form.value.brand ? { name: form.value.brand } : null,
      model: form.value.model ? { name: form.value.model } : null
    }
  } catch (error) {
    console.error('Помилка створення превью даних:', error)
    return null
  }
})

// Спостерігачі
watch(() => form.value.brand, (newBrand) => {
  if (newBrand) {
    models.value = getModelsByBrand(newBrand).map(model => ({
      name: model
    }))
  } else {
    models.value = []
  }
  form.value.model = null
})

watch(() => form.value.region, (newRegion) => {
  if (newRegion) {
    citiesList.value = cities.filter(city => city.regionId === newRegion.id)
  } else {
    citiesList.value = []
  }
  form.value.city = null
})

// Методи
const handleBrandChange = () => {
  form.value.model = null
}

const getColorValue = (colorName) => {
  return colorMap[colorName] || '#CCCCCC'
}



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

const clearForm = () => {
  // Очищуємо форму до початкових значень
  form.value = {
    // Основна інформація
    brand: null,
    model: null,
    year: null,
    price: null,
    negotiable: false,
    
    // Технічні характеристики
    bodyType: null,
    fuelType: null,
    engineCapacity: null,
    transmission: null,
    driveType: null,
    mileage: null,
    color: null,
    
    // Контакти та додаткове
    description: '',
    phone: '',
    email: '',
    region: null,
    city: null,
    exchangeAvailable: false,
    isTop: false
  }
  
  // Очищуємо фото
  mainPhotoPreview.value = null
  additionalPhotos.value = []
  
  // Очищуємо localStorage
  localStorage.removeItem('carFormDraft')
  
  // Повертаємося на перший крок
  currentStep.value = 1
  
  // Очищуємо помилки
  errors.value = {}
  
  toast.add({
    severity: 'info',
    summary: 'Форму очищено',
    detail: 'Всі дані форми скинуто до початкових значень',
    life: 3000
  })
}

// Автозбереження
const saveFormData = () => {
  localStorage.setItem('carFormDraft', JSON.stringify(form.value))
}

const loadFormData = () => {
  const saved = localStorage.getItem('carFormDraft')
  if (saved) {
    try {
      const parsedData = JSON.parse(saved)
      // Перевіряємо, чи дані не пошкоджені
      if (parsedData && typeof parsedData === 'object') {
        form.value = { ...form.value, ...parsedData }
      }
    } catch (error) {
      console.warn('Помилка завантаження збережених даних:', error)
      localStorage.removeItem('carFormDraft')
    }
  }
}

// Ініціалізація
onMounted(async () => {
  try {
    // Імітація завантаження даних
    await new Promise(resolve => setTimeout(resolve, 1000))
    loadFormData()
    isLoading.value = false
  } catch (error) {
    console.error('Помилка ініціалізації:', error)
    isLoading.value = false
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Помилка завантаження форми',
      life: 3000
    })
  }
})

// Автозбереження при зміні форми
watch(form, saveFormData, { deep: true })
</script>

<style scoped>
/* Анімація переходів між кроками */
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

/* Контейнер з максимальною шириною */
.container {
  max-width: 1200px;
}

/* Кольорова крапка для Select кольорів */
.color-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid var(--p-surface-300);
  flex-shrink: 0;
}

/* Скелетони */
.p-skeleton {
  background: linear-gradient(90deg, var(--p-surface-200) 25%, var(--p-surface-100) 50%, var(--p-surface-200) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style> 