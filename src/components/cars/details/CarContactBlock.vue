<!--
/**
 * CarContactBlock.vue
 * 
 * Компонент з контактною інформацією продавця
 */
-->

<template>
    <Panel v-if="showPanel" header="Продавець" class="mb-4">
        <div class="text-2xl font-bold text-700 mb-1">{{ sellerName }}</div>
        <div class="flex align-items-center gap-2 mb-2">
            <span class="text-600 text-sm">Дата реєстрації</span>
            <span class="text-700">{{ registrationDate }}</span>
        </div>
        <div class="flex align-items-center gap-2 pt-3">
            <i class="pi pi-map-marker text-xl"></i>
            <span class="text-700">{{ location }}</span>
        </div>
        <div class="pt-4">
            <div class="text-4xl font-bold text-700">
                {{ isPhoneVisible ? phoneNumber : maskedPhone }}
            </div>
        </div>
        <div class="flex justify-content-end pt-2">
            <Button v-if="!isPhoneVisible" 
                    severity="success" 
                    class="w-full" 
                    @click="$emit('show-phone')">
                <span class="text-xl">Показати номер</span>
            </Button>
            <Button v-else 
                    severity="success" 
                    class="w-full" 
                    tag="a" 
                    :href="phoneLink">
                <i class="pi pi-phone mr-2"></i>
                <span class="text-xl">Зателефонувати</span>
            </Button>
        </div>
    </Panel>
    <template v-else>
        <div class="text-2xl font-bold text-700 mb-1">{{ sellerName }}</div>
        <div class="flex align-items-center gap-2 mb-2">
            <span class="text-600 text-sm">Дата реєстрації</span>
            <span class="text-700">{{ registrationDate }}</span>
        </div>
        <div class="flex align-items-center gap-2 pt-3">
            <i class="pi pi-map-marker text-xl"></i>
            <span class="text-700">{{ location }}</span>
        </div>
        <div class="pt-4">
            <div class="text-4xl font-bold text-700">
                {{ isPhoneVisible ? phoneNumber : maskedPhone }}
            </div>
        </div>
        <div class="flex justify-content-end pt-2">
            <Button v-if="!isPhoneVisible" 
                    severity="success" 
                    class="w-full" 
                    @click="$emit('show-phone')">
                <span class="text-xl">Показати номер</span>
            </Button>
            <Button v-else 
                    severity="success" 
                    class="w-full" 
                    tag="a" 
                    :href="phoneLink">
                <i class="pi pi-phone mr-2"></i>
                <span class="text-xl">Зателефонувати</span>
            </Button>
        </div>
    </template>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import Button from 'primevue/button';
import Panel from 'primevue/panel';

const props = defineProps({
    sellerName: {
        type: String,
        required: true
    },
    registrationDate: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    isPhoneVisible: {
        type: Boolean,
        default: false
    },
    showPanel: {
        type: Boolean,
        default: true
    }
});

defineEmits(['show-phone']);

const phoneLink = computed(() => {
    return `tel:${props.phoneNumber.replace(/\s/g, '')}`;
});

const maskedPhone = computed(() => {
    // Маскуємо номер як (097) XXX XX XX
    const match = props.phoneNumber.match(/(\d{3})\s?(\d{3})\s?(\d{2})\s?(\d{2})/);
    if (match) {
        return `(${match[1]}) XXX XX XX`;
    }
    return 'XXX XXX XX XX';
});
</script> 