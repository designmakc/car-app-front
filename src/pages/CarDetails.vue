<!--
/**
 * CarDetails.vue
 * 
 * Компонент сторінки деталей автомобіля
 * Відображає повну інформацію про автомобіль, включаючи:
 * - Галерею зображень
 * - Основні характеристики
 * - Контактну інформацію продавця
 * 
 * @component
 */
-->

<template>
    <Mainlayout>
        <div class="car-details-page">
            <!-- ==================== -->
            <!-- = НАВІГАЦІЯ       = -->
            <!-- ==================== -->
            <Breadcrumb :home="home" :model="items" class="mb-4 p-2 border-round mt-4" />

            <main>
                <!-- ==================== -->
                <!-- = ШАПКА СТОРІНКИ  = -->
                <!-- ==================== -->
                <div class="flex justify-content-between flex-column md:flex-row gap-3">
                    <!-- Блок з назвою та ціною -->
                    <div class="flex flex-column align-items-start gap-2 w-full md:w-auto">
                        <h1 class="m-0 text-2xl md:text-4xl">{{ car.brand }} {{ car.model }} {{ car.year }}</h1>
                        <div class="flex align-items-center gap-2 flex-wrap">
                            <div class="text-primary text-2xl md:text-3xl font-bold unbounded-font py-2">{{ formatPrice(car.price) }}</div>
                            <div class="flex gap-2 flex-wrap pb-2 md:pb-0">
                                <Tag icon="pi pi-hammer" value="Торг" severity="secondary" class="py-1"></Tag>
                                <Tag icon="pi pi-sync" value="Обмін" severity="info" class="py-1"></Tag>
                                <Tag v-if="car.status === 'На майданчику'" value="На майданчику" severity="success" class="py-1"></Tag>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Блок кнопок дій -->
                    <div class="hidden md:flex flex-row md:flex-column justify-content-between md:align-items-end gap-2 ">
                        <Button label="Додати в обрані" icon="pi pi-heart" severity="warn" variant="outlined" class="w-auto" />
                        <Button label="Поділитися" icon="pi pi-share-alt" severity="info" variant="text"  />
                    </div>
                </div>

                <!-- ==================== -->
                <!-- = ОСНОВНИЙ КОНТЕНТ = -->
                <!-- ==================== -->
                <div class="flex flex-row flex-wrap md:flex-nowrap grid mt-1 md:mt-4">
                    
                    <!-- ==================== -->
                    <!-- = САЙДБАР         = -->
                    <!-- ==================== -->
                    <div class="col-12 md:col-3 md:pl-0 mt-0 md:flex-order-0 flex-order-1">
                        <!-- Панель параметрів -->
                        <Panel header="Основні параметри" class="mb-4">
                            <template v-for="(param, index) in carParams" :key="index">
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

                        <!-- Коментар власника для мобільної версії -->
                        <div class="md:hidden">
                            <Card pt="2" class="mb-4">
                                <template #title>
                                    <div>
                                        <i class="pi pi-comment mr-2"></i>
                                        Коментар власника
                                    </div>
                                </template>
                                <template #content>
                                    <div>
                                        <p class="m-0 ">
                                            Прдам лансер в . Дизель. 150 л.с. На механіці. Датчик дождю і світла. Задня камера. Саббуфер. Торг на каву із заправкою бака. Терміново
                                        </p>
                                    </div>
                                </template>
                            </Card>
                        </div>
                        
                        <!-- Панель контактів -->
                        <Panel header="Контактна інформація" class="mb-4">
                            <div class="text-2xl font-bold text-700 mb-1">Сергій</div>
                            <div class="flex align-items-center gap-2 mb-2">
                                <span class="text-600 text-sm w-12rem">Дата реєстрації</span>
                                <span class="text-700">12.03.2022</span>
                            </div>
                            <div class="flex align-items-center gap-2 pt-3">
                                <i class="pi pi-map-marker text-xl"></i>
                                <span class="text-700">м. Київ Київська область</span>
                            </div>
                            <div class="pt-4">
                                <div class="text-4xl font-bold text-700">
                                    {{ isPhoneVisible ? phoneNumber : phoneNumber.replace(/\d(?!\d{0,3}$)/g, '*') }}
                                </div>
                            </div>
                            <div class="flex justify-content-end pt-2">
                                <Button v-if="!isPhoneVisible" 
                                        severity="success" 
                                        class="w-full" 
                                        @click="showPhoneNumber">
                                    <span class="text-xl">Показати номер</span>
                                </Button>
                                <Button v-else 
                                        severity="success" 
                                        class="w-full" 
                                        tag="a" 
                                        :href="getPhoneLink()">
                                    <i class="pi pi-phone mr-2"></i>
                                    <span class="text-xl">Зателефонувати</span>
                                </Button>
                            </div>
                        </Panel>
                    </div>
                    
                    <!-- ==================== -->
                    <!-- = ГАЛЕРЕЯ         = -->
                    <!-- ==================== -->
                    <div class="col-12 md:col-9 md:flex-order-1 flex-order-0"> 
                        <div class="content p-0">

                                                       
                            <div class="w-full surface-ground border-round-lg overflow-hidden mb-4 md:mb-0">
                                <div class="relative w-full md:h-30rem surface-section overflow-hidden">
                                    <div class="photo-counter">
                                        <span class="font-medium">{{ currentImageIndex + 1 }}</span>
                                        <span class="text-300">/</span>
                                        <span class="text-300">{{ carImages.length }}</span>
                                    </div>

                                    <div ref="imageContainer" 
                                        class="flex gap-1 w-full h-full overflow-x-auto scroll-smooth scrollbar-none"
                                        style="scroll-snap-type: x mandatory;"
                                        @scroll="handleScroll">
                                        <div v-for="(image, index) in carImages" 
                                            :key="index"
                                            class="flex-none h-full image-slide"
                                            :style="{ 
                                                width: isMobile ? '100%' : `${imageWidths[index]}px`,
                                                'scroll-snap-align': 'start'
                                            }"
                                        >
                                            <img :src="image.url" 
                                                :alt="`${car.brand} ${car.model}`"
                                                class="mobile-image md:desktop-image" 
                                                @load="handleImageLoad($event, index)"
                                            />
                                        </div>
                                    </div>

                                    <div class="absolute top-50 left-0 right-0 -mt-4 flex justify-content-between pointer-events-none">
                                        <Button icon="pi pi-chevron-left" 
                                            class="nav-button pointer-events-auto mx-2"
                                            @click="scrollToImage('prev')"
                                            :disabled="currentImageIndex === 0"
                                        />
                                        <Button icon="pi pi-chevron-right" 
                                            class="nav-button pointer-events-auto mx-2"
                                            @click="scrollToImage('next')"
                                            :disabled="currentImageIndex === carImages.length - 1"
                                        />
                                    </div>

                                    <div class="absolute top-3 right-3 bg-black-alpha-50 text-white px-3 py-2 border-round-xl text-sm z-5">
                                        {{ currentImageIndex + 1 }}/{{ carImages.length }}
                                    </div>

                                    <div class="md:hidden flex gap-2 justify-content-center absolute bottom-0 left-0 right-0 mb-2">
                                        <div v-for="(_, index) in carImages" 
                                            :key="index"
                                            class="photo-indicator cursor-pointer"
                                            :class="{ 'active': index === currentImageIndex }"
                                            @click="scrollToImage(index)"
                                        ></div>
                                    </div>
                                </div>

                                <div class="hidden md:flex gap-1 py-1 surface-section overflow-x-auto scrollbar-none">
                                    <div v-for="(image, index) in carImages" 
                                        :key="index"
                                        @click="scrollToImage(index)"
                                        class="flex-none cursor-pointer overflow-hidden transition-opacity transition-duration-200"
                                        :class="[
                                            index === currentImageIndex 
                                                ? 'border-2 border-primary opacity-100' 
                                                : 'opacity-70 hover:opacity-90'
                                        ]"
                                        style="width: 100px; height: 67px; position: relative;"
                                    >
                                        <div class="absolute top-0 left-0 w-full h-full flex align-items-center justify-content-center overflow-hidden">
                                            <img :src="image.url" 
                                                :alt="`${car.brand} ${car.model} - ${index + 1}`"
                                                class="w-auto h-full" 
                                                style="min-width: 100%; object-fit: cover;"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            <!-- @TODO: Додати іконку з кількістю переглядів та дату додавання оголошення -->

                            <!-- Інформація про оголошення -->  
                            <Toolbar class="my-2 ">
                                <template #start >
                                    <div class="flex align-items-center gap-2">
                                    <div class="flex align-items-center gap-2 mr-4">
                                        <i class="pi pi-eye text-600"></i>
                                        <span class="font-medium text-600">1234</span>
                                    </div>
                                    <span class="text-600">Опубліковано: 12.03.2022</span>
                                    
                                    
                                    </div>
                                </template>

                                <template #center class="flex md:hidden">
                                    
                                
                                </template>

                                <template #end >
                                    <div class="mt-2 md:mt-0 ">
                                    <Button label="Додати в обрані" icon="pi pi-heart" severity="warn" variant="outlined" />
                                    <Button label="Поділитися" icon="pi pi-share-alt" severity="info" variant="text"  />
                                    
                                    </div>
                                   
                                </template>
                            </Toolbar>

                            <!-- Коментар власника -->  
                            <Card class="hidden md:block">
                                <template #title>
                                    <div>
                                        <i class="pi pi-comment mr-2"></i>
                                        Коментар власника
                                    </div>
                                </template>
                                <template #content>
                                    <div>
                                        <p class="m-0 text-lg">
                                            Прдам лансер в . Дизель. 150 л.с. На механіці. Датчик дождю і світла. Задня камера. Саббуфер. Торг на каву із заправкою бака. Терміново
                                        </p>
                                    </div>
                                </template>
                            </Card>
                            
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
 * ІМПОРТИ ТА ЗАЛЕЖНОСТІ
 * =====================
 */
