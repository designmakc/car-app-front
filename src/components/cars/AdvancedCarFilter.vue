<script>
import debounce from 'lodash/debounce';
import Panel from 'primevue/panel'
import SelectButton from 'primevue/selectbutton'
import MultiSelect from 'primevue/multiselect'
import InputNumber from 'primevue/inputnumber'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Slider from 'primevue/slider'
import Button from 'primevue/button'
import Select from 'primevue/select'
import { ref, computed } from 'vue';

export default {
  components: {
    Panel,
    SelectButton,
    MultiSelect,
    InputNumber,
    IconField,
    InputIcon,
    Slider,
    Button,
    Select
  },
  data() {
    const currentYear = new Date().getFullYear();
    
    return {
      visible: false,
      filters: {
        status: [],
        brand: null,
        model: null,
        price_from: null,
        price_to: null,
        year_from: null,
        year_to: null,
        mileage: null,
        fuel_type: [],
        drive_type: [],
        color: [],
        exchange_available: false,
        price: null,
        year: null
      },
      
      StatusOptions: [
        { label: 'Всі', value: 'all' },
        { label: 'На майданчику', value: 'in_stock' },
        { label: 'Онлайн', value: 'online' }
      ],
      StatusValue: 'all',
      
      mileageOptions: [
        { label: 'До 50 тис. км', value: '0-50000' },
        { label: '50-100 тис. км', value: '50000-100000' },
        { label: '100-150 тис. км', value: '100000-150000' },
        { label: '150-200 тис. км', value: '150000-200000' },
        { label: 'Більше 200 тис. км', value: '200000+' }
      ],
      fuelTypes: [
        { label: 'Дизель', value: 'diesel' },
        { label: 'Бензин', value: 'petrol' },
        { label: 'Бензин/Газ', value: 'gas' },
        { label: 'Газ', value: 'lpg' },
        { label: 'Гібрид', value: 'hybrid' },
        { label: 'Електро', value: 'electric' }
      ],
      colors: [
        { label: 'Білий', value: 'white' },
        { label: 'Чорний', value: 'black' },
        { label: 'Сірий', value: 'gray' },
        { label: 'Синій', value: 'blue' },
        { label: 'Червоний', value: 'red' },
        { label: 'Зелений', value: 'green' },
        { label: 'Жовтий', value: 'yellow' },
        { label: 'Коричневий', value: 'brown' },
        { label: 'Сріблястий', value: 'silver' },
        { label: 'Бежевий', value: 'beige' }
      ],
      driveTypes: [
        { label: 'Передній', value: 'fwd' },
        { label: 'Задній', value: 'rwd' },
        { label: 'Повний', value: 'awd' }
      ],
      brandOptions: [
        { 
          name: 'BMW', 
          code: 'bmw',
          models: [
            { name: '3 Series', code: '3' },
            { name: '5 Series', code: '5' },
            { name: 'X5', code: 'x5' },
            { name: 'X6', code: 'x6' }
          ]
        },
        { 
          name: 'Mercedes-Benz', 
          code: 'mercedes',
          models: [
            { name: 'C-Class', code: 'c' },
            { name: 'E-Class', code: 'e' },
            { name: 'S-Class', code: 's' },
            { name: 'GLE', code: 'gle' }
          ]
        },
        { name: 'Audi', code: 'audi' },
        { name: 'Toyota', code: 'toyota' },
        { name: 'Volkswagen', code: 'vw' }
      ],
      modelOptions: {
        bmw: [
          { name: '3 Series', code: '3' },
          { name: '5 Series', code: '5' },
          { name: 'X5', code: 'x5' },
          { name: 'X6', code: 'x6' }
        ],
        mercedes: [
          { name: 'C-Class', code: 'c' },
          { name: 'E-Class', code: 'e' },
          { name: 'S-Class', code: 's' },
          { name: 'GLE', code: 'gle' }
        ],
        audi: [
          { name: 'A4', code: 'a4' },
          { name: 'A6', code: 'a6' },
          { name: 'Q5', code: 'q5' },
          { name: 'Q7', code: 'q7' }
        ],
        toyota: [
          { name: 'Camry', code: 'camry' },
          { name: 'RAV4', code: 'rav4' },
          { name: 'Land Cruiser', code: 'lc' },
          { name: 'Corolla', code: 'corolla' }
        ],
        vw: [
          { name: 'Golf', code: 'golf' },
          { name: 'Passat', code: 'passat' },
          { name: 'Tiguan', code: 'tiguan' },
          { name: 'Touareg', code: 'touareg' }
        ]
      },
      priceRange: {
        min: 0,
        max: 200000,
        step: 100
      },
      yearRange: {
        min: 1990,
        max: new Date().getFullYear(),
        step: 1
      },
      currentYear: new Date().getFullYear(),
      yearOptions: Array.from(
        { length: currentYear - 1900 + 1 }, 
        (_, i) => ({
          label: String(currentYear - i),
          value: currentYear - i
        })
      ),
      year_from: null,
      year_to: null
    }
  },
  watch: {
    carStatusValue: {
      handler(newValue) {
        this.filters.status = newValue === 'in_stock';
      }
    },
    filters: {
      deep: true,
      handler() {
        this.updateFilters();
      }
    }
  },
  computed: {
    foundCarsCount() {
      return 356;
    },
    filteredModels() {
      if (!this.filters.brand) return [];
      const brand = this.brandOptions.find(b => b.code === this.filters.brand);
      return brand ? brand.models : [];
    }
  },
  methods: {
    updateFilters: debounce(function() {
      const queryParams = {};
      Object.entries(this.filters).forEach(([key, value]) => {
        if (value !== null && value !== '' && value !== false) {
          queryParams[key] = value;
        }
      });
      this.$router.push({ query: queryParams });
    }, 300),
    
    resetFilters() {
      this.filters = {
        status: [],
        brand: null,
        model: null,
        price_from: null,
        price_to: null,
        year_from: null,
        year_to: null,
        mileage: null,
        fuel_type: [],
        drive_type: [],
        color: [],
        exchange_available: false,
        price: null,
        year: null
      };
      this.carStatusValue = 'all';
    },
    
    applyFilters() {
      this.visible = false;
    },
    
    updateSlider() {
      if (this.filters.price_from && this.filters.price_to) {
        this.filters.price = [this.filters.price_from, this.filters.price_to];
      }
    },
    
    updatePrice(value, index) {
      // Перевіряємо, чи значення не null/undefined
      if (value === null || value === undefined) {
        return;
      }

      // Ініціалізуємо масив, якщо він пустий
      if (!Array.isArray(this.filters.price)) {
        this.filters.price = [this.priceRange.min, this.priceRange.max];
      }

      const newPrice = [...this.filters.price];
      
      // Обмежуємо значення в межах діапазону
      value = Math.max(this.priceRange.min, Math.min(value, this.priceRange.max));
      
      newPrice[index] = value;

      // Логіка для збереження правильного діапазону
      if (index === 0) { // Змінюється мінімальна ціна
        if (newPrice[1] && value > newPrice[1]) {
          newPrice[1] = value;
        }
      } else { // Змінюється максимальна ціна
        if (newPrice[0] && value < newPrice[0]) {
          newPrice[0] = value;
        }
      }

      this.filters.price = newPrice;
    },

    updateYear(value, index) {
      // Перевіряємо, чи значення не null/undefined
      if (value === null || value === undefined) {
        return;
      }

      // Ініціалізуємо масив, якщо він пустий
      if (!Array.isArray(this.filters.year)) {
        this.filters.year = [this.yearRange.min, this.yearRange.max];
      }

      const newYear = [...this.filters.year];
      
      // Обмежуємо значення в межах діапазону
      value = Math.max(this.yearRange.min, Math.min(value, this.yearRange.max));
      
      newYear[index] = value;

      // Логіка для збереження правильного діапазону
      if (index === 0) { // Змінюється мінімальний рік
        if (newYear[1] && value > newYear[1]) {
          newYear[1] = value;
        }
      } else { // Змінюється максимальний рік
        if (newYear[0] && value < newYear[0]) {
          newYear[0] = value;
        }
      }

      this.filters.year = newYear;
    },

    filterYears(event, type) {
      let filtered = [];
      let query = event.query.trim();
      const currentYear = new Date().getFullYear();
      
      // Якщо введено число
      if (/^\d+$/.test(query)) {
        let year = parseInt(query);
        
        // Обмеження діапазону
        if (type === 'from') {
          year = Math.max(1900, Math.min(year, this.filters.year_to || currentYear));
        } else {
          year = Math.max(this.filters.year_from || 1900, Math.min(year, currentYear));
        }
        
        // Додаємо точне співпадіння якщо воно в межах діапазону
        if (year >= 1900 && year <= currentYear) {
          filtered.push({
            label: String(year),
            value: year
          });
        }
      }
      
      // Додаємо інші роки, що містять введений текст
      filtered = [...filtered, ...this.yearOptions.filter(option => 
        option.label.includes(query) && !filtered.some(f => f.value === option.value)
      )];
      
      event.filterCallback(filtered);
    },

    handleBrandChange() {
      // Скидаємо вибрану модель при зміні марки
      this.filters.model = null;
    }
  },
  mounted() {
    this.carStatusValue = this.filters.status ? 'in_stock' : 'all';
    
    const route = this.$route;
    Object.entries(route.query).forEach(([key, value]) => {
      if (key in this.filters) {
        this.filters[key] = value;
      }
    });
  }
}
</script>

