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
import { ref, computed, reactive } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'
import { useRouter } from 'vue-router'

// Ініціалізація store
const favorites = useFavoritesStore()

// Імпорт роутера
const router = useRouter()

// Елементи навігації
const navItems = [
  { key: 'home', icon: 'pi-home', label: 'Головна' },
  { key: 'add', icon: 'pi-plus', label: 'Додати' },
  { key: 'search', icon: 'pi-search', label: 'Пошук' },
  { key: 'favorites', icon: 'pi-heart', label: 'Обране' },
  { key: 'profile', icon: 'pi-user', label: 'Профіль' }
]

// Активний елемент (початково "Головна")
const activeIndex = ref(0)

// Кількість бейджів (для обраного)
const badges = computed(() => ({
  favorites: favorites.count || 0
}))

// Функція для зміни активного елемента з анімацією
function setActive(index) {
  // Запускаємо делікатну анімацію при зміні
  if (activeIndex.value !== index) {
    const buttons = document.querySelectorAll('.nav-button')
    buttons[activeIndex.value].classList.add('leaving')
    buttons[index].classList.add('entering')
    
    // Видаляємо класи анімації після завершення
    setTimeout(() => {
      buttons.forEach(btn => {
        btn.classList.remove('leaving', 'entering')
      })
    }, 400)
  }
  
  // Оновлюємо активний елемент
  activeIndex.value = index
  
  // Навігація в залежності від обраного пункту
  const route = navItems[index].key
  switch(route) {
    case 'home':
      router.push('/')
      break
    case 'add':
      router.push('/add-car')
      break
    case 'search':
      router.push('/search')
      break
    case 'favorites':
      router.push('/favorites')
      break
    case 'profile':
      router.push('/profile')
      break
  }
  
  // Емітимо подію для батьківського компонента
  emit('change', navItems[index].key)
}

// Розрахунок позиції індикатора активного елемента 
const indicatorStyle = computed(() => {
  // Ширина одного елемента навігації (100% / кількість елементів)
  const itemWidth = 100 / navItems.length
  
  // Позиція (відсоток від лівого краю) з центруванням та врахуванням падінгу
  const position = activeIndex.value * itemWidth
  
  return {
    left: `calc(${position}% + ${itemWidth/2}%)`,
    width: '30px',
    transform: 'translateX(-15px)', // Центрування індикатора (половина його ширини)
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
</style>

<!--
  Стилі не використовуються, все через PrimeFlex та PrimeVue класи.
  Якщо потрібно — можна додати мінімальні scoped стилі для анімації/позиціонування.
--> 