# ПРАВИЛА РОЗРОБКИ Vue.js ПРОЕКТУ CAR MARKET

## 🤖 **КРИТИЧНЕ ПРАВИЛО ДЛЯ AI АСИСТЕНТА**

**⚠️ ОБОВ'ЯЗКОВО ПЕРЕД КОЖНИМ КОДОМ:**

1. **ЗАВЖДИ ПЕРЕВІРЯТИ ОФІЦІЙНУ ДОКУМЕНТАЦІЮ** https://primevue.org/ перед написанням будь-якого коду з PrimeVue компонентами
2. **ПЕРЕХОДИТИ ПО ПОСИЛАННЮ** на сторінку конкретного компонента (наприклад, https://primevue.org/button/)
3. **ВИКОРИСТОВУВАТИ ТІЛЬКИ ОФІЦІЙНІ API** та пропси згідно з документацією
4. **ПЕРЕВІРЯТИ АКТУАЛЬНІ ПРИКЛАДИ** використання з документації
5. **НЕ ПИСАТИ КОД БЕЗ ПЕРЕВІРКИ** документації!

## 🛠 **ТЕХНІЧНИЙ СТЕК**
- Vue 3 з Composition API (`<script setup>`)
- **PrimeVue 4** для UI компонентів (https://primevue.org/)
- PrimeFlex для utility-класів
- PrimeIcons для іконок
- TypeScript (опціонально)

## 📁 **СТРУКТУРА ПРОЕКТУ**
```
src/
├── assets/         # Статичні ресурси
├── components/     # Перевикористовувані компоненти
├── composables/    # Композабл функції
├── layouts/        # Шаблони сторінок
├── pages/          # Сторінки додатку
├── router/         # Конфігурація маршрутизації
├── stores/         # Pinia сховища
└── types/          # TypeScript типи
```

## 🌐 **МОВНІ ПРАВИЛА**
- **ВСІ КОМЕНТАРІ В КОДІ - УКРАЇНСЬКОЮ МОВОЮ**
- **ВСІ ВІДПОВІДІ АСИСТЕНТА - РОСІЙСЬКОЮ МОВОЮ**
- **UI тексти - українською мовою**

## 📖 **ОБОВ'ЯЗКОВА ПЕРЕВІРКА ДОКУМЕНТАЦІЇ**

### ✅ **АЛГОРИТМ ДЛЯ AI:**
1. 🌐 Відкрити https://primevue.org/
2. 🔍 Знайти потрібний компонент в меню
3. 📋 Переглянути API, пропси, приклади
4. ✍️ Написати код згідно з документацією
5. ✅ Перевірити правильність використання

### 📚 **ОСНОВНІ КОМПОНЕНТИ ТА ДОКУМЕНТАЦІЯ:**
- **Button:** https://primevue.org/button/
- **Panel:** https://primevue.org/panel/
- **Dialog:** https://primevue.org/dialog/
- **InputText:** https://primevue.org/inputtext/
- **DataTable:** https://primevue.org/datatable/
- **Toast:** https://primevue.org/toast/

## 🔧 **ПРАВИЛЬНЕ ВИКОРИСТАННЯ PRIMEVUE КОМПОНЕНТІВ**

### 📱 **Button (https://primevue.org/button/)**
```vue
<!-- ✅ ПРАВИЛЬНО згідно з документацією -->
<Button label="Зателефонувати" 
        icon="pi pi-phone" 
        severity="success" 
        size="large"
        as="a" 
        :href="tel:+380501234567" />

<Button label="Відправити" 
        variant="outlined" 
        severity="info" />

<!-- ❌ НЕПРАВИЛЬНО - не згідно з документацією -->
<Button tag="a" outlined>
  <i class="pi pi-phone"></i>
  <span>Зателефонувати</span>
</Button>
```

### 🎛 **Основні властивості Button:**
- **severity:** `primary`, `secondary`, `success`, `info`, `warn`, `help`, `danger`, `contrast`
- **variant:** `outlined`, `text`, `link`
- **size:** `small`, `large` (default - normal)
- **as:** змінює HTML тег (`a`, `router-link`)
- **icon:** клас іконки (PrimeIcons)
- **iconPos:** `left`, `right`, `top`, `bottom`

## 📝 **ОБОВ'ЯЗКОВІ ІНСТРУКЦІЇ ДЛЯ БЕК-ЕНД РОЗРОБНИКА**

**В КОЖНОМУ КОМПОНЕНТІ обов'язково додавати:**

```vue
<!--
/**
 * ComponentName.vue
 * 
 * Опис компонента
 * 
 * === ІНСТРУКЦІЇ ДЛЯ БЕК-ЕНД РОЗРОБНИКА ===
 * 
 * 1. ПОЛЯ В БАЗІ ДАНИХ:
 *    - table.field_name: type - опис поля
 * 
 * 2. API ЕНДПОІНТИ:
 *    GET/POST /api/endpoint - опис ендпоінту
 *    Request/Response структура
 * 
 * 3. ПОДІЇ ДЛЯ АНАЛІТИКИ:
 *    - event_name: опис події
 */
-->
```

## 🏗 **ЗАГАЛЬНІ ПРАВИЛА РОЗРОБКИ**

### Компоненти
- Використовуйте тільки офіційні компоненти PrimeVue
- Уникайте створення власних CSS-класів
- Розділяйте код на малі, перевикористовувані компоненти
- Кожен компонент має бути самодостатнім

### Структура всіх сторінок
```vue
<template>
  <MainLayout>
    <!-- Контент сторінки -->
  </MainLayout>
</template>

<script setup>
// Імпорти
import { ref, computed } from 'vue'
import ComponentName from 'primevue/componentname'

// Логіка компонента
</script>

<style scoped>
/* Стилі тільки якщо не можна використати PrimeFlex */
</style>
```

### Правила імпорту
- Імпортуйте тільки необхідні компоненти
- Використовуйте логічні назви для імпортів
- Групуйте імпорти за категоріями (Vue, PrimeVue, власні компоненти)

### Стилізація
- **ВИКОРИСТОВУЙТЕ ТІЛЬКИ PrimeFlex utility-класи**
- **ЗАБОРОНЕНО створювати власні CSS-класи**
- Використовуйте `:pt` проп для кастомізації PrimeVue компонентів

## ✅ **ЧЕКЛИСТ ПЕРЕД НАПИСАННЯМ КОДУ**

### Для AI Асистента:
- [ ] Перевірено документацію на https://primevue.org/
- [ ] Переглянуто приклади використання компонента
- [ ] Використано правильні пропси та API
- [ ] Додано коментарі українською мовою
- [ ] Додано інструкції для бек-енд розробника

### Для розробника:
- [ ] Всі коментарі українською мовою
- [ ] Використано тільки PrimeVue компоненти
- [ ] Використано тільки PrimeFlex класи
- [ ] Компонент адаптивний
- [ ] Додана валідація (якщо потрібно)
- [ ] Додані події для аналітики
- [ ] Код структурований та читабельний

## 🚨 **ЗАБОРОНЕНО**
- ❌ Писати код PrimeVue компонентів без перевірки документації
- ❌ Використовувати застарілі API (наприклад, `tag` замість `as`)
- ❌ Створювати власні CSS-класи
- ❌ Використовувати не офіційні пропси
- ❌ Ігнорувати accessibility рекомендації

## 📋 **ПРИКЛАДИ ПРАВИЛЬНОГО ВИКОРИСТАННЯ**

### Button з документації:
```vue
<!-- Основна кнопка -->
<Button label="Зберегти" icon="pi pi-check" />

<!-- Кнопка-посилання -->
<Button label="Відкрити" as="a" :href="url" />

<!-- Кнопка з контуром -->
<Button label="Скасувати" variant="outlined" />
```

### Panel з документації:
```vue
<Panel header="Заголовок">
  <div>Контент панелі</div>
</Panel>
```

**ПАМ'ЯТАЙТЕ: ЗАВЖДИ ПЕРЕВІРЯЙТЕ https://primevue.org/ ПЕРЕД НАПИСАННЯМ КОДУ!** 🎯