import Mainlayout from '@/layouts/Mainlayout.vue';
import { useRoute } from 'vue-router';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { demoCars } from '@/data/demo/cars';

/**
 * =====================
 * СТАНИ ТА РЕАКТИВНІСТЬ
 * =====================
 */
const route = useRoute();
const carId = Number(route.params.id);
const car = computed(() => demoCars.find(c => c.id === carId) || demoCars[0]);

/**
 * =====================
 * ГАЛЕРЕЯ
 * =====================
 */
// Стани галереї
const carImages = computed(() => car.value.images || []);
const currentImageIndex = ref(0);
const currentImage = computed(() => carImages.value[currentImageIndex.value] || carImages.value[0]);
const imageContainer = ref(null);
const imageWidths = ref([]);
const imageWidth = ref(0);
const isMobile = ref(window.innerWidth <= 768);

// Обробники подій галереї
const handleImageLoad = (event, index) => {
    const img = event.target;
    
    if (!isMobile.value) {
        // Для десктопу - розрахунок на основі висоти контейнера
        const renderedWidth = img.offsetWidth || img.clientWidth;
        imageWidths.value[index] = renderedWidth;
    }
    // Для мобільних - ширина не потрібна, використовуємо 100%
};

const handleResize = () => {
    isMobile.value = window.innerWidth <= 768;
};

