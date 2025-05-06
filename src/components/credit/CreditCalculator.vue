<!--
/**
 * CreditCalculator.vue
 * 
 * Компонент калькулятора кредиту на автомобіль
 * Дозволяє розрахувати щомісячний платіж та отримати пропозиції від банків
 * 
 * Функціональність:
 * - Вибір суми кредиту
 * - Вибір терміну кредитування
 * - Розрахунок щомісячного платежу
 * - Перегляд пропозицій від банків
 * 
 * @component
 */
-->

<template>
  <div class="credit-calculator surface-card p-4 border-round ">
    <h2 class="mb-4">Кредит на автомобіль</h2>
    <div class="grid surface-ground border-round">
        <div class="col-8">
            <div class="flex flex-column col-8 w-full col gap-2">
            <div class="flex gap-2 mb-4">
            <Tag severity="contrast" value="Без першого внеску" />
            <Tag severity="success" value="Онлайн" />
            <Tag severity="info" value="Швидка відповідь" />
            </div>

            <div class="mb-4">
            <label class="block text-xl mb-2">Яка сума вам потрібна?</label>
            <div class="flex flex-column gap-2">
                <Slider
                size="large"
                handleColor="var(--p-primary-color)"
                v-model="amount"
                :min="300000"
                :max="900000"
                :step="10000"
                class="w-full"
                 />
                <div class="flex justify-content-between">
                <span class="text-600">300 000 ₴</span>
                <span class="font-medium">{{ formatCurrency(amount) }}</span>
                <span class="text-600">900 000 ₴</span>
                </div>
            </div>
            </div>

            <div class="">
            <label class="block mb-2">Термін кредиту</label>
            <div class="flex gap-2 flex-wrap mb-0">
                <Button 
                v-for="term in terms" 
                :key="term.years"
                :label="term.label"
                :class="{ 'p-button-outlined': selectedTerm !== term.years }"
                @click="selectedTerm = term.years"
                size="small"
                />
            </div>
            </div>
            </div>
        </div>
        <div class="col-4">
            <div class="flex flex-column col-4 w-full col gap-2">
                    <div class="payment-info surface-ground p-3 border-round mb-4 ">
                        <div class="text-xl mb-2">В місяць</div>
                    <div class="text-3xl font-bold mb-2">від {{ formatCurrency(calculateMonthlyPayment()) }}</div>
                
                </div>

                <Button 
                label="Перейти до анкети" 
                class="w-full p-button-primary"
                @click="showBankOffers"
                />
            </div>
        </div>
    </div>
    <Dialog 
      v-model:visible="isDialogVisible" 
      modal 
      header="Ось що пропонують банки"
      :style="{ width: '50vw' }"
      :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    >
      <p class="mb-4">Щоб отримати персональну пропозицію, заповніть анкету. Зазвичай відповідь приходить протягом декількох хвилин.</p>
      
      <div class="flex flex-column gap-3">
        <div 
          v-for="offer in bankOffers" 
          :key="offer.bank" 
          class="p-3 surface-ground border-round cursor-pointer hover:surface-hover transition-colors transition-duration-150"
        >
          <div class="flex justify-content-between align-items-center">
            <div>
              <div class="text-xl mb-2">Від {{ formatCurrency(offer.monthlyPayment) }} в місяць</div>
              <div class="text-600">До {{ offer.years }} років · до {{ formatCurrency(offer.maxAmount) }}</div>
              <div class="text-600">{{ offer.bank }}</div>
            </div>
            <i class="pi pi-arrow-right"></i>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Button from 'primevue/button';
import Slider from 'primevue/slider';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';

/**
 * Сума кредиту
 * @type {import('vue').Ref<number>}
 */
const amount = ref(750000);

/**
 * Вибраний термін кредиту в роках
 * @type {import('vue').Ref<number>}
 */
const selectedTerm = ref(8);

/**
 * Стан видимості діалогового вікна
 * @type {import('vue').Ref<boolean>}
 */
const isDialogVisible = ref(false);

/**
 * Доступні терміни кредитування
 * @type {Array<{years: number, label: string}>}
 */
const terms = [
  { years: 8, label: '8 років' },
  { years: 7, label: '7 років' },
  { years: 6, label: '6 років' },
  { years: 5, label: '5 років' },
  { years: 4, label: '4 роки' },
  { years: 3, label: '3 роки' },
  { years: 2, label: '2 роки' },
  { years: 1, label: '1 рік' },
];

/**
 * Пропозиції від банків
 * @type {Array<{bank: string, monthlyPayment: number, years: number, maxAmount: number}>}
 */
const bankOffers = [
  {
    bank: 'OTP',
    monthlyPayment: 18329,
    years: 8,
    maxAmount: 5000000
  },
  {
    bank: 'A-фінанс',
    monthlyPayment: 22857,
    years: 5,
    maxAmount: 10000000
  },
  {
    bank: 'ПриватБанк',
    monthlyPayment: 18080,
    years: 8,
    maxAmount: 8000000
  }
];

/**
 * Форматує число у грошовий формат
 * @param {number} value - Сума для форматування
 * @returns {string} Відформатована сума у форматі валюти
 */
const formatCurrency = (value) => {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Розраховує щомісячний платіж за кредитом
 * @returns {number} Сума щомісячного платежу
 */
const calculateMonthlyPayment = () => {
  const interestRate = 0.12; // 12% річних
  const monthlyRate = interestRate / 12;
  const numberOfPayments = selectedTerm.value * 12;
  
  const monthlyPayment = (amount.value * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return Math.round(monthlyPayment);
};

/**
 * Показує діалогове вікно з пропозиціями банків
 */
const showBankOffers = () => {
  isDialogVisible.value = true;
};
</script>

<style scoped>
.credit-calculator {
    margin: 0 auto;
}

:deep(.p-slider) {
  margin: 1rem 0;
}


:deep(.p-dialog-header) {
  padding: 1.5rem;
}

:deep(.p-dialog-content) {
  padding: 0 1.5rem 1.5rem 1.5rem;
}

.payment-info {
  background: var(--p-surface-ground);
}

:deep(.p-button) {
  min-width: 100px;
}
</style> 