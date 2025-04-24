<!-- Based on: PrimeVue/Card, Button, InputText, Dropdown, etc. -->
<template>
  <div class="design-system p-4">
    <h1 class="text-4xl font-bold mb-4 text-900">Дизайн система CarMarket</h1>

    <!-- Заголовок -->
    <header class="mb-6">
      <h1 class="text-4xl font-bold mb-2">Дизайн система</h1>
      <p class="text-lg text-600">Компоненти та стилі для CarMarket</p>
    </header>

    <!-- Кольори -->
    <section class="mb-6">
      <h2 class="text-2xl font-semibold mb-4 text-800">Кольори</h2>
      <div class="grid">
        <!-- Primary кольори -->
        <div class="col-12">
          <h3 class="text-xl font-medium mb-3 text-700">Primary кольори</h3>
          <div class="flex flex-wrap gap-3">
            <div class="surface-card p-3 border-round shadow-2">
              <div class="color-box bg-primary-50 p-3 text-900 text-center border-round">
                Primary 50
              </div>
              <div class="mt-2 text-center text-600">var(--primary-50)</div>
            </div>
            <div class="surface-card p-3 border-round shadow-2">
              <div class="color-box bg-primary p-3 text-white text-center border-round">
                Primary
              </div>
              <div class="mt-2 text-center text-600">var(--primary-color)</div>
            </div>
            <div class="surface-card p-3 border-round shadow-2">
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
            <div class="surface-card p-3 border-round shadow-2">
              <div class="color-box surface-0 p-3 text-900 text-center border-round border-1 surface-border">
                Surface 0
              </div>
              <div class="mt-2 text-center text-600">var(--surface-0)</div>
            </div>
            <div class="surface-card p-3 border-round shadow-2">
              <div class="color-box surface-500 p-3 text-white text-center border-round">
                Surface 500
              </div>
              <div class="mt-2 text-center text-600">var(--surface-500)</div>
            </div>
            <div class="surface-card p-3 border-round shadow-2">
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
      <div class="surface-card p-4 border-round shadow-2">
        <div class="grid">
          <div class="col-12 mb-4">
            <h3 class="text-xl font-medium mb-3 text-700">Розміри тексту</h3>
            <div class="flex flex-column gap-3">
              <div class="flex align-items-center">
                <div class="text-5xl w-8rem">5xl</div>
                <div class="text-5xl">Розмір тексту 2.5rem (35px)</div>
              </div>
              <div class="flex align-items-center">
                <div class="text-4xl w-8rem">4xl</div>
                <div class="text-4xl">Розмір тексту 2rem (28px)</div>
              </div>
              <div class="flex align-items-center">
                <div class="text-3xl w-8rem">3xl</div>
                <div class="text-3xl">Розмір тексту 1.75rem (24.5px)</div>
              </div>
              <div class="flex align-items-center">
                <div class="text-2xl w-8rem">2xl</div>
                <div class="text-2xl">Розмір тексту 1.5rem (21px)</div>
              </div>
              <div class="flex align-items-center">
                <div class="text-xl w-8rem">xl</div>
                <div class="text-xl">Розмір тексту 1.25rem (17.5px)</div>
              </div>
              <div class="flex align-items-center">
                <div class="text-lg w-8rem">lg</div>
                <div class="text-lg">Розмір тексту 1.125rem (15.75px)</div>
              </div>
              <div class="flex align-items-center">
                <div class="text-base w-8rem">base</div>
                <div class="text-base">Розмір тексту 1rem (14px)</div>
              </div>
              <div class="flex align-items-center">
                <div class="text-sm w-8rem">sm</div>
                <div class="text-sm">Розмір тексту 0.875rem (12.25px)</div>
              </div>
              <div class="flex align-items-center">
                <div class="text-xs w-8rem">xs</div>
                <div class="text-xs">Розмір тексту 0.75rem (10.5px)</div>
              </div>
            </div>
          </div>

          <div class="col-12 mb-4">
            <h3 class="text-xl font-medium mb-3 text-700">Жирність шрифту</h3>
            <div class="flex flex-column gap-3">
              <div class="flex align-items-center">
                <div class="font-black w-8rem">black</div>
                <div class="font-black">Дуже жирний текст 900</div>
              </div>
              <div class="flex align-items-center">
                <div class="font-extrabold w-8rem">extrabold</div>
                <div class="font-extrabold">Екстра жирний текст 800</div>
              </div>
              <div class="flex align-items-center">
                <div class="font-bold w-8rem">bold</div>
                <div class="font-bold">Жирний текст 700</div>
              </div>
              <div class="flex align-items-center">
                <div class="font-semibold w-8rem">semibold</div>
                <div class="font-semibold">Напівжирний текст 600</div>
              </div>
              <div class="flex align-items-center">
                <div class="font-medium w-8rem">medium</div>
                <div class="font-medium">Середній текст 500</div>
              </div>
              <div class="flex align-items-center">
                <div class="font-normal w-8rem">normal</div>
                <div class="font-normal">Звичайний текст 400</div>
              </div>
              <div class="flex align-items-center">
                <div class="font-light w-8rem">light</div>
                <div class="font-light">Тонкий текст 300</div>
              </div>
              <div class="flex align-items-center">
                <div class="font-extralight w-8rem">extralight</div>
                <div class="font-extralight">Екстра тонкий текст 200</div>
              </div>
              <div class="flex align-items-center">
                <div class="font-thin w-8rem">thin</div>
                <div class="font-thin">Найтонший текст 100</div>
              </div>
            </div>

            <div class="mt-4">
              <h4 class="text-lg font-medium mb-2 text-700">Приклади використання</h4>
              <div class="flex flex-column gap-3">
                <div class="surface-100 p-3 border-round">
                  <h5 class="text-xl font-bold text-900 mb-2">Заголовок статті</h5>
                  <p class="font-normal text-700 mb-2">Звичайний текст статті використовує font-normal (400)</p>
                  <p class="font-medium text-600">Підписи та додаткова інформація використовує font-medium (500)</p>
                </div>

                <div class="surface-100 p-3 border-round">
                  <div class="text-2xl font-black text-900 mb-2">Великий заголовок</div>
                  <div class="text-xl font-bold text-800 mb-2">Підзаголовок</div>
                  <div class="font-medium text-700">Текст опису з середньою жирністю</div>
                </div>

                <div class="surface-100 p-3 border-round">
                  <div class="flex align-items-center justify-content-between">
                    <span class="font-semibold text-900">Ціна</span>
                    <span class="font-bold text-primary text-xl">$999</span>
                  </div>
                  <div class="flex align-items-center justify-content-between mt-2">
                    <span class="font-medium text-700">Знижка</span>
                    <span class="font-semibold text-success">-15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12">
            <h3 class="text-xl font-medium mb-3 text-700">Line Height</h3>
            <div class="flex flex-column gap-3">
              <div class="flex align-items-center">
                <div class="w-8rem">1</div>
                <p class="mb-0 line-height-1">Line Height 1 - щільний</p>
              </div>
              <div class="flex align-items-center">
                <div class="w-8rem">2</div>
                <p class="mb-0 line-height-2">Line Height 2 - компактний</p>
              </div>
              <div class="flex align-items-center">
                <div class="w-8rem">3</div>
                <p class="mb-0 line-height-3">Line Height 3 - нормальний</p>
              </div>
              <div class="flex align-items-center">
                <div class="w-8rem">4</div>
                <p class="mb-0 line-height-4">Line Height 4 - розширений</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Кнопки -->
    <section class="mb-6">
      <h2 class="text-2xl font-semibold mb-4 text-800">Кнопки</h2>
      <div class="surface-card p-4 border-round shadow-2">
        <!-- Основні варіанти -->
        <h3 class="text-xl font-medium mb-3 text-700">Основні варіанти</h3>
        <div class="flex flex-wrap gap-3 mb-4">
          <Button label="Primary" class="p-button-raised" />
          <Button label="Secondary" severity="secondary" class="p-button-raised" />
          <Button label="Success" severity="success" class="p-button-raised" />
          <Button label="Info" severity="info" class="p-button-raised" />
          <Button label="Warning" severity="warning" class="p-button-raised" />
          <Button label="Help" severity="help" class="p-button-raised" />
          <Button label="Danger" severity="danger" class="p-button-raised" />
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
      <div class="surface-card p-4 border-round shadow-2">
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
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Картки авто</h2>
      
      <!-- Варіанти карток -->
      <div class="grid">
        <div class="col-12 md:col-6 lg:col-4 mb-4">
          <h3 class="text-xl mb-3">Звичайна картка</h3>
          <div class="mb-2 text-600">Базовий варіант картки для відображення автомобіля</div>
          <CarCard :car="demoCarData" />
        </div>
        
        <div class="col-12 md:col-6 lg:col-4 mb-4">
          <h3 class="text-xl mb-3">Топ пропозиція</h3>
          <div class="mb-2 text-600">Картка з відміткою TOP (додатковий prop top="true")</div>
          <CarCard :car="demoCarData" :top="true" />
        </div>

        <div class="col-12">
          <div class="surface-card p-4 border-round">
            <h3 class="text-xl font-medium mb-3">Використання компонента</h3>
            <p class="mb-3 text-600">Компонент приймає два пропси:</p>
            <ul class="list-none p-0 m-0 mb-4">
              <li class="flex align-items-center mb-2">
                <i class="pi pi-check text-success mr-2"></i>
                <span><code class="bg-primary-50 px-2 py-1 border-round">car</code> - об'єкт з даними автомобіля (обов'язковий)</span>
              </li>
              <li class="flex align-items-center">
                <i class="pi pi-check text-success mr-2"></i>
                <span><code class="bg-primary-50 px-2 py-1 border-round">top</code> - булеве значення для відображення як TOP пропозиції (необов'язковий)</span>
              </li>
            </ul>

            <div class="surface-100 p-3 border-round">
              <pre class="m-0"><code>// Приклад використання:
&lt;CarCard 
  :car="{
    title: 'Назва авто',
    price: '19 999',
    mileage: '240',
    transmission: 'Автомат',
    engine: 'Дизель 2.0',
    location: 'Житомир',
    publishedAt: '20 хвилин тому',
    image: '/path/to/image.jpg'
  }"
  :top="true"
