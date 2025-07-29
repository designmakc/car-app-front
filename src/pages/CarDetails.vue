<!--
/**
 * CarDetails.vue
 * 
 * Сторінка деталей автомобіля для Inertia.js SSR
 * Отримує дані від сервера через props
 * Підтримує серверний рендеринг
 */
-->

<template>
    <!-- SEO метадані - временно отключено до настройки Inertia -->
    <!-- <MetaHead 
        :title="`${car.brand} ${car.model} ${car.year} - ${formatPrice(car.price)} | Car Market`"
        :description="`${car.brand} ${car.model} ${car.year}, ${car.mileage} тис. км, ${formatPrice(car.price)}. ${car.description || 'Детальна інформація про автомобіль'}`"
        :keywords="`${car.brand}, ${car.model}, ${car.year}, купити авто, продаж авто, ${car.fuel_type}, ${car.body_type}, car market ukraine`"
        :ogImage="car.images && car.images[0] ? car.images[0].url : ''"
        :canonicalUrl="currentUrl"
    /> -->

    <Mainlayout>
        <div class="car-details-page">
        <!-- ==================== -->
        <!-- = NAVIGATION      = -->
        <!-- ==================== -->
        <Breadcrumb :home="home" :model="breadcrumbItems" class="mb-4 p-2 border-round mt-4 hidden md:block"/>

        <main>
            <!-- ==================== -->
            <!-- = PAGE HEADER    = -->
            <!-- ==================== -->
            <div v-if="isLoading" class="flex justify-content-between flex-column md:flex-row gap-2">
                <div class="flex align-items-start flex-column">
                    <Skeleton width="20rem" height="2.5rem" class="mb-2" />
                    <div class="flex flex-column align-content-center flex-wrap md:flex-row gap-0 md:gap-4">
                        <Skeleton width="10rem" height="2rem" class="mb-2" />
                        <div class="flex align-content-center flex-wrap gap-2">
                            <Skeleton width="5rem" height="2rem" class="mb-2" />
                            <Skeleton width="8rem" height="2rem" class="mb-2" />
                        </div>
                    </div>
                </div>
            </div>
            <CarMainInfo
                v-else
                :car="car"
                :isFavorite="isFavorite"
                @toggle-favorite="handleToggleFavorite"
                @share="handleShare"
            />

            <!-- ==================== -->
            <!-- = MAIN CONTENT   = -->
            <!-- ==================== -->
            <div class="flex flex-row flex-wrap md:flex-nowrap grid mt-1 md:mt-4">
                
                <!-- ==================== -->
                <!-- = SIDEBAR        = -->
                <!-- ==================== -->
                <div class="col-12 md:col-3 md:pl-0 mt-0 flex-order-2 md:flex-order-0">
                    <!-- Основні параметри -->
                    <div v-if="isLoading" class="flex-order-0 md:flex-order-0 mb-4">
                        <Skeleton height="15rem" />
                    </div>
                    <CarParameters v-else :params="carParams" class="flex-order-0 md:flex-order-0 mb-4" />
                    
                    <!-- Contact panel -->
                    <div v-if="isLoading" class="flex-order-1 md:flex-order-1">
                        <Skeleton class="mb-4" height="20rem" />
                    </div>
                    <CarContactBlock
                        v-else
                        :status="car.status"
                        :sellerName="sellerInfo.name"
                        :registrationDate="sellerInfo.registrationDate"
                        :location="sellerInfo.location"
                        :phoneNumber="sellerInfo.phone"
                        :isPhoneVisible="isPhoneVisible"
                        :marketAddress="marketInfo.address"
                        :marketPhones="marketInfo.phones"
                        @show-phone="handleShowPhone"
                        @show-on-map="handleShowOnMap"
                        @request-consultation="handleRequestConsultation"
                        @phone-call="handlePhoneCall"
                        class="flex-order-1 md:flex-order-1"
                    />
                </div>
                
                <!-- ==================== -->
                <!-- = GALLERY        = -->
                <!-- ==================== -->
                <div class="col-12 md:col-9 flex-order-0 md:flex-order-1"> 
                    <div class="content p-0 surface-card p-0 border-round">
                        <!-- Галерея зображень --> 
                        <div v-if="isLoading">
                            <Skeleton class="mb-4" height="30rem" />
                        </div>
                        <CarGallery 
                            v-else
                            :images="carImages" 
                            :currentIndex="currentImageIndex"
                            :isMobile="isMobile"
                            :car="car"
                            @update:index="handleImageIndexUpdate"
                            @open-fullscreen="handleOpenFullscreenGallery"
                        />
                         
                        <!-- Fullscreen gallery -->
                        <CarFullscreenGallery
                            :images="carImages"
                            :isVisible="isFullscreenGalleryVisible"
                            :currentIndex="currentImageIndex"
                            :car="car"
                            @update:visible="handleFullscreenVisibilityUpdate"
                            @update:index="handleImageIndexUpdate"
                        />

                        <!-- Listing info -->  
                        <div v-if="isLoading">
                            <Skeleton class="mb-4" height="4rem" />
                        </div>
                        <CarStatistics 
                            v-else
                            :views="statistics.views" 
                            :createdAt="car.created_at" 
                            :isFavorite="isFavorite"
                            @toggle-favorite="handleToggleFavorite"
                            @share="handleShare"
                        />

                        <!-- Owner comment -->  
                        <div v-if="isLoading">
                            <Skeleton class="mb-4" height="10rem" />
                        </div>
                        <CarDescription v-else :description="car.description" />

                        <!-- Car Options -->
                        <div v-if="isLoading">
                            <Skeleton class="mb-4" height="20rem" />
                        </div>
                        <CarOptions v-else :options="carOptions" class="mt-4" />

                        <!-- Credit calculator -->
                        <div class="mt-4">
                            <CreditCalculator :carPrice="car.price" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
        </div>
        
        <!-- Sticky phone button для мобільних -->
        <CarStickyPhoneButton
            :sellerName="sellerInfo.name"
            :registrationDate="sellerInfo.registrationDate"
            :location="sellerInfo.location"
            :phoneNumber="sellerInfo.phone"
            @show-phone="handleShowPhone"
            @show-on-map="handleShowOnMap"
            @request-consultation="handleRequestConsultation"
            @phone-call="handlePhoneCall"
            @dialog-open="handleStickyDialogOpen"
        />
    </Mainlayout>
