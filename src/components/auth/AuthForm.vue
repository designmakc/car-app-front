<!--
/**
 * Компонент авторизации через номер телефона
 * 
 * Функционал:
 * - Ввод номера телефона
 * - Отправка СМС с кодом
 * - Ввод кода и авторизация
 * 
 * @component
 */
-->

<template>
  <div class="auth-form surface-card p-4 shadow-2 border-round">
    <h2 class="text-center mb-5">{{ title }}</h2>
    
    <!-- Шаг 1: Ввод номера телефона -->
    <div v-if="currentStep === 'phone'">
      <div class="field mb-4">
        <label for="phone" class="block mb-2">Номер телефону</label>
        <InputMask 
          id="phone" 
          v-model="phone" 
          mask="+38 (999) 999-99-99" 
          placeholder="+38 (0__) ___-__-__"
          class="w-full p-inputtext-lg" 
          :class="{'p-invalid': errors.phone}"
        />
        <small v-if="errors.phone" class="p-error block mt-2">{{ errors.phone }}</small>
        <small class="text-500 block mt-2">На цей номер прийде код підтвердження</small>
      </div>
      
      <Button 
        label="Отримати код" 
        class="w-full mt-3" 
        @click="sendCode"
        :loading="isLoading"
      />
    </div>
    
    <!-- Шаг 2: Ввод кода подтверждения -->
    <div v-else-if="currentStep === 'code'">
      <div class="mb-3">
        <span class="text-500">Код відправлено на номер</span>
        <div class="font-medium">{{ formatPhone(phone) }}</div>
        <a href="#" class="text-primary no-underline" @click.prevent="changePhone">Змінити номер</a>
      </div>
      
      <div class="field mb-4">
        <label for="code" class="block mb-2">Код підтвердження</label>
        <InputMask 
          id="code" 
          v-model="code" 
          mask="9999" 
          placeholder="____"
          class="w-full p-inputtext-lg" 
          :class="{'p-invalid': errors.code}"
        />
        <small v-if="errors.code" class="p-error block mt-2">{{ errors.code }}</small>
      </div>
      
      <Button 
        label="Підтвердити" 
        class="w-full mt-3" 
        @click="verifyCode"
        :loading="isLoading"
      />
      
      <div class="flex mt-4 justify-content-between">
        <div v-if="countdown > 0" class="text-500">
          Відправити код повторно через {{ countdown }} с
        </div>
        <Button 
          v-else 
          label="Відправити код повторно" 
          severity="secondary" 
          text 
          @click="resendCode"
        />
      </div>
    </div>
    
    <!-- Шаг 3: Успешная авторизация -->
    <div v-else-if="currentStep === 'success'">
      <div class="text-center">
        <i class="pi pi-check-circle text-6xl text-green-500 mb-4"></i>
        <h3>Авторизація успішна!</h3>
        <p class="text-500">Ви успішно авторизувалися в системі</p>
        <Button 
          label="Продовжити" 
          class="w-full mt-3" 
          @click="$emit('success')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue';
import InputMask from 'primevue/inputmask';
import Button from 'primevue/button';

// События компонента
const emit = defineEmits(['success']);

// Реактивное состояние
const currentStep = ref('phone');
const phone = ref('');
const code = ref('');
const isLoading = ref(false);
const errors = ref({});
const countdown = ref(0);
let countdownTimer = null;

// Вычисляемое свойство для заголовка в зависимости от шага
const title = computed(() => {
  switch (currentStep.value) {
    case 'phone': return 'Авторизація';
    case 'code': return 'Введіть код';
    case 'success': return 'Авторизація успішна';
    default: return 'Авторизація';
  }
});

// Переход к первому шагу и сброс формы
const changePhone = () => {
  phone.value = '';
  code.value = '';
  errors.value = {};
  currentStep.value = 'phone';
  stopCountdown();
};

// Форматирование номера телефона для отображения
const formatPhone = (phoneNumber) => {
  return phoneNumber || '+38 (0__) ___-__-__';
};

// Функция отправки кода
const sendCode = async () => {
  errors.value = {};
  
  // Валидация телефона
  if (!phone.value || phone.value.includes('_')) {
    errors.value.phone = 'Введіть коректний номер телефону';
    return;
  }
  
  // Имитация отправки запроса
  isLoading.value = true;
  
  try {
    // Эмуляция API запроса
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Переход ко второму шагу
    currentStep.value = 'code';
    startCountdown();
  } catch (error) {
    errors.value.phone = 'Помилка при відправці коду. Спробуйте пізніше.';
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

// Функция проверки кода
const verifyCode = async () => {
  errors.value = {};
  
  // Валидация кода
  if (!code.value || code.value.includes('_')) {
    errors.value.code = 'Введіть коректний код';
    return;
  }
  
  // Имитация отправки запроса
  isLoading.value = true;
  
  try {
    // Эмуляция API запроса
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Переход к шагу успешной авторизации
    currentStep.value = 'success';
  } catch (error) {
    errors.value.code = 'Невірний код. Спробуйте ще раз.';
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

// Повторная отправка кода
const resendCode = async () => {
  try {
    isLoading.value = true;
    
    // Эмуляция API запроса
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Перезапуск таймера обратного отсчета
    startCountdown();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

// Запуск таймера обратного отсчета
const startCountdown = () => {
  stopCountdown();
  countdown.value = 60;
  
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      stopCountdown();
    }
  }, 1000);
};

// Остановка таймера
const stopCountdown = () => {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
};

// Очистка при уничтожении компонента
onUnmounted(() => {
  stopCountdown();
});
</script>

<style scoped>
.auth-form {
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
}
</style> 