/&gt;</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Адаптивність -->
      <div class="mt-4">
        <h3 class="text-xl font-medium mb-3">Адаптивність</h3>
        <p class="mb-3 text-600">Картки автоматично адаптуються під різні розміри екрану:</p>
        <ul class="list-none p-0 m-0">
          <li class="flex align-items-center mb-2">
            <i class="pi pi-mobile text-primary mr-2"></i>
            <span>Мобільні пристрої: 1 картка в ряд</span>
          </li>
          <li class="flex align-items-center mb-2">
            <i class="pi pi-tablet text-primary mr-2"></i>
            <span>Планшети: 2 картки в ряд</span>
          </li>
          <li class="flex align-items-center">
            <i class="pi pi-desktop text-primary mr-2"></i>
            <span>Десктоп: 3 картки в ряд</span>
          </li>
        </ul>
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
      <div class="surface-card p-4 border-round shadow-2">
        <div class="grid">
          <div class="col-12 md:col-4">
            <h3 class="text-xl font-medium mb-3 text-700">Основні іконки</h3>
            <div class="flex flex-wrap gap-3">
              <i class="pi pi-home text-2xl"></i>
              <i class="pi pi-user text-2xl"></i>
              <i class="pi pi-car text-2xl"></i>
              <i class="pi pi-search text-2xl"></i>
              <i class="pi pi-filter text-2xl"></i>
              <i class="pi pi-calendar text-2xl"></i>
            </div>
          </div>
          <div class="col-12 md:col-4">
            <h3 class="text-xl font-medium mb-3 text-700">Дії</h3>
            <div class="flex flex-wrap gap-3">
              <i class="pi pi-plus text-2xl"></i>
              <i class="pi pi-minus text-2xl"></i>
              <i class="pi pi-check text-2xl"></i>
              <i class="pi pi-times text-2xl"></i>
              <i class="pi pi-trash text-2xl"></i>
              <i class="pi pi-pencil text-2xl"></i>
            </div>
          </div>
          <div class="col-12 md:col-4">
            <h3 class="text-xl font-medium mb-3 text-700">Навігація</h3>
            <div class="flex flex-wrap gap-3">
              <i class="pi pi-arrow-left text-2xl"></i>
              <i class="pi pi-arrow-right text-2xl"></i>
              <i class="pi pi-arrow-up text-2xl"></i>
              <i class="pi pi-arrow-down text-2xl"></i>
              <i class="pi pi-chevron-left text-2xl"></i>
              <i class="pi pi-chevron-right text-2xl"></i>
            </div>
          </div>
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

    <!-- Стилізація -->
    <section class="mb-6">
      <h2 class="text-2xl font-semibold mb-4 text-800">Стилізація</h2>
      <div class="surface-card p-4 border-round shadow-2">
        <!-- Кольори тексту -->
        <h3 class="text-xl font-medium mb-3 text-700">Кольори тексту</h3>
        <div class="grid">
          <div class="col-12 md:col-6 lg:col-4">
            <div class="flex flex-column gap-3">
              <div class="text-900">text-900 Основний текст</div>
              <div class="text-800">text-800 Заголовки</div>
              <div class="text-700">text-700 Підзаголовки</div>
              <div class="text-600">text-600 Звичайний текст</div>
              <div class="text-500">text-500 Другорядний текст</div>
              <div class="text-400">text-400 Неактивний текст</div>
              <div class="text-primary">text-primary Акцентний текст</div>
              <div class="bg-primary text-white p-2 border-round">text-white на темному фоні</div>
            </div>
          </div>
        </div>

        <!-- Фони -->
        <h3 class="text-xl font-medium mb-3 mt-4 text-700">Фони</h3>
        <div class="grid">
          <div class="col-12 md:col-6 lg:col-4">
            <div class="flex flex-column gap-3">
              <div class="bg-primary p-3 text-white border-round">bg-primary</div>
              <div class="bg-primary-100 p-3 text-900 border-round">bg-primary-100</div>
              <div class="surface-0 p-3 text-900 border-round shadow-1">surface-0</div>
              <div class="surface-50 p-3 text-900 border-round shadow-1">surface-50</div>
              <div class="surface-100 p-3 text-900 border-round shadow-1">surface-100</div>
              <div class="surface-900 p-3 text-white border-round">surface-900</div>
            </div>
          </div>
        </div>

        <!-- Відступи -->
        <h3 class="text-xl font-medium mb-3 mt-4 text-700">Відступи та вирівнювання</h3>
        <div class="grid">
          <div class="col-12 md:col-6 lg:col-4">
            <div class="flex flex-column gap-3">
              <div class="surface-100 p-3 border-round">p-3 Padding</div>
              <div class="surface-100 px-3 border-round">px-3 Padding X</div>
              <div class="surface-100 py-3 border-round">py-3 Padding Y</div>
              <div class="surface-100 p-3 border-round mb-3">mb-3 Margin Bottom</div>
              <div class="surface-100 p-3 border-round mt-3">mt-3 Margin Top</div>
              <div class="surface-100 p-3 border-round mx-3">mx-3 Margin X</div>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4">
            <div class="flex flex-column gap-3">
              <div class="surface-100 p-3 border-round text-center">text-center</div>
              <div class="surface-100 p-3 border-round text-right">text-right</div>
              <div class="surface-100 p-3 border-round text-left">text-left</div>
              <div class="surface-100 p-3 border-round text-justify">text-justify Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            </div>
          </div>
        </div>

        <!-- Flex та Grid -->
        <h3 class="text-xl font-medium mb-3 mt-4 text-700">Flex та Grid утиліти</h3>
        <div class="grid">
          <div class="col-12 md:col-6">
            <div class="surface-100 p-3 border-round">
              <div class="flex justify-content-between align-items-center mb-3">
                <div class="surface-200 p-2 border-round">Item 1</div>
                <div class="surface-200 p-2 border-round">Item 2</div>
                <div class="surface-200 p-2 border-round">Item 3</div>
              </div>
              <div class="flex justify-content-center align-items-center mb-3">
                <div class="surface-200 p-2 border-round mr-2">Centered</div>
                <div class="surface-200 p-2 border-round">Items</div>
              </div>
              <div class="flex flex-column gap-2">
                <div class="surface-200 p-2 border-round">Column 1</div>
                <div class="surface-200 p-2 border-round">Column 2</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Тіні та Бордери -->
        <h3 class="text-xl font-medium mb-3 mt-4 text-700">Тіні та Бордери</h3>
        <div class="grid">
          <div class="col-12 md:col-6 lg:col-4">
            <div class="flex flex-column gap-3">
              <div class="surface-card p-3 border-round shadow-1">shadow-1</div>
              <div class="surface-card p-3 border-round shadow-2">shadow-2</div>
              <div class="surface-card p-3 border-round shadow-3">shadow-3</div>
              <div class="surface-card p-3 border-round shadow-4">shadow-4</div>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-4">
            <div class="flex flex-column gap-3">
              <div class="surface-card p-3 border-round border-1 surface-border">border-1</div>
              <div class="surface-card p-3 border-round-sm">border-round-sm</div>
              <div class="surface-card p-3 border-round">border-round</div>
              <div class="surface-card p-3 border-round-lg">border-round-lg</div>
            </div>
          </div>
        </div>

        <!-- Переходи -->
        <h3 class="text-xl font-medium mb-3 mt-4 text-700">Переходи та Ховери</h3>
        <div class="grid">
          <div class="col-12 md:col-6 lg:col-4">
            <div class="flex flex-column gap-3">
              <div class="surface-card p-3 border-round shadow-1 hover:shadow-3 transition-duration-200">
                hover:shadow-3 transition-duration-200
              </div>
              <div class="surface-card p-3 border-round border-1 surface-border hover:surface-100 transition-colors transition-duration-200">
                hover:surface-100 transition-colors
              </div>
              <div class="surface-card p-3 border-round text-600 hover:text-primary transition-colors transition-duration-200">
                hover:text-primary transition-colors
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import Checkbox from 'primevue/checkbox'
import RadioButton from 'primevue/radiobutton'
import Tag from 'primevue/tag'
import CarCard from '@/components/cars/CarCard.vue'
import demoCarImage from '@/assets/cars/car-demo.png'

const checkboxValue = ref([])
const radioValue = ref(null)

// Демо дані для CarCard
const demoCarData = {
  title: 'Jeep Grand Cherokee 2020',
  price: '19 999',
  mileage: '240',
  transmission: 'Автомат',
  engine: 'Дизель 2.0',
  location: 'Житомир',
  publishedAt: '20 хвилин тому',
  image: demoCarImage
}
</script>

<style scoped>
.design-system {
  max-width: 1200px;
  margin: 0 auto;
}

.color-box {
  min-width: 150px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.surface-card {
  background: var(--surface-card);
  border-radius: var(--border-radius);
}

/* Hover ефекти */
.hover\:shadow-4:hover {
  box-shadow: var(--shadow-4);
}

/* Переходи */
.transition-shadow {
  transition: box-shadow 0.2s ease-in-out;
}

.transition-colors {
  transition: background-color 0.2s ease-in-out;
}

.transition-duration-150 {
  transition-duration: 150ms;
}
</style> 