<!-- 
  MobileNavbar компонент
  Базується на:
  - Button (PrimeVue) для кнопок навігації
  - Ripple (PrimeVue) для ефекту кліку
  - PrimeFlex для адаптивної стилізації

  Функціональність:
  - Закріплена навігація внизу екрану для мобільних пристроїв
  - Анімована індикація активного пункту
  - Кастомізовані іконки для кожного пункту
  - Плавна анімація переключення
  - Відображення бейджів для пунктів меню

  @props {String} activeTab - Активний пункт меню
  @props {Object} badges - Кількість для бейджів в меню
  
  @emits {String} change - Подія при зміні активного пункту меню
    @param {String} tabName - Назва обраного пункту

  @example
  <MobileNavbar 
    activeTab="home" 
    :badges="{ favorites: 2, notifications: 3 }"
    @change="handleTabChange" 
  />
-->

<template>
  <!-- Додаємо діалог з AdvancedCarFilter -->
  <Dialog 
    v-model:visible="showSearchDialog" 
    modal 
    :dismissableMask="true"
    :style="{ width: '90vw', maxWidth: '500px' }"
    position="bottom"
    :draggable="false"
    :closeOnEscape="true"
    header="Всі фільтри"
  >
    <AdvancedCarFilter 
      :filters="filters"
      :formData="demoCarFormData"
      @update:filters="handleFiltersChange"
      @apply="handleApplyFilters"
      @close="showSearchDialog = false"
      :showHeader="false"
    />
  </Dialog>

  <!-- Контейнер навбара з фіксованою позицією внизу екрану -->
  <div class="mobile-navbar block lg:hidden fixed bottom-0 left-0 w-full z-5">
    <!-- Фоновий елемент з blur-ефектом для сучасного вигляду -->
    <div class="navbar-bg-blur absolute w-full h-full"></div>
    
    <!-- Основний контейнер з кнопками -->
    <div class="navbar-container flex justify-content-between align-items-center py-2 px-0 relative">
      
      <!-- Індикатор активного елемента, який рухається між кнопками -->
      <div class="active-indicator absolute" :style="indicatorStyle"></div>
      
      <!-- Кнопки навігації -->
      <template v-for="(item, index) in navItems" :key="item.key">
        <button 
          class="nav-button flex flex-column align-items-center justify-content-center relative p-0"
          :class="{ 'nav-active': activeIndex === index }"
          @click="setActive(index)"
          :aria-label="item.label"
        >
          <!-- Іконка -->
          <div class="icon-container flex align-items-center justify-content-center">
            <i class="pi" :class="item.icon"></i>
            
            <!-- Індикатор бейджа (якщо є) -->
            <span 
              v-if="badges[item.key]" 
              class="badge flex align-items-center justify-content-center"
            >
              {{ badges[item.key] }}
            </span>
          </div>
          
          <!-- Підпис під іконкою -->
          <span class="nav-label text-xs mt-1">{{ item.label }}</span>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Dialog from 'primevue/dialog'
import AdvancedCarFilter from '@/components/cars/AdvancedCarFilter.vue'

// Змінна для діалогу пошуку
const showSearchDialog = ref(false)
const filters = ref({})
const demoCarFormData = ref({})

// Обробники подій фільтра
const handleFiltersChange = (newFilters) => {
  filters.value = newFilters
}

const handleApplyFilters = () => {
  showSearchDialog.value = false
  // Логіка застосування фільтрів
}

// Імпорт роутера та поточного маршруту
const router = useRouter()
const route = useRoute()

// Елементи навігації
const navItems = [
  { key: 'home', icon: 'pi-home', label: 'Головна' },
  { key: 'add', icon: 'pi-plus', label: 'Додати' },
  { key: 'search', icon: 'pi-search', label: 'Пошук' },
  { key: 'favorites', icon: 'pi-heart', label: 'Обране' },
  { key: 'profile', icon: 'pi-user', label: 'Профіль' }
]

// Активний елемент тепер залежить від поточного маршруту
const activeIndex = computed(() => {
  const path = route.path
  if (path === '/') return 0
  if (path === '/add-car') return 1
  if (path === '/search') return 2
  if (path === '/favorites') return 3
  if (path === '/profile' || path === '/login') return 4
  return -1
})

// Замість store використовуємо API
const favoritesCount = ref(0)

