<!-- 
  CarCard компонент
  Базується на:
  - Card (PrimeVue) для базової структури
  - Button (PrimeVue) для кнопки "У обране"
  - Tag (PrimeVue) для статусів
  - Skeleton (PrimeVue) для стану завантаження

  Функціональність:
  - Відображення основної інформації про автомобіль
  - Додавання/видалення з обраного
  - Відображення статусів (TOP, На майданчику)
  - Адаптивний дизайн
  - Анімації при наведенні
  - Підтримка скелетон-завантаження
  - Галерея фото при наведенні

  @props {Number} id - Унікальний ідентифікатор автомобіля
  @props {Number} user_id - ID користувача-власника
  @props {String} brand - Марка автомобіля
  @props {String} model - Модель автомобіля
  @props {Number|String} year - Рік випуску
  @props {String} gearbox - Тип коробки передач
  @props {String} fuel_type - Тип палива
  @props {Number|String} engine_capacity - Об'єм двигуна
  @props {String} engine_unit - Одиниця виміру об'єму (default: 'л')
  @props {String} body_type - Тип кузова
  @props {Number|String} mileage - Пробіг
  @props {String} drive_type - Тип приводу
  @props {String} color - Колір
  @props {String} city - Місто
  @props {Number|String} price - Ціна
  @props {String} status - Статус автомобіля
  @props {Boolean|Number} is_top - Чи є оголошення TOP
  @props {String} link - Головне фото (перше фото з галереї)
  @props {Array} images - Масив URL фотографій для галереї
  @props {String} created_at - Дата створення

  Backend API Requirements:
  1. GET /api/cars/{id}
     Response: {
       id: number,
       user_id: number,
       brand: string,
       model: string,
       year: number,
       gearbox: string,
       fuel_type: string,
       engine_capacity: number,
       engine_unit: string,
       body_type: string,
       mileage: number,
       drive_type: string,
       color: string,
       city: string,
       price: number,
       status: string,
       is_top: boolean,
       images: Array<{
         id: number,
         url: string,
         is_main: boolean,
         order: number
       }>,
       created_at: string
     }

  2. POST /api/favorites/{car_id}
     Response: {
       success: boolean,
       message: string
     }

  3. DELETE /api/favorites/{car_id}
     Response: {
       success: boolean,
       message: string
     }

  4. GET /api/favorites/check/{car_id}
     Response: {
       is_favorite: boolean
     }

  @example
  <CarCard
    :id="1"
    brand="BMW"
    model="X5"
    :year="2023"
    :price="45000"
    status="На майданчику"
    :is_top="true"
    city="Київ"
    :images="[
      {
        id: 1,
        url: 'https://example.com/bmw-x5-1.jpg',
        is_main: true,
        order: 0
      },
      {
        id: 2,
        url: 'https://example.com/bmw-x5-2.jpg',
        is_main: false,
        order: 1
      },
      {
        id: 3,
        url: 'https://example.com/bmw-x5-3.jpg',
        is_main: false,
        order: 2
      }
    ]"
  />
-->



