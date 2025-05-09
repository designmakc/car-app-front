<!--
/**
 * Форма додавання легкового автомобіля з поступовим відображенням полів
 * 
 * @component
 */
-->

<template>
  <div class="grid">
    <!-- Лівий сайдбар з розділами -->
    <aside class="hidden md:flex flex-column col-3 gap-2 border-roundmin-w-15rem sticky top-0" style="height: 100vh;">  
      <ul class="list-none p-0 m-0 flex flex-column gap-2">
        <li v-for="section in sections" :key="section.key"
            :class="['cursor-pointer border-round px-3 py-2 ', activeSection === section.key ? 'bg-blue-100 text-blue-500 font-bold' : 'hover:bg-blue-50 text-color-secondary']"
            @click="scrollToSection(section.key)">
          <a :href="'#' + section.key" class="block w-full h-full no-underline text-inherit">{{ section.label }}</a>
        </li>
        <li class="text-primary cursor-pointer mt-4 px-3 py-2">Скинути все</li>
      </ul>
    </aside>

    <!-- Основна область -->
    <main class="flex flex-column col-12 md:col-6 gap-4">
      
      

      <!-- Блок з маркою та моделлю -->
      <div class="flex flex-column gap-3 mb-4" id="brand-model">
        <FloatLabel class="w-full" variant="in">
          <Dropdown 
            v-model="formData.brand" 
            :options="brands" 
            optionLabel="name" 
            :filter="true"
            fluid="true"
            showClear
            @change="onBrandChange"
          />
          <label for="brand">Марка авто</label>
        </FloatLabel>
        <FloatLabel class="w-full" variant="in">
          <Dropdown 
            v-model="formData.model" 
            :options="filteredModels" 
            optionLabel="name" 
            :disabled="!formData.brand"
            :filter="true"
            fluid="true"
            showClear
          />
          <label for="model">Модель авто</label>
        </FloatLabel>
      </div>

      <!-- Акардеон "Характеристики" -->
      <div id="characteristics">
        <Accordion :activeIndex="0" class="mb-4">
          <AccordionTab header="Характеристики">
            <div class="flex flex-column gap-3">
              <FloatLabel class="w-full" variant="in">
                <Dropdown v-model="formData.year" inputId="year" :options="years" :filter="true" fluid="true" showClear />
                <label for="year">Рік випуску</label>
              </FloatLabel>
              <FloatLabel class="w-full" variant="in">
                <Dropdown v-model="formData.bodyType" inputId="bodyType" :options="bodyTypes" optionLabel="name" :filter="true" fluid="true" showClear />
                <label for="bodyType">Тип кузова</label>
              </FloatLabel>
              <FloatLabel class="w-full" variant="in">
                <InputNumber v-model="formData.mileage" inputId="mileage" :max="999" @input="onMileageInput" :inputStyle="{ imeMode: 'disabled' }" inputmode="numeric" fluid="true" showClear />
                <label for="mileage">Пробіг (тис. км)</label>
              </FloatLabel>
              <FloatLabel class="w-full" variant="in">
                <Dropdown v-model="formData.generation" inputId="generation" :options="generations" optionLabel="name" :filter="true" fluid="true" showClear />
                <label for="generation">Покоління</label>
              </FloatLabel>
              <FloatLabel class="w-full" variant="in">
                <Dropdown v-model="formData.engine" inputId="engine" :options="fuelTypes" optionLabel="name" :filter="true" fluid="true" showClear />
                <label for="engine">Тип пального</label>
              </FloatLabel>
              <FloatLabel class="w-full" variant="in">
                <InputNumber v-model="formData.engine_capacity" inputId="engine_capacity" :min="0.5" :max="10" :step="0.1" fluid="true" showClear />
                <label for="engine_capacity">Обʼєм двигуна (л)</label>
              </FloatLabel>
              <FloatLabel class="w-full" variant="in">
                <Dropdown v-model="formData.driveType" inputId="driveType" :options="driveTypes" optionLabel="name" :filter="true" fluid="true" showClear />
                <label for="driveType">Привід</label>
              </FloatLabel>
              <FloatLabel class="w-full" variant="in">
                <Dropdown v-model="formData.transmission" inputId="transmission" :options="transmissions" optionLabel="name" :filter="true" fluid="true" showClear />
                <label for="transmission">Коробка передач</label>
              </FloatLabel>
              <FloatLabel class="w-full" variant="in">
                <InputText v-model="formData.modification" inputId="modification" fluid="true" showClear />
                <label for="modification">Модифікація</label>
              </FloatLabel>
              <FloatLabel class="w-full" variant="in">
                <Dropdown v-model="formData.color" inputId="color" :options="colors" optionLabel="name" :filter="true" fluid="true"  showClear />
                <label for="color">Колір</label>
              </FloatLabel>
              <FloatLabel class="w-full" variant="in">
                <Dropdown v-model="formData.importedFrom" inputId="importedFrom" :options="countries" optionLabel="name" :filter="true" fluid="true" showClear />
                <label for="importedFrom">Пригнаний з</label>
              </FloatLabel>
              <FloatLabel class="w-full" variant="in">
                <Dropdown v-model="formData.technicalCondition" inputId="technicalCondition" :options="technicalConditions" optionLabel="name" :filter="true" fluid="true" showClear />
                <label for="technicalCondition">Технічний стан</label>
              </FloatLabel>
            </div>
          </AccordionTab>
        </Accordion>
      </div>

      <!-- Акардеон "Фото" -->
      <div :id="'photos'">
        <Accordion :activeIndex="0" class="mb-4">
          <AccordionTab header="Фото">
            <div class="mb-3">
              <label class="font-medium">Головне фото</label>
              <FileUpload :multiple="false" accept="image/*" :maxFileSize="5000000" class="w-full" fluid="true" showClear />
            </div>
            <div class="mb-3">
              <label class="font-medium">Додаткові фото</label>
              <FileUpload multiple accept="image/*" :maxFileSize="5000000" class="w-full" fluid="true" showClear />
            </div>
          </AccordionTab>
        </Accordion>
      </div>

      <!-- Акардеон "Опис" -->
      <div id="description">
        <Accordion :activeIndex="0" class="mb-4">
          <AccordionTab header="Опис">
            
              <Editor v-model="formData.description" editorStyle="height: 320px">
                <template v-slot:toolbar>
                  <span class="ql-formats">
                    <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
                    <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
                    <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
                  </span>
                  
                </template>
              </Editor>
              
            
          </AccordionTab>
        </Accordion>
      </div>

      <!-- Акардеон "Контакти" -->
      <div id="contacts">
        <Accordion :activeIndex="0" class="mb-4">
          <AccordionTab header="Контакти">
            <div class="flex flex-column gap-3">
              <FloatLabel class="w-full" variant="in">
                <InputText v-model="formData.name" inputId="name" fluid="true" showClear />
                <label for="name">Ім'я</label>
              </FloatLabel>
              <FloatLabel class="w-full" variant="in">
                <InputText v-model="formData.phone" inputId="phone" fluid="true" showClear />
                <label for="phone">Телефон</label>
              </FloatLabel>
              <FloatLabel class="w-full" variant="in">
                <InputText v-model="formData.email" inputId="email" fluid="true" showClear />
                <label for="email">Email</label>
              </FloatLabel>
              <FloatLabel class="w-full" variant="in">
                <Dropdown v-model="formData.region" inputId="region" :options="regions" fluid="true" showClear />
                <label for="region">Регіон</label>
              </FloatLabel>
              <FloatLabel class="w-full" variant="in">
                <Dropdown v-model="formData.city" inputId="city" :options="cities" fluid="true" showClear />
                <label for="city">Місто</label>
              </FloatLabel>
            </div>
          </AccordionTab>
        </Accordion>
      </div>

      <!-- Акардеон "Ціна" -->
      <div id="price">
        <Accordion :activeIndex="0" class="mb-4">
          <AccordionTab header="Ціна">
            <div class="flex flex-column gap-3">
              <FloatLabel class="w-full" variant="in">
                <InputNumber v-model="formData.price" inputId="price" fluid="true" showClear />
                <label for="price">Ціна ($)</label>
              </FloatLabel>
              <FloatLabel class="w-full" variant="in">
                <Checkbox v-model="formData.negotiable" inputId="negotiable" :binary="true" fluid="true" showClear />
                <label for="negotiable">Можливий торг</label>
              </FloatLabel>
              <FloatLabel class="w-full" variant="in">
                <Checkbox v-model="formData.exchangePossible" inputId="exchangePossible" :binary="true" fluid="true" showClear />
                <label for="exchangePossible">Можливий обмін</label>
              </FloatLabel>
            </div>
          </AccordionTab>
        </Accordion>
      </div>
    </main>

    <!-- Правий сайтбар -->
    <aside class="hidden md:flex col-3 flex-column gap-3 sticky top-0" style="height: 100vh;">
      <!-- Прев'ю оголошення -->
      <CarCard
        :id="1"
        :brand="formData.brand ? formData.brand.name : ''"
        :model="formData.model ? formData.model.name : ''"
        :year="formData.year"
        :gearbox="formData.transmission ? formData.transmission.name : formData.transmission"
        :fuel_type="formData.engine ? formData.engine.name || formData.engine : formData.engine"
        :engine_capacity="formData.engine_capacity"
        :body_type="formData.bodyType ? formData.bodyType.name : formData.bodyType"
        :mileage="formData.mileage"
        :drive_type="formData.driveType ? formData.driveType.name : formData.driveType"
        :color="formData.color ? formData.color.name : formData.color"
        :city="formData.city ? formData.city.name : formData.city"
        :region="formData.region ? formData.region.name : formData.region"
        :price="formData.price"
        :status="formData.status"
        :is_top="formData.is_top"
        :images="formData.images || []"
        :created_at="formData.created_at"
      />
    </aside>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import Dropdown from 'primevue/dropdown';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import InputNumber from 'primevue/inputnumber';
