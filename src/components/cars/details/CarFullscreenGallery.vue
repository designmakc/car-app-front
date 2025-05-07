<!--
/**
 * CarFullscreenGallery.vue
 * 
 * Компонент повноекранної галереї зображень
 */
-->

<template>
    <Galleria :visible="isVisible" 
              @update:visible="$emit('update:visible', $event)"
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
import { reactive, ref } from 'vue';
import Galleria from 'primevue/galleria';

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
});

const emit = defineEmits(['update:visible', 'update:index']);

const startPos = reactive({ x: 0, y: 0 });

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

    if (Math.abs(diffX) > Math.abs(diffY)) {
        changePageOnTouch(diffX);
    }
};

const changePageOnTouch = (diff) => {
    if (Math.abs(diff) < 50) return;

    if (diff < 0) {
        if (props.currentIndex < props.images.length - 1) {
            emit('update:index', props.currentIndex + 1);
        } else if (props.images.length > 0) {
            emit('update:index', 0);
        }
    } else {
        if (props.currentIndex > 0) {
            emit('update:index', props.currentIndex - 1);
        } else if (props.images.length > 0) {
            emit('update:index', props.images.length - 1);
        }
    }
};

const handleGalleriaChange = (newIndex) => {
    emit('update:index', newIndex);
};
</script> 