<template>
  <Toast />
  <!-- Картка автомобіля -->
  <Card class="car-card shadow-1 hover:shadow-2 transition-all border-round-2xl" :pt="{
    root: { class: ['flex flex-column ', { 'border-primary border-3': is_top }] },
    content: { class: 'p-0 flex-grow-1 flex flex-column border-round-bottom-2xl' }
  }">
    <!-- Header з фото -->
    <template #header>
      
      <div 
        class="car-image-container border-round-top-xl"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        ref="imageContainer"
      >
        <!-- Кнопка "У обране" -->
        <div class="absolute right-0 top-0 p-3 z-2">
          <Button
            :icon="isFavorite ? 'pi pi-heart-fill' : 'pi pi-heart'"
            rounded
            severity="contrast"
            @click.stop="toggleFavorite"
          />
        </div>

        <!-- Теги статусів -->
        <div class="absolute top-0 p-3 z-2">
          <div class="flex flex-column gap-1">
            <Tag 
              v-if="is_top"
              icon="pi pi-crown" 
              value="Top"
              severity="warning"
              class="font-normal w-fit border-round-md"
              :pt="{
                icon: { class: 'mr-1' },
                root: { class: 'py-1 px-2 flex align-items-center' }
              }"
            />
            <Tag 
              v-if="status === 'На майданчику'"
              icon="pi pi-map-marker" 
              severity="success" 
              :value="status" 
              class="font-normal w-fit border-round-md"
              :pt="{
                icon: { class: 'mr-1' },
                root: { class: 'py-1 px-2 flex align-items-center' }
              }"
            />
          </div>
        </div>
        
        <!-- Галерея фото -->
        <RouterLink :to="{ name: 'car-details', params: { id: id }}" >
          <img 
            :src="currentImage" 
            :alt="model + ' ' + year"
            class="car-image border-round-top-xl cursor-pointer"
            :style="{ opacity: imageTransition ? 0.9 : 1 }"
          />
        </RouterLink>
        
        <!-- Оверлей "Ще фото" для останнього фото -->
        <div v-if="currentImageIndex === carImages.length - 1 && totalImages > 5" 
             class="more-photos-overlay flex flex-column align-items-center justify-content-center gap-2">
          <i class="pi pi-images text-2xl"></i>
          <span class="text-sm">Ще {{ hiddenImagesCount }} фото</span>
        </div>

        <Skeleton v-if="!currentImage" class="car-image-skeleton border-round-top-xl" />
        
        <!-- Індикатори фото -->
        <div v-if="carImages.length > 1" class="image-indicators absolute bottom-0 left-0 right-0 flex justify-content-center gap-2 pb-2">
          <div 
            v-for="(_, index) in carImages" 
            :key="index"
            class="indicator-dot"
            :class="{ 'active': currentImageIndex === index }"
          ></div>
        </div>
      </div>
    </template>

    <!-- Контент картки -->
    <template #content>
      <RouterLink 
        :to="{ name: 'car-details', params: { id: id }}" 
        class="flex flex-column justify-content-between h-full no-underline text-color cursor-pointer"
      >
        <div class="flex flex-wrap gap-3 ">
          <!-- Заголовок -->
          <div class="min-h-5rem max-h-5rem flex flex-column gap-2 justify-content-center">
            <div class="h-4rem  overflow-hidden text-overflow-ellipsis align-content-center ">
              <h3 class="text-overflow-ellipsis  m-0 text-lg font-semibold w-full line-height-2 justify-content-center">{{ brand }} {{ model }} {{ year }}</h3>
            </div>  
              <span class="text-xl font-bold text-primary unbounded-font">{{ formattedPrice }}</span>
            
          </div>
          
          <!-- Характеристики авто -->
          <div class="grid flex-grow-0">
            <!-- Пробіг -->
            <div class="col-6 flex align-items-center gap-1">
              <i class="pi pi-gauge text-500 text-md"></i>
              <span class="text-600 text-md pl-1">{{ mileage }} тис. км</span>
            </div>
            <!-- Коробка передач -->
            <div class="col-6 flex align-items-center gap-1">
              <i class="pi pi-cog text-500 text-md"></i>
              <span class="text-600 text-md pl-1">{{ gearbox }}</span>
            </div>
            <!-- Об'єм двигуна -->
            <div class="col-6 flex align-items-center gap-1">
              <i class="pi pi-car text-500 text-md"></i>
              <span class="text-600 text-md pl-1">{{ engine_capacity ? fuel_type + ' ' + engine_capacity + ' ' + engine_unit : '...' }}</span>
            </div>
            <!-- Місто -->
            <div class="col-6 flex align-items-center gap-1">
              <i class="pi pi-map-marker text-500 text-md"></i>
              <span class="text-600 text-md pl-1">{{ city }}</span>
            </div>
          </div>
        </div>
      </RouterLink>

      <!-- Час публікації -->
      <div class="text-xs text-500 flex align-items-center pt-1 gap-1">
        <span>{{ formatDate(created_at) }}</span>
      </div>
    </template>
  </Card>
</template>

<script setup>
// Імпорти необхідних компонентів та хуків
import { ref, onMounted, computed } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Skeleton from 'primevue/skeleton'
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import { RouterLink } from 'vue-router'

// Визначення пропсів компонента згідно структури БД
const props = defineProps({
  id: Number,
  user_id: Number,
  type: String,
  brand: String,
  model: String,
  year: [Number, String],
  state_number: String,
  gearbox: String,
  fuel_type: String,
  engine_capacity: [Number, String],
  engine_unit: {
    type: String,
    default: 'л'
  },
  body_type: String,
  imported_from: String,
  exchange_available: Boolean,
  keys_count: Number,
  extra_tires: Boolean,
  owner_info: String,
  vin: String,
  mileage: [Number, String],
  drive_type: String,
  seats_number: Number,
  color: String,
  city: String,
  region: String,
  price: [Number, String],
  status: String,
  views_parking: Number,
  views_count: Number,
  is_top: [Boolean, Number],
  sold_car_image: String,
  sold_at: String,
  created_at: {
    type: String,
    default: null
  },
  images: {
    type: Array,
    default: () => []
  }
})

// Замість store використовуємо API
const isFavorite = ref(false)

// Перевірка чи авто у обраному
const checkIsFavorite = async () => {
  try {
    // TODO: API call
    // const response = await fetch(`/api/favorites/check/${props.car.id}`)
    // const { isFavorite: status } = await response.json()
    // isFavorite.value = status
  } catch (error) {
    console.error('Помилка при перевірці обраного:', error)
  }
}

// Додавання/видалення з обраного
const toggleFavorite = async () => {
  try {
    // TODO: API call
    // const method = isFavorite.value ? 'DELETE' : 'POST'
    // await fetch(`/api/favorites/${props.car.id}`, { method })
    isFavorite.value = !isFavorite.value
  } catch (error) {
    console.error('Помилка при оновленні обраного:', error)
  }
}

onMounted(checkIsFavorite)

// Функція форматування ціни
const formatPrice = (price) => {
  if (!price) return 'Ціна не вказана'
  return new Intl.NumberFormat('en-US', {
    useGrouping: true,
    maximumFractionDigits: 0
  }).format(price).replace(/,/g, ' ') + '$'
}

