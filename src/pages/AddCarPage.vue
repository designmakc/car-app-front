<!--
/**
 * AddCarPage.vue
 * 
 * Сторінка додавання оголошення про автомобіль:
 * - Форма додавання автомобіля доступна всім користувачам
 * - Введення VIN/держномера або ручне заповнення
 *
 * @component
 */
-->

<template>
  <div class="container">
  <div class="min-h-screen bg-white flex flex-column">
    <!-- Хедер з логотипом та кнопкою закриття -->
    <header class="flex justify-content-between align-items-center p-3 ">
      <router-link to="/" class="logo-link">
        <img :src="logoSrc" alt="Логотип" class="h-3rem" />
      </router-link>
      
      <Button label="Закрити" severity="secondary" @click="$router.push('/')" />
    </header>
    
    <!-- Основний контент сторінки -->
    <main class="flex-grow-1 flex flex-column align-items-center justify-content-start pt-6">
      <div class="col-12 py-5">
        <!-- Заголовок сторінки -->
        <div class="text-center mb-5">
          <h1>Продайте свій автомобіль</h1>
          
        </div>
        
        <!-- Компонент категорій та поля VIN/держномера -->
        <div>
          <!-- Вкладки вибору типу транспорту -->
          <div class="mb-4">
            <div class="p-buttonset w-full">
              <SelectButton 
                v-model="selectedType" 
                :options="vehicleTypeOptions"
                :size="buttonSize"
                allowEmpty="true"
                :optionDisabled="isOptionDisabled"
                :pt="{
                  root: { class: 'w-full flex' },
                  button: { class: 'flex-1 text-center' }
                }"
              />
            </div>
          </div>
          
          <!-- Різний контент форми залежно від типу транспорту -->
          
          <!-- Форма для легкових -->
          <div v-if="selectedType === 'Легковий' && !isManualForm" class="vehicleTypeForm">
            <!-- Поле для введення VIN/держномера -->
            <div class="mb-4 mt-2">
              <IconField>
              <IftaLabel>
                <InputIcon class="pi pi-barcode mt-0" />
                <InputText size="large" type="text" v-model="vinOrPlate" class="w-full" />
                
                <label for="username">Введіть VIN/держномер</label>
                
              </IftaLabel>
              </IconField>
            </div>
            
            <!-- Повідомлення про ненайдений автомобіль -->
            <Message closable
              v-if="isVinNotFound" 
              severity="secondary"
              class="mb-4 w-full"
              icon="pi pi-exclamation-circle"
            >
              <div class="flex flex-column gap-2 pl-2">
                <h4 class="m-0">Не змогли знайти ваш автомобіль</h4>
                <p class="m-0">Заповніть оголошення вручну або перевірте номер</p>
              </div>
            </Message>
            
            <div class="flex flex-column gap-3">
              <Button 
                label="Далі" 
                size="large"
                class="w-full" 
                severity="success"
                :loading="isVinSubmitted && !isVinNotFound"
                :disabled="!vinOrPlate"
                @click="checkVin"
              />
              <Button 
                label="Заповню все вручну" 
                class="w-full p-button-text p-button-secondary" 
                @click="showManualForm"
              />
            </div>
          </div>
          
          <!-- Форма для ручного заповнення оголошення -->
          <div v-if="isManualForm" class="manual-form-container">
            <CarForm />
          </div>
          
          <!-- Форма для грузових -->
          <div v-else-if="selectedType === 'Вантажний'" class="vehicleTypeForm">
            <h3 class="mb-3">Оберіть марку вантажівки</h3>
            
            <div class="mb-4">
              <span class="p-input-icon-right w-full">
                <i class="pi pi-search" />
                <InputText
                  v-model="searchBrand"
                  placeholder="Пошук марки"
                  class="w-full"
                />
              </span>
            </div>
            
            <div class="truck-brands grid">
              <div v-for="brand in filteredTruckBrands" :key="brand.id" class="col-4 md:col-3 lg:col-2 mb-3">
                <div 
                  class="brand-item flex flex-column align-items-center gap-2 cursor-pointer p-2 border-round hover:surface-100"
                  :class="{'selected-brand': selectedBrand === brand.name}"
                  @click="selectedBrand = brand.name"
                >
                  <img :src="brand.logo" :alt="brand.name" class="w-3rem h-3rem object-fit-contain" />
                  <span class="text-sm">{{ brand.name }}</span>
                </div>
              </div>
            </div>
            
            <!-- Додаткові параметри для вантажівок -->
            <div v-if="selectedBrand" class="truck-params mt-4">
              <h4 class="mb-2">Вкажіть параметри вантажівки</h4>
              <div class="grid">
                <div class="col-12 md:col-6 mb-3">
                  <div class="field">
                    <label for="truckload">Вантажопідйомність, кг</label>
                    <InputNumber id="truckload" v-model="truckParams.load" class="w-full" />
                  </div>
                </div>
                <div class="col-12 md:col-6 mb-3">
                  <div class="field">
                    <label for="truckType">Тип кузова</label>
                    <Dropdown id="truckType" v-model="truckParams.bodyType" :options="truckBodyTypes" class="w-full" />
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Поле для введення VIN/держномера, показується якщо марка вибрана -->
            <div v-if="selectedBrand" class="mb-4 mt-4">
              <span class="p-input-icon-right w-full">
                <i class="pi pi-info-circle" />
                <InputText
                  v-model="vinOrPlate"
                  placeholder="Держномер або VIN"
                  class="w-full p-inputtext-lg"
                />
              </span>
            </div>
            
            <div v-if="selectedBrand" class="flex flex-column gap-3">
              <Button 
                label="Далі" 
                class="w-full" 
                :disabled="!vinOrPlate"
              />
              <Button 
                label="Заповню все вручну" 
                class="w-full p-button-text p-button-secondary" 
                @click="fillManually"
              />
            </div>
          </div>
          
          <!-- Форма для мото -->
          <div v-else-if="selectedType === 'Мото'" class="vehicleTypeForm">
            <h3 class="mb-3">Оберіть тип мототехніки</h3>
            
            <div class="moto-categories mb-4">
              <div class="grid">
                <div v-for="category in motoCategories" :key="category.id" class="col-6 mb-3">
                  <div 
                    class="category-item flex align-items-center gap-2 cursor-pointer p-2 border-1 border-round hover:surface-100"
                    :class="{'selected-category border-primary': selectedMotoCategory === category.name}"
                    @click="selectedMotoCategory = category.name"
                  >
                    <RadioButton :value="category.name" v-model="selectedMotoCategory" />
                    <span>{{ category.name }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="selectedMotoCategory" class="moto-brands mt-4">
              <h4 class="mb-2">Оберіть марку</h4>
              <div class="grid">
                <div v-for="brand in filteredMotoBrands" :key="brand.id" class="col-4 md:col-3 lg:col-2 mb-3">
                  <div 
                    class="brand-item flex flex-column align-items-center gap-2 cursor-pointer p-2 border-round hover:surface-100"
                    :class="{'selected-brand': selectedBrand === brand.name}"
                    @click="selectedBrand = brand.name"
                  >
                    <img :src="brand.logo" :alt="brand.name" class="w-3rem h-3rem object-fit-contain" />
                    <span class="text-sm">{{ brand.name }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Поле для введення VIN/держномера, показується якщо марка і категорія вибрані -->
            <div v-if="selectedBrand && selectedMotoCategory" class="mb-4 mt-4">
              <span class="p-input-icon-right w-full">
                <i class="pi pi-info-circle" />
                <InputText
                  v-model="vinOrPlate"
                  placeholder="Держномер або VIN"
                  class="w-full p-inputtext-lg"
                />
              </span>
            </div>
            
            <div v-if="selectedBrand && selectedMotoCategory" class="flex flex-column gap-3">
              <Button 
                label="Далі" 
                class="w-full" 
                :disabled="!vinOrPlate"
              />
              <Button 
                label="Заповню все вручну" 
                class="w-full p-button-text p-button-secondary" 
                @click="fillManually"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import SelectButton from 'primevue/selectbutton';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import RadioButton from 'primevue/radiobutton';
import IconField from 'primevue/iconfield';
import IftaLabel from 'primevue/iftalabel';
import InputIcon from 'primevue/inputicon';
import Message from 'primevue/message';
import CarForm from '@/components/cars/CarForm.vue';
import { useWindowSize } from '@vueuse/core';

// Шляхи до зображень
import logoSrc from '@/assets/logo-orang.svg';

// Тип транспорту
const selectedType = ref('Легковий');
const vehicleTypeOptions = ['Легковий', 'Вантажний', 'Автобус', 'Мото'];

// Розмір кнопки в залежності від ширини екрану
const { width } = useWindowSize();
const buttonSize = computed(() => width.value < 768 ? 'small' : 'large');

// Пошук марок
const searchBrand = ref('');

// Вибрана марка і категорія
const selectedBrand = ref('');
const selectedMotoCategory = ref('');

// Параметри для вантажівок
const truckParams = ref({
  load: null,
  bodyType: null
});

// Типи кузовів для вантажівок
const truckBodyTypes = [
  'Тентований',
  'Фургон',
  'Самоскид',
  'Рефрижератор',
  'Платформа',
  'Автовоз',
  'Цистерна',
  'Лісовоз'
];

// Категорії мототехніки
const motoCategories = [
  { id: 1, name: 'Мотоцикли' },
  { id: 2, name: 'Скутери' },
  { id: 3, name: 'Мотовездеходи' },
  { id: 4, name: 'Снігоходи' }
];

// Фіктивні дані для марок
const carBrands = [
  { id: 1, name: 'Audi', logo: 'https://via.placeholder.com/50' },
  { id: 2, name: 'BMW', logo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Mercedes', logo: 'https://via.placeholder.com/50' },
  { id: 4, name: 'Toyota', logo: 'https://via.placeholder.com/50' },
  { id: 5, name: 'Honda', logo: 'https://via.placeholder.com/50' },
  { id: 6, name: 'Ford', logo: 'https://via.placeholder.com/50' },
  { id: 7, name: 'Volkswagen', logo: 'https://via.placeholder.com/50' },
  { id: 8, name: 'Hyundai', logo: 'https://via.placeholder.com/50' }
];

const truckBrands = [
  { id: 1, name: 'MAN', logo: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Volvo', logo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Scania', logo: 'https://via.placeholder.com/50' },
  { id: 4, name: 'Mercedes', logo: 'https://via.placeholder.com/50' },
  { id: 5, name: 'DAF', logo: 'https://via.placeholder.com/50' },
  { id: 6, name: 'Iveco', logo: 'https://via.placeholder.com/50' },
  { id: 7, name: 'КамАЗ', logo: 'https://via.placeholder.com/50' },
  { id: 8, name: 'МАЗ', logo: 'https://via.placeholder.com/50' }
];

const motoBrands = [
  { id: 1, name: 'Honda', logo: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Yamaha', logo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Kawasaki', logo: 'https://via.placeholder.com/50' },
  { id: 4, name: 'Suzuki', logo: 'https://via.placeholder.com/50' },
  { id: 5, name: 'BMW', logo: 'https://via.placeholder.com/50' },
  { id: 6, name: 'Ducati', logo: 'https://via.placeholder.com/50' },
  { id: 7, name: 'Harley-Davidson', logo: 'https://via.placeholder.com/50' },
  { id: 8, name: 'KTM', logo: 'https://via.placeholder.com/50' }
];

// Фільтрація марок по пошуку
const filteredCarBrands = computed(() => {
  if (!searchBrand.value) return carBrands;
  return carBrands.filter(brand => 
    brand.name.toLowerCase().includes(searchBrand.value.toLowerCase())
  );
});

const filteredTruckBrands = computed(() => {
  if (!searchBrand.value) return truckBrands;
  return truckBrands.filter(brand => 
    brand.name.toLowerCase().includes(searchBrand.value.toLowerCase())
  );
});

const filteredMotoBrands = computed(() => {
  if (!searchBrand.value) return motoBrands;
  return motoBrands.filter(brand => 
    brand.name.toLowerCase().includes(searchBrand.value.toLowerCase())
  );
});

// VIN або держномер
const vinOrPlate = ref('');
const isVinSubmitted = ref(false);
const isVinNotFound = ref(false);

// Ручне заповнення оголошення
const fillManually = () => {
  // Тут буде логіка для переходу до ручного заповнення оголошення
  console.log('Перехід до ручного заповнення оголошення');
};

// Перевірка VIN/держномера
const checkVin = () => {
  if (!vinOrPlate.value) return;
  
  isVinSubmitted.value = true;
  
  // Імітація перевірки VIN/держномера
  setTimeout(() => {
    // Для демонстрації, припустимо, що автомобіль не знайдено
    isVinNotFound.value = true;
  }, 1000);
};

// Функція для визначення, чи опція має бути неактивною
const isOptionDisabled = (option) => {
  return option === 'Мото';
};

// Спостерігач для запобігання знімання виділення (щоб працювало як радіокнопка)
watch(selectedType, (newValue) => {
  if (!newValue) {
    // Якщо значення стає порожнім, повертаємо "Легковий" як значення за замовчуванням
    selectedType.value = 'Легковий';
  }
});

// Скидання вибору при зміні типу транспорту
watch(selectedType, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    selectedBrand.value = '';
    selectedMotoCategory.value = '';
    searchBrand.value = '';
    vinOrPlate.value = '';
    truckParams.value = {
      load: null,
      bodyType: null
    };
  }
});

// Спостерігач за зміною VIN/держномера
watch(vinOrPlate, () => {
  if (isVinSubmitted.value) {
    isVinSubmitted.value = false;
    isVinNotFound.value = false;
  }
});

// Новий стан для ручного заповнення оголошення
const isManualForm = ref(false);

// Функція для переходу до ручного заповнення оголошення
const showManualForm = () => {
  isManualForm.value = true;
};
</script>

<style scoped>
.selected-brand {
  background-color: var(--p-primary-50);
  border: 1px solid var(--p-primary-200);
}

.selected-category {
  border-color: var(--p-primary-500);
  background-color: var(--p-primary-50);
}

:deep(.p-selectbutton) {
  width: 100%;
  display: flex;
}

:deep(.p-selectbutton .p-button) {
  flex: 1;
  width: 100%;
}

:deep(.p-togglebutton) {
  width: 100%;
}
</style> 