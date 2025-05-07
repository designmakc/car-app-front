<!--
/**
 * CarDetails.vue
 * 
 * Component for displaying detailed car information including:
 * - Image gallery
 * - Main specifications 
 * - Seller contact info
 *
 * @component
 */
-->

<template>
    <Mainlayout>
        <div class="car-details-page">
            <!-- ==================== -->
            <!-- = NAVIGATION      = -->
            <!-- ==================== -->
            <Breadcrumb :home="home" :model="items" class="mb-4 p-2 border-round mt-4 hidden md:block"/>

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
                <div v-else class="flex justify-content-between flex-column md:flex-row gap-2">
                    <!-- Title and price block -->
                    <div class="flex align-items-start flex-column">
                        <h1 class="m-0 pt-2 md:pt-0">{{ car.brand }} {{ car.model }} {{ car.year }}</h1>
                        <div class="flex flex-column align-content-center flex-wrap md:flex-row gap-0 md:gap-4">
                            <h2 class="align-content-center text-primary p-0 my-2">{{ formatPrice(car.price) }}</h2>
                            <div class="flex align-content-center flex-wrap gap-2">
                                <Tag v-if="car.is_top" icon="pi pi-star" value="TOP" severity="warning"  class="font-normal"/>
                                <Tag v-if="car.status === 'На майданчику'" value="На майданчику" severity="success"  class="font-normal"    />
                                <Tag v-if="car.exchange_available" icon="pi pi-sync" value="Обмін" severity="info"  class="font-normal"/>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Action buttons -->
                    <div class="hidden md:flex flex-column gap-2 ">
                        <Button 
                            :label="isFavorite ? 'В обраних' : 'В обрані'" 
                            :icon="isFavorite ? 'pi pi-heart-fill' : 'pi pi-heart'" 
                            :severity="isFavorite ? 'primary' : 'warn'" 
                            :variant="isFavorite ? 'filled' : 'outlined'"
                            @click="toggleFavorite"
                            class="w-auto"
                        />
                        <Button label="Поділитися" icon="pi pi-share-alt" severity="info" variant="text"  />
                    </div>
                </div>

                <!-- ==================== -->
                <!-- = MAIN CONTENT   = -->
                <!-- ==================== -->
                <div class="flex flex-row flex-wrap md:flex-nowrap grid mt-1 md:mt-4">
                    
                    <!-- ==================== -->
                    <!-- = SIDEBAR        = -->
                    <!-- ==================== -->
                    <div class="col-12 md:col-3 md:pl-0 mt-0 md:flex-order-0 flex-order-1">
                        <!-- Parameters panel -->
                        <div v-if="isLoading">
                            <Skeleton class="mb-4" height="15rem" />
                        </div>
                        <CarParameters v-else :params="carParams" />

                        <!-- Owner comment for mobile -->
                        <div class="md:hidden">
                            <div v-if="isLoading">
                                <Skeleton class="mb-4" height="10rem" />
                            </div>
                            <CarDescription v-else :description="car.description" />
                            <CreditCalculator />
                        </div>
                        
                        <!-- Contact panel -->
                        <div v-if="isLoading">
                            <Skeleton class="mb-4" height="20rem" />
                        </div>
                        <CarContactBlock
                            v-else
                            sellerName="Сергій"
                            registrationDate="12.03.2022"
                            location="м. Київ Київська область"
                            :phoneNumber="phoneNumber"
                            :isPhoneVisible="isPhoneVisible"
                            @show-phone="showPhoneNumber"
                        />
                    </div>
                    
                    <!-- ==================== -->
                    <!-- = GALLERY        = -->
                    <!-- ==================== -->
                    <div class="col-12 md:col-9 md:flex-order-1 flex-order-0"> 
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
                                @update:index="currentImageIndex = $event"
                                @open-fullscreen="openFullscreenGallery"
                            />
                             
                            <!-- Fullscreen gallery -->
                            <CarFullscreenGallery
                                :images="carImages"
                                :isVisible="isFullscreenGalleryVisible"
                                :currentIndex="currentImageIndex"
                                :car="car"
                                @update:visible="isFullscreenGalleryVisible = $event"
                                @update:index="currentImageIndex = $event"
                            />

                            <!-- Listing info -->  
                            <div v-if="isLoading">
                                <Skeleton class="mb-4" height="4rem" />
                            </div>
                            <CarStatistics 
                                v-else
                                :views="1234" 
                                :createdAt="car.created_at" 
                                :isFavorite="isFavorite"
                                @toggle-favorite="toggleFavorite"
                            />

                            <!-- Owner comment -->  
                            <div v-if="isLoading">
                                <Skeleton class="mb-4" height="10rem" />
                            </div>
                            <CarDescription v-else :description="car.description" class="hidden md:block" />

                            <!-- Car Options -->
                            <div v-if="isLoading">
                                <Skeleton class="mb-4" height="20rem" />
                            </div>
                            <CarOptions v-else :options="carOptions" class="mt-4" />

                            <!-- Credit calculator для десктопу -->
                            <div class="mt-4 hidden md:block">
                                <CreditCalculator />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </Mainlayout>
