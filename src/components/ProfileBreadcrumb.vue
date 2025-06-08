<template>
  <div>
    <!-- Хлебные крошки (десктоп) -->
    <div class="hidden md:flex align-items-center mb-3">
      <Button 
        icon="pi pi-arrow-left" 
        text 
        size="small"
        class="text-primary mr-2"
        @click="goToProfile"
      />
      <span class="text-600 text-sm">{{ breadcrumbText }}</span>
    </div>

    <!-- Мобильный хедер -->
    <div class="mobile-header md:hidden">
      <Button 
        icon="pi pi-arrow-left" 
        text 
        class="text-white"
        @click="goToProfile"
      />
      <h1 class="text-xl font-semibold text-white m-0">{{ title }}</h1>
      <div class="w-2rem">
        <slot name="mobile-action"></slot>
      </div>
    </div>

    <!-- Десктопный заголовок -->
    <div class="hidden md:flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="text-2xl font-bold text-900 m-0">{{ title }}</h1>
        <p v-if="subtitle" class="text-600 mt-1 mb-0">{{ subtitle }}</p>
      </div>
      <div>
        <slot name="desktop-action"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()

// Props
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  breadcrumbText: {
    type: String,
    default: 'Профіль'
  }
})

// Методы
const goToProfile = () => {
  router.push('/profile')
}
</script>

<style scoped>
.mobile-header {
  background: linear-gradient(135deg, var(--primary-color) 0%, #f7931e 100%);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0 0 1.5rem 1.5rem;
  margin: -1rem -1rem 1.5rem -1rem;
}

/* Адаптивность */
@media (max-width: 768px) {
  .mobile-header {
    margin: 0 -1rem 1.5rem -1rem;
  }
}
</style> 