// Отримання кількості обраних
const getFavoritesCount = async () => {
  try {
    // TODO: API call
    // const response = await fetch('/api/favorites/count')
    // const { count } = await response.json()
    // favoritesCount.value = count
  } catch (error) {
    console.error('Помилка при отриманні кількості обраних:', error)
  }
}

onMounted(getFavoritesCount)

// Кількість бейджів (для обраного)
const badges = computed(() => ({
  favorites: favoritesCount.value || 0
}))

// Функція для зміни активного елемента з анімацією
function setActive(index) {
  const route = navItems[index].key
  
  switch(route) {
    case 'home':
      router.push('/')
      break
      
    case 'add':
      router.push('/add-car')
      break
      
    case 'search':
      // Відкриваємо діалог пошуку
      showSearchDialog.value = true
      break
      
    case 'favorites':
      router.push('/favorites')
      break
      
    case 'profile':
      // Тимчасово завжди перенаправляємо на логін
      // Пізніше додамо перевірку авторизації
      router.push('/login')
      break
  }
  
  emit('change', navItems[index].key)
}

// Розрахунок позиції індикатора активного елемента 
const indicatorStyle = computed(() => {
  const itemWidth = 100 / navItems.length
  const position = activeIndex.value * itemWidth
  
  return {
    left: `calc(${position}% + ${itemWidth/2}%)`,
    width: '30px',
    transform: 'translateX(-15px)',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
  }
})

// Емітимо події для батьківського компонента
const emit = defineEmits(['change'])
</script>

<style scoped>
.mobile-navbar {
  height: 70px;
  overflow: hidden;
  box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.1);
}

/* Напівпрозорий фон з розмиттям для сучасного look & feel */
.navbar-bg-blur {
  backdrop-filter: blur(10px);
  background: var(--p-surface-900); 
  
}

.navbar-container {
  height: 100%;
}

/* Стилізація кнопок навігації */
.nav-button {
  flex: 1;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

/* Індикатор активної кнопки */
.active-indicator {
  bottom: 0;
  height: 3px;
  width: 30px; /* Збільшена ширина для кращої видимості */
  border-radius: 4px 4px 0 0;
  background: var(--p-orange-500);
  position: absolute;
  transform: translateX(0); /* Видалено трансформацію, тепер позиціонування через left */
}

/* Контейнер для іконок */
.icon-container {
  position: relative;
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

/* Стилізація іконок */
.pi {
  font-size: 1.4rem;
  color: var(--p-surface-200);
  transition: color 0.3s, transform 0.4s;
}

/* Активна іконка */
.nav-active .pi {
  color: var(--p-orange-500);
  transform: scale(1.15);
}

/* Підпис під іконкою */
.nav-label {
  font-family: 'Roboto', sans-serif;
  color: var(--p-surface-400);
  transition: color 0.3s, opacity 0.3s;
  opacity: 0.8;
}

/* Активний підпис */
.nav-active .nav-label {
  color: var(--p-orange-500);
  opacity: 1;
  font-weight: 500;
}

/* Бейдж для сповіщень */
.badge {
  position: absolute;
  top: -6px;
  right: -8px;
  min-width: 18px;
  height: 18px;
  background: var(--p-orange-500);
  color: white;
  border-radius: 9px;
  font-size: 10px;
  font-weight: bold;
  animation: pulse 2s infinite;
}

/* Анімації при натисканні */
.entering {
  animation: bounce 0.4s;
}

.leaving {
  animation: slide-out 0.3s;
}

/* Пульсуюча анімація для бейджів */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* Анімація для активної кнопки */
@keyframes bounce {
  0% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  80% { transform: translateY(-2px); }
  100% { transform: translateY(0); }
}

/* Анімація для неактивної кнопки */
@keyframes slide-out {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(5px); opacity: 0.5; }
}

/* Стилі для діалогу */
:deep(.p-dialog) {
  margin: 0;
  border-radius: 1rem 1rem 0 0;
}

:deep(.p-dialog-header) {
  padding: 1rem;
  border-bottom: 1px solid var(--surface-200);
}

:deep(.p-dialog-content) {
  padding: 0;
}
</style>

<!--
  Стилі не використовуються, все через PrimeFlex та PrimeVue класи.
  Якщо потрібно — можна додати мінімальні scoped стилі для анімації/позиціонування.
--> 