import Checkbox from 'primevue/checkbox';
import FileUpload from 'primevue/fileupload';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import CarCard from './CarCard.vue'
import { 
  carBrands, 
  getModelsByBrand,
  bodyTypes,
  driveTypes,
  fuelTypes,
  transmissions,
  years,
  generations,
  engines,
  colors,
  technicalConditions,
  countries,
  regions,
  cities
} from '@/data/carFormOptions';
import Editor from 'primevue/editor';

// Список розділів (кроків)
const sections = [
  { key: 'characteristics', label: 'Характеристики' },
  { key: 'photos', label: 'Фото' },
  { key: 'description', label: 'Опис' },
  { key: 'contacts', label: 'Контакти' },
  { key: 'price', label: 'Ціна' }
];
const activeSection = ref('characteristics');
const activeAccordion = ref('characteristics');

// Дані форми (відповідають майбутній API-структурі)
const formData = reactive({
  brand: null,
  model: null,
  year: null,
  bodyType: null,
  generation: null,
  engine: null,
  driveType: null,
  transmission: null,
  modification: null,
  color: null,
  importedFrom: null,
  technicalCondition: null,
  mileage: null,
  price: null,
  negotiable: false,
  exchangePossible: false,
  city: null,
  region: null,
  name: '',
  phone: '',
  email: '',
  images: [],
  status: '',
  is_top: false,
  created_at: null,
  engine_capacity: null
});

