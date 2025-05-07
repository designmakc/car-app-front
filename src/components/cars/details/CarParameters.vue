<!--
/**
 * CarParameters.vue
 * 
 * Компонент з технічними параметрами автомобіля
 */
-->

<template>
    <Panel header="Основні параметри" class="mb-4">
        <template v-for="(param, index) in params" :key="index">
            <div class="flex w-full pr-2 mb-3">
                <div class="flex align-items-end justify-content-between w-full">
                    <span class="text-600">{{ param.label }}</span>
                    <div class="flex align-items-end gap-1 flex-grow-1 ml-2">
                        <div class="brand-dots flex-grow-1"></div>
                        <span class="font-medium">{{ param.value }}</span>
                    </div>
                </div>
            </div>
        </template>
    </Panel>
</template>

<script setup>
import { defineProps } from 'vue';
import Panel from 'primevue/panel';

defineProps({
    params: {
        type: Array,
        required: true
    }
});
</script>

<style scoped>
.brand-dots {
    border-bottom: 1px dotted var(--surface-400);
    margin: 0 0.5rem;
}
</style> 