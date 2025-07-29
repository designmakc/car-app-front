<!--
/**
 * CarGallery.vue
 * 
 * Компонент галереї зображень автомобіля
 * Включає основне зображення та мініатюри
 */
-->

<template>
    <div class="surface-ground border-round-lg overflow-hidden mb-4">
        <div class="relative w-full h-[300px] md:h-[30rem] surface-section overflow-hidden">
            <!-- Лічильник фото -->
            <div class="photo-counter">
                <span class="font-medium">{{ currentIndex + 1 }}</span>
                <span class="text-300">/</span>
                <span class="text-300">{{ images.length }}</span>
            </div>

            <!-- Основний слайдер -->
            <div ref="imageContainer" 
                class="flex gap-1 w-full h-[300px] md:h-[30rem] overflow-x-auto scroll-smooth scrollbar-none"
                style="scroll-snap-type: x mandatory;"
                @scroll="handleScroll">
                <div v-for="(image, index) in images" 
                    :key="index"
                    class="flex-none h-full image-slide"
                    :style="{ 
                        width: isMobile ? '100%' : `${imageWidths[index] || 400}px`,
                        'scroll-snap-align': 'start'
                    }">
                    <img :src="image.url" 
                        :alt="`${car.brand} ${car.model}`"
                        class="mobile-image md:desktop-image" 
                        @load="handleImageLoad($event, index)"
                        @click="openFullscreenGallery(index)"
                        style="cursor: pointer"
                    />
                </div>
            </div>

            <!-- Навігаційні кнопки -->
            <div class="absolute top-50 left-0 right-0 -mt-4 flex justify-content-between pointer-events-none">
                <Button icon="pi pi-chevron-left" 
                    class="nav-button pointer-events-auto mx-2"
                    @click="scrollToImage('prev')"
                    :disabled="currentIndex === 0"
                    style="background: rgba(0, 0, 0, 0.5); border: none; width: 3rem; height: 3rem;"
                />
                <Button icon="pi pi-chevron-right" 
                    class="nav-button pointer-events-auto mx-2"
                    @click="scrollToImage('next')"
                    :disabled="currentIndex === images.length - 1"
                    style="background: rgba(0, 0, 0, 0.5); border: none; width: 3rem; height: 3rem;"
                />
            </div>

            <!-- Індикатори для мобільної версії -->
            <div class="md:hidden flex gap-2 justify-content-center absolute bottom-0 left-0 right-0 mb-2">
                <div v-for="(_, index) in images" 
                    :key="index"
                    class="photo-indicator cursor-pointer"
                    :class="{ 'active': index === currentIndex }"
                    @click="scrollToImage(index)"
                ></div>
            </div>
        </div>

        <!-- Мініатюри для десктопу -->
        <div class="hidden md:flex gap-1 py-1 surface-section overflow-x-auto scrollbar-none">
            <div v-for="(image, index) in images" 
                :key="index"
                @click="scrollToImage(index)"
                class="flex-none cursor-pointer overflow-hidden transition-opacity transition-duration-200"
                :class="[
                    index === currentIndex 
                        ? 'border-2 border-primary opacity-100' 
                        : 'opacity-70 hover:opacity-90'
                ]"
                style="width: 100px; height: 67px; position: relative;">
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
</template>

<script setup>
// 1. Імпорти Vue
import { ref, onMounted, onUnmounted } from 'vue'

// 2. Імпорти PrimeVue компонентів
import Button from 'primevue/button'

// 3. Props компонента
const props = defineProps({
    images: {
        type: Array,
        required: true
    },
    currentIndex: {
        type: Number,
        required: true
    },
    isMobile: {
        type: Boolean,
        required: true
    },
    car: {
        type: Object,
        required: true
    }
})

// 4. Events з типізацією
const emit = defineEmits({
    'update:index': (index) => typeof index === 'number' && index >= 0,
    'open-fullscreen': (index) => typeof index === 'number' && index >= 0
})

// 5. Reactive стан (SSR-безпечний)
const imageContainer = ref(null)
const imageWidths = ref([])

// 6. Event handlers для зображень
const handleImageLoad = (event, index) => {
    if (typeof window === 'undefined') return
    if (props.isMobile) return
    
    try {
        const renderedWidth = event.target.offsetWidth || event.target.clientWidth
        if (renderedWidth > 0) {
            imageWidths.value[index] = renderedWidth
        }
    } catch (error) {
        console.warn('Error handling image load:', error)
    }
}

// 7. Scroll handler (SSR-безпечний)
const handleScroll = () => {
    if (typeof window === 'undefined') return
    if (!imageContainer.value || !props.isMobile) return
    
    try {
        const containerWidth = imageContainer.value.clientWidth
        const scrollLeft = imageContainer.value.scrollLeft
        
        const newIndex = Math.round(scrollLeft / containerWidth)
        if (newIndex !== props.currentIndex && newIndex >= 0 && newIndex < props.images.length) {
            emit('update:index', newIndex)
        }
    } catch (error) {
        console.warn('Error handling scroll:', error)
    }
}

// 8. Navigation functions
const scrollToImage = (indexOrDirection) => {
    if (typeof window === 'undefined') return
    if (!imageContainer.value) return

    try {
        let newIndex
        if (typeof indexOrDirection === 'number') {
            newIndex = Math.max(0, Math.min(indexOrDirection, props.images.length - 1))
        } else {
            newIndex = indexOrDirection === 'next' 
                ? Math.min(props.currentIndex + 1, props.images.length - 1)
                : Math.max(props.currentIndex - 1, 0)
        }

        if (props.isMobile) {
            const containerWidth = imageContainer.value.clientWidth
            const scrollPosition = newIndex * containerWidth
            
            imageContainer.value.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            })
        } else {
            const scrollPosition = imageWidths.value
                .slice(0, newIndex)
                .reduce((acc, width) => acc + (width || 400), 0)

            imageContainer.value.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            })
        }
        
        emit('update:index', newIndex)
    } catch (error) {
        console.warn('Error scrolling to image:', error)
    }
}

const openFullscreenGallery = (index) => {
    if (typeof index === 'number' && index >= 0) {
        emit('open-fullscreen', index)
    }
}

// 9. Lifecycle hooks (SSR-безпечні)
let scrollTimeout
let debouncedScrollHandler

onMounted(() => {
    if (typeof window === 'undefined') return
    
    try {
        debouncedScrollHandler = () => {
            clearTimeout(scrollTimeout)
            scrollTimeout = setTimeout(handleScroll, 50)
        }
        
        if (imageContainer.value) {
            imageContainer.value.addEventListener('scroll', debouncedScrollHandler)
        }
    } catch (error) {
        console.warn('Error setting up scroll listener:', error)
    }
})

onUnmounted(() => {
    if (typeof window === 'undefined') return
    
    try {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout)
        }
        
        if (imageContainer.value && debouncedScrollHandler) {
            imageContainer.value.removeEventListener('scroll', debouncedScrollHandler)
        }
    } catch (error) {
        console.warn('Error cleaning up scroll listener:', error)
    }
})
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

/* Photo indicator styles */
.photo-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
}

.photo-indicator.active {
    background-color: white;
    transform: scale(1.2);
}
</style> 