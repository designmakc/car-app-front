<template>
  <div class="surface-ground">
    <div class="max-w-8 mx-auto px-4 py-4">
      <h1 class="text-4xl mb-4 font-medium">Дизайн система</h1>
      
      <!-- Типографіка -->
      <section class="mb-6">
        <h2 class="text-2xl mb-4 font-medium">Типографіка</h2>
        <div class="flex flex-column gap-3">
          <h1 class="text-4xl">Заголовок H1 - Futura PT</h1>
          <h2 class="text-3xl">Заголовок H2 - Futura PT</h2>
          <h3 class="text-2xl">Заголовок H3 - Futura PT</h3>
          <h4 class="text-xl">Заголовок H4 - Futura PT</h4>
          <h5 class="text-lg">Заголовок H5 - Futura PT</h5>
          <h6 class="text-base">Заголовок H6 - Futura PT</h6>
          <p class="text-xl">Великий текст - Roboto</p>
          <p class="text-base">Звичайний текст - Roboto</p>
          <p class="text-sm">Малий текст - Roboto</p>
        </div>
      </section>

      <!-- Кольори -->
      <section class="mb-6">
        <h2 class="text-2xl mb-4 font-medium">Кольори</h2>
        <div class="flex flex-column gap-4">
          <div>
            <h3 class="text-xl mb-3">Основні кольори (Orange)</h3>
            <div class="grid">
              <div v-for="n in 10" :key="n" class="col-12 sm:col-6 md:col-4 lg:col-3">
                <div class="flex flex-column align-items-center">
                  <div :class="['w-8rem h-8rem mb-2 border-round shadow-1', `bg-primary-${(n-1)*100}`]"></div>
                  <span>primary-{{ (n-1)*100 }}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-xl mb-3">Поверхні</h3>
            <div class="grid">
              <div v-for="n in 11" :key="n" class="col-12 sm:col-6 md:col-4 lg:col-3">
                <div class="flex flex-column align-items-center">
                  <div :class="['w-8rem h-8rem mb-2 border-round shadow-1', `bg-surface-${(n-1)*100}`]"></div>
                  <span>surface-{{ (n-1)*100 }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Компоненти -->
      <section class="mb-6">
        <h2 class="text-2xl mb-4 font-medium">Компоненти</h2>
        
        <h3 class="text-xl mb-3">Нотифікації</h3>
        <div class="mb-4">
          <Notifications />
        </div>

        <h3 class="text-xl mb-3">Кнопки</h3>
        <div class="flex flex-wrap gap-3 mb-4">
          <Button label="Primary" />
          <Button label="Secondary" severity="secondary" />
          <Button label="Success" severity="success" />
          <Button label="Info" severity="info" />
          <Button label="Warning" severity="warning" />
          <Button label="Help" severity="help" />
          <Button label="Danger" severity="danger" />
        </div>

        <h3 class="text-xl mb-3">Текстові поля</h3>
        <div class="flex flex-wrap gap-3 mb-4">
          <InputText placeholder="Звичайне поле" class="w-full md:w-25rem" />
          <InputText placeholder="Відключене поле" disabled class="w-full md:w-25rem" />
        </div>

        <h3 class="text-xl mb-3">Чекбокси</h3>
        <div class="flex align-items-center gap-2 mb-4">
          <Checkbox v-model="checked" :binary="true" />
          <label class="text-lg">Звичайний чекбокс</label>
        </div>

        <h3 class="text-xl mb-3">Радіо кнопки</h3>
        <div class="flex align-items-center gap-3 mb-4">
          <div class="flex align-items-center gap-2">
            <RadioButton v-model="radioValue" value="1" />
            <label class="text-lg">Опція 1</label>
          </div>
          <div class="flex align-items-center gap-2">
            <RadioButton v-model="radioValue" value="2" />
            <label class="text-lg">Опція 2</label>
          </div>
        </div>

        <h3 class="text-xl mb-3">Селекти</h3>
        <div class="mb-4">
          <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" 
                   placeholder="Виберіть місто" class="w-full md:w-25rem" />
        </div>

      </section>

      <!-- Іконки -->
      <section class="mb-6">
        <h2 class="text-2xl mb-4 font-medium">Іконки</h2>
        <div class="flex flex-column gap-4">
          <div class="surface-section p-5 w-full">
            <h2 class="text-xl mb-4">Іконки PrimeVue</h2>
            <div class="grid">
              <!-- Основні іконки -->
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-check text-xl"></i>
                <span>pi-check</span>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-times text-xl"></i>
                <span>pi-times</span>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-search text-xl"></i>
                <span>pi-search</span>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-user text-xl"></i>
                <span>pi-user</span>
              </div>

              <!-- Стрілки -->
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-angle-right text-xl"></i>
                <span>pi-angle-right</span>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-angle-left text-xl"></i>
                <span>pi-angle-left</span>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-angle-up text-xl"></i>
                <span>pi-angle-up</span>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-angle-down text-xl"></i>
                <span>pi-angle-down</span>
              </div>

              <!-- Сповіщення -->
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-bell text-xl"></i>
                <span>pi-bell</span>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-info-circle text-xl"></i>
                <span>pi-info-circle</span>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-exclamation-triangle text-xl"></i>
                <span>pi-exclamation-triangle</span>
              </div>

              <!-- Медіа -->
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-play text-xl"></i>
                <span>pi-play</span>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-pause text-xl"></i>
                <span>pi-pause</span>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-stop text-xl"></i>
                <span>pi-stop</span>
              </div>

              <!-- Файли -->
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-file text-xl"></i>
                <span>pi-file</span>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-folder text-xl"></i>
                <span>pi-folder</span>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-download text-xl"></i>
                <span>pi-download</span>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-upload text-xl"></i>
                <span>pi-upload</span>
              </div>

              <!-- Редагування -->
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-pencil text-xl"></i>
                <span>pi-pencil</span>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-trash text-xl"></i>
                <span>pi-trash</span>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-copy text-xl"></i>
                <span>pi-copy</span>
              </div>

              <!-- Соціальні -->
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-facebook text-xl"></i>
                <span>pi-facebook</span>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-twitter text-xl"></i>
                <span>pi-twitter</span>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-github text-xl"></i>
                <span>pi-github</span>
              </div>

              <!-- Інтерфейс -->
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-bars text-xl"></i>
                <span>pi-bars</span>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-cog text-xl"></i>
                <span>pi-cog</span>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-home text-xl"></i>
                <span>pi-home</span>
              </div>

              <!-- Анімовані -->
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-spin pi-spinner text-xl"></i>
                <span>pi-spinner (з анімацією)</span>
              </div>
              <div class="col-12 md:col-6 lg:col-4 xl:col-3 flex align-items-center gap-2 mb-3">
                <i class="pi pi-spin pi-cog text-xl"></i>
                <span>pi-cog (з анімацією)</span>
              </div>
            </div>

            <!-- Розміри іконок -->
            <h3 class="text-lg mt-6 mb-4">Розміри іконок</h3>
            <div class="flex align-items-center gap-4 mb-6">
              <i class="pi pi-check text-sm"></i>
              <i class="pi pi-check text-base"></i>
              <i class="pi pi-check text-lg"></i>
              <i class="pi pi-check text-xl"></i>
              <i class="pi pi-check text-2xl"></i>
              <i class="pi pi-check text-3xl"></i>
              <i class="pi pi-check text-4xl"></i>
              <i class="pi pi-check text-5xl"></i>
            </div>

            <!-- Кольори іконок -->
            <h3 class="text-lg mt-6 mb-4">Кольори іконок</h3>
            <div class="flex align-items-center gap-4">
              <i class="pi pi-check text-xl text-primary"></i>
              <i class="pi pi-check text-xl text-success"></i>
              <i class="pi pi-check text-xl text-info"></i>
              <i class="pi pi-check text-xl text-warning"></i>
              <i class="pi pi-check text-xl text-danger"></i>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import RadioButton from 'primevue/radiobutton'
import Dropdown from 'primevue/dropdown'
import Notifications from '../components/Notifications.vue'

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