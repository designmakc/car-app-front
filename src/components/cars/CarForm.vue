<!--
/**
 * Форма додавання автомобіля з поступовим відображенням полів
 * 
 * @component
 */
-->

<template>
  <div class="car-form">
    <!-- Крок 1: Марка та модель -->
    <CarFormStep v-if="currentStep >= 1" title="Основна інформація">
      <div class="grid">
        <div class="col-12 md:col-6 mb-3">
          <div class="field">
            <label for="brand">Марка авто</label>
            <Dropdown 
              id="brand" 
              v-model="formData.brand" 
              :options="brands" 
              optionLabel="name" 
              placeholder="Оберіть марку" 
              class="w-full" 
              @change="onBrandChange"
            />
          </div>
        </div>
        <div class="col-12 md:col-6 mb-3">
          <div class="field">
            <label for="model">Модель авто</label>
            <Dropdown 
              id="model" 
              v-model="formData.model" 
              :options="filteredModels" 
              optionLabel="name" 
              placeholder="Оберіть модель" 
              class="w-full" 
              :disabled="!formData.brand"
              @change="onModelChange"
            />
          </div>
        </div>
        <div class="col-12 md:col-6 mb-3">
          <div class="field">
            <label for="year">Рік випуску</label>
            <Dropdown 
              id="year" 
              v-model="formData.year" 
              :options="years" 
              placeholder="Оберіть рік" 
              class="w-full"
              @change="advanceIfReady(1)"
            />
          </div>
        </div>
        <div class="col-12 md:col-6 mb-3">
          <div class="field">
            <label for="mileage">Пробіг (тис. км)</label>
            <InputNumber 
              id="mileage" 
              v-model="formData.mileage" 
              placeholder="Введіть пробіг" 
              class="w-full"
              @keyup="advanceIfReady(1)"
            />
          </div>
        </div>
      </div>
    </CarFormStep>

    <!-- Крок 2: Кузов та двигун -->
    <CarFormStep v-if="currentStep >= 2" title="Кузов та двигун">
      <div class="grid">
        <div class="col-12 md:col-6 mb-3">
          <div class="field">
            <label for="bodyType">Тип кузова</label>
            <Dropdown 
              id="bodyType" 
              v-model="formData.bodyType" 
              :options="bodyTypes" 
              placeholder="Оберіть тип кузова" 
              class="w-full"
            />
          </div>
        </div>
        <div class="col-12 md:col-6 mb-3">
          <div class="field">
            <label for="modification">Модифікація</label>
            <InputText 
              id="modification" 
              v-model="formData.modification" 
              placeholder="Введіть модифікацію" 
              class="w-full"
            />
          </div>
        </div>
        <div class="col-12 md:col-6 mb-3">
          <div class="field">
            <label for="transmission">Коробка передач</label>
            <Dropdown 
              id="transmission" 
              v-model="formData.transmission" 
              :options="transmissions" 
              placeholder="Оберіть тип коробки" 
              class="w-full"
            />
          </div>
        </div>
        <div class="col-12 md:col-6 mb-3">
          <div class="field">
            <label for="fuelType">Паливо</label>
            <Dropdown 
              id="fuelType" 
              v-model="formData.fuelType" 
              :options="fuelTypes" 
              placeholder="Оберіть тип палива" 
              class="w-full"
            />
          </div>
        </div>
        <div class="col-12 md:col-6 mb-3">
          <div class="field">
            <label for="engineCapacity">Об'єм двигуна (л)</label>
            <InputNumber 
              id="engineCapacity" 
              v-model="formData.engineCapacity" 
              placeholder="Введіть об'єм" 
              class="w-full" 
              :minFractionDigits="1" 
              :maxFractionDigits="1"
            />
          </div>
        </div>
        <div class="col-12 md:col-6 mb-3">
          <div class="field">
            <label for="driveType">Привід</label>
            <Dropdown 
              id="driveType" 
              v-model="formData.driveType" 
              :options="driveTypes" 
              placeholder="Оберіть тип приводу" 
              class="w-full"
              @change="advanceIfReady(2)"
            />
          </div>
        </div>
      </div>
    </CarFormStep>

    <!-- Крок 3: Додаткова інформація -->
    <CarFormStep v-if="currentStep >= 3" title="Додаткова інформація">
      <div class="grid">
        <div class="col-12 md:col-6 mb-3">
          <div class="field">
            <label for="doors">Кількість дверей</label>
            <Dropdown 
              id="doors" 
              v-model="formData.doors" 
              :options="doorOptions" 
              placeholder="Оберіть кількість дверей" 
              class="w-full"
            />
          </div>
        </div>
        <div class="col-12 md:col-6 mb-3">
          <div class="field">
            <label for="color">Колір</label>
            <Dropdown 
              id="color" 
              v-model="formData.color" 
              :options="colors" 
              placeholder="Оберіть колір" 
              class="w-full"
            />
          </div>
        </div>
        <div class="col-12 md:col-6 mb-3">
          <div class="field">
            <label for="seats">Кількість місць</label>
            <Dropdown 
              id="seats" 
              v-model="formData.seats" 
              :options="seatOptions" 
              placeholder="Оберіть кількість місць" 
              class="w-full"
            />
          </div>
        </div>
        <div class="col-12 md:col-6 mb-3">
          <div class="field">
            <label for="importedFrom">Пригнаний з</label>
            <Dropdown 
              id="importedFrom" 
              v-model="formData.importedFrom" 
              :options="countries" 
              placeholder="Оберіть країну" 
              class="w-full"
              @change="advanceIfReady(3)"
            />
          </div>
        </div>
      </div>
    </CarFormStep>

    <!-- Крок 4: Стан автомобіля -->
    <CarFormStep v-if="currentStep >= 4" title="Стан автомобіля">
      <div class="grid">
        <div class="col-12 mb-3">
          <div class="field-checkbox">
            <Checkbox id="accidentInvolved" v-model="formData.accidentInvolved" :binary="true" />
            <label for="accidentInvolved">Участь в ДТП</label>
          </div>
        </div>
        <div class="col-12 md:col-6 mb-3">
          <div class="field">
            <label for="paintCondition">Лакофарбове покриття</label>
            <Dropdown 
              id="paintCondition" 
              v-model="formData.paintCondition" 
              :options="paintConditions" 
              placeholder="Оберіть стан" 
              class="w-full"
            />
          </div>
        </div>
        <div class="col-12 md:col-6 mb-3">
          <div class="field">
            <label for="technicalCondition">Технічний стан</label>
            <Dropdown 
              id="technicalCondition" 
              v-model="formData.technicalCondition" 
              :options="technicalConditions" 
              placeholder="Оберіть стан" 
              class="w-full"
              @change="advanceIfReady(4)"
            />
          </div>
        </div>
      </div>
    </CarFormStep>

    <!-- Крок 5: Опції автомобіля -->
    <CarFormStep v-if="currentStep >= 5" title="Опції автомобіля">
      <div class="mb-3">
        <h4>Комфорт</h4>
        <div class="grid">
          <div class="col-12 md:col-4 mb-2" v-for="option in comfortOptions" :key="option.id">
            <div class="field-checkbox">
              <Checkbox :id="'option-'+option.id" v-model="formData.options" :value="option.id" />
              <label :for="'option-'+option.id">{{ option.name }}</label>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mb-3">
        <h4>Безпека</h4>
        <div class="grid">
          <div class="col-12 md:col-4 mb-2" v-for="option in safetyOptions" :key="option.id">
            <div class="field-checkbox">
              <Checkbox :id="'option-'+option.id" v-model="formData.options" :value="option.id" />
              <label :for="'option-'+option.id">{{ option.name }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-3">
        <h4>Мультимедіа</h4>
        <div class="grid">
          <div class="col-12 md:col-4 mb-2" v-for="option in multimediaOptions" :key="option.id">
            <div class="field-checkbox">
              <Checkbox :id="'option-'+option.id" v-model="formData.options" :value="option.id" />
              <label :for="'option-'+option.id">{{ option.name }}</label>
            </div>
          </div>
        </div>
      </div>

      <Button 
        label="Продовжити" 
        class="w-full"
        @click="currentStep = 6"
      />
    </CarFormStep>

    <!-- Крок 6: Ціна та опис -->
    <CarFormStep v-if="currentStep >= 6" title="Ціна та опис">
      <div class="grid">
        <div class="col-12 mb-3">
          <div class="field">
            <label for="price">Ціна ($)</label>
            <InputNumber 
              id="price" 
              v-model="formData.price" 
              placeholder="Введіть ціну" 
              class="w-full"
              :min="0"
            />
          </div>
        </div>
        <div class="col-12 mb-3">
          <div class="grid">
            <div class="col-6">
              <div class="field-checkbox">
                <Checkbox id="negotiable" v-model="formData.negotiable" :binary="true" />
                <label for="negotiable">Можливий торг</label>
              </div>
            </div>
            <div class="col-6">
              <div class="field-checkbox">
                <Checkbox id="exchangePossible" v-model="formData.exchangePossible" :binary="true" />
                <label for="exchangePossible">Можливий обмін</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 mb-3">
          <div class="field">
            <label for="description">Опис автомобіля</label>
            <Textarea 
              id="description" 
              v-model="formData.description" 
              rows="5" 
              placeholder="Опишіть ваш автомобіль" 
              class="w-full"
            />
          </div>
        </div>
        <div class="col-12 md:col-6 mb-3">
          <div class="field">
            <label for="region">Регіон</label>
            <Dropdown 
              id="region" 
              v-model="formData.region" 
              :options="regions" 
              placeholder="Оберіть регіон" 
              class="w-full"
              @change="loadCities"
            />
          </div>
        </div>
        <div class="col-12 md:col-6 mb-3">
          <div class="field">
            <label for="city">Місто</label>
            <Dropdown 
              id="city" 
              v-model="formData.city" 
              :options="cities" 
              placeholder="Оберіть місто" 
              class="w-full"
              :disabled="!formData.region"
            />
          </div>
        </div>
      </div>

      <Button 
        label="Продовжити" 
        class="w-full"
        @click="currentStep = 7"
      />
    </CarFormStep>

    <!-- Крок 7: Фотографії -->
    <CarFormStep v-if="currentStep >= 7" title="Фотографії">
      <div class="mb-4">
        <h4>Головне фото</h4>
        <FileUpload 
          :multiple="false" 
          accept="image/*" 
          :maxFileSize="5000000"
          @select="onMainPhotoSelect"
        >
          <template #empty>
            <p>Перетягніть фото сюди або клікніть для вибору</p>
          </template>
        </FileUpload>
      </div>
      
      <div class="mb-4">
        <h4>Додаткові фото</h4>
        <FileUpload 
          multiple 
          accept="image/*" 
          :maxFileSize="5000000"
          @select="onPhotosSelect"
        >
          <template #empty>
            <p>Перетягніть фото сюди або клікніть для вибору (до 20 фото)</p>
          </template>
        </FileUpload>
      </div>

      <div class="mt-4">
        <div class="field-checkbox">
          <Checkbox id="termsAccepted" v-model="formData.termsAccepted" :binary="true" />
          <label for="termsAccepted">Я згоден з умовами</label>
        </div>
      </div>

      <div class="mt-4">
        <Button 
          label="Опублікувати оголошення" 
          class="w-full"
          :disabled="!formData.termsAccepted"
          @click="submitForm"
        />
      </div>
    </CarFormStep>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import CarFormStep from './CarFormStep.vue';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Checkbox from 'primevue/checkbox';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';

// Поточний крок форми
const currentStep = ref(1);

// Дані форми
const formData = reactive({
  brand: null,
  model: null,
  year: null,
  mileage: null,
  bodyType: null,
  modification: '',
  transmission: null,
  fuelType: null,
  engineCapacity: null,
  driveType: null,
  doors: null,
  color: null,
  seats: null,
  importedFrom: null,
  accidentInvolved: false,
  paintCondition: null,
  technicalCondition: null,
  options: [],
  price: null,
  negotiable: false,
  exchangePossible: false,
  description: '',
  region: null,
  city: null,
  mainPhoto: null,
  photos: [],
  termsAccepted: false
});

// Довідники даних
const brands = [
  { id: 1, name: 'Audi' },
  { id: 2, name: 'BMW' },
  { id: 3, name: 'Mercedes-Benz' },
  { id: 4, name: 'Toyota' },
  { id: 5, name: 'Volkswagen' }
];

const models = [
  { id: 1, brandId: 1, name: 'A4' },
  { id: 2, brandId: 1, name: 'A6' },
  { id: 3, brandId: 1, name: 'Q5' },
  { id: 4, brandId: 2, name: '3 Series' },
  { id: 5, brandId: 2, name: '5 Series' },
  { id: 6, brandId: 2, name: 'X5' },
  { id: 7, brandId: 3, name: 'C-Class' },
  { id: 8, brandId: 3, name: 'E-Class' },
  { id: 9, brandId: 4, name: 'Camry' },
  { id: 10, brandId: 4, name: 'Corolla' },
  { id: 11, brandId: 5, name: 'Golf' },
  { id: 12, brandId: 5, name: 'Passat' }
];

// Генерація років (від 1970 до поточного року)
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1969 }, (_, i) => currentYear - i);

