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
  @props {String} link - Посилання на фото
  @props {String} created_at - Дата створення

  @emits {Number} favorite-toggle - Подія при додаванні/видаленні з обраного
    @param {Number} id - ID автомобіля
    @param {Boolean} isFavorite - Новий стан обраного

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
  />
-->



<template>
  <Toast />
  <!-- Картка автомобіля -->
  <Card class="car-card shadow-1 hover:shadow-2 transition-all border-round-xl" :pt="{
    root: { class: ['flex flex-column', { 'border-primary border-3': is_top }] },
    content: { class: 'p-0 flex-grow-1 flex flex-column border-round-bottom-xl' }
  }">
    <!-- Header з фото -->
    <template #header>
      <div class="car-image-container border-round-top-xl">
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
        
        <!-- Фото авто -->
        <img 
          v-if="link"
          :src="link" 
          :alt="model + ' ' + year"
          class="car-image border-round-top-xl"
        />
        <Skeleton v-else class="car-image-skeleton border-round-top-xl" />
      </div>
    </template>

    <!-- Контент картки -->
    <template #content>
      <div class="flex flex-column" style="height: 160px">
        <div class="flex-grow-1 flex flex-column gap-1">
          <!-- Заголовок (тільки модель та рік) -->
          <h3 class="text-lg font-semibold m-0 line-clamp-2 line-height-1" style="min-height: 40px">
            {{ brand }} {{ model }} {{ year }}
          </h3>
          
          <!-- Ціна -->
          <div class="text-xl font-bold text-primary unbounded-font pb-2">
            {{ formatPrice(price) }}
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

        <!-- Час публікації -->
        <div class="text-xs text-500 flex align-items-center pt-1 gap-1">
          <span>{{ formatDate(created_at) }}</span>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
// Імпорти необхідних компонентів та хуків
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Skeleton from 'primevue/skeleton'
import { useFavoritesStore } from '@/stores/favorites'
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
// Ініціалізація store
const favorites = useFavoritesStore()

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
  }
})

// Стан для відстеження обраного статусу
const isFavorite = ref(favorites.items.some(item => item.id === props.id))

// Функція для перемикання статусу обраного
const toggleFavorite = (event) => {
  event.stopPropagation() // Запобігає спрацюванню інших обробників
  
  const carData = {
    id: props.id,
    brand: props.brand,
    model: props.model,
    year: props.year,
    price: props.price,
    image: props.link
  }
  
  if (isFavorite.value) {
    favorites.remove(props.id)
    toast.add({ 
      severity: 'info', 
      summary: 'Видалено з обраного', 
      detail: `${props.brand} ${props.model} ${props.year}`, 
      life: 3000 
    })
  } else {
    favorites.add(carData)
    toast.add({ 
      severity: 'success', 
      summary: 'Додано до обраного', 
      detail: `${props.brand} ${props.model} ${props.year}`, 
      life: 3000 
    })
  }
  
  isFavorite.value = !isFavorite.value
}

// Функція форматування ціни
const formatPrice = (price) => {
  if (!price) return 'Ціна не вказана'
  return new Intl.NumberFormat('en-US').format(price) + '$'
}

// Функція форматування дати
const formatDate = (dateString) => {
  if (!dateString) return ''
  const options = { day: 'numeric', month: 'short' }
  return new Date(dateString).toLocaleDateString('uk-UA', options)
}

const toast = useToast();

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
  padding-bottom: 75%; /* Аспект 4:3 */
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
  transition: transform 0.3s ease;
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
</style>