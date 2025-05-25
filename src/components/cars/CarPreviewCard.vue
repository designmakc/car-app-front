<template>
  <div class="car-preview-card">
    <!-- Фото -->
    <div class="photo-container mb-3">
      <div v-if="mainPhoto" class="relative">
        <img 
          :src="mainPhoto" 
          alt="Превью автомобіля" 
          class="w-full h-12rem object-fit-cover border-round"
        />
        <div class="absolute top-0 left-0 m-2">
          <Tag severity="success" value="Нове" v-if="isNew" />
        </div>
      </div>
      <div v-else class="no-photo">
        <i class="pi pi-image text-4xl text-400"></i>
        <p class="text-500 mt-2">Додайте фото</p>
      </div>
    </div>

    <!-- Заголовок -->
    <div class="mb-3">
      <h3 class="text-lg font-semibold m-0 mb-1">{{ carTitle }}</h3>
      <div class="flex align-items-center gap-2 flex-wrap">
        <span class="text-2xl font-bold text-primary">{{ formattedPrice }}</span>
        <Tag v-if="formData.negotiable" value="Торг" severity="info" />
        <span v-if="formData.year" class="text-500">• {{ formData.year }} рік</span>
      </div>
      <div v-if="hasTopTags" class="flex gap-2 mt-2">
        <Tag v-if="formData.isTop" value="TOP" severity="warning" icon="pi pi-star" />
        <Tag v-if="formData.exchangeAvailable" value="Обмін" severity="success" icon="pi pi-sync" />
      </div>
    </div>

    <!-- Основні характеристики -->
    <div class="characteristics mb-3">
      <div v-if="formData.mileage" class="char-item">
        <i class="pi pi-gauge text-500"></i>
        <span>{{ formattedMileage }}</span>
      </div>
      <div v-if="formData.fuelType" class="char-item">
        <i class="pi pi-bolt text-500"></i>
        <span>{{ formData.fuelType.name }}{{ formData.engineCapacity ? ` ${formData.engineCapacity}л` : '' }}</span>
      </div>
      <div v-if="formData.transmission" class="char-item">
        <i class="pi pi-cog text-500"></i>
        <span>{{ formData.transmission.name }}</span>
      </div>
      <div v-if="location" class="char-item">
        <i class="pi pi-map-marker text-500"></i>
        <span>{{ location }}</span>
      </div>
    </div>

    <!-- Додаткова інформація -->
    <div v-if="hasAdditionalInfo" class="additional-info">
      <Divider />
      <div class="grid gap-2 text-sm">
        <div v-if="formData.bodyType" class="col-6">
          <span class="text-500">Кузов:</span>
          <span class="ml-1">{{ formData.bodyType.name }}</span>
        </div>
        <div v-if="formData.driveType" class="col-6">
          <span class="text-500">Привід:</span>
          <span class="ml-1">{{ formData.driveType.name }}</span>
        </div>
        <div v-if="formData.color" class="col-6">
          <span class="text-500">Колір:</span>
          <span class="ml-1">{{ formData.color.name }}</span>
        </div>
      </div>
    </div>

    <!-- Опис -->
    <div v-if="formData.description" class="description mt-3">
      <Divider />
      <p class="text-sm text-600 line-height-3 m-0">
        {{ truncatedDescription }}
      </p>
    </div>

    <!-- Контакти -->
    <div v-if="formData.phone" class="contact-info mt-3">
      <Divider />
      <div class="flex align-items-center gap-2">
        <i class="pi pi-phone text-primary"></i>
        <span class="font-medium">{{ formData.phone }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Tag from 'primevue/tag'
import Divider from 'primevue/divider'

const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  mainPhoto: {
    type: String,
    default: null
  }
})

// Обчислювані властивості
const carTitle = computed(() => {
  const parts = []
  if (props.formData.brand?.name) parts.push(props.formData.brand.name)
  if (props.formData.model?.name) parts.push(props.formData.model.name)
  return parts.length > 0 ? parts.join(' ') : 'Новий автомобіль'
})

const formattedPrice = computed(() => {
  if (!props.formData.price) return 'Ціна не вказана'
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(props.formData.price)
})

const formattedMileage = computed(() => {
  if (!props.formData.mileage) return ''
  return new Intl.NumberFormat('uk-UA').format(props.formData.mileage) + ' км'
})

const location = computed(() => {
  const parts = []
  if (props.formData.city?.name) parts.push(props.formData.city.name)
  if (props.formData.region?.name && props.formData.city?.name !== props.formData.region.name) {
    parts.push(props.formData.region.name)
  }
  return parts.join(', ')
})

const isNew = computed(() => {
  const currentYear = new Date().getFullYear()
  return props.formData.year && props.formData.year >= currentYear
})

const hasAdditionalInfo = computed(() => {
  return props.formData.bodyType || props.formData.driveType || props.formData.color
})

const hasTopTags = computed(() => {
  return props.formData.isTop || props.formData.exchangeAvailable
})

const truncatedDescription = computed(() => {
  if (!props.formData.description) return ''
  return props.formData.description.length > 100 
    ? props.formData.description.substring(0, 100) + '...'
    : props.formData.description
})
</script>

<style scoped>
.car-preview-card {
  border: 1px solid var(--surface-border);
  border-radius: var(--border-radius);
  padding: 1rem;
  background: var(--surface-0);
}

.photo-container {
  position: relative;
}

.no-photo {
  height: 12rem;
  background: var(--surface-100);
  border: 2px dashed var(--surface-300);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.characteristics {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.char-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.char-item i {
  width: 1rem;
  text-align: center;
}

.additional-info {
  font-size: 0.875rem;
}

.description {
  font-size: 0.875rem;
}

.contact-info {
  font-size: 0.875rem;
}
</style> 