/**
 * =====================
 * ЖИТТЄВИЙ ЦИКЛ
 * =====================
 */
onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Додаємо обробник прокрутки з debounce
    let scrollTimeout;
    const debouncedScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 50);
    };
    
    if (imageContainer.value) {
        imageContainer.value.addEventListener('scroll', debouncedScroll);
    }
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    
    if (imageContainer.value) {
        imageContainer.value.removeEventListener('scroll', handleScroll);
    }
});

/**
 * =====================
 * ПАРАМЕТРИ АВТОМОБІЛЯ
 * =====================
 */
const carParams = computed(() => [
    { label: 'Рік випуску авто', value: car.value.year },
    { label: 'Пробіг', value: `${car.value.mileage} тис. км` },
    { label: 'Двигун', value: `${car.value.fuel_type} ${car.value.engine_capacity} ${car.value.engine_unit}` },
    { label: 'Коробка передач', value: car.value.gearbox },
    { label: 'Тип приводу', value: car.value.drive_type },
    { label: 'Тип кузову', value: car.value.body_type },
    { label: 'Колір', value: car.value.color },
    { label: 'Місто', value: car.value.city }
]);

/**
 * =====================
 * НАВІГАЦІЯ
 * =====================
 */
const items = [
    { label: 'Головна', url: '/' },
    { label: 'Каталог', url: '/catalog' },
    { label: 'Деталі автомобіля', url: route.path }
];

const home = { icon: 'pi pi-home', url: '/' };

/**
 * =====================
 * ФУНКЦІЇ ГАЛЕРЕЇ
 * =====================
 */
