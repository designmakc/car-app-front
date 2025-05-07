<!--
/**
 * CarMainInfo.vue
 * 
 * Компонент з основною інформацією про автомобіль
 * Включає заголовок, ціну та теги статусу
 */
-->

<template>
    <div class="flex justify-content-between flex-column md:flex-row gap-2">
        <!-- Заголовок та ціна -->
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
        
        <!-- Кнопки дій -->
        <div class="hidden md:flex flex-column gap-2">
            <Button 
                :label="isFavorite ? 'В обраних' : 'В обрані'" 
                :icon="isFavorite ? 'pi pi-heart-fill' : 'pi pi-heart'" 
                :severity="isFavorite ? 'primary' : 'warn'" 
                :variant="isFavorite ? 'filled' : 'outlined'"
                @click="$emit('toggle-favorite')"
                class="w-auto"
            />
            <Button label="Поділитися" icon="pi pi-share-alt" severity="info" variant="text" />
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import Button from 'primevue/button';
import Tag from 'primevue/tag';

const props = defineProps({
    car: {
        type: Object,
        required: true
    },
    isFavorite: {
        type: Boolean,
        default: false
    }
});

defineEmits(['toggle-favorite']);

const formatPrice = (price) => {
    if (!price) return 'Ціна не вказана'
    return new Intl.NumberFormat('en-US', {
        useGrouping: true,
        maximumFractionDigits: 0
    }).format(price).replace(/,/g, ' ') + '$'
}
</script> 