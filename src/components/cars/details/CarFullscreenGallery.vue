<!--
/**
 * CarFullscreenGallery.vue
 * 
 * Компонент повноекранної галереї зображень
 */
-->

<template>
    <Galleria 
        :visible="isVisible" 
        @update:visible="handleVisibilityChange"
        :value="images" 
        :circular="true" 
        :fullScreen="true" 
        :showItemNavigators="true"
        :showThumbnails="false"
        :showIndicators="true"
        :indicatorsPosition="bottom"
        :showIndicatorsOnItem="true"
        :activeIndex="currentIndex"
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
</template>

<script setup>
// 1. Імпорти Vue
import { reactive } from 'vue'

// 2. Імпорти PrimeVue компонентів
import Galleria from 'primevue/galleria'

// 3. Props компонента
const props = defineProps({
    images: {
        type: Array,
        required: true
    },
    isVisible: {
        type: Boolean,
        required: true
    },
    currentIndex: {
        type: Number,
        required: true
    },
    car: {
        type: Object,
        required: true
    }
})

// 4. Events з типізацією
const emit = defineEmits({
    'update:visible': (value) => typeof value === 'boolean',
    'update:index': (index) => typeof index === 'number' && index >= 0
})

// 5. Reactive стан (SSR-безпечний)
const startPos = reactive({ x: 0, y: 0 })

// 6. Touch event handlers (тільки в браузері)
const onTouchStart = (e) => {
    if (typeof window === 'undefined') return
    
    try {
        const touchobj = e.changedTouches[0]
        startPos.x = touchobj.pageX
        startPos.y = touchobj.pageY
    } catch (error) {
        console.warn('Touch start error:', error)
    }
}

const onTouchMove = (e) => {
    if (typeof window === 'undefined') return
    
    try {
        if (e.cancelable) {
            e.preventDefault()
        }
    } catch (error) {
        console.warn('Touch move error:', error)
    }
}

const onTouchEnd = (e) => {
    if (typeof window === 'undefined') return
    
    try {
        const touchobj = e.changedTouches[0]
        const diffX = touchobj.pageX - startPos.x
        const diffY = touchobj.pageY - startPos.y

        if (Math.abs(diffX) > Math.abs(diffY)) {
            changePageOnTouch(diffX)
        }
    } catch (error) {
        console.warn('Touch end error:', error)
    }
}

// 7. Navigation functions
const changePageOnTouch = (diff) => {
    if (Math.abs(diff) < 50) return

    if (diff < 0) {
        if (props.currentIndex < props.images.length - 1) {
            emit('update:index', props.currentIndex + 1)
        } else if (props.images.length > 0) {
            emit('update:index', 0)
        }
    } else {
        if (props.currentIndex > 0) {
            emit('update:index', props.currentIndex - 1)
        } else if (props.images.length > 0) {
            emit('update:index', props.images.length - 1)
        }
    }
}

// 8. Event handlers
const handleGalleriaChange = (newIndex) => {
    if (typeof newIndex === 'number' && newIndex >= 0) {
        emit('update:index', newIndex)
    }
}

const handleVisibilityChange = (value) => {
    emit('update:visible', value)
}
</script> 