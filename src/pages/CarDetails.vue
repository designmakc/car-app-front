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
            <Breadcrumb :home="home" :model="items" class="mb-4 p-2 border-round mt-4 hidden md:block"/>

            <main>
                <!-- ==================== -->
                <!-- = ШАПКА СТОРІНКИ  = -->
                <!-- ==================== -->
                <div class="flex justify-content-between flex-column md:flex-row gap-2">
                    <!-- Блок з назвою та ціною -->
                    <div class="flex align-items-start flex-column">
                        <h1 class="m-0 pt-2 md:pt-0">{{ car.brand }} {{ car.model }} {{ car.year }}</h1>
                        <div class="flex flex-column align-content-center flex-wrap md:flex-row gap-0 md:gap-4">
                            <h2 class="align-content-center text-primary p-0 my-2">{{ formatPrice(car.price) }}</h2>
                            <div class="flex align-content-center flex-wrap gap-2">
                                <Tag v-if="car.is_top" icon="pi pi-star" value="TOP" severity="warning"  />
                                <Tag v-if="car.status === 'На майданчику'" value="На майданчику" severity="success"  />
                                <Tag v-if="car.exchange_available" icon="pi pi-sync" value="Обмін" severity="info"  />
                            </div>
                        </div>
                    </div>
                    
                    <!-- Блок кнопок дій -->
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
                        <Panel header="Продавець" class="mb-4">
                            <div class="text-2xl font-bold text-700 mb-1">Сергій</div>
                            <div class="flex align-items-center gap-2 mb-2">
                                <span class="text-600 text-sm ">Дата реєстрації</span>
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
                                <div class="relative w-full h-[300px] md:h-[30rem] surface-section overflow-hidden">
                                    <div class="photo-counter" >
                                        <span class="font-medium">{{ currentImageIndex + 1 }}</span>
                                        <span class="text-300">/</span>
                                        <span class="text-300">{{ carImages.length }}</span>
                                    </div>

                                    <div ref="imageContainer" 
                                        class="flex gap-1 w-full h-[300px] md:h-[30rem] overflow-x-auto scroll-smooth scrollbar-none"
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
                                                @click="openFullscreenGallery(index)"
                                                style="cursor: pointer"
                                            />
                                        </div>
                                    </div>

                                    <div class="absolute top-50 left-0 right-0 -mt-4 flex justify-content-between pointer-events-none">
                                        <Button icon="pi pi-chevron-left" 
                                            class="nav-button pointer-events-auto mx-2"
                                            @click="scrollToImage('prev')"
                                            :disabled="currentImageIndex === 0"
                                            style="background: rgba(0, 0, 0, 0.5); border: none; width: 3rem; height: 3rem;"
                                        />
                                        <Button icon="pi pi-chevron-right" 
                                            class="nav-button pointer-events-auto mx-2"
                                            @click="scrollToImage('next')"
                                            :disabled="currentImageIndex === carImages.length - 1"
                                            style="background: rgba(0, 0, 0, 0.5); border: none; width: 3rem; height: 3rem;"
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
                             
                            <!-- Галерея фул скрін -->
                            <Galleria v-model:visible="isFullscreenGalleryVisible" 
                                      :value="carImages" 
                                      :circular="true" 
                                      :fullScreen="true" 
                                      :showItemNavigators="true"
                                      :showThumbnails="false"
                                      :showIndicators="true"
                                      :indicatorsPosition="bottom"
                                      :showIndicatorsOnItem="true"
                                      :activeIndex="currentImageIndex"
                                      @update:activeIndex="handleGalleriaChange"
                                      :pt="{
                                          closeButton: {
                                              style: 'z-index: 2; outline: none; box-shadow: none; border: none;'
                                          }
                                      }">
                                <template #item="slotProps">
                                    <div @touchstart="onTouchStart" 
                                         @touchmove="onTouchMove" 
                                         @touchend="onTouchEnd"
                                         class="w-full h-full">
                                        <img :src="slotProps.item.url" 
                                             :alt="`${car.brand} ${car.model}`"
                                             style="width: 100%; display: block; object-fit: contain;" />
                                    </div>
                                </template>
                            </Galleria>

                            <!-- Інформація про оголошення -->  
                            <Toolbar class="flex">
                                <template #start>
                                    <div class="flex gap-3">
                                        <div class="flex gap-2 align-items-center">
                                        <i class="pi pi-eye text-600"></i>
                                        <span class="font-medium text-600">1234</span>
                                        </div>
                                        <div  class="flex gap-2" >
                                            <i class="pi pi-calendar text-600"></i>
                                            <span class="text-600">{{ formatDate(car.created_at) }}</span>
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
                                            @click="toggleFavorite"
                                            class="w-full"
                                        />
                                        
                                    </div>
                                </template>
                            </Toolbar>

                            <!-- Коментар власника -->  
                            <Card class="hidden md:block mt-4">
                                <template #title>
                                    <div>
                                        <i class="pi pi-comment mr-2"></i>
                                        Опис автомобіля
                                    </div>
                                </template>
                                <template #content>
                                    <div>
                                        <p class="m-0 text-lg">
                                            {{ car.description || 'Опис відсутній' }}
                                        </p>
                                    </div>
                                </template>
                            </Card>

                            <!-- Додайте компонент кредитного калькулятора -->
                            <CreditCalculator 
                            class="w-full"
                            />


                            
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
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue';
import { demoCars } from '@/data/demo/cars';
import Galleria from 'primevue/galleria';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import CreditCalculator from '@/components/credit/CreditCalculator.vue';

