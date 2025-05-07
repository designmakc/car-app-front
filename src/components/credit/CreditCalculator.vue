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
 <Card class="credit-calculator-card "
      :pt="{
        body: { class: 'surface-100 border-round' }
      }">
    <template #content>
      <div class="credit-calculator">
        <div class="grid ">
          <div class="col-12 ">
            <h2 class="mt-0 mb-0">Кредит на автомобіль</h2>
          </div>
          
          <div class="col-12 md:col-8">
            <div class="flex flex-column gap-4">
              <!-- Теги -->
              <div class="flex flex-wrap gap-2 mb-2">
                <Tag severity="contrast" value="Вигідно" class="font-normal"/>
                <Tag severity="info" value="Швидко" class="font-normal"/>
                <Tag severity="success" value="Онлайн" class="font-normal"/>
              </div>

              <!-- Слайдер суми -->
              <div>
                <label class="block font-bold mb-1">Яка сума вам потрібна?</label>
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
                    <span class="text-600 text-color-secondary">300 000 ₴</span>
                    <span class="font-bold unbounded-font">{{ formatCurrency(amount) }}</span>
                    <span class="text-600 text-color-secondary">900 000 ₴</span>
                  </div>
                </div>
              </div>

              <!-- Термін кредиту -->
              <div>
                <label class="block font-bold mb-2">Термін кредиту</label>
                <div class="flex gap-2 flex-wrap">
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
          
          <div class="col-12 md:col-4 pl-0 md:pl-4 mt-4 md:mt-0">
            <div class="flex flex-column gap-4 align-content-between m-width-full">
              <!-- Інформація про платіж -->
              <div class="payment-info bg-white p-3 border-round">
                
                <div class="text-xl mb-2">В місяць</div>
                <div class="text-3xl font-bold mb-0">від {{ formatCurrency(calculateMonthlyPayment()) }}</div>
              </div>

              <!-- Кнопка -->
              <Button 
                label="Перейти до анкети" 
                class="w-full p-button-primary"
                @click="showBankOffers"
                severity="contrast"
                size="large"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
  
  <!-- Діалог з пропозиціями банків -->
  <Dialog 
    v-model:visible="isDialogVisible" 
    :modal="true"
    :closable="true"
    :header="dialogHeader"
    :style="{ width: '90%', maxWidth: '800px' }"
    :breakpoints="{ '960px': '90vw', '640px': '95vw' }"
    class="credit-dialog"
  >
    <!-- Додаємо кнопку закриття, яка буде добре видима на всіх розмірах екрану -->
    <template #header>
      <div class="flex justify-content-between align-items-center w-full">
        <span>{{ dialogHeader }}</span>
        
      </div>
    </template>
    
    <!-- Вступний текст, якщо не вибрано банк -->
    <p v-if="!selectedOffer" class="mb-4">
      Щоб отримати персональну пропозицію, виберіть банк та заповніть анкету. 
      Зазвичай відповідь приходить протягом декількох хвилин.
    </p>
    
    <!-- Список пропозицій банків - показується, тільки якщо не вибрано жодного банку -->
    <div v-if="!selectedOffer" class="flex flex-column gap-3">
      <div 
        v-for="offer in bankOffers" 
        :key="offer.bank" 
        class="p-3 surface-ground border-round cursor-pointer hover:surface-200 transition-colors transition-duration-150"
        @click="selectOffer(offer)"
      >
        <div class="flex flex-column sm:flex-row justify-content-between align-items-start sm:align-items-center gap-3">
          <div class="flex align-items-center gap-3 w-full sm:w-auto">
            <img 
              v-if="offer.bank === 'OTP'"
              src="@/assets/banks/otp.png"
              :alt="offer.bank"
              height="30"
              class="bank-logo"
            />
            <div 
              v-else
              class="bank-logo-placeholder"
              :class="getBankColorClass(offer.bank)"
            >
              {{ offer.bank.slice(0, 3) }}
            </div>
            <div>
              <div class="text-xl mb-2">Від {{ formatCurrency(offer.monthlyPayment) }} в місяць</div>
              <div class="text-600">До {{ offer.years }} років · до {{ formatCurrency(offer.maxAmount) }}</div>
              <div class="text-600">{{ offer.bank }}</div>
            </div>
          </div>
          <i class="pi pi-arrow-right hidden sm:block"></i>
          
        </div>
      </div>
    </div>

    <!-- Відображення вибраного банку (якщо вибрано) -->
    <div v-if="selectedOffer" class="selected-bank-info p-3 surface-ground border-round mb-4">
      <div class="flex flex-column sm:flex-row justify-content-between align-items-start sm:align-items-center gap-3">
        <div class="flex align-items-center gap-3 w-full">
          <img 
            v-if="selectedOffer.bank === 'OTP'"
            src="@/assets/banks/otp.png"
            :alt="selectedOffer.bank"
            height="40"
            class="bank-logo hidden md:block"
          />
          <div 
            v-else
            class="bank-logo-placeholder"
            :class="getBankColorClass(selectedOffer.bank)"
            style="min-width: 60px; height: 40px; font-size: 16px;"
          >
            {{ selectedOffer.bank.slice(0, 3) }}
          </div>
          <div class="flex flex-column flex-grow-1 gap-2">
            <div class="text-2xl font-bold mb-2">{{ selectedOffer.bank }}</div>
            <div class="text-xl">Від {{ formatCurrency(selectedOffer.monthlyPayment) }} в місяць</div>
            <div class="text-lg text-600">До {{ selectedOffer.years }} років · до {{ formatCurrency(selectedOffer.maxAmount) }}</div>
          </div>
        </div>
        
        <!-- Кнопка повернення стає повною шириною на маленьких екранах -->
        <Button 
          icon="pi pi-arrow-left" 
          label="Назад до пропозицій" 
          @click="selectedOffer = null"
          class="p-button-text"
        />
      </div>
    </div>

    <!-- Форма для отримання кредиту - показується тільки якщо вибрано банк -->
    <div v-if="selectedOffer" class="credit-form p-3 p-sm-4 border-1 border-round-lg">
      <h3 class="mt-0 mb-3">Заповніть форму для отримання кредиту</h3>
      
      <div class="formgrid grid">
        <div class="field col-12 sm:col-6">
          <label for="firstName" class="block mb-2">Ім'я</label>
          <InputText id="firstName" v-model="creditFormData.firstName" class="w-full" placeholder="Введіть ваше ім'я" />
        </div>
        
        <div class="field col-12 sm:col-6">
          <label for="lastName" class="block mb-2">Прізвище</label>
          <InputText id="lastName" v-model="creditFormData.lastName" class="w-full" placeholder="Введіть ваше прізвище" />
        </div>
        
        <div class="field col-12">
          <label for="phone" class="block mb-2">Телефон</label>
          <InputMask id="phone" v-model="creditFormData.phone" mask="+38 (099) 999-99-99" class="w-full" placeholder="+38 (0__) ___-__-__" />
        </div>
        
        <div class="field col-12">
          <label for="email" class="block mb-2">Email</label>
          <InputText id="email" v-model="creditFormData.email" type="email" class="w-full" placeholder="example@email.com" />
        </div>
        
        <div class="flex align-items-center field col-12">
          <Checkbox v-model="creditFormData.agreement" :binary="true" id="agreement" />
          <label for="agreement" class="ml-2 mb-0">Я погоджуюсь з умовами обробки персональних даних</label>
        </div>
        
        <div class="col-12">
          <Button 
            label="Відправити заявку" 
            class="w-full" 
            @click="submitCreditApplication"
            :disabled="!canSubmitForm"
            severity="success"
            size="large"
          />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import Button from 'primevue/button';
