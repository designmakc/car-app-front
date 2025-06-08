<template>
  <div class="fixed top-0 left-0 w-full h-full surface-100 flex align-items-center justify-content-center p-4" @click="closeOnBackdrop">
    <Card class="w-full max-w-30rem relative" @click.stop>
      <!-- Кнопка закриття -->
      <Button 
        icon="pi pi-times" 
        text 
        rounded 
        class="absolute top-0 right-0 m-3"
        size="small"
        @click="goBack" 
        aria-label="Закрити"
      />
      
      <!-- Крок 1: Введення номера телефону -->
      <template v-if="currentStep === 1" #content>
        <div class="text-center mb-6">
          <div class="flex justify-content-center mb-4">
            <img src="@/assets/logo-orang.svg" alt="CarMarket" class="h-3rem" />
          </div>
          
          <h1 class="text-2xl font-semibold text-900 mb-2 line-height-3">Увійдіть в свій профіль</h1>
          <p class="text-600 text-lg line-height-3">Введіть свій номер телефону</p>
        </div>
        
        <div class="mb-4">
          <InputMask
            v-model="phoneNumber"
            mask="+38 999 999-99-99"
            placeholder="+38 XXX XXX-XX-XX"
            class="w-full"
            size="large"
            :class="{ 'p-invalid': phoneError }"
          />
          <InlineMessage v-if="phoneError" severity="error" class="mt-2 w-full">{{ phoneError }}</InlineMessage>
        </div>
        
        <Button
          label="Відправити код"
          class="w-full"
          size="large"
          :loading="isLoading"
          @click="sendCode"
          :disabled="!isPhoneValid"
        />
      </template>
      
      <!-- Крок 2: Введення SMS коду -->
      <template v-if="currentStep === 2" #content>
        <div class="text-center mb-6">
          <div class="flex justify-content-center mb-4">
            <img src="@/assets/logo-orang.svg" alt="CarMarket" class="h-3rem" />
          </div>
          
          <h1 class="text-2xl font-semibold text-900 mb-2 line-height-3">Введіть код з SMS</h1>
          <p class="text-600 text-lg line-height-3">
            Код відправлено на номер<br>
            <strong class="text-900">{{ maskedPhone }}</strong>
          </p>
        </div>
        
        <div class="mb-4">
          <InputOtp
            v-model="smsCode"
            :length="4"
            integerOnly
            class="flex justify-content-center gap-2"
            :pt="{
              input: { 
                class: 'w-3rem h-3rem text-center text-lg border-round' 
              }
            }"
            @complete="onCodeComplete"
          />
          <InlineMessage v-if="codeError" severity="error" class="mt-2 w-full text-center">{{ codeError }}</InlineMessage>
        </div>
        
        <div class="text-center mb-4">
          <span v-if="resendTimer > 0" class="text-600 text-sm">
            Повторити через {{ resendTimer }}с
          </span>
          <Button
            v-else
            label="Відправити код повторно"
            link
            class="text-sm p-0"
            @click="resendCode"
          />
        </div>
        
        <div class="flex gap-3">
          <Button
            label="Назад"
            outlined
            class="flex-1"
            size="large"
            @click="goBack"
          />
          <Button
            label="Підтвердити"
            class="flex-1"
            size="large"
            :loading="isLoading"
            @click="verifyCode"
            :disabled="!smsCode || smsCode.length !== 4"
          />
        </div>
      </template>
      
      <!-- Крок 3: Успішна авторизація -->
      <template v-if="currentStep === 3" #content>
        <div class="text-center">
          <div class="flex justify-content-center mb-4">
            <img src="@/assets/logo-orang.svg" alt="CarMarket" class="h-3rem" />
          </div>
          
          <div class="mb-6">
            <i class="pi pi-check-circle text-6xl text-green-500 mb-4 block"></i>
            <h1 class="text-2xl font-semibold text-green-600 mb-2 line-height-3">Успішно!</h1>
            <p class="text-600 text-lg line-height-3">Ви успішно авторизовані</p>
          </div>
          
          <Button
            label="Перейти в особистий кабінет"
            class="w-full"
            size="large"
            @click="goToProfile"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputMask from 'primevue/inputmask'
