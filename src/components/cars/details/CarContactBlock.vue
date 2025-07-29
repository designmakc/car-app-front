<!--
/**
 * CarContactBlock.vue
 * 
 * Компонент з контактною інформацією продавця
 * Підтримує два варіанти:
 * - status === 'Онлайн' → приватний продавець (з маскуванням номера)
 * - status !== 'Онлайн' → авторинок CAR MARKET (номери завжди видимі)
 * 
 * 🚨 ВАЖЛИВО: Всі PrimeVue компоненти використовуються згідно з офіційною документацією
 * 📖 Button API: https://primevue.org/button/
 * 📖 Panel API: https://primevue.org/panel/
 * 
 * === ІНСТРУКЦІЇ ДЛЯ БЕК-ЕНД РОЗРОБНИКА ===
 * 
 * 1. ПОЛЯ В БАЗІ ДАНИХ:
 *    - cars.status: enum('Онлайн', 'На майданчику', 'Продано') - статус автомобіля
 *    - cars.seller_type: enum('private', 'car_market') - тип продавця (залежить від статусу)
 *    - cars.seller_name: varchar(255) - ім'я приватного продавця (для status='Онлайн')
 *    - cars.seller_registration_date: date - дата реєстрації приватного продавця (для status='Онлайн')
 *    - cars.seller_location: varchar(255) - локація приватного продавця (для status='Онлайн')
 *    - cars.seller_phone: varchar(20) - телефон приватного продавця (для status='Онлайн')
 *    - market_locations.id: int - ID локації авторинку (для status!='Онлайн')
 *    - market_locations.address: varchar(500) - адреса авторинку
 *    - market_locations.phones: json - масив телефонів авторинку ['phone1', 'phone2']
 * 
 * 2. API ЕНДПОІНТИ:
 *    GET /api/cars/{id}/contact-info - отримати контактну інформацію
 *    Response для приватного продавця (status='Онлайн'):
 *    {
 *      "status": "Онлайн",
 *      "seller_type": "private",
 *      "seller_name": "Іван Петренко",
 *      "registration_date": "2023-03-15",
 *      "location": "Київ",
 *      "phone_number": "+38 (097) 123 45 67"
 *    }
 *    УВАГА: На фронті +38 автоматично обрізається!
 *    
 *    Response для авторинку (status!='Онлайн'):
 *    {
 *      "status": "На майданчику",
 *      "seller_type": "car_market", 
 *      "market_address": "м. Житомир вул. Покровська 271",
 *      "market_phones": ["(067) 730 08 09", "(050) 730 08 09"]
 *    }
 * 
 *    POST /api/cars/{id}/show-phone - показати номер телефону (тільки для приватних продавців)
 *    POST /api/cars/{id}/request-consultation - заявка на консультацію (тільки для авторинку)
 *    Body: { "user_name": "string", "user_phone": "string", "preferred_time": "string" }
 * 
 * 3. ПОДІЇ ДЛЯ АНАЛІТИКИ:
 *    - phone_number_revealed: коли користувач натискає "Показати номер" (приватний продавець)
 *    - phone_call_initiated: коли користувач натискає "Зателефонувати" (обидва типи)
 *    - map_location_requested: коли користувач натискає "Показати на карті" (авторинок)
 *    - consultation_requested: коли користувач натискає "Замовити консультацію" (авторинок)
 */
-->

