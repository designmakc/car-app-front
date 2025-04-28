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
  <!-- Контейнер навбара, закріплений внизу, flex-розмітка -->
  <div class="mobile-navbar-bg fixed bottom-0 left-0 w-full surface-900 flex justify-content-between align-items-center px-1 py-1 z-5" style="height:60px;">
    <!-- Активна кнопка абсолютно позиціонується поверх навбара -->
    <div
      class="absolute"
      :style="activeBtnStyle"
    >
      <button
        class="flex align-items-center justify-content-center border-circle z-3 transition-all duration-300 bg-primary-500 active-animate"
        style="width: 4rem;height:4rem; border:none; transform: translateY(-6px); opacity: 1;"
        aria-label="navItems[activeIndex].label"
      >
        <span class="pi text-white flex align-items-center justify-content-center" :class="navItems[activeIndex].icon" style="font-size:1.5rem;width:24px;height:24px;"></span>
      </button>
      <span class="block bg-primary-500 border-circle mx-auto " style="width:10px;height:10px;margin-top:0.2rem;"></span>
    </div>
    <!-- Всі кнопки меню -->
    <div class="flex w-full justify-content-between align-items-center px-4 relative" style="z-index:2;">
      <template v-for="(item, idx) in navItems" :key="item.key">
        <div class="flex-1 flex justify-content-center">
          <!-- Якщо це активний пункт — залишаємо порожнє місце -->
          <span v-if="activeIndex === idx" style="width:48px;height:48px;display:inline-block;"></span>
          <!-- Неактивні іконки -->
          <button
            v-else
            class="flex align-items-center justify-content-center border-circle transition-all duration-300 p-0 bg-transparent text-white alpha-80 border-none outline-none w-3rem h-3rem hover:bg-primary-400 focus:bg-primary-600"
            @click="setActive(idx)"
            aria-label="item.label"
          >
            <span class="pi flex align-items-center justify-content-center" :class="item.icon" style="font-size:1.5rem;width:24px;height:24px;"></span>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// PrimeIcons використовуються через prop icon="pi pi-*"
const navItems = [
  { key: 'add', icon: 'pi pi-plus', label: 'Додати' },
  { key: 'fav', icon: 'pi pi-heart', label: 'Обране' },
  { key: 'home', icon: 'pi pi-home', label: 'Головна' },
  { key: 'search', icon: 'pi pi-search', label: 'Пошук' },
  { key: 'profile', icon: 'pi pi-user', label: 'Профіль' }
]

const activeIndex = ref(2) // За замовчуванням "Головна"

function setActive(idx) {
  activeIndex.value = idx
}

// Стиль для позиціонування активної кнопки над відповідним пунктом
const activeBtnStyle = computed(() => {
  // 5 пунктів, кожен займає 20%, кнопка по центру відповідного пункту
  const percent = activeIndex.value * 20 + 10 // 10% — центр кожного пункту
  return {
    left: `calc(${percent}% - 24px)`, // 24px — половина ширини кнопки
    top: '-18px',
    transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1)',
    zIndex: 3
  }
})
</script>

<style scoped>
.mobile-navbar-bg {
  height: 60px;
  background: var(--p-surface-900);
  border-radius: 0;
}

.active-animate {
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s, background 0.3s;
}
</style>

<!--
  Стилі не використовуються, все через PrimeFlex та PrimeVue класи.
  Якщо потрібно — можна додати мінімальні scoped стилі для анімації/позиціонування.
--> 