// Прев'ю оголошення (реактивний стан)
const preview = reactive({
  brand: '',
  model: '',
  year: '',
  bodyType: '',
  engine: ''
});

// Синхронізація прев'ю з формою
watch(() => formData.brand, val => preview.brand = val ? val.name : '');
watch(() => formData.model, val => preview.model = val ? val.name : '');
watch(() => formData.year, val => preview.year = val || '');
watch(() => formData.bodyType, val => preview.bodyType = val || '');

const updatePreview = () => {
  preview.brand = formData.brand ? formData.brand.name : '';
  preview.model = formData.model ? formData.model.name : '';
  preview.year = formData.year || '';
  preview.bodyType = formData.bodyType || '';
};

// Довідники даних
const brands = carBrands.map(brand => ({
  id: brand.id,
  name: brand.name
}));

// Фільтр моделей за маркою
const filteredModels = computed(() => {
  if (!formData.brand) return [];
  const models = getModelsByBrand(formData.brand.name);
  return models.map(model => ({
    id: model,
    name: model
  }));
});

// Обробники змін
const onBrandChange = () => {
  formData.model = null;
  updatePreview();
};
const onModelChange = () => {
  updatePreview();
};

// Додаю функцію для обмеження вводу пробігу (тільки три цифри, без пробілів)
const onMileageInput = (e) => {
  if (e.originalEvent && e.originalEvent.target) {
    let val = e.originalEvent.target.value.replace(/\D/g, '').slice(0, 3);
    e.originalEvent.target.value = val;
    formData.mileage = val ? Number(val) : null;
  } else if (e.value && e.value.toString().length > 3) {
    formData.mileage = Number(e.value.toString().slice(0, 3));
  }
};

// Прокрутка до секції
const scrollToSection = (key) => {
  const el = document.getElementById(key);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// Відслідковування активної секції через IntersectionObserver
let observer;
onMounted(() => {
  const sectionIds = sections.map(s => s.key);
  const sectionElements = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  observer = new window.IntersectionObserver((entries) => {
    // Знаходимо entry з найбільшим intersectionRatio
    const visible = entries.filter(e => e.isIntersecting);
    if (visible.length) {
      const mostVisible = visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      activeSection.value = mostVisible.target.id;
    }
  }, { rootMargin: '-50% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });
  sectionElements.forEach(el => observer.observe(el));
});
onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script> 