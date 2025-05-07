<!--
/**
 * CarDescription.vue
 * 
 * Компонент з описом автомобіля від власника
 */
-->

<template>
    <Card class="mb-4">
        <template #title>
            <div class="flex align-items-center">
                <i class="pi pi-comment mr-2"></i>
                Опис автомобіля
            </div>
        </template>
        <template #content>
            <div>
                <p class="m-0 text-lg">
                    {{ description || 'Опис відсутній' }}
                </p>
            </div>
        </template>
    </Card>
</template>

<script setup>
import { defineProps } from 'vue';
import Card from 'primevue/card';

defineProps({
    description: {
        type: String,
        default: ''
    }
});
</script> 