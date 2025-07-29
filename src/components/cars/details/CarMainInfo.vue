<!--
/**
 * CarMainInfo.vue
 * 
 * Компонент для відображення основної інформації про автомобіль:
 * - Назва (марка, модель, рік)
 * - Ціна та статуси
 * - Кнопки дій (в обрані, поділитися)
 */
-->

<template>
    <div class="flex justify-content-between flex-column md:flex-row gap-2">
        <!-- Title and price block -->
        <div class="flex align-items-start flex-column">
            <h1 class="m-0 pt-2 md:pt-0">{{ car.brand }} {{ car.model }} {{ car.year }}</h1>
            <div class="flex flex-column align-content-center flex-wrap md:flex-row gap-0 md:gap-4">
                <h2 class="align-content-center text-primary p-0 my-2">{{ formatPrice(car.price) }}</h2>
                <div class="flex align-content-center flex-wrap gap-2">
                    <Tag v-if="car.is_top" icon="pi pi-star" value="TOP" severity="warning" class="font-normal"/>
                    <Tag v-if="car.status === 'На майданчику'" value="На майданчику" severity="success" class="font-normal"/>
                    <Tag v-if="car.exchange_available" icon="pi pi-sync" value="Обмін" severity="info" class="font-normal"/>
                </div>
            </div>
        </div>
        
        <!-- Action buttons -->
        <div class="hidden md:flex flex-column gap-2">
            <Button 
                :label="isFavorite ? 'В обраних' : 'В обрані'" 
                :icon="isFavorite ? 'pi pi-heart-fill' : 'pi pi-heart'" 
                :severity="isFavorite ? 'primary' : 'warn'" 
                :variant="isFavorite ? 'filled' : 'outlined'"
                @click="handleToggleFavorite"
                class="w-auto"
            />
            <Button 
                label="Поділитися" 
                icon="pi pi-share-alt" 
                severity="info" 
                variant="text" 
                @click="handleShare"
            />
        </div>
    </div>
</template>

<script setup>
// 1. Імпорти Vue
import { computed } from 'vue'

// 2. Імпорти PrimeVue
import Button from 'primevue/button'
import Tag from 'primevue/tag'

// 3. Props
const props = defineProps({
    car: {
        type: Object,
        required: true
    },
    isFavorite: {
        type: Boolean,
        default: false
    }
})

// 4. Events
const emit = defineEmits({
    'toggle-favorite': () => true,
    'share': () => true
})

// 5. Функції форматування
const formatPrice = (price) => {
    if (!price) return 'Ціна не вказана'
    
    try {
        return new Intl.NumberFormat('en-US', {
            useGrouping: true,
            maximumFractionDigits: 0
        }).format(price).replace(/,/g, ' ') + '$'
    } catch (error) {
        console.warn('Error formatting price:', error)
        return `${price}$`
    }
}

// 6. Event handlers
const handleToggleFavorite = () => {
    emit('toggle-favorite')
}

const handleShare = () => {
    emit('share')
}
</script>

<style scoped>
/* Додаткові стилі при необхідності */
h1 {
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 1.2;
}

h2 {
    font-size: 1.5rem;
    font-weight: 700;
}

@media screen and (max-width: 768px) {
    h1 {
        font-size: 1.5rem;
    }
    
    h2 {
        font-size: 1.25rem;
    }
}
</style> 