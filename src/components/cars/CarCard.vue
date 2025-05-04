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
    root: { class: ['flex flex-column', { 'border-primary border-3': is_top }] },
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
        <img 
          :src="currentImage" 
          :alt="model + ' ' + year"
          class="car-image border-round-top-xl"
          :style="{ opacity: imageTransition ? 0.9 : 1 }"
        />
        
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
        class="car-content-link"
      >
        <div class="flex flex-column gap-3">
          <!-- Заголовок -->
          <div class="flex align-items-center justify-content-between">
            <h3 class="m-0 text-lg font-semibold">{{ brand }} {{ model }}</h3>
            <span class="text-lg font-bold">{{ formattedPrice }}</span>
          </div>
          
          <!-- Характеристики авто -->
          <div class="grid flex-grow-0 ">
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
              <span class="text-600 text-md pl-1">{{ engine_capacity }} {{ engine_unit || 'л' }}</span>
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
  brand: {
    type: String,
    default: ''
  },
  model: {
    type: String,
    default: ''
  },
  year: {
    type: [Number, String],
    default: null
  },
  gearbox: {
    type: String,
    default: ''
  },
  fuel_type: {
    type: String,
    default: ''
  },
  engine_capacity: {
    type: [Number, String],
    default: null
  },
  engine_unit: {
    type: String,
    default: 'л'
  },
  body_type: {
    type: String,
    default: ''
  },
  mileage: {
    type: [Number, String],
    default: null
  },
  drive_type: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  price: {
    type: [Number, String],
    default: null
  },
  status: {
    type: String,
    default: ''
  },
  is_top: {
    type: [Boolean, Number],
    default: false
  },
  link: {
    type: String,
    default: null
  },
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
    return props.link || null
  }
  return carImages.value[currentImageIndex.value]?.url || props.link
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

// Демо-дані перенесено в src/data/demo/cars.js
// import { demoCars } from '@/data/demo/cars'

</script>

<style scoped>
.car-card {
  transition: all 0.3s ease;
  height: 100%;
}

.car-card:hover {
  transform: translateY(-4px);
}

/* Стилі для контейнера зображення */
.car-image-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%; /* Змінюємо з 75% на 100% для співвідношення 1:1 */
  overflow: hidden;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  background-color: var(--surface-200);
}

/* Стилі для зображення автомобіля */
.car-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: all 0.2s ease-in-out;
}

/* Ефект легкого масштабування при наведенні на карточку */
.car-card:hover .car-image {
  transform: scale(1.05);
}

/* Стилі для скелетона, коли зображення відсутнє */
.car-image-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0;
}

.image-indicators {
  background: linear-gradient(to top, rgba(0,0,0,0.1), transparent);
}

.indicator-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--p-surface-200);
  opacity: 0.6;
  transition: all 0.2s ease;
}

.indicator-dot.active {
  background: var(--p-surface-0);
  opacity: 1;
  transform: scale(1.2);
}

.more-photos-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  transition: opacity 0.2s ease;
  cursor: pointer;
  z-index: 1;
}

.car-image-container:hover .more-photos-overlay {
  opacity: 1;
}

/* Стилі для мобільних пристроїв */
@media (max-width: 768px) {
  .car-image-container {
    touch-action: pan-y pinch-zoom;
  }
  
  .car-image {
    will-change: transform;
  }
}

/* Анімація переходу для фото */
.image-transition {
  transition: transform 0.3s ease-out;
}

.image-transition-left {
  transform: translateX(-100%);
}

.image-transition-right {
  transform: translateX(100%);
}

.car-content-link {
    text-decoration: none;
    color: inherit;
    display: block;
    flex: 1;
}

.car-content-link:hover {
    color: inherit;
}
</style>