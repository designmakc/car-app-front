<!--
/**
 * CarDescription.vue
 * 
 * Компонент з описом автомобіля від власника
 */
-->

<template>
    <div class="surface-card border-round p-0">
        <h3 class="text-xl font-semibold mb-4">Опис автомобіля</h3>
        
        <div class="border-round p-0">
            <div class="flex align-items-start">
                <i class="pi pi-comment text-primary mr-2 mt-1"></i>
                <p class="m-0 text-lg line-height-3 text-color">
                    {{ description || 'Опис відсутній' }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    description: {
        type: String,
        default: ''
    }
});
</script> 