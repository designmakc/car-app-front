<!--
/**
 * CarOptions.vue
 * 
 * Компонент для відображення додаткових опцій автомобіля
 * 
 * @component
 */
-->

<template>
    <div class="surface-card border-round p-0">
        <h3 class="text-xl font-semibold mb-4">Додаткові опції</h3>
        
        <div v-for="(category, index) in categories" :key="index" class="mb-4">
            <h5 class="text-sm font-medium text-color-secondary mb-3">{{ category.name }}</h5>
            <div class="grid gap-0">
                <div v-for="option in category.options" 
                     :key="option.value" 
                     class="col-6 md:col-6 lg:col-4">
                    <div class="border-round p-0 flex align-items-center 
                               transition-colors transition-duration-150">
                        <i class="pi pi-check-circle text-primary mr-2"></i>
                        <span class="text-color">{{ option.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// 1. Props компонента
const props = defineProps({
    options: {
        type: Array,
        required: true,
        default: () => []
    }
})

// 2. Категорії опцій (статичні дані)
const categories = [
    {
        name: 'Освітлення',
        options: [
            { name: 'Фари Галогенні', value: 'halogen_lights' },
            { name: 'Датчик світла', value: 'light_sensor' },
            { name: 'Денні ходові вогні', value: 'daytime_lights' },
            { name: 'Противотуманні фари', value: 'fog_lights' }
        ]
    },
    {
        name: 'Салон',
        options: [
            { name: 'Матеріали салону Ткань', value: 'fabric_interior' },
            { name: 'Колір салону Світлий', value: 'light_interior' },
            { name: 'Регулювання сидінь по висоті', value: 'height_adjustment' },
            { name: 'Ручне регулювання передніх сидінь', value: 'manual_front_seats' },
            { name: 'Підігрів сидінь Передні сидіння', value: 'front_seat_heating' }
        ]
    },
    {
        name: 'Безпека',
        options: [
            { name: 'Центральний замок', value: 'central_lock' },
            { name: 'Антиблокувальна система (ABS)', value: 'abs' },
            { name: 'Система стабілізації (ESP)', value: 'esp' },
            { name: 'Іммобілайзер', value: 'immobilizer' },
            { name: 'Антипробуксовочна система (ASR)', value: 'asr' },
            { name: 'Розподіл гальмівних зусиль (BAS,EBD)', value: 'brake_assist' },
            { name: 'Допомога при спуску', value: 'hill_descent' },
            { name: 'Датчик втоми водія', value: 'driver_fatigue' },
            { name: 'Датчик тиску в шинах', value: 'tire_pressure' },
            { name: 'Система кріплення IsoFix', value: 'isofix' },
            { name: 'Блокування замків задніх дверей', value: 'rear_door_lock' }
        ]
    },
    {
        name: 'Комфорт',
        options: [
            { name: 'Електростеклопідйомники Передні і задні', value: 'power_windows' },
            { name: 'Кондиціонер', value: 'ac' },
            { name: 'Клімат-контроль 2-зонний', value: 'dual_zone_climate' },
            { name: 'Підсилювач керма Електро', value: 'power_steering' },
            { name: 'Регулювання керма По висоті і по вильоту', value: 'steering_adjustment' },
            { name: 'Запасне колесо Повнорозмірне', value: 'full_size_spare' },
            { name: 'Бортовий комп\'ютер', value: 'onboard_computer' },
            { name: 'Датчик дощу', value: 'rain_sensor' },
            { name: 'Підігрів дзеркал', value: 'mirror_heating' },
            { name: 'Тоновані стекла', value: 'tinted_windows' }
        ]
    },
    {
        name: 'Мультимедіа',
        options: [
            { name: 'Мультимедіа система з LCD-екраном', value: 'lcd_screen' },
            { name: 'AUX', value: 'aux' },
            { name: 'Bluetooth', value: 'bluetooth' },
            { name: 'USB', value: 'usb' },
            { name: 'Android Auto', value: 'android_auto' },
            { name: 'CarPlay', value: 'carplay' }
        ]
    },
    {
        name: 'Система допомоги при паркуванні',
        options: [
            { name: 'Парктронік передній', value: 'front_parking_sensors' },
            { name: 'Парктронік задній', value: 'rear_parking_sensors' },
            { name: 'Задня камера', value: 'rear_camera' }
        ]
    },
    {
        name: 'Подушки безпеки',
        options: [
            { name: 'Водія', value: 'driver_airbag' },
            { name: 'Пасажира', value: 'passenger_airbag' },
            { name: 'Бічні передні', value: 'front_side_airbags' },
            { name: 'Бічні задні', value: 'rear_side_airbags' },
            { name: 'Віконні (штори)', value: 'curtain_airbags' }
        ]
    }
]
</script> 