// Функція форматування дати
const formatDate = (dateString) => {
  if (!dateString) return ''
  const options = { day: 'numeric', month: 'short' }
  return new Date(dateString).toLocaleDateString('uk-UA', options)
}

const toast = useToast();

// Створюємо computed властивість для зображень
const carImages = computed(() => {
  const images = props.images || []
  return images.slice(0, 5) // Обмежуємо до 5 фото
})

// Обчислюємо загальну кількість фото
const totalImages = computed(() => {
  return (props.images || []).length
})

// Обчислюємо кількість прихованих фото
const hiddenImagesCount = computed(() => {
  return Math.max(0, totalImages.value - 5)
})

// Стан для поточного зображення
const currentImageIndex = ref(0)
const imageTransition = ref(false)
const imageContainer = ref(null)

// Обчислюємо поточне зображення
const currentImage = computed(() => {
  if (!carImages.value || carImages.value.length === 0) {
    return props.sold_car_image || null
  }
  return carImages.value[currentImageIndex.value]?.url || props.sold_car_image
})

// Обробка руху миші по фото
const handleMouseMove = (event) => {
  if (!imageContainer.value || !carImages.value || carImages.value.length <= 1) return
  
  const rect = imageContainer.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const width = rect.width
  
  // Розділяємо контейнер на секції по кількості фото
  const sectionWidth = width / carImages.value.length
  const newIndex = Math.floor(x / sectionWidth)
  
  if (newIndex !== currentImageIndex.value && newIndex >= 0 && newIndex < carImages.value.length) {
    imageTransition.value = true
    setTimeout(() => {
      currentImageIndex.value = newIndex
      imageTransition.value = false
    }, 50)
  }
}

// Обробка виходу миші
const handleMouseLeave = () => {
  if (!carImages.value || carImages.value.length <= 1) return
  imageTransition.value = true
  setTimeout(() => {
    currentImageIndex.value = 0
    imageTransition.value = false
  }, 50)
}

// Змінні для обробки свайпів
const touchStartX = ref(0)
const touchEndX = ref(0)
const isSwiping = ref(false)

// Обробка початку дотику
const handleTouchStart = (event) => {
  if (!carImages.value || carImages.value.length <= 1) return
  touchStartX.value = event.touches[0].clientX
  isSwiping.value = true
}

// Обробка руху пальця
const handleTouchMove = (event) => {
  if (!isSwiping.value) return
  touchEndX.value = event.touches[0].clientX
}

// Обробка закінчення дотику
const handleTouchEnd = () => {
  if (!isSwiping.value || !carImages.value || carImages.value.length <= 1) return

  const touchDiff = touchStartX.value - touchEndX.value
  const minSwipeDistance = 50

  if (Math.abs(touchDiff) > minSwipeDistance) {
    if (touchDiff > 0) {
      // Свайп вліво
      currentImageIndex.value = Math.min(currentImageIndex.value + 1, carImages.value.length - 1)
    } else {
      // Свайп вправо
      currentImageIndex.value = Math.max(currentImageIndex.value - 1, 0)
    }
  }

  isSwiping.value = false
}

// Додайте цей computed після інших обчислюваних властивостей
const formattedPrice = computed(() => {
  return formatPrice(props.price)
})

// Демо-дані перенесено в src/data/demo/cars.js
// import { demoCars } from '@/data/demo/cars'

</script>

<style scoped>
:deep(.p-card) {
  height: 100%;
  transition: all 0.3s ease;
  cursor: pointer !important;
}

:deep(.p-card:hover) {
  transform: translateY(-4px);
}

:deep(.p-card-content) {
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}
:deep(.p-card-body) {
  padding: 1rem 1.5rem 1rem 1.5rem;
}

/* Стилі для контейнера зображення */
.car-image-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
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
  transition: transform 0.2s var(--p-transition-timing-function);
}

:deep(.p-card:hover) .car-image {
  transform: scale(1.05);
}

/* Стилі для індикаторів */
.image-indicators {
  background: linear-gradient(to top, var(--p-surface-ground), transparent);
}

.indicator-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: var(--p-border-radius-circle);
  background: var(--p-surface-200);
  opacity: 0.6;
  transition: all 0.2s var(--p-transition-timing-function);
}

.indicator-dot.active {
  background: var(--p-surface-0);
  opacity: 1;
  transform: scale(1.2);
}

/* Оверлей для додаткових фото */
.more-photos-overlay {
  position: absolute;
  inset: 0;
  background: var(--p-overlay-color);
  color: var(--p-surface-0);
  opacity: 0;
  transition: opacity 0.2s var(--p-transition-timing-function);
  cursor: pointer;
  z-index: 1;
}

.car-image-container:hover .more-photos-overlay {
  opacity: 1;
}

/* Стилі для мобільних пристроїв */
@media screen and (max-width: 768px) {
  .car-image-container {
    touch-action: pan-y pinch-zoom;
  }
  
  .car-image {
    will-change: transform;
  }
}


</style>