import Slider from 'primevue/slider';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Checkbox from 'primevue/checkbox';

/**
 * Сума кредиту
 * @type {import('vue').Ref<number>}
 */
const amount = ref(500000);

/**
 * Вибраний термін кредиту в роках
 * @type {import('vue').Ref<number>}
 */
const selectedTerm = ref(6);

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
  { years: 6, label: '6 років' },
  { years: 5, label: '5 років' },
  { years: 4, label: '4 роки' },
  { years: 3, label: '3 роки' },
  { years: 2, label: '2 роки' },
  { years: 1, label: '1 рік' },
];

/**
 * Пропозиції від банків
 * @type {Array<{bank: string, monthlyPayment: number, years: number, maxAmount: number, logoBase64?: string}>}
 */
const bankOffers = [
  {
    bank: 'OTP',
    monthlyPayment: 18329,
    years: 8,
    maxAmount: 5000000,
    logo: '/banks/otp.png'
  },
  {
    bank: 'A-фінанс',
    monthlyPayment: 22857,
    years: 5,
    maxAmount: 10000000,
    logo: '/banks/a-finance.png'
  },
  {
    bank: 'ПриватБанк',
    monthlyPayment: 18080,
    years: 8,
    maxAmount: 8000000,
    logo: '/banks/privatbank.png'
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
 * Вибрана пропозиція від банку
 */
const selectedOffer = ref(null);

/**
 * Заголовок діалогового вікна
 */
const dialogHeader = computed(() => {
  return selectedOffer.value 
    ? `Оформлення кредиту в ${selectedOffer.value.bank}` 
    : 'Ось що пропонують банки';
});

/**
 * Дані форми для заявки на кредит
 */
const creditFormData = ref({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  agreement: false
});

/**
 * Перевірка можливості відправки форми
 */
const canSubmitForm = computed(() => {
  return creditFormData.value.firstName && 
         creditFormData.value.lastName && 
         creditFormData.value.phone && 
         creditFormData.value.email && 
         creditFormData.value.agreement;
});

/**
 * Вибір пропозиції банку
 */
const selectOffer = (offer) => {
  selectedOffer.value = offer;
  
  // Встановлюємо суму кредиту з калькулятора
  creditFormData.value.creditAmount = formatCurrency(amount.value);
  creditFormData.value.term = selectedTerm.value;
  creditFormData.value.bank = offer.bank;
};

/**
 * Відправка заявки на кредит
 */
const submitCreditApplication = () => {
  if (!canSubmitForm.value || !selectedOffer.value) return;
  
  // Формуємо дані для відправки
  const applicationData = {
    bank: selectedOffer.value.bank,
    creditAmount: amount.value,
    term: selectedTerm.value,
    monthlyPayment: selectedOffer.value.monthlyPayment,
    applicant: {
      firstName: creditFormData.value.firstName,
      lastName: creditFormData.value.lastName,
      phone: creditFormData.value.phone,
      email: creditFormData.value.email
    }
  };
  
  console.log('Відправка заявки на кредит:', applicationData);
  
  // Показати повідомлення про успішну відправку
  alert(`Ваша заявка успішно відправлена до банку ${selectedOffer.value.bank}!\nМи зв'яжемося з вами найближчим часом.`);
  
  // Очистити форму
  creditFormData.value = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    agreement: false
  };
  
  // Закрити модальне вікно
  isDialogVisible.value = false;
  selectedOffer.value = null;
};

/**
 * Показує діалогове вікно з пропозиціями банків
 */
const showBankOffers = () => {
  // Очищення попереднього вибору при відкритті діалогу
  selectedOffer.value = null;
  isDialogVisible.value = true;
};

// Додайте цю функцію для отримання класу кольору банку
const getBankColorClass = (bankName) => {
  const bank = bankName.toLowerCase();
  if (bank.includes('привat')) return 'bg-blue-600';
  if (bank.includes('a-фінанс')) return 'bg-orange-500';
  return 'bg-gray-600';  // стандартний колір для інших банків
};

/**
 * Закриває діалогове вікно
 */
const closeDialog = () => {
  isDialogVisible.value = false;
  selectedOffer.value = null;
};
</script>

<style scoped>
.credit-calculator-card {
  width: 100%;
  box-sizing: border-box;
}

:deep(.p-card) {
  box-shadow: none;
}

:deep(.p-card-content) {
  padding: 0;
}

:deep(.p-slider) {
  margin: 1rem 0;
}



:deep(.p-button) {
  min-width: 100px;
}

/* Адаптивні зміни для логотипів банків */
.bank-logo {
  width: 60px;
  height: 40px;
  object-fit: contain;
}

@media screen and (min-width: 768px) {
  .bank-logo {
    width: 80px;
    height: 80px;
  }
}

.bank-logo-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 40px;
  border-radius: 4px;
  font-weight: bold;
  color: white;
}

@media screen and (min-width: 768px) {
  .bank-logo-placeholder {
    width: 80px;
    height: 80px;
  }
}

.credit-form {
  background-color: var(--p-surface-card);
  border-color: var(--p-surface-border);
}

.selected-bank-info {
  background-color: var(--p-surface-hover);
}

/* Адаптивні стилі для модального вікна */
:deep(.credit-dialog .p-dialog-content) {
  padding: 1rem;
}

@media screen and (min-width: 768px) {
  :deep(.credit-dialog .p-dialog-content) {
    padding: 1.5rem;
  }
}

/* Виправлення для форми на малих екранах */
@media screen and (max-width: 640px) {
  
  
  .formgrid.grid {
    row-gap: 0;
  }
}
</style>