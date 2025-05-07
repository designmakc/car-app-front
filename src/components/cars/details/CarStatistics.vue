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
                <Button label="Поділитися" icon="pi pi-share-alt" severity="info" variant="text" class="w-full" />
                <Button 
                    :label="isFavorite ? 'В обраних' : 'В обрані'" 
                    :icon="isFavorite ? 'pi pi-heart-fill' : 'pi pi-heart'" 
                    :severity="isFavorite ? 'primary' : 'warn'" 
                    :variant="isFavorite ? 'filled' : 'outlined'"
                    @click="$emit('toggle-favorite')"
                    class="w-full"
                />
            </div>
        </template>
    </Toolbar>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';

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
});

defineEmits(['toggle-favorite']);

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'd MMMM yyyy', { locale: uk });
};
</script> 