<!-- Based on: PrimeVue/Card, Button, InputText, Dropdown, etc. -->
<template>
  <div class="design-system p-4">
    <h1 class="text-4xl font-bold mb-4 text-900">Дизайн система CarMarket</h1>

    <!-- Кольори -->
    <section class="mb-6">
      <h2 class="text-2xl font-semibold mb-4 text-800">Кольори</h2>
      <div class="grid">
        <!-- Primary кольори -->
        <div class="col-12">
          <h3 class="text-xl font-medium mb-3 text-700">Primary кольори</h3>
          <div class="flex flex-wrap gap-3">
            <div class="surface-card p-3 border-round">
              <div class="color-box bg-primary-50 p-3 text-900 text-center border-round">
                Primary 50
              </div>
              <div class="mt-2 text-center text-600">var(--primary-50)</div>
            </div>
            <div class="surface-card p-3 border-round">
              <div class="color-box bg-primary p-3 text-white text-center border-round">
                Primary
              </div>
              <div class="mt-2 text-center text-600">var(--primary-color)</div>
            </div>
            <div class="surface-card p-3 border-round">
              <div class="color-box bg-primary-700 p-3 text-white text-center border-round">
                Primary 700
              </div>
              <div class="mt-2 text-center text-600">var(--primary-700)</div>
            </div>
          </div>
        </div>

        <!-- Surface кольори -->
        <div class="col-12 mt-4">
          <h3 class="text-xl font-medium mb-3 text-700">Surface кольори</h3>
          <div class="flex flex-wrap gap-3">
            <div class="surface-card p-3 border-round">
              <div class="color-box surface-0 p-3 text-900 text-center border-round border-1 surface-border">
                Surface 0
              </div>
              <div class="mt-2 text-center text-600">var(--surface-0)</div>
            </div>
            <div class="surface-card p-3 border-round">
              <div class="color-box surface-500 p-3 text-white text-center border-round">
                Surface 500
              </div>
              <div class="mt-2 text-center text-600">var(--surface-500)</div>
            </div>
            <div class="surface-card p-3 border-round">
              <div class="color-box surface-900 p-3 text-white text-center border-round">
                Surface 900
              </div>
              <div class="mt-2 text-center text-600">var(--surface-900)</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Типографіка -->
    <section class="mb-6">
      <h2 class="text-2xl font-semibold mb-4 text-800">Типографіка</h2>
      <div class="surface-card p-4 border-round">
        <div class="grid">
          <div class="col-12 mb-4">
            <h3 class="text-xl font-medium mb-3 text-700">Розміри та ваги</h3>
            <h1 class="text-4xl font-bold text-900 mb-3">Заголовок H1 - 2.5rem</h1>
            <h2 class="text-3xl font-semibold text-800 mb-3">Заголовок H2 - 2rem</h2>
            <h3 class="text-2xl font-medium text-700 mb-3">Заголовок H3 - 1.75rem</h3>
            <h4 class="text-xl font-medium text-700 mb-3">Заголовок H4 - 1.5rem</h4>
            <p class="text-lg text-700 mb-3">Великий текст - 1.125rem</p>
            <p class="text-base text-600 mb-3">Звичайний текст - 1rem</p>
            <p class="text-sm text-500">Малий текст - 0.875rem</p>
          </div>
          <div class="col-12">
            <h3 class="text-xl font-medium mb-3 text-700">Line Height</h3>
            <p class="mb-3 line-height-1">Line Height 1 - щільний</p>
            <p class="mb-3 line-height-2">Line Height 2 - компактний</p>
            <p class="mb-3 line-height-3">Line Height 3 - нормальний</p>
            <p class="mb-3 line-height-4">Line Height 4 - розширений</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Кнопки -->
    <section class="mb-6">
      <h2 class="text-2xl font-semibold mb-4 text-800">Кнопки</h2>
      <div class="surface-card p-4 border-round">
        <!-- Основні варіанти -->
        <h3 class="text-xl font-medium mb-3 text-700">Основні варіанти</h3>
        <div class="flex flex-wrap gap-3 mb-4">
          <Button label="Primary" />
          <Button label="Secondary" severity="secondary" />
          <Button label="Success" severity="success" />
          <Button label="Info" severity="info" />
          <Button label="Warning" severity="warning" />
          <Button label="Help" severity="help" />
          <Button label="Danger" severity="danger" />
        </div>

        <!-- Стилі -->
        <h3 class="text-xl font-medium mb-3 text-700">Стилі</h3>
        <div class="flex flex-wrap gap-3 mb-4">
          <Button label="Outlined" outlined />
          <Button label="Text" text />
          <Button label="Raised" raised />
          <Button label="Rounded" rounded />
          <Button icon="pi pi-check" />
          <Button label="Icon" icon="pi pi-check" />
        </div>

        <!-- Розміри -->
        <h3 class="text-xl font-medium mb-3 text-700">Розміри</h3>
        <div class="flex flex-wrap gap-3 mb-4 align-items-center">
          <Button label="Small" size="small" />
          <Button label="Normal" />
          <Button label="Large" size="large" />
        </div>

        <!-- Стани -->
        <h3 class="text-xl font-medium mb-3 text-700">Стани</h3>
        <div class="flex flex-wrap gap-3 align-items-center">
          <Button label="Loading" loading />
          <Button label="Disabled" disabled />
          <Button label="Link" link />
        </div>
      </div>
    </section>

    <!-- Форми -->
    <section class="mb-6">
      <h2 class="text-2xl font-semibold mb-4 text-800">Форми</h2>
      <div class="surface-card p-4 border-round">
        <div class="grid">
          <!-- Текстові поля -->
          <div class="col-12 md:col-4">
            <div class="field">
              <label class="block text-900 font-medium mb-2">Текстове поле</label>
              <InputText class="w-full" placeholder="Введіть текст" />
            </div>
            <div class="field">
              <label class="block text-900 font-medium mb-2">З помилкою</label>
              <InputText class="w-full p-invalid" placeholder="Введіть текст" />
              <small class="p-error">Це поле обов'язкове</small>
            </div>
            <div class="field">
              <label class="block text-900 font-medium mb-2">Disabled</label>
              <InputText class="w-full" placeholder="Недоступне поле" disabled />
            </div>
          </div>

          <!-- Випадаючі списки -->
          <div class="col-12 md:col-4">
            <div class="field">
              <label class="block text-900 font-medium mb-2">Випадаючий список</label>
              <Dropdown
                :options="['Опція 1', 'Опція 2', 'Опція 3']"
                placeholder="Виберіть опцію"
                class="w-full"
              />
            </div>
            <div class="field">
              <label class="block text-900 font-medium mb-2">Числове поле</label>
              <InputNumber class="w-full" placeholder="Введіть число" />
            </div>
            <div class="field">
              <label class="block text-900 font-medium mb-2">Текстова область</label>
              <Textarea class="w-full" placeholder="Введіть текст" rows="3" />
            </div>
          </div>

          <!-- Чекбокси та радіо -->
          <div class="col-12 md:col-4">
            <div class="field-checkbox mb-3">
              <Checkbox id="checkbox1" value="option1" v-model="checkboxValue" />
              <label for="checkbox1" class="ml-2">Чекбокс 1</label>
            </div>
            <div class="field-checkbox mb-4">
              <Checkbox id="checkbox2" value="option2" v-model="checkboxValue" />
              <label for="checkbox2" class="ml-2">Чекбокс 2</label>
            </div>
            
            <div class="field-radiobutton mb-3">
              <RadioButton id="radio1" value="option1" v-model="radioValue" />
              <label for="radio1" class="ml-2">Радіо 1</label>
            </div>
            <div class="field-radiobutton">
              <RadioButton id="radio2" value="option2" v-model="radioValue" />
              <label for="radio2" class="ml-2">Радіо 2</label>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Картки -->
    <section class="mb-6">
      <h2 class="text-2xl font-semibold mb-4 text-800">Картки</h2>
      <div class="grid">
        <!-- Стандартна картка -->
        <div class="col-12 md:col-4">
          <Card>
            <template #header>
              <img alt="card header" src="https://picsum.photos/300/200" />
            </template>
            <template #title>
              <span class="text-xl font-medium text-900">Заголовок картки</span>
            </template>
            <template #content>
              <p class="text-700">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Inventore sed consequuntur error repudiandae.
              </p>
            </template>
            <template #footer>
              <div class="flex justify-content-between">
                <Button label="Відмінити" text />
                <Button label="Зберегти" />
              </div>
            </template>
          </Card>
        </div>

        <!-- Проста картка -->
        <div class="col-12 md:col-4">
          <Card>
            <template #title>
              <span class="text-xl font-medium text-900">Проста картка</span>
            </template>
            <template #content>
              <p class="text-700">
                Картка без зображення та футера. Тільки заголовок та контент.
              </p>
            </template>
          </Card>
        </div>

        <!-- Hover картка -->
        <div class="col-12 md:col-4">
          <Card class="hover:surface-100 transition-colors transition-duration-150">
            <template #title>
              <span class="text-xl font-medium text-900">Hover картка</span>
            </template>
            <template #content>
              <p class="text-700">
                При наведенні змінює колір фону. Спробуйте навести курсор.
              </p>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- Теги -->
    <section class="mb-6">
      <h2 class="text-2xl font-semibold mb-4 text-800">Теги</h2>
      <div class="surface-card p-4 border-round">
        <!-- Основні теги -->
        <h3 class="text-xl font-medium mb-3 text-700">Основні теги</h3>
        <div class="flex flex-wrap gap-2 mb-4">
          <Tag value="Новинка" severity="info" />
          <Tag value="TOP" severity="danger" rounded />
          <Tag value="На майданчику" severity="success" />
          <Tag value="Продано" severity="warning" />
          <Tag value="VIP" severity="primary" icon="pi pi-star" />
        </div>

        <!-- Розміри тегів -->
        <h3 class="text-xl font-medium mb-3 text-700">Розміри</h3>
        <div class="flex flex-wrap gap-2 align-items-center">
          <Tag value="Small" size="small" />
          <Tag value="Normal" />
          <Tag value="Large" size="large" />
        </div>
      </div>
    </section>

    <!-- Іконки -->
    <section class="mb-6">
      <h2 class="text-2xl font-semibold mb-4 text-800">Іконки</h2>
      <div class="surface-card p-4 border-round">
        <!-- Основні іконки -->
        <h3 class="text-xl font-medium mb-3 text-700">Основні іконки</h3>
        <div class="flex flex-wrap gap-4 mb-4">
          <i class="pi pi-car text-2xl text-primary"></i>
          <i class="pi pi-search text-2xl text-secondary"></i>
          <i class="pi pi-user text-2xl text-success"></i>
          <i class="pi pi-calendar text-2xl text-info"></i>
          <i class="pi pi-filter text-2xl text-warning"></i>
          <i class="pi pi-cog text-2xl text-help"></i>
          <i class="pi pi-times text-2xl text-danger"></i>
        </div>

        <!-- Розміри іконок -->
        <h3 class="text-xl font-medium mb-3 text-700">Розміри</h3>
        <div class="flex flex-wrap gap-4 align-items-center">
          <i class="pi pi-car text-sm"></i>
          <i class="pi pi-car text-base"></i>
          <i class="pi pi-car text-lg"></i>
          <i class="pi pi-car text-xl"></i>
          <i class="pi pi-car text-2xl"></i>
          <i class="pi pi-car text-3xl"></i>
          <i class="pi pi-car text-4xl"></i>
        </div>
      </div>
    </section>

    <!-- Сітка -->
    <section class="mb-6">
      <h2 class="text-2xl font-semibold mb-4 text-800">Сітка</h2>
      <div class="surface-card p-4 border-round">
        <div class="grid">
          <div class="col-12 md:col-6 lg:col-4 mb-2">
            <div class="bg-primary p-3 text-white border-round text-center">
              col-12 md:col-6 lg:col-4
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 mb-2">
            <div class="bg-primary p-3 text-white border-round text-center">
              col-12 md:col-6 lg:col-4
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4 mb-2">
            <div class="bg-primary p-3 text-white border-round text-center">
              col-12 md:col-6 lg:col-4
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Textarea from 'primevue/textarea'
import Checkbox from 'primevue/checkbox'
import RadioButton from 'primevue/radiobutton'
import { ref } from 'vue'

const checkboxValue = ref([])
const radioValue = ref(null)
</script>

<style scoped>
.design-system {
  max-width: 1280px;
  margin: 0 auto;
}

section {
  background: var(--surface-card);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
}

.field {
  margin-bottom: 1.5rem;
}
</style> 