// Інші довідники
const bodyTypes = ['Седан', 'Хетчбек', 'Універсал', 'Кросовер', 'Позашляховик', 'Купе', 'Кабріолет'];
const transmissions = ['Механічна', 'Автоматична', 'Роботизована', 'Варіатор'];
const fuelTypes = ['Бензин', 'Дизель', 'Газ', 'Гібрид', 'Електро'];
const driveTypes = ['Передній', 'Задній', 'Повний'];
const doorOptions = [2, 3, 4, 5];
const seatOptions = [2, 3, 4, 5, 6, 7, 8];
const colors = ['Білий', 'Чорний', 'Сірий', 'Синій', 'Червоний', 'Зелений', 'Жовтий', 'Коричневий', 'Сріблястий'];
const countries = ['Україна', 'Німеччина', 'США', 'Польща', 'Італія', 'Японія', 'Корея'];
const paintConditions = ['Оригінал', 'Фарбований частково', 'Фарбований повністю'];
const technicalConditions = ['Відмінний', 'Добрий', 'Задовільний', 'Потребує ремонту'];
const regions = ['Київська', 'Львівська', 'Одеська', 'Харківська', 'Дніпропетровська'];

// Довідник міст (залежить від регіону)
const cities = ref([]);

// Опції автомобіля
const comfortOptions = [
  { id: 1, name: 'Кондиціонер' },
  { id: 2, name: 'Електросклопідйомники' },
  { id: 3, name: 'Підсилювач керма' },
  { id: 4, name: 'Регулювання керма' },
  { id: 5, name: 'Підігрів сидінь' },
  { id: 6, name: 'Вентиляція сидінь' }
];