</template>

<script setup>
// 1. Імпорти Vue (Inertia временно отключен)
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 3. Імпорти PrimeVue компонентів
import Skeleton from 'primevue/skeleton'
import Breadcrumb from 'primevue/breadcrumb'

// 4. Імпорти локальних компонентів
import Mainlayout from '@/layouts/Mainlayout.vue' // временно возвращен
// import MetaHead from '@/components/MetaHead.vue' // временно отключено
import CarGallery from '@/components/cars/details/CarGallery.vue'
import CarFullscreenGallery from '@/components/cars/details/CarFullscreenGallery.vue'
import CarMainInfo from '@/components/cars/details/CarMainInfo.vue'
import CarParameters from '@/components/cars/details/CarParameters.vue'
import CarDescription from '@/components/cars/details/CarDescription.vue'
import CarContactBlock from '@/components/cars/details/CarContactBlock.vue'
import CarStatistics from '@/components/cars/details/CarStatistics.vue'
import CarOptions from '@/components/cars/details/CarOptions.vue'
import CarStickyPhoneButton from '@/components/cars/details/CarStickyPhoneButton.vue'
import CreditCalculator from '@/components/credit/CreditCalculator.vue'

// 5. Временные демо-данные (до настройки Inertia)
import { useRoute } from 'vue-router'
import { demoCars, demoCarOptions } from '@/data/demo/cars'

const route = useRoute()
const carId = Number(route.params.id)

// 6. Reactive стан (SSR-безпечний)
const isLoading = ref(true) // Временно возвращаем загрузку
const currentImageIndex = ref(0)
const isFullscreenGalleryVisible = ref(false)
const isMobile = ref(false) // Безпечна ініціалізація для SSR
const isPhoneVisible = ref(false)
const isFavorite = ref(false) // TODO: отримувати від сервера

// 7. Computed властивості (временно с демо-данными)
const car = computed(() => {
    const foundCar = demoCars.find(c => c.id === carId) || demoCars[0]
    return {
        ...foundCar,
        exchange_available: true
    }
})

const carImages = computed(() => car.value.images || [])