import InputOtp from 'primevue/inputotp'
import InlineMessage from 'primevue/inlinemessage'

const router = useRouter()
const toast = useToast()

// Реактивні дані
const currentStep = ref(1)
const phoneNumber = ref('')
const smsCode = ref('')
const isLoading = ref(false)
const phoneError = ref('')
const codeError = ref('')
const resendTimer = ref(0)
let timerInterval = null

// Обчислювані властивості
const isPhoneValid = computed(() => {
  const cleanPhone = phoneNumber.value.replace(/\D/g, '')
  return cleanPhone.length === 12 && cleanPhone.startsWith('38')
})

const maskedPhone = computed(() => {
  return phoneNumber.value || ''
})

// Методи
const sendCode = async () => {
  phoneError.value = ''
  
  if (!isPhoneValid.value) {
    phoneError.value = 'Введіть коректний номер телефону'
    return
  }
  
  isLoading.value = true
  
  try {
    // Імітація відправки SMS
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    currentStep.value = 2
    startResendTimer()
    
    toast.add({
      severity: 'success',
      summary: 'Код відправлено',
      detail: 'SMS з кодом підтвердження відправлено на ваш номер',
      life: 3000
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Не вдалося відправити код. Спробуйте ще раз',
      life: 3000
    })
  } finally {
    isLoading.value = false
  }
}

const verifyCode = async () => {
  codeError.value = ''
  
  if (smsCode.value.length !== 4) {
    codeError.value = 'Введіть 4-значний код'
    return
  }
  
  isLoading.value = true
  
  try {
    // Імітація перевірки коду
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Для демонстрації: код 1234 вважається правильним
    if (smsCode.value === '1234') {
      currentStep.value = 3
      
      // Зберігаємо інформацію про авторизацію
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userPhone', phoneNumber.value)
      
      toast.add({
        severity: 'success',
        summary: 'Успішно',
        detail: 'Ви успішно авторизовані',
        life: 3000
      })
    } else {
      codeError.value = 'Невірний код. Спробуйте ще раз'
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Не вдалося перевірити код. Спробуйте ще раз',
      life: 3000
    })
  } finally {
    isLoading.value = false
  }
}

const resendCode = async () => {
  isLoading.value = true
  
  try {
    // Імітація повторної відправки SMS
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    startResendTimer()
    smsCode.value = ''
    codeError.value = ''
    
    toast.add({
      severity: 'info',
      summary: 'Код відправлено повторно',
      detail: 'Новий код відправлено на ваш номер',
      life: 3000
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Не вдалося відправити код повторно',
      life: 3000
    })
  } finally {
    isLoading.value = false
  }
}

const startResendTimer = () => {
  resendTimer.value = 60
  timerInterval = setInterval(() => {
    resendTimer.value--
    if (resendTimer.value <= 0) {
      clearInterval(timerInterval)
    }
  }, 1000)
}

const goBack = () => {
  if (currentStep.value === 1) {
    // Якщо на першому кроці, повертаємося на головну сторінку
    router.push('/')
  } else {
    // Якщо на інших кроках, повертаємося до попереднього кроку
    currentStep.value = 1
    smsCode.value = ''
    codeError.value = ''
    if (timerInterval) {
      clearInterval(timerInterval)
      resendTimer.value = 0
    }
  }
}

const goToProfile = () => {
  router.push('/profile')
}

const closeOnBackdrop = () => {
  // Закриваємо тільки якщо знаходимося на першому кроці
  if (currentStep.value === 1) {
    router.push('/')
  }
}

const onCodeComplete = (value) => {
  // Автоматично перевіряємо код при введенні 4 цифр
  if (value && value.length === 4) {
    setTimeout(() => {
      verifyCode()
    }, 500)
  }
}

// Очищення таймера при розмонтуванні компонента
onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
</script>

<style scoped>
/* Мінімальні стилі тільки для логотипу */
.h-3rem {
  height: 3rem;
}
</style> 