const safetyOptions = [
  { id: 7, name: 'ABS' },
  { id: 8, name: 'ESP' },
  { id: 9, name: 'Подушки безпеки' },
  { id: 10, name: 'Сигналізація' },
  { id: 11, name: 'Центральний замок' }
];

const multimediaOptions = [
  { id: 12, name: 'Навігаційна система' },
  { id: 13, name: 'Bluetooth' },
  { id: 14, name: 'USB' },
  { id: 15, name: 'AUX' },
  { id: 16, name: 'Акустика' }
];

// Обчислювані властивості
const filteredModels = computed(() => {
  if (!formData.brand) return [];
  return models.filter(model => model.brandId === formData.brand.id);
});

// Обробники подій
const onBrandChange = () => {
  formData.model = null;
};

const onModelChange = () => {
  advanceIfReady(1);
};

const loadCities = () => {
  // Імітація завантаження міст для обраного регіону
  if (formData.region === 'Київська') {
    cities.value = ['Київ', 'Бровари', 'Бориспіль', 'Ірпінь', 'Буча'];
  } else if (formData.region === 'Львівська') {
    cities.value = ['Львів', 'Дрогобич', 'Стрий', 'Трускавець'];
  } else if (formData.region === 'Одеська') {
    cities.value = ['Одеса', 'Чорноморськ', 'Ізмаїл'];
  } else if (formData.region === 'Харківська') {
    cities.value = ['Харків', 'Ізюм', 'Лозова'];
  } else if (formData.region === 'Дніпропетровська') {
    cities.value = ['Дніпро', 'Кривий Ріг', 'Нікополь', 'Павлоград'];
  } else {
    cities.value = [];
  }
};

