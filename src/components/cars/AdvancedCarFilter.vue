<script>
import debounce from 'lodash/debounce';

export default {
  data() {
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
        exchange_available: false
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
        { name: 'BMW', code: 'bmw' },
        { name: 'Mercedes-Benz', code: 'mercedes' },
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
        step: 1000
      },
      yearRange: {
        min: 1990,
        max: 2024,
        step: 1
      }
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
        exchange_available: false
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
              <MultiSelect v-model="filters.brand" :options="brandOptions" optionLabel="name" placeholder="Оберіть марку" class="w-full" />
            </div>

            <div class="field mb-4">
              <label>Модель</label>
              <MultiSelect v-model="filters.model" :options="modelOptions[filters.brand?.code] || []" optionLabel="name" placeholder="Оберіть модель" class="w-full" :disabled="!filters.brand" />
            </div>

            <div class="field mb-4">
              <label>Ціна ($)</label>
              <div class="flex gap-2">
                <InputNumber v-model="filters.price_from" placeholder="Від" :min="priceRange.min" :max="priceRange.max"/>
                <InputNumber v-model="filters.price_to" placeholder="До" :min="filters.price_from || priceRange.min" :max="priceRange.max"/>
              </div>
              <Slider v-model="filters.price" range :min="priceRange.min" :max="priceRange.max" :step="priceRange.step"/>
            </div>

            <div class="field mb-4">
              <label>Рік випуску</label>
              <div class="flex gap-2">
                <InputNumber v-model="filters.year_from" placeholder="Від" :min="yearRange.min" :max="yearRange.max"/>
                <InputNumber v-model="filters.year_to" placeholder="До" :min="filters.year_from || yearRange.min" :max="yearRange.max"/>
              </div>
              <Slider v-model="filters.year" range :min="yearRange.min" :max="yearRange.max" :step="yearRange.step"/>
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

  <div class="hidden lg:block col-12">
    <div class="surface-card border-round">
      <div class="grid gap-4">
        <SelectButton v-model="StatusValue" :options="StatusOptions" optionLabel="label"/>

        <Panel header="Основні параметри" toggleable>
          <div class="field mb-4">
            <label>Марка</label>
            <MultiSelect v-model="filters.brand" :options="brandOptions" optionLabel="name" placeholder="Оберіть марку"/>
          </div>

          <div class="field mb-4">
            <label>Модель</label>
            <MultiSelect v-model="filters.model" :options="modelOptions[filters.brand?.code] || []" optionLabel="name" placeholder="Оберіть модель" :disabled="!filters.brand"/>
          </div>

          <div class="field mb-4">
            <label>Ціна ($)</label>
            <div class="flex gap-2">
              <InputNumber v-model="filters.price_from" placeholder="Від" :min="priceRange.min" :max="priceRange.max"/>
              <InputNumber v-model="filters.price_to" placeholder="До" :min="filters.price_from || priceRange.min" :max="priceRange.max"/>
            </div>
            <Slider v-model="filters.price" range :min="priceRange.min" :max="priceRange.max" :step="priceRange.step"/>
          </div>

          <div class="field mb-4">
            <label>Рік випуску</label>
            <div class="flex gap-2">
              <InputNumber v-model="filters.year_from" placeholder="Від" :min="yearRange.min" :max="yearRange.max"/>
              <InputNumber v-model="filters.year_to" placeholder="До" :min="filters.year_from || yearRange.min" :max="yearRange.max"/>
            </div>
            <Slider v-model="filters.year" range :min="yearRange.min" :max="yearRange.max" :step="yearRange.step"/>
          </div>

          <div class="field mb-4">
            <label>Пробіг</label>
            <SelectButton v-model="filters.mileage" :options="mileageOptions" optionLabel="label"/>
          </div>
        </Panel>

        <Panel header="Технічні характеристики" toggleable>
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

        <Panel header="Додаткові параметри" toggleable>
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
          <Button label="Скинути" icon="pi pi-refresh" @click="resetFilters" outlined />
          <Button :label="'Показати ' + foundCarsCount + ' оголошень'" icon="pi pi-search" />
        </div>
      </div>
    </div>
  </div>
</template> 