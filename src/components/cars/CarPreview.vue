<!-- 
  CarPreview компонент
  Показує превью оголошення в реальному часі на основі заповнених даних форми
  Фіксується при скролі та оновлюється при зміні даних форми
-->

<template>
  <div v-if="!isHidden" class="car-preview-container" :class="{ 'sticky': isSticky }">
    <Card class="car-preview shadow-2 border-round-2xl" :pt="{
      root: { class: 'flex flex-column h-full' },
      content: { class: 'p-0 flex-grow-1 flex flex-column border-round-bottom-2xl' }
    }">
      <!-- Header з фото -->
      <template #header>
        <div class="car-image-container border-round-top-xl">
          <!-- Заглушка для фото -->
          <div v-if="!previewImage" class="preview-placeholder flex flex-column align-items-center justify-content-center gap-2">
            <i class="pi pi-image text-4xl text-400"></i>
            <span class="text-sm text-500">Додайте фото</span>
          </div>
          
          <!-- Превью фото -->
          <img 
            v-else
            :src="previewImage" 
            :alt="previewTitle"
            class="car-image border-round-top-xl"
          />
          
          <!-- Теги статусів -->
          <div class="absolute top-0 p-3 z-2">
            <div class="flex flex-column gap-1">
              <Tag 
                icon="pi pi-eye" 
                value="Превью"
                severity="info"
                class="font-normal w-fit border-round-md"
                :pt="{
                  icon: { class: 'mr-1' },
                  root: { class: 'py-1 px-2 flex align-items-center' }
                }"
              />
            </div>
          </div>

          <!-- Кнопка закриття для мобільних -->
          <div v-if="isSticky" class="absolute top-0 right-0 p-3 z-2 lg:hidden">
            <Button
              icon="pi pi-times"
              rounded
              text
              severity="contrast"
              size="small"
              @click="hidePreview"
            />
          </div>
        </div>
      </template>

      <!-- Контент картки -->
      <template #content>
        <div class="flex flex-column justify-content-between h-full p-4">
          <div class="flex flex-wrap gap-3">
            <!-- Заголовок -->
            <div class="min-h-5rem max-h-5rem flex flex-column gap-2 justify-content-center">
              <div class="h-4rem overflow-hidden text-overflow-ellipsis align-content-center">
                <h3 class="text-overflow-ellipsis m-0 text-lg font-semibold w-full line-height-2 justify-content-center">
                  {{ previewTitle }}
                </h3>
              </div>  
              <span class="text-xl font-bold text-primary unbounded-font">
                {{ previewPrice }}
              </span>
            </div>
            
            <!-- Характеристики авто -->
            <div class="grid flex-grow-0">
              <!-- Пробіг -->
              <div class="col-6 flex align-items-center gap-1">
                <i class="pi pi-gauge text-500 text-md"></i>
                <span class="text-600 text-md pl-1">{{ previewMileage }}</span>
              </div>
              <!-- Коробка передач -->
              <div class="col-6 flex align-items-center gap-1">
                <i class="pi pi-cog text-500 text-md"></i>
                <span class="text-600 text-md pl-1">{{ previewTransmission }}</span>
              </div>
              <!-- Двигун -->
              <div class="col-6 flex align-items-center gap-1">
                <i class="pi pi-car text-500 text-md"></i>
                <span class="text-600 text-md pl-1">{{ previewEngine }}</span>
              </div>
              <!-- Місто -->
              <div class="col-6 flex align-items-center gap-1">
                <i class="pi pi-map-marker text-500 text-md"></i>
                <span class="text-600 text-md pl-1">{{ previewLocation }}</span>
              </div>
            </div>
          </div>

          <!-- Час публікації -->
          <div class="text-xs text-500 flex align-items-center pt-1 gap-1">
            <span>Сьогодні</span>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Button from 'primevue/button'

const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  previewImage: {
    type: String,
    default: null
  }
})

// Стан для sticky позиціонування
const isSticky = ref(false)
const isHidden = ref(false)

// Computed властивості для превью
const previewTitle = computed(() => {
  const brand = props.formData.brand?.name || ''
  const model = props.formData.model?.name || ''
  const year = props.formData.year || ''
  
  if (!brand && !model && !year) {
    return 'Ваше оголошення'
  }
  
  return `${brand} ${model} ${year}`.trim()
})

const previewPrice = computed(() => {
  if (!props.formData.price) {
    return 'Ціна не вказана'
  }
  
  return new Intl.NumberFormat('en-US', {
    useGrouping: true,
    maximumFractionDigits: 0
  }).format(props.formData.price).replace(/,/g, ' ') + '$'
})

const previewMileage = computed(() => {
  if (!props.formData.mileage) {
    return '... тис. км'
  }
  
  return `${props.formData.mileage} тис. км`
})

const previewTransmission = computed(() => {
  return props.formData.transmission?.name || '...'
})

const previewEngine = computed(() => {
  const fuelType = props.formData.fuelType?.name || ''
  const modification = props.formData.modification?.name || ''
  
  if (!fuelType && !modification) {
    return '...'
  }
  
  return `${fuelType} ${modification}`.trim()
})

const previewLocation = computed(() => {
  const city = props.formData.city?.name || ''
  const region = props.formData.region?.name || ''
  
  if (!city && !region) {
    return '...'
  }
  
  return city || region
})

// Функція приховування превью
const hidePreview = () => {
  isHidden.value = true
}

// Обробка скролу для sticky позиціонування
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  isSticky.value = scrollTop > 200 && !isHidden.value // Фіксуємо після 200px скролу
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Експортуємо стан для батьківського компонента
defineExpose({
  isHidden
})
</script>

<style scoped>
.car-preview-container {
  transition: all 0.3s ease;
}

.car-preview-container.sticky {
  position: fixed;
  top: 2rem;
  right: 2rem;
  width: 300px;
  z-index: 1000;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Стилі для контейнера зображення */
.car-image-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%;
  overflow: hidden;
  border-radius: var(--p-border-radius) var(--p-border-radius) 0 0;
  background-color: var(--p-surface-200);
}

/* Стилі для зображення автомобіля */
.car-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Заглушка для фото */
.preview-placeholder {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: var(--p-surface-100);
}

/* Адаптивність для мобільних */
@media screen and (max-width: 1024px) {
  .car-preview-container.sticky {
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    top: auto;
    width: auto;
    z-index: 1000;
    animation: slideUp 0.3s ease;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Стилі для карток */
:deep(.p-card) {
  height: 100%;
  transition: all 0.3s ease;
}

:deep(.p-card-content) {
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.p-card-body) {
  padding: 0;
}
</style> 