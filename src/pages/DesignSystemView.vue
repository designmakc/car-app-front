<!-- Design System Page -->
<template>
  <div class="design-system-container p-8">
    <!-- Кольорова палітра -->
    <section class="mb-6">
      <h2 class="text-4xl font-bold mb-4">Кольорова палітра</h2>
      
      <!-- Primary Colors -->
      <div class="mb-6">
        <h3 class="text-2xl font-semibold mb-3">Primary Colors</h3>
        <p class="mb-4">Основні кольори використовуються для головних елементів інтерфейсу. Доступні через класи bg-primary-{shade} або text-primary-{shade}</p>
        <div class="grid">
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="bg-primary h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Primary</p>
              <code class="text-xs text-600 block">bg-primary</code>
              <code class="text-xs text-600 block">text-primary</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="bg-primary-50 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Primary 50</p>
              <code class="text-xs text-600">bg-primary-50</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="bg-primary-100 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Primary 100</p>
              <code class="text-xs text-600">bg-primary-100</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="bg-primary-200 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Primary 200</p>
              <code class="text-xs text-600">bg-primary-200</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="bg-primary-300 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Primary 300</p>
              <code class="text-xs text-600">bg-primary-300</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="bg-primary-400 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Primary 400</p>
              <code class="text-xs text-600">bg-primary-400</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="bg-primary-500 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Primary 500</p>
              <code class="text-xs text-600">bg-primary-500</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="bg-primary-600 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Primary 600</p>
              <code class="text-xs text-600">bg-primary-600</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="bg-primary-700 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Primary 700</p>
              <code class="text-xs text-600">bg-primary-700</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="bg-primary-800 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Primary 800</p>
              <code class="text-xs text-600">bg-primary-800</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="bg-primary-900 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Primary 900</p>
              <code class="text-xs text-600">bg-primary-900</code>
            </div>
          </div>
        </div>
      </div>

      <!-- Surface Colors -->
      <div class="mb-6">
        <h3 class="text-2xl font-semibold mb-3">Surface Colors</h3>
        <p class="mb-4">Кольори поверхонь використовуються для фонів різних секцій. Доступні через класи surface-{type} та bg-surface-{shade}</p>
        <div class="grid">
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="surface-ground h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Ground</p>
              <code class="text-xs text-600">surface-ground</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="surface-section h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Section</p>
              <code class="text-xs text-600">surface-section</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="surface-card h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Card</p>
              <code class="text-xs text-600">surface-card</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="surface-overlay h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Overlay</p>
              <code class="text-xs text-600">surface-overlay</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="surface-0 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Surface 0</p>
              <code class="text-xs text-600">bg-surface-0</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="surface-50 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Surface 50</p>
              <code class="text-xs text-600">bg-surface-50</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="surface-100 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Surface 100</p>
              <code class="text-xs text-600">bg-surface-100</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="surface-200 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Surface 200</p>
              <code class="text-xs text-600">bg-surface-200</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="surface-300 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Surface 300</p>
              <code class="text-xs text-600">bg-surface-300</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="surface-400 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Surface 400</p>
              <code class="text-xs text-600">bg-surface-400</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="surface-500 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Surface 500</p>
              <code class="text-xs text-600">bg-surface-500</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="surface-600 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Surface 600</p>
              <code class="text-xs text-600">bg-surface-600</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="surface-700 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Surface 700</p>
              <code class="text-xs text-600">bg-surface-700</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="surface-800 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Surface 800</p>
              <code class="text-xs text-600">bg-surface-800</code>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2">
            <div class="surface-card p-3 shadow-1 border-round">
              <div class="surface-900 h-4rem border-round mb-2"></div>
              <p class="font-medium text-sm">Surface 900</p>
              <code class="text-xs text-600">bg-surface-900</code>
            </div>
          </div>
        </div>
      </div>

      

      <!-- Usage Instructions -->
      <div class="surface-card p-4 shadow-1 border-round">
        <h4 class="text-xl font-semibold mb-3">Інструкції з використання</h4>
        <div class="mb-3">
          <p class="font-medium mb-2">Фон елемента:</p>
          <code class="block surface-ground p-2 border-round">
            &lt;div class="primary"&gt;&lt;/div&gt;<br>
            &lt;div class="primary-500"&gt;&lt;/div&gt;<br>
            &lt;div class="surface-ground"&gt;&lt;/div&gt;
          </code>
        </div>
        <div class="mb-3">
          <p class="font-medium mb-2">Колір тексту:</p>
          <code class="block surface-ground p-2 border-round">
            &lt;p class="text-primary"&gt;Primary text&lt;/p&gt;<br>
            &lt;p class="text-primary-500"&gt;Primary 500 text&lt;/p&gt;<br>
            &lt;p class="text-600"&gt;Gray 600 text&lt;/p&gt;
          </code>
        </div>
        <div>
          <p class="font-medium mb-2">Комбінування:</p>
          <code class="block surface-ground p-2 border-round">
            &lt;div class="bg-primary text-white"&gt;White text on primary background&lt;/div&gt;
          </code>
        </div>
      </div>
    </section>

    <!-- Типографіка -->
    <section class="mb-6">
      <h2 class="text-4xl font-bold mb-4">Типографіка</h2>
      
      <div class="surface-card p-4 shadow-1 border-round">
        <div class="mb-4">
          <h1 class="text-6xl">Заголовок H1</h1>
          <code class="text-sm text-600">text-6xl</code>
        </div>
        <div class="mb-4">
          <h2 class="text-5xl">Заголовок H2</h2>
          <code class="text-sm text-600">text-5xl</code>
        </div>
        <div class="mb-4">
          <h3 class="text-4xl">Заголовок H3</h3>
          <code class="text-sm text-600">text-4xl</code>
        </div>
        <div class="mb-4">
          <p class="text-xl">Звичайний текст</p>
          <code class="text-sm text-600">text-xl</code>
        </div>
        <div class="mb-4">
          <p class="text-base">Базовий текст</p>
          <code class="text-sm text-600">text-base</code>
        </div>
        <div class="mb-4">
          <p class="text-sm">Малий текст</p>
          <code class="text-sm text-600">text-sm</code>
        </div>
      </div>
    </section>

    <!-- Кнопки -->
    <section class="mb-6">
      <h2 class="text-4xl font-bold mb-4">Кнопки</h2>
      
      <div class="surface-card p-4 shadow-1 border-round">
        <div class="mb-4">
          <h3 class="text-2xl font-semibold mb-3">Primary Buttons</h3>
          <div class="flex flex-wrap gap-3">
            <Button label="Primary" />
            <Button label="Primary" severity="secondary" />
            <Button label="Primary" severity="success" />
            <Button label="Primary" severity="info" />
            <Button label="Primary" severity="warning" />
            <Button label="Primary" severity="help" />
            <Button label="Primary" severity="danger" />
          </div>
          <div class="mt-3 surface-ground p-3 border-round">
            <code class="block mb-2">&lt;Button label="Primary" /&gt;</code>
            <code class="block">&lt;Button label="Primary" severity="secondary" /&gt;</code>
          </div>
        </div>

        <div class="mb-4">
          <h3 class="text-2xl font-semibold mb-3">Outlined Buttons</h3>
          <div class="flex flex-wrap gap-3">
            <Button label="Outlined" outlined />
            <Button label="Outlined" severity="secondary" outlined />
            <Button label="Outlined" severity="success" outlined />
            <Button label="Outlined" severity="info" outlined />
            <Button label="Outlined" severity="warning" outlined />
            <Button label="Outlined" severity="help" outlined />
            <Button label="Outlined" severity="danger" outlined />
          </div>
          <div class="mt-3 surface-ground p-3 border-round">
            <code class="block">&lt;Button label="Outlined" outlined /&gt;</code>
          </div>
        </div>
      </div>
    </section>

    <!-- Форми -->
    <section class="mb-6">
      <h2 class="text-4xl font-bold mb-4">Форми</h2>
      
      <div class="surface-card p-4 shadow-1 border-round">
        <div class="grid">
          <div class="col-12 md:col-6">
            <div class="mb-4">
              <h3 class="text-2xl font-semibold mb-3">Input Text</h3>
              <div class="flex flex-column gap-3">
                <InputText placeholder="Enter text" />
                <InputText placeholder="Disabled" disabled />
              </div>
              <div class="mt-3 surface-ground p-3 border-round">
                <code class="block">&lt;InputText placeholder="Enter text" /&gt;</code>
              </div>
            </div>

            <div class="mb-4">
              <h3 class="text-2xl font-semibold mb-3">Dropdown</h3>
              <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" class="w-full" />
              <div class="mt-3 surface-ground p-3 border-round">
                <code class="block">&lt;Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" /&gt;</code>
              </div>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="mb-4">
              <h3 class="text-2xl font-semibold mb-3">Checkbox</h3>
              <div class="flex flex-column gap-3">
                <div class="flex align-items-center">
                  <Checkbox v-model="checked" :binary="true" />
                  <label class="ml-2">Basic</label>
                </div>
              </div>
              <div class="mt-3 surface-ground p-3 border-round">
                <code class="block">&lt;Checkbox v-model="checked" :binary="true" /&gt;</code>
              </div>
            </div>

            <div class="mb-4">
              <h3 class="text-2xl font-semibold mb-3">Radio Button</h3>
              <div class="flex flex-column gap-3">
                <div class="flex align-items-center">
                  <RadioButton v-model="ingredient" name="pizza" value="Cheese" />
                  <label class="ml-2">Cheese</label>
                </div>
                <div class="flex align-items-center">
                  <RadioButton v-model="ingredient" name="pizza" value="Mushroom" />
                  <label class="ml-2">Mushroom</label>
                </div>
              </div>
              <div class="mt-3 surface-ground p-3 border-round">
                <code class="block">&lt;RadioButton v-model="ingredient" name="pizza" value="Cheese" /&gt;</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Компоненти -->
    <section class="mb-6">
      <h2 class="text-4xl font-bold mb-4">Компоненти</h2>
      
      <!-- CarCard -->
      <div class="mb-6">
        <h3 class="text-2xl font-semibold mb-3">CarCard</h3>
        <div class="surface-card p-4 border-round mb-4">
          <p class="mb-3 line-height-3">
            Компонент для відображення картки автомобіля. Використовується для показу основної інформації про автомобіль у вигляді картки.
            Підтримує відображення статусу TOP пропозиції, додавання в обране та основні характеристики авто.
          </p>
          
          <h4 class="text-xl mb-3 text-primary">Пропси</h4>
          <div class="mb-4 surface-ground p-3 border-round">
            <div class="mb-2">
              <span class="font-semibold">car</span>
              <span class="text-600"> - об'єкт з даними про автомобіль</span>
            </div>
            <code class="block p-3 surface-100 border-round text-900">
{
  id: number,           // Унікальний ідентифікатор
  title: string,        // Назва автомобіля
  price: number,        // Ціна
  image: string,        // URL зображення
  mileage: number,      // Пробіг в тис. км
  transmission: string, // Тип коробки передач
  engine: string,       // Тип двигуна
  location: string,     // Місцезнаходження
  publishedAt: string   // Дата публікації
}</code>
            
            <div class="mt-3">
              <span class="font-semibold">top</span>
              <span class="text-600"> - boolean, опціональний параметр для відображення статусу TOP пропозиції</span>
            </div>
          </div>

          <h4 class="text-xl mb-3 text-primary">Приклад використання</h4>
          <div class="grid">
            <div class="col-12 md:col-6">
              <CarCard 
                :car="{
                  id: 1,
                  title: 'BMW X5 2023',
                  price: 45000,
                  image: '/src/assets/cars/car-demo.png',
                  mileage: 15,
                  transmission: 'Автомат',
                  engine: 'Бензин',
                  location: 'Київ',
                  publishedAt: '2024-03-15'
                }"
                :top="true"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- CarList -->
      <div class="mb-6">
        <h3 class="text-2xl font-semibold mb-3">CarList</h3>
        <div class="surface-card p-4 border-round mb-4">
          <p class="mb-3 line-height-3">
            Компонент для відображення списку автомобілів. Підтримує пагінацію, безкінечний скрол
            та динамічне завантаження даних. Автоматично адаптується під різні розміри екрану.
          </p>
          
          <h4 class="text-xl mb-3 text-primary">Пропси</h4>
          <div class="surface-ground p-3 border-round mb-4">
            <div class="mb-2">
              <span class="font-semibold">limit</span>
              <span class="text-600"> - number, максимальна кількість авто (за замовчуванням: 12)</span>
            </div>
            <div class="mb-2">
              <span class="font-semibold">perPage</span>
              <span class="text-600"> - number, кількість авто на сторінку (за замовчуванням: 8, макс: 20)</span>
            </div>
            <div class="mb-2">
              <span class="font-semibold">infiniteScroll</span>
              <span class="text-600"> - boolean, режим безкінечного скролу (за замовчуванням: false)</span>
            </div>
            <div>
              <span class="font-semibold">provideCars</span>
              <span class="text-600"> - Function, функція для отримання даних (обов'язково)</span>
            </div>
          </div>
          
          <h4 class="text-xl mb-3 text-primary">Події</h4>
          <div class="surface-ground p-3 border-round mb-4">
            <div class="mb-2">
              <span class="font-semibold">@load-more</span>
              <span class="text-600"> - викликається при завантаженні нової порції даних</span>
            </div>
            <div>
              <span class="font-semibold">@loading-change</span>
              <span class="text-600"> - викликається при зміні стану завантаження</span>
            </div>
          </div>

          <h4 class="text-xl mb-3 text-primary">Приклад використання</h4>
          <CarList 
            :provide-cars="async () => demoCars"
            :limit="4"
            :per-page="2"
          />
        </div>
      </div>

      <!-- QuickFilters -->
      <div class="mb-6">
        <h3 class="text-2xl font-semibold mb-3">QuickFilters</h3>
        <div class="surface-card p-4 border-round mb-4">
          <p class="mb-3 line-height-3">
            Компонент швидких фільтрів для пошуку автомобілів. Дозволяє швидко фільтрувати 
            автомобілі за основними параметрами: ціна, рік, пробіг тощо.
          </p>
          <QuickFilters />
        </div>
      </div>

      <!-- StatisticsBlock -->
      <div class="mb-6">
        <h3 class="text-2xl font-semibold mb-3">StatisticsBlock</h3>
        <div class="surface-card p-4 border-round mb-4">
          <p class="mb-3 line-height-3">
            Блок статистики, який відображає основні метрики платформи: 
            кількість автомобілів, активних користувачів, успішних продажів тощо.
          </p>
          <StatisticsBlock />
        </div>
      </div>

      <!-- CarSellForm -->
      <div class="mb-6">
        <h3 class="text-2xl font-semibold mb-3">CarSellForm</h3>
        <div class="surface-card p-4 border-round mb-4">
          <p class="mb-3 line-height-3">
            Форма для створення оголошення про продаж автомобіля. 
            Містить всі необхідні поля для детального опису автомобіля та умов продажу.
          </p>
          <CarSellForm />
        </div>
      </div>

      <!-- CarSearchForm -->
      <div class="mb-6">
        <h3 class="text-2xl font-semibold mb-3">CarSearchForm</h3>
        <div class="surface-card p-4 border-round mb-4">
          <p class="mb-3 line-height-3">
            Розширена форма пошуку автомобілів. Дозволяє здійснювати детальний пошук 
            за всіма доступними параметрами та характеристиками автомобілів.
          </p>
          <CarSearchForm />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import CarCard from '@/components/cars/CarCard.vue'
import CarList from '@/components/cars/CarList.vue'
import QuickFilters from '@/components/cars/QuickFilters.vue'
import StatisticsBlock from '@/components/cars/StatisticsBlock.vue'
import CarSellForm from '@/components/cars/CarSellForm.vue'
import CarSearchForm from '@/components/cars/CarSearchForm.vue'
import { ref } from 'vue'

// Демо дані для форм
const selectedCity = ref(null)
const cities = ref([
  { name: 'Київ', code: 'KYV' },
  { name: 'Львів', code: 'LVV' },
  { name: 'Одеса', code: 'ODS' }
])
const checked = ref(false)
const ingredient = ref('Cheese')

// Демо дані для CarList
const demoCars = [
  {
    id: 1,
    title: 'BMW X5 2023',
    price: 45000,
    image: 'https://via.placeholder.com/300x200',
    year: 2023,
    mileage: 15000,
    fuel: 'Бензин',
    transmission: 'Автомат',
    location: 'Київ'
  },
  {
    id: 2,
    title: 'Mercedes-Benz E-Class 2022',
    price: 38000,
    image: 'https://via.placeholder.com/300x200',
    year: 2022,
    mileage: 25000,
    fuel: 'Дизель',
    transmission: 'Автомат',
    location: 'Львів'
  }
]
</script>

<style>
.design-system-container {
  max-width: 1200px;
  margin: 0 auto;
}
</style> 