const carParams = computed(() => [
    { label: 'Марка', value: car.value.brand },
    { label: 'Модель', value: car.value.model },
    { label: 'Рік випуску', value: car.value.year },
    { label: 'Пробіг', value: `${car.value.mileage} тис. км` },
    { label: 'Двигун', value: `${car.value.fuel_type} ${car.value.engine_capacity} ${car.value.engine_unit}` },
    { label: 'Коробка передач', value: car.value.gearbox },
    { label: 'Тип приводу', value: car.value.drive_type },
    { label: 'Тип кузову', value: car.value.body_type },
    { label: 'Колір', value: car.value.color },
    { label: 'Місто', value: car.value.city }
])

const carOptions = computed(() => demoCarOptions)

// Інформація про приватного продавця
const sellerInfo = computed(() => ({
    name: "Сергій",
    registrationDate: "12.03.2022", 
    location: "м. Київ Київська область",
    phone: "+38 (098) 123 45 67"
}))

// Інформація про авторинок CAR MARKET
const marketInfo = computed(() => ({
    address: "м. Житомир вул. Покровська 271",
    phones: ["(067) 730 08 09", "(050) 730 08 09"]
}))

const breadcrumbItems = computed(() => [
    { label: 'Головна', url: '/' },
    { label: 'Каталог', url: '/catalog' },
    { label: `${car.value.brand} ${car.value.model} ${car.value.year}`, url: route.path }
])

const statistics = computed(() => ({ views: 1234, favorites: 56 }))

const home = { icon: 'pi pi-home', url: '/' }

// 8. Функції форматування
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

// 9. Event handlers
const handleToggleFavorite = () => {
    // TODO: API call через Inertia
    isFavorite.value = !isFavorite.value
    console.log('Toggle favorite:', isFavorite.value)
}

const handleShare = () => {
    // TODO: Web Share API або копіювання URL
    if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({
            title: `${car.value.brand} ${car.value.model} ${car.value.year}`,
            text: `${car.value.brand} ${car.value.model} ${car.value.year} - ${formatPrice(car.value.price)}`,
            url: window.location.href
        })
    } else {
        // Fallback - копіювання в буфер
        console.log('Share car:', car.value.id)
    }
}

const handleImageIndexUpdate = (newIndex) => {
    currentImageIndex.value = newIndex
}

const handleOpenFullscreenGallery = (index) => {
    currentImageIndex.value = index
    isFullscreenGalleryVisible.value = true
}

const handleFullscreenVisibilityUpdate = (visible) => {
    isFullscreenGalleryVisible.value = visible
}

const handleShowPhone = () => {
    isPhoneVisible.value = true
    // TODO: Аналітика через API
    console.log('Phone number revealed for car:', car.value.id)
}

const handleShowOnMap = () => {
    // TODO: Відкрити карту з локацією авторинку
    console.log('Show market location on map')
}

const handleRequestConsultation = () => {
    // TODO: Відкрити форму заявки на консультацію через Inertia
    console.log('Request consultation for car:', car.value.id)
}

const handlePhoneCall = (type) => {
    // TODO: Аналітика дзвінків
    console.log('Phone call initiated:', type, 'for car:', car.value.id)
}

const handleStickyDialogOpen = () => {
    console.log('Sticky dialog opened')
}

// 10. Lifecycle hooks (SSR-безпечні)
let resizeHandler

onMounted(() => {
    if (typeof window !== 'undefined') {
        // Ініціалізація мобільного стану
        isMobile.value = window.innerWidth <= 768
        
        // Обробник зміни розміру екрану
        resizeHandler = () => {
            isMobile.value = window.innerWidth <= 768
        }
        
        window.addEventListener('resize', resizeHandler)
        
        // Скрол до верху сторінки
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        })
        
        // Имитация загрузки данных
        setTimeout(() => {
            isLoading.value = false
        }, 1500)
    }
})

onUnmounted(() => {
    if (typeof window !== 'undefined' && resizeHandler) {
        window.removeEventListener('resize', resizeHandler)
    }
})
</script>

<style scoped>
/* Базові стилі сторінки */
.car-details-page {
    min-height: 100vh;
}

/* Media queries для адаптивності */
@media screen and (max-width: 768px) {
    .car-details-page {
        padding: 0 1rem;
    }
}
</style> 