</template>

<script setup>
/**
 * =====================
 * IMPORTS & DEPENDENCIES
 * =====================
 */
import Mainlayout from '@/layouts/Mainlayout.vue';
import { useRoute } from 'vue-router';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { demoCars, demoCarOptions } from '@/data/demo/cars';
import CreditCalculator from '@/components/credit/CreditCalculator.vue';
import Skeleton from 'primevue/skeleton';

// Імпорт компонентів
import CarGallery from '@/components/cars/details/CarGallery.vue';
import CarFullscreenGallery from '@/components/cars/details/CarFullscreenGallery.vue';
import CarMainInfo from '@/components/cars/details/CarMainInfo.vue';
import CarParameters from '@/components/cars/details/CarParameters.vue';
import CarDescription from '@/components/cars/details/CarDescription.vue';
import CarContactBlock from '@/components/cars/details/CarContactBlock.vue';
import CarStatistics from '@/components/cars/details/CarStatistics.vue';
import CarOptions from '@/components/cars/details/CarOptions.vue';

/**
 * =====================
 * STATE & REACTIVITY
 * =====================
 */
const route = useRoute();
const carId = Number(route.params.id);
const isLoading = ref(true);

const car = computed(() => {
    const foundCar = demoCars.find(c => c.id === carId) || demoCars[0];
    return {
        ...foundCar,
        exchange_available: true
    };
});

/**
 * =====================
 * GALLERY
 * =====================
 */
const carImages = computed(() => car.value.images || []);
const currentImageIndex = ref(0);
const isFullscreenGalleryVisible = ref(false);
const isMobile = ref(window.innerWidth <= 768);

/**
 * =====================
 * PHONE NUMBER
 * =====================
 */
const isPhoneVisible = ref(false);
const phoneNumber = "098 123 45 67";

/**
 * =====================
 * CAR PARAMETERS
 * =====================
 */
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
]);

const carOptions = demoCarOptions;

/**
 * =====================
 * NAVIGATION
 * =====================
 */
const items = computed(() => [
    { label: 'Головна', url: '/' },
    { label: 'Каталог', url: '/catalog' },
    { label: `${car.value.brand} ${car.value.model} ${car.value.year}`, url: route.path }
]);

const home = { icon: 'pi pi-home', url: '/' };

/**
 * =====================
 * LIFECYCLE HOOKS
 * =====================
 */
onMounted(() => {
    const handleResize = () => {
        isMobile.value = window.innerWidth <= 768;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    window.scrollTo({
        top: 0,
        behavior: 'instant'
    });

    // Імітація завантаження даних
    setTimeout(() => {
        isLoading.value = false;
    }, 1500);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});

/**
 * =====================
 * GALLERY FUNCTIONS
 * =====================
 */
const openFullscreenGallery = (index) => {
    currentImageIndex.value = index;
    isFullscreenGalleryVisible.value = true;
};

/**
 * =====================
 * FORMATTING
 * =====================
 */
const formatPrice = (price) => {
    if (!price) return 'Ціна не вказана'
    return new Intl.NumberFormat('en-US', {
        useGrouping: true,
        maximumFractionDigits: 0
    }).format(price).replace(/,/g, ' ') + '$'
}

/**
 * =====================
 * PHONE NUMBER
 * =====================
 */
const showPhoneNumber = () => {
    isPhoneVisible.value = true;
};

const isFavorite = ref(false)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}
</script>

<style scoped>
/* Base image styles */
.desktop-image {
    display: none;
}

/* Mobile image styles */
.mobile-image {
    width: 100% !important;
    height: 300px !important;
    object-fit: cover !important;
    display: block;
}

/* Hide scrollbar */
.scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-none::-webkit-scrollbar {
    display: none;
}

/* Desktop media query */
@media screen and (min-width: 768px) {
    .desktop-image {
        display: block;
        height: 30rem !important;
        width: auto !important;
        object-fit: contain !important;
    }

    .mobile-image {
        height: 30rem !important;
        width: auto !important;
        object-fit: contain !important;
    }
}

/* Photo counter styles */
.photo-counter {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 2rem;
    font-size: 0.875rem;
    z-index: 5;
    display: flex;
    gap: 0.25rem;
    align-items: center;
}

/* Navigation button styles */
.nav-button:enabled:hover {
    background: rgba(0, 0, 0, 0.7) !important;
    border: none !important;
}

.nav-button:focus {
    box-shadow: none !important;
}

.nav-button {
    color: #fff !important;
}
</style> 