<!--
/**
 * CarStatistics.vue
 * 
 * Компонент зі статистикою оголошення
 */
-->

<template>
    <Toolbar class="mt-4">
        <template #start>
            <div class="flex gap-3">
                <div class="flex gap-2 align-items-center">
                    <i class="pi pi-eye text-600"></i>
                    <span class="font-medium text-600">{{ views }}</span>
                </div>
                <div class="flex gap-2">
                    <i class="pi pi-calendar text-600"></i>
                    <span class="text-600">{{ formatDate(createdAt) }}</span>
                </div>
            </div>  
        </template>

        <template #end>
            <div class="flex gap-2">
                <Button 
                    label="Поділитися" 
                    icon="pi pi-share-alt" 
                    severity="info" 
                    variant="text" 
                    class="w-full"
                    @click="handleShare" />
                <Button 
                    :label="isFavorite ? 'В обраних' : 'В обрані'" 
                    :icon="isFavorite ? 'pi pi-heart-fill' : 'pi pi-heart'" 
                    :severity="isFavorite ? 'primary' : 'warn'" 
                    :variant="isFavorite ? 'filled' : 'outlined'"
                    @click="handleToggleFavorite"
                    class="w-full" />
            </div>
        </template>
    </Toolbar>
</template>

<script setup>
// 1. Імпорти Vue
// (format та uk будуть імпортовані тільки коли потрібно)

// 2. Імпорти PrimeVue компонентів
import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar'

// 3. Props компонента
const props = defineProps({
    views: {
        type: Number,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    isFavorite: {
        type: Boolean,
        default: false
    }
})

// 4. Events з типізацією
const emit = defineEmits({
    'toggle-favorite': null,
    'share': null
})

// 5. Функції форматування
const formatDate = (dateString) => {
    if (!dateString) return ''
    
    // Динамічний імпорт date-fns тільки коли потрібно
    try {
        const date = new Date(dateString)
        // Простий формат без зайвих залежностей
        return date.toLocaleDateString('uk-UA', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    } catch (error) {
        console.warn('Error formatting date:', error)
        return dateString
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