<template>
  <div class="md:col-4 lg:hidden">
    <Button label="Всі фільтри" icon="pi pi-filter" @click="visible = true" class="w-full"/>
    
    <Dialog v-model:visible="visible" modal header="Фільтри" class="w-full md:w-8">
      <div class="filter-container">
        <div class="grid gap-4">
          <Panel header="Статус автомобіля" class="w-full">
            <SelectButton v-model="StatusValue" :options="StatusOptions" optionLabel="label" class="w-full"/>
          </Panel>

          <Panel header="Основні параметри" toggleable class="w-full">
            <div class="field mb-4">
              <label>Марка</label>
              <Select 
                v-model="filters.brand"
                :options="brandOptions"
                optionLabel="name"
                optionValue="code"
                placeholder="Оберіть марку"
                class="w-full"
                @change="handleBrandChange"
                variant="filled"
                size="large"
                :showClear="true"
              />
            </div>

            <div class="field mb-4">
              <label>Модель</label>
              <Select 
                v-model="filters.model"
                :options="filteredModels"
                optionLabel="name"
                optionValue="code"
                placeholder="Оберіть модель"
                class="w-full"
                :disabled="!filters.brand"
                variant="filled"
                size="large"
                :showClear="true"
              />
            </div>

            <div class="field mb-4">
              <label>Ціна ($)</label>
              <div class="flex flex-column gap-2">
                <div class="flex gap-2 align-items-center">
                  <div class="flex-auto">
                    <IconField class="w-full">
                      <InputIcon class="pi pi-dollar" />
                      <InputNumber 
                        id="price_from" 
                        :model-value="filters.price ? filters.price[0] : null"
                        @update:model-value="value => updatePrice(value, 0)"
                        autocomplete="off" 
                        variant="filled" 
                        size="large"
                        class="w-full"
                        :min="priceRange.min"
                        :max="priceRange.max"
                        :step="priceRange.step"
                        placeholder="0"
                      />
                    </IconField>
                  </div>
                  <div class="flex-auto">
                    <IconField class="w-full">
                      <InputIcon class="pi pi-dollar" />
                      <InputNumber 
                        id="price_to" 
                        :model-value="filters.price ? filters.price[1] : null"
                        @update:model-value="value => updatePrice(value, 1)"
                        autocomplete="off" 
                        variant="filled" 
                        size="large"
                        class="w-full"
                        :min="priceRange.min"
                        :max="priceRange.max"
                        :step="priceRange.step"
                        placeholder="200 000"
                      />
                    </IconField>
                  </div>
                </div>
                <Slider 
                  v-model="filters.price" 
                  range 
                  :min="priceRange.min" 
                  :max="priceRange.max" 
                  :step="priceRange.step" 
                  class="w-full"
                />
              </div>
            </div>

            <div class="field mb-4">
              <label>Рік випуску</label>
              <div class="flex flex-column gap-2">
                <div class="flex gap-2 align-items-center">
                  <div class="flex-auto">
                    <IconField class="w-full">
                      <InputIcon class="pi pi-calendar" />
                      <Select
                        v-model="filters.year_from"
                        :options="yearOptions"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Від"
                        class="w-full"
                        editable
                        :filter="true"
                        filterMatchMode="contains"
                        @filter="filterYears($event, 'from')"
                        variant="filled"
                        size="large"
                      />
                    </IconField>
                  </div>
                  <div class="flex-auto">
                    <IconField class="w-full">
                      <InputIcon class="pi pi-calendar" />
                      <Select
                        v-model="filters.year_to"
                        :options="yearOptions"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="До"
                        class="w-full"
                        editable
                        :filter="true"
                        filterMatchMode="contains"
                        @filter="filterYears($event, 'to')"
                        variant="filled"
                        size="large"
                      />
                    </IconField>
                  </div>
                </div>
              </div>
            </div>

            <div class="field mb-4">
              <label>Пробіг</label>
              <SelectButton v-model="filters.mileage" :options="mileageOptions" optionLabel="label"/>
            </div>
          </Panel>

          <Panel header="Технічні характеристики" toggleable class="w-full">
            <div class="field mb-4">
              <label>Тип палива</label>
              <div class="flex flex-wrap gap-2">
                <ToggleButton 
                  v-for="type in fuelTypes" 
                  :key="type.value"
                  v-model="filters.fuel_type" 
                  :onLabel="type.label" 
                  :offLabel="type.label"
                  :value="type.value"
                />
              </div>
            </div>
            
            <div class="field mb-4">
              <label>Тип приводу</label>
              <div class="flex flex-wrap gap-2">
                <ToggleButton 
                  v-for="type in driveTypes" 
                  :key="type.value"
                  v-model="filters.drive_type" 
                  :onLabel="type.label" 
                  :offLabel="type.label"
                  :value="type.value"
                />
              </div>
            </div>
          </Panel>

          <Panel header="Додаткові параметри" toggleable class="w-full">
            <div class="field mb-4">
              <label>Колір</label>
              <div class="grid">
                <div v-for="color in colors" :key="color.value" class="col-6 mb-2">
                  <div class="flex align-items-center">
                    <Checkbox v-model="filters.color" :value="color.value" :binary="false" />
                    <label class="ml-2">{{ color.label }}</label>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="field mb-4">
              <div class="flex align-items-center">
                <Checkbox v-model="filters.exchange_available" :binary="true" />
                <label class="ml-2">Можливий обмін</label>
              </div>
            </div>
          </Panel>

          <div class="flex justify-content-between">
            <Button label="Скинути" @click="resetFilters" />
            <Button label="Застосувати" @click="applyFilters" />
          </div>
        </div>
      </div>
    </Dialog>
  </div>

  <!-- desktop -->
  <div class="hidden lg:block col-12">
    <div class="surface-card border-round">
      <div class="grid gap-4">
        
        <!-- Статус -->
        <div>
          <SelectButton 
            v-model="StatusValue" 
            :options="StatusOptions" 
            optionLabel="label" 
            class="w-full" 
          />
        </div>

        <!-- Основні параметри -->
        <Panel header="Основні параметри" toggleable class="w-full px-0 m-0">
          <div class="flex flex-column gap-4">
            
            <!-- Марка -->
            <div class="flex flex-column gap-2">
              <label>Марка</label>
              <Select 
                v-model="filters.brand"
                :options="brandOptions"
                optionLabel="name"
                optionValue="code"
                placeholder="Оберіть марку"
                class="w-full"
                @change="handleBrandChange"
                variant="filled"
                size="large"
                :showClear="true"
              />
            </div>

            <!-- Модель -->
            <div class="flex flex-column gap-2">
              <label>Модель</label>
              <Select 
                v-model="filters.model"
                :options="filteredModels"
                optionLabel="name"
                optionValue="code"
                placeholder="Оберіть модель"
                class="w-full"
                :disabled="!filters.brand"
                variant="filled"
                size="large"
                :showClear="true"
              />
            </div>

            <!-- Ціна -->
            <div class="flex flex-column gap-2">
              <label>Ціна ($)</label>
              <div class="flex gap-2 align-items-center">
                <div class="flex-auto">
                  <IconField class="w-full">
                    <InputIcon class="pi pi-dollar" />
                    <InputNumber 
                      id="price_from" 
                      :model-value="filters.price ? filters.price[0] : null"
                      @update:model-value="value => updatePrice(value, 0)"
                      autocomplete="off" 
                      variant="filled" 
                      size="large"
                      class="w-full"
                      :min="priceRange.min"
                      :max="priceRange.max"
                      :step="priceRange.step"
                      placeholder="0"
                    />
                  </IconField>
                </div>
                <div class="flex-auto">
                  <IconField class="w-full">
                    <InputIcon class="pi pi-dollar" />
                    <InputNumber 
                      id="price_to" 
                      :model-value="filters.price ? filters.price[1] : null"
                      @update:model-value="value => updatePrice(value, 1)"
                      autocomplete="off" 
                      variant="filled" 
                      size="large"
                      class="w-full"
                      :min="priceRange.min"
                      :max="priceRange.max"
                      :step="priceRange.step"
                      placeholder="200 000"
                    />
                  </IconField>
                </div>
              </div>
              <Slider 
                v-model="filters.price" 
                range 
                :min="priceRange.min" 
                :max="priceRange.max" 
                :step="priceRange.step" 
                class="w-full"
              />
            </div>

            <!-- Рік випуску -->
            <div class="flex flex-column gap-2">
              <label>Рік випуску</label>
              <div class="flex gap-2 align-items-center">
                <div class="flex-auto">
                  <IconField class="w-full">
                    <Select
                      v-model="filters.year_from"
                      :options="yearOptions"
                      optionLabel="label"
                      optionValue="value"
                      placeholder="Від"
                      class="w-full"
                      editable
                      :filter="true"
                      filterMatchMode="contains"
                      @filter="filterYears($event, 'from')"
                      variant="filled"
                      size="large"
                    />
                  </IconField>
                </div>
                <div class="flex-auto">
                  <IconField class="w-full">
                    <Select
                      v-model="filters.year_to"
                      :options="yearOptions"
                      optionLabel="label"
                      optionValue="value"
                      placeholder="До"
                      class="w-full"
                      editable
                      :filter="true"
                      filterMatchMode="contains"
                      @filter="filterYears($event, 'to')"
                      variant="filled"
                      size="large"
                    />
                  </IconField>
                </div>
              </div>
            </div>

            <!-- Пробіг -->
            <div class="field">
              <label>Пробіг</label>
              <SelectButton 
                v-model="filters.mileage" 
                :options="mileageOptions" 
                optionLabel="label"
              />
            </div>

          </div>
        </Panel>

        <!-- Технічні характеристики -->
        <Panel header="Технічні характеристики" toggleable class="w-full">
          <div class="field mb-4">
            <label>Тип палива</label>
            <div class="flex flex-wrap gap-2">
              <ToggleButton 
                v-for="type in fuelTypes" 
                :key="type.value"
                v-model="filters.fuel_type" 
                :onLabel="type.label" 
                :offLabel="type.label"
                :value="type.value"
              />
            </div>
          </div>

          <div class="field mb-4">
            <label>Тип приводу</label>
            <div class="flex flex-wrap gap-2">
              <ToggleButton 
                v-for="type in driveTypes" 
                :key="type.value"
                v-model="filters.drive_type" 
                :onLabel="type.label" 
                :offLabel="type.label"
                :value="type.value"
              />
            </div>
          </div>
        </Panel>

        <!-- Додаткові параметри -->
        <Panel header="Додаткові параметри" toggleable class="w-full">
          <div class="field mb-4">
            <label>Колір</label>
            <div class="grid">
              <div v-for="color in colors" :key="color.value" class="col-6 mb-2">
                <div class="flex align-items-center">
                  <Checkbox v-model="filters.color" :value="color.value" :binary="false" />
                  <label class="ml-2">{{ color.label }}</label>
                </div>
              </div>
            </div>
          </div>

          <div class="field mb-4">
            <div class="flex align-items-center">
              <Checkbox v-model="filters.exchange_available" :binary="true" />
              <label class="ml-2">Можливий обмін</label>
            </div>
          </div>
        </Panel>

        <!-- Кнопки -->
        <div class="grid gap-4 w-full m-0">
          <Button 
            :label="'Показати ' + foundCarsCount + ' оголошень'" 
            icon="pi pi-search" 
            size="large" 
            class="w-full"
          />
          <Button 
            label="Скинути" 
            icon="pi pi-refresh" 
            @click="resetFilters" 
            outlined 
            class="w-full"
          />
        </div>

      </div>
    </div>
  </div>
</template> 


<style scoped>
:deep(.p-inputnumber) {
  width: 100%;
}

:deep(.p-inputnumber-input) {
  width: 100% !important;
  min-width: 0 !important;
}

:deep(.p-float-label) {
  width: 100%;
}

:deep(.p-input-icon-left) {
  width: 100%;
}

:deep(.p-input-icon-left > .p-inputtext) {
  width: 100%;
}
</style>