<template>
    <!-- Варіант для авторинку CAR MARKET -->
    <Panel v-if="status !== 'Онлайн'" header="Продавець" class="mb-4">
        <div class="text-md font-bold text-700 mb-3 Unbounded-heading">
            Авторинок CAR MARKET
        </div>
        
        <!-- Адреса авторинку -->
        <div class="flex align-items-center gap-2 mb-4">
            <i class="pi pi-map-marker text-xl text-primary"></i>
            <span class="text-700">{{ marketAddress }}</span>
        </div>
        
        <!-- Телефони авторинку (завжди видимі) -->
        <div class="mb-4">
            <div v-for="(phone, index) in marketPhones" :key="index" class="mb-3">
                <div class="text-xl Unbounded-heading">{{ phone }}</div>
            </div>
        </div>
        
        <!-- Кнопки для авторинку -->
        <div class="flex flex-column gap-2">
            <Button 
                label="Зателефонувати"
                icon="pi pi-phone"
                severity="success" 
                class="w-full" 
                as="a"
                size="large"
                :href="getPhoneLink(marketPhones[0])"
                style="text-decoration: none;" 
                @click="handlePhoneCall('market')" />
            
            <Button 
                label="Показати на карті"
                icon="pi pi-map"
                severity="info" 
                class="w-full" 
                size="large"
                @click="handleShowOnMap" />
            
            <Button 
                label="Замовити консультацію"
                severity="warning" 
                variant="outlined"
                class="w-full" 
                size="large"
                @click="handleRequestConsultation" />
        </div>
    </Panel>

    <!-- Варіант для приватного продавця (status === 'Онлайн') -->
    <Panel v-else header="Продавець" class="mb-4">
        <div class="text-xl Unbounded-heading mb-1">{{ sellerName }}</div>
        <div class="flex align-items-center gap-2 mb-2">
            <span class="text-600 text-sm">Дата реєстрації</span>
            <span class="text-700">{{ registrationDate }}</span>
        </div>
        <div class="flex align-items-center gap-2 pt-3">
            <i class="pi pi-map-marker text-xl"></i>
            <span class="text-700">{{ location }}</span>
        </div>
        <div class="pt-4 mb-2">
            <div class="text-xl Unbounded-heading">
                {{ isPhoneVisible ? formattedPhoneNumber : maskedPhone }}
            </div>
        </div>
        <div class="flex justify-content-end pt-2">
            <Button 
                v-if="!isPhoneVisible" 
                label="Показати номер"
                severity="success" 
                class="w-full" 
                size="large"
                @click="handleShowPhone" />
            <Button 
                v-else 
                label="Зателефонувати"
                icon="pi pi-phone"
                severity="success" 
                class="w-full" 
                size="large"
                as="a" 
                :href="phoneLink"
                style="text-decoration: none;"
                @click="handlePhoneCall('private')" />
        </div>
    </Panel>
</template>

<script setup>
// 1. Імпорти Vue
import { computed } from 'vue'

// 2. Імпорти PrimeVue компонентів
import Button from 'primevue/button'
import Panel from 'primevue/panel'

// 3. Props компонента
const props = defineProps({
    // Загальні пропси
    isPhoneVisible: {
        type: Boolean,
        default: false
    },
    
    // Статус автомобіля (визначає тип контакту)
    status: {
        type: String,
        default: 'Онлайн'
    },
    
    // Пропси для приватного продавця (status === 'Онлайн')
    sellerName: {
        type: String,
        default: ''
    },
    registrationDate: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    
    // Пропси для авторинку CAR MARKET (status !== 'Онлайн')
    marketAddress: {
        type: String,
        default: 'м. Житомир вул. Покровська 271'
    },
    marketPhones: {
        type: Array,
        default: () => ['(067) 730 08 09', '(050) 730 08 09']
    }
})

// 4. Events з типізацією
const emit = defineEmits({
    'show-phone': null,
    'show-on-map': null,
    'request-consultation': null,
    'phone-call': (type) => ['private', 'market'].includes(type)
})

// 5. Функції для форматування номерів
const formatPhoneNumber = (phone) => {
    if (!phone) return ''
    // Обрізаємо +38 якщо є на початку
    return phone.replace(/^\+38\s?/, '')
}

const getPhoneLink = (phone) => {
    if (!phone) return ''
    return `tel:${phone.replace(/\s/g, '')}`
}

// 6. Computed властивості для приватного продавця
const phoneLink = computed(() => {
    if (!props.phoneNumber) return ''
    return `tel:${props.phoneNumber.replace(/\s/g, '')}`
})

const formattedPhoneNumber = computed(() => {
    return formatPhoneNumber(props.phoneNumber)
})

const maskedPhone = computed(() => {
    const formatted = formatPhoneNumber(props.phoneNumber)
    if (!formatted) return 'XXX XXX XX XX'
    // Маскуємо номер як (097) XXX XX XX
    const match = formatted.match(/\((\d{3})\)\s?(\d{3})\s?(\d{2})\s?(\d{2})/)
    if (match) {
        return `(${match[1]}) XXX XX XX`
    }
    return 'XXX XXX XX XX'
})

// 7. Event handlers
const handleShowPhone = () => {
    emit('show-phone')
}

const handleShowOnMap = () => {
    emit('show-on-map')
}

const handleRequestConsultation = () => {
    emit('request-consultation')
}

const handlePhoneCall = (type) => {
    emit('phone-call', type)
}
</script> 