/**
 * =====================
 * СТАНИ ТА РЕАКТИВНІСТЬ
 * =====================
 */
const route = useRoute();
const carId = Number(route.params.id);
const car = computed(() => {
    const foundCar = demoCars.find(c => c.id === carId) || demoCars[0];
    return {
        ...foundCar,
        exchange_available: true // За замовчуванням true, можна змінити на false якщо потрібно
    };
});

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

    // Прокручуємо сторінку вгору при монтуванні компонента
    window.scrollTo({
        top: 0,
        behavior: 'instant' // або 'smooth' для плавного скролу
    })
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

/**
 * =====================
 * НАВІГАЦІЯ
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

/**
 * =====================
 * ПОВНОЕКРАННА ГАЛЕРЕЯ
 * =====================
 */
const isFullscreenGalleryVisible = ref(false);
const startPos = reactive({ x: 0, y: 0 });
const isVertical = ref(false);

const onTouchStart = (e) => {
    const touchobj = e.changedTouches[0];
    startPos.x = touchobj.pageX;
    startPos.y = touchobj.pageY;
};

const onTouchMove = (e) => {
    if (e.cancelable) {
        e.preventDefault();
    }
};

const onTouchEnd = (e) => {
    const touchobj = e.changedTouches[0];
    const diffX = touchobj.pageX - startPos.x;
    const diffY = touchobj.pageY - startPos.y;

    // Визначаємо напрямок свайпу
    if (Math.abs(diffX) > Math.abs(diffY)) {
        changePageOnTouch(diffX);
    }
};

const changePageOnTouch = (diff) => {
    if (Math.abs(diff) < 50) return; // Мінімальна відстань для свайпу

    if (diff < 0) {
        // Свайп вліво - наступне фото
        if (currentImageIndex.value < carImages.value.length - 1) {
            currentImageIndex.value++;
        } else if (carImages.value.length > 0) {
            currentImageIndex.value = 0; // Переходимо на початок при circular=true
        }
    } else {
        // Свайп вправо - попереднє фото
        if (currentImageIndex.value > 0) {
            currentImageIndex.value--;
        } else if (carImages.value.length > 0) {
            currentImageIndex.value = carImages.value.length - 1; // Переходимо в кінець при circular=true
        }
    }
};

const handleGalleriaChange = (newIndex) => {
    currentImageIndex.value = newIndex;
};

const openFullscreenGallery = (index) => {
    currentImageIndex.value = index;
    isFullscreenGalleryVisible.value = true;
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'd MMMM yyyy', { locale: uk });
};

// Винесемо стан та функцію на рівень компонента
const isFavorite = ref(false)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}
</script>

<style scoped>
/* Базові стилі для зображень */
.desktop-image {
    display: none; /* Приховуємо на мобільних */
}

/* Стилі для мобільних зображень */
.mobile-image {
    width: 100% !important;
    height: 300px !important;
    object-fit: cover !important;
    display: block;
}

/* Приховуємо скролбар */
.scrollbar-none {
    -ms-overflow-style: none;  /* IE та Edge */
    scrollbar-width: none;     /* Firefox */
}

.scrollbar-none::-webkit-scrollbar {
    display: none;  /* Chrome, Safari та Opera */
}

/* Медіа-запит для десктопної версії */
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

/* Стилі для лічильника фото */
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

/* Додаємо стилі для кнопок навігації */
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