const onMainPhotoSelect = (event) => {
  if (event.files && event.files.length > 0) {
    formData.mainPhoto = event.files[0];
  }
};

const onPhotosSelect = (event) => {
  if (event.files && event.files.length > 0) {
    formData.photos = [...formData.photos, ...event.files].slice(0, 20);
  }
};

// Перевірка чи можна переходити до наступного кроку
const advanceIfReady = (step) => {
  if (step === 1 && formData.brand && formData.model && formData.year && formData.mileage) {
    if (currentStep.value === 1) currentStep.value = 2;
  } else if (step === 2 && formData.bodyType && formData.transmission && formData.fuelType && formData.driveType) {
    if (currentStep.value === 2) currentStep.value = 3;
  } else if (step === 3 && formData.doors && formData.color && formData.seats && formData.importedFrom) {
    if (currentStep.value === 3) currentStep.value = 4;
  } else if (step === 4 && formData.paintCondition && formData.technicalCondition) {
    if (currentStep.value === 4) currentStep.value = 5;
  }
};

// Відправка форми
const submitForm = () => {
  if (!formData.termsAccepted) return;
  
  // Тут має бути код для відправки форми на сервер
  console.log('Відправка форми:', formData);
  
  // Після успішної відправки можна очистити форму або перенаправити користувача
  alert('Оголошення успішно опубліковане!');
};

// Експортувати форму для використання в батьківському компоненті
defineExpose({
  formData,
  currentStep
});
</script>

<style scoped>
.car-form {
  max-width: 100%;
}
</style> 