const scrollToImage = (indexOrDirection) => {
    if (!imageContainer.value) return;

    let newIndex;
    if (typeof indexOrDirection === 'number') {
        newIndex = indexOrDirection;
    } else {
        newIndex = indexOrDirection === 'next' 
            ? Math.min(currentImageIndex.value + 1, carImages.value.length - 1)
            : Math.max(currentImageIndex.value - 1, 0);
    }

    // Змінюємо логіку прокрутки для мобільної версії
    if (isMobile.value) {
        const containerWidth = imageContainer.value.clientWidth;
        const scrollPosition = newIndex * containerWidth;
        
        imageContainer.value.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    } else {
        // Залишаємо оригінальну логіку для десктопу
        const scrollPosition = imageWidths.value
            .slice(0, newIndex)
            .reduce((acc, width) => acc + width, 0);

        imageContainer.value.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
    
    currentImageIndex.value = newIndex;
};

/**
 * =====================
 * ФОРМАТУВАННЯ
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
 * ТЕЛЕФОННЫЙ НОМЕР
 * =====================
 */
const isPhoneVisible = ref(false);
const phoneNumber = "098 123 45 67"; // Демо номер

const getPhoneLink = () => {
    return `tel:${phoneNumber.replace(/\s/g, '')}`;
};

const showPhoneNumber = () => {
    isPhoneVisible.value = true;
};

// Додаємо функцію для обробки прокрутки
const handleScroll = () => {
    if (!imageContainer.value || !isMobile.value) return;
    
    const containerWidth = imageContainer.value.clientWidth;
    const scrollLeft = imageContainer.value.scrollLeft;
    
    // Розраховуємо поточний індекс на основі прокрутки
    const newIndex = Math.round(scrollLeft / containerWidth);
    if (newIndex !== currentImageIndex.value) {
        currentImageIndex.value = newIndex;
    }
};
</script>

<style scoped>
/**
 * =====================
 * ЗАГАЛЬНІ СТИЛІ
 * =====================
 */
.brand-dots {
    border-bottom: 1px dotted var(--surface-400);
    margin: 0 0.3rem;
}

/**
 * =====================
 * СТИЛІ ГАЛЕРЕЇ
 * =====================
 */
.car-gallery-container {
    width: 100%;
    background: var(--surface-ground);
    border-radius: 8px;
    overflow: hidden;
}

.main-image-wrapper {
    position: relative;
    width: 100%;
    height: 500px;
    background: var(--surface-section);
    overflow: hidden;
}

.main-image-container {
    display: flex;
    width: 100%;
    height: 100%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 0;
    margin: 0;
    font-size: 0;
}

.image-slide {
    scroll-snap-align: start;
    height: 100%;
    padding: 0;
    margin: 0;
}

.image-slide img {
    display: block;
    height: 100%;
    width: auto;
}

.image-wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-wrapper img {
    height: 100%;
    width: auto;
    max-width: none;
    object-fit: contain;
}

.navigation-buttons {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    pointer-events: none;
}

.nav-button {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8) !important;
    border: none !important;
    color: var(--primary-color) !important;
}

.nav-button:hover {
    background: rgba(255, 255, 255, 0.9) !important;
}

.nav-button:disabled {
    opacity: 0.5;
    cursor: default;
}

.image-counter {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    font-size: 0.875rem;
}

.thumbnails-container {
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
    overflow-x: auto;
    background: var(--surface-section);
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.thumbnail {
    position: relative;
    width: 100px;
    height: 67px;
    overflow: hidden;
}

.thumbnail img {
    height: 100%;
    width: auto;
    min-width: 100%;
    object-fit: cover;
}

/* Прибираємо старі стилі, які могли впливати на розтягування */
.transform-center,
.min-w-full,
.min-h-full {
    display: none;
}

/**
 * =====================
 * АДАПТИВНІСТЬ
 * =====================
 */
@media screen and (max-width: 768px) {
    .main-image-wrapper {
        height: auto;
    }

    .image-slide {
        width: 100% !important; /* Перевизначаємо inline стилі */
        aspect-ratio: 1/1;
    }

    .mobile-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    /* Приховуємо превью */
    .thumbnails-container {
        display: none;
    }

    /* Зменшуємо розмір кнопок навігації */
    .nav-button {
        width: 2.5rem;
        height: 2.5rem;
    }

    .photo-counter {
        top: 0.5rem;
        right: 0.5rem;
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
    }

    .stats-container {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
}

/* Для дуже маленьких екранів */
@media screen and (max-width: 480px) {
    .nav-button {
        width: 2rem;
        height: 2rem;
    }
}

/**
 * =====================
 * УТИЛІТИ
 * =====================
 */
.scrollbar-none {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;     /* Firefox */
}

/* Приховуємо скролбар для Chrome, Safari та Opera */
.scrollbar-none::-webkit-scrollbar {
    display: none;
}

/* Стилі для десктопного зображення */
.desktop-image {
    height: 100%;
    width: auto;
    object-fit: contain;
    display: block;
}

/* Стилі для мобільного зображення */
.mobile-image {
    width: 100% !important;
    height: 100%;
    object-fit: cover !important;
    display: block;
}

/* Стилі для лічильника */
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

/**
 * =====================
 * СТАТИСТИКА ОГОЛОШЕННЯ
 * =====================
 */
.stats-container {
    background: var(--surface-section);
    border-top: 1px solid var(--surface-border);
    transition: background-color 0.2s;
}

.stats-container:hover {
    background: var(--surface-hover);
}

.stats-container i {
    font-size: 1rem;
}

.stats-container span {
    font-size: 0.875rem;
}
</style> 