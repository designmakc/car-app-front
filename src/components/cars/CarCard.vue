<template>
    <Card class="shadow-1 hover:shadow-2 transition-all" :pt="{
      root: { class: [' flex flex-column', { 'border-3 border-primary': top }] },
      content: { class: 'p-0 flex-grow-1 flex flex-column' }
    }">
      <!-- Header з фото -->
      <template #header>
        <div class="relative">
          <!-- Кнопка "У обране" (праворуч) -->
          <div class="absolute right-0 top-0 p-3 z-2">
            <Button
              :icon="isFavorite ? 'pi pi-heart-fill' : 'pi pi-heart'"
              rounded
              severity="contrast"
              @click.stop="toggleFavorite"
            />
          </div>

          <!-- Теги статусів (ліворуч) -->
          <div class="absolute top-0 p-3 z-2">
            <div class="flex flex-column gap-1">
                <Tag 
                icon="pi pi-crown" 
                value="Top"
                class="font-normal w-fit"
                :pt="{
                icon: { class: 'mr-1' },  // Відступ між іконкою та текстом
                root: { class: 'py-1 px-2 flex align-items-center' }
                }"
                />
                <Tag 
                icon="pi pi-map-marker" 
                severity="success" 
                value="На майданчику" 
                class="font-normal w-fit"
                :pt="{
                icon: { class: 'mr-1' },  // Відступ між іконкою та текстом
                root: { class: 'py-1 px-2 flex align-items-center' }
                }"
                />
            </div>
          </div>
          
          <!-- Фото -->
          <img 
            v-if="car.image"
            :src="car.image" 
            :alt="car.title"
            class="w-full aspect-square object-cover border-round-top"
          />
          <Skeleton v-else height="300px" width="100%" class="border-round-top" />
        </div>
      </template>
  
      <!-- Контент -->
      <template #content>
        <div class="flex flex-column" style="height: 160px"> <!-- Фіксована висота -->
            <div class="flex-grow-1 flex flex-column gap-1"> <!-- Динамічна область -->
            <h3 class="text-lg font-semibold m-0 line-clamp-2" style="min-height: 40px">
                {{ car.title }}
            </h3>
            
            <div class="text-xl font-bold text-primary "> <!-- Змінено pb-2 на py-1 -->
                {{ formattedPrice }}
            </div>

            <!-- Характеристики -->
            <div class="grid flex-grow-1 align-content-center"> <!-- Додано flex-grow-1 -->
                <div v-for="(spec, index) in specifications" :key="index" 
                    class="col-6 flex align-items-center gap-1">
                <i :class="`pi ${spec.icon} text-500 text-md`"></i>
                <span class="text-600 text-md pl-1">{{ spec.value }}</span>
                </div>
            </div>
            </div>

            <!-- Час публікації -->
            <div class="text-xs text-500 flex align-items-center pt-1 gap-1">
            <span>{{ formatDate(car.publishedAt) }}</span>
            </div>
        </div>
      </template>
    </Card>
</template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const props = defineProps({
    car: {
      type: Object,
      required: true
    },
    top: {
      type: Boolean,
      default: false
    }
  })
  
  const isFavorite = ref(false)
  
  const toggleFavorite = (event) => {
    isFavorite.value = !isFavorite.value
    event.stopPropagation()
  }
  
  const formattedPrice = computed(() => {
    return new Intl.NumberFormat('en-US').format(props.car.price) + '$'
  })
  
  const specifications = computed(() => [
    { icon: 'pi-gauge', value: `${props.car.mileage} тис. км` },
    { icon: 'pi-cog', value: props.car.transmission },
    { icon: 'pi-car', value: props.car.engine },
    { icon: 'pi-map-marker', value: props.car.location }
  ])
  
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short' }
    return new Date(dateString).toLocaleDateString('uk-UA', options)
  }
  </script>

  <style scoped>
  .p-card {
    transition: all 0.3s ease;
  }
  
  .p-card:hover {
    transform: translateY(-4px);
    
    
  }

 </style>