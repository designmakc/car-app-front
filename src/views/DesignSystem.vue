<template>
  <div class="design-system">
    <h1>Дизайн система</h1>
    
    <!-- Типографіка -->
    <section class="section">
      <h2>Типографіка</h2>
      <div class="typography">
        <h1>Заголовок H1 - Futura PT</h1>
        <h2>Заголовок H2 - Futura PT</h2>
        <h3>Заголовок H3 - Futura PT</h3>
        <h4>Заголовок H4 - Futura PT</h4>
        <h5>Заголовок H5 - Futura PT</h5>
        <h6>Заголовок H6 - Futura PT</h6>
        <p class="text-large">Великий текст - Roboto</p>
        <p class="text-normal">Звичайний текст - Roboto</p>
        <p class="text-small">Малий текст - Roboto</p>
      </div>
    </section>

    <!-- Кольори -->
    <section class="section">
      <h2>Кольори</h2>
      <div class="colors">
        <h3>Основні кольори (Orange)</h3>
        <div class="color-grid">
          <div v-for="n in 10" :key="n" class="color-item">
            <div :class="['color-box', `bg-primary-${(n-1)*100}`]"></div>
            <span>primary-{{ (n-1)*100 }}</span>
          </div>
        </div>

        <h3>Поверхні</h3>
        <div class="color-grid">
          <div v-for="n in 11" :key="n" class="color-item">
            <div :class="['color-box', `bg-surface-${(n-1)*100}`]"></div>
            <span>surface-{{ (n-1)*100 }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Компоненти -->
    <section class="section">
      <h2>Компоненти</h2>
      
      <h3>Кнопки</h3>
      <div class="component-group">
        <Button label="Primary" />
        <Button label="Secondary" severity="secondary" />
        <Button label="Success" severity="success" />
        <Button label="Info" severity="info" />
        <Button label="Warning" severity="warning" />
        <Button label="Help" severity="help" />
        <Button label="Danger" severity="danger" />
      </div>

      <h3>Текстові поля</h3>
      <div class="component-group">
        <InputText placeholder="Звичайне поле" />
        <InputText placeholder="Відключене поле" disabled />
      </div>

      <h3>Чекбокси</h3>
      <div class="component-group">
        <Checkbox v-model="checked" :binary="true" />
        <label>Звичайний чекбокс</label>
      </div>

      <h3>Радіо кнопки</h3>
      <div class="component-group">
        <RadioButton v-model="radioValue" value="1" />
        <label>Опція 1</label>
        <RadioButton v-model="radioValue" value="2" />
        <label>Опція 2</label>
      </div>

      <h3>Селекти</h3>
      <div class="component-group">
        <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Виберіть місто" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import RadioButton from 'primevue/radiobutton'
import Dropdown from 'primevue/dropdown'

const checked = ref(false)
const radioValue = ref('1')
const selectedCity = ref(null)
const cities = ref([
  { name: 'Київ', code: 'KY' },
  { name: 'Львів', code: 'LV' },
  { name: 'Одеса', code: 'OD' }
])
</script>

<style scoped>
.design-system {
  padding: 2rem;
}

.section {
  margin-bottom: 3rem;
}

.typography {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.colors {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.color-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.color-box {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  border: 1px solid var(--p-surface-300);
}

.component-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
}

/* Кольори поверхні */
.bg-surface-0 { background-color: var(--p-surface-0); }
.bg-surface-50 { background-color: var(--p-surface-50); }
.bg-surface-100 { background-color: var(--p-surface-100); }
.bg-surface-200 { background-color: var(--p-surface-200); }
.bg-surface-300 { background-color: var(--p-surface-300); }
.bg-surface-400 { background-color: var(--p-surface-400); }
.bg-surface-500 { background-color: var(--p-surface-500); }
.bg-surface-600 { background-color: var(--p-surface-600); }
.bg-surface-700 { background-color: var(--p-surface-700); }
.bg-surface-800 { background-color: var(--p-surface-800); }
.bg-surface-900 { background-color: var(--p-surface-900); }
.bg-surface-950 { background-color: var(--p-surface-950); }

/* Основні кольори */
.bg-primary-0 { background-color: var(--p-primary-0); }
.bg-primary-50 { background-color: var(--p-primary-50); }
.bg-primary-100 { background-color: var(--p-primary-100); }
.bg-primary-200 { background-color: var(--p-primary-200); }
.bg-primary-300 { background-color: var(--p-primary-300); }
.bg-primary-400 { background-color: var(--p-primary-400); }
.bg-primary-500 { background-color: var(--p-primary-500); }
.bg-primary-600 { background-color: var(--p-primary-600); }
.bg-primary-700 { background-color: var(--p-primary-700); }
.bg-primary-800 { background-color: var(--p-primary-800); }
.bg-primary-900 { background-color: var(--p-primary-900); }
.bg-primary-950 { background-color: var(--p-primary-950); }
</style> 