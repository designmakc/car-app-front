<template>
  <MainLayout>
    <div class="top-up-page pt-4">
      <!-- Мобильный хедер -->
      <div class="mobile-header md:hidden">
        <Button 
          icon="pi pi-arrow-left" 
          text 
          class="text-white"
          @click="goBack"
        />
        <h1 class="text-xl font-semibold text-white m-0">Поповнення балансу</h1>
        <div class="w-2rem"></div>
      </div>

      <!-- Десктопный заголовок -->
      <div class="hidden md:flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="text-3xl font-bold text-900 m-0">Поповнення балансу</h1>
          <p class="text-600 mt-2 mb-0">Поповніть баланс для використання платних послуг</p>
        </div>
      </div>

      <div class="grid">
        <!-- Левая колонка - форма пополнения -->
        <div class="col-12 lg:col-8">
          <!-- Текущий баланс -->
          <Card class="mb-4">
            <template #content>
              <div class="text-center p-4">
                <i class="pi pi-wallet text-4xl text-primary mb-3"></i>
                <h3 class="text-2xl font-bold text-900 mb-2">Поточний баланс</h3>
                <div class="text-3xl font-bold text-primary">{{ currentBalance }} грн</div>
              </div>
            </template>
          </Card>

          <!-- Форма пополнения -->
          <Card>
            <template #header>
              <div class="p-4 border-bottom-1 surface-border">
                <h3 class="text-xl font-semibold text-900 m-0">Виберіть суму поповнення</h3>
              </div>
            </template>
            
            <template #content>
              <div class="flex flex-column gap-4">
                <!-- Быстрые суммы -->
                <div>
                  <label class="block text-sm font-medium text-900 mb-3">Швидкий вибір</label>
                  <div class="grid">
                    <div 
                      v-for="amount in quickAmounts" 
                      :key="amount"
                      class="col-6 md:col-4 lg:col-3"
                    >
                      <Button
                        :label="`${amount} грн`"
                        :outlined="selectedAmount !== amount"
                        :severity="selectedAmount === amount ? 'primary' : 'secondary'"
                        class="w-full"
                        @click="selectAmount(amount)"
                      />
                    </div>
                  </div>
                </div>

                <!-- Произвольная сумма -->
                <div>
                  <label class="block text-sm font-medium text-900 mb-2">Або введіть свою суму</label>
                  <div class="flex gap-2">
                    <InputNumber
                      v-model="customAmount"
                      :min="50"
                      :max="50000"
                      placeholder="Мінімум 50 грн"
                      class="flex-1"
                      @input="selectCustomAmount"
                    />
                    <span class="flex align-items-center text-600 font-medium">грн</span>
                  </div>
                  <small class="text-600">Мінімальна сума: 50 грн, максимальна: 50 000 грн</small>
                </div>

                <!-- Способ оплаты -->
                <div>
                  <label class="block text-sm font-medium text-900 mb-3">Спосіб оплати</label>
                  <div class="flex flex-column gap-3">
                    <div 
                      v-for="method in paymentMethods" 
                      :key="method.id"
                      class="payment-method-card cursor-pointer"
                      :class="{ 'selected': selectedPaymentMethod === method.id }"
                      @click="selectPaymentMethod(method.id)"
                    >
                      <Card>
                        <template #content>
                          <div class="flex align-items-center gap-3 p-2">
                            <RadioButton 
                              v-model="selectedPaymentMethod" 
                              :inputId="method.id" 
                              :value="method.id" 
                            />
                            <i :class="method.icon + ' text-2xl'"></i>
                            <div class="flex-1">
                              <h4 class="text-lg font-semibold text-900 m-0">{{ method.name }}</h4>
                              <p class="text-600 m-0">{{ method.description }}</p>
                            </div>
                            <div v-if="method.commission" class="text-right">
                              <small class="text-600">Комісія: {{ method.commission }}</small>
                            </div>
                          </div>
                        </template>
                      </Card>
                    </div>
                  </div>
                </div>

                <!-- Итоговая сумма -->
                <div v-if="selectedAmount > 0" class="mt-4">
                  <Card class="bg-primary-50">
                    <template #content>
                      <div class="flex justify-content-between align-items-center p-2">
                        <span class="text-lg font-medium text-900">До сплати:</span>
                        <span class="text-2xl font-bold text-primary">{{ totalAmount }} грн</span>
                      </div>
                      <div v-if="commission > 0" class="flex justify-content-between align-items-center mt-2">
                        <small class="text-600">Комісія:</small>
                        <small class="text-600">{{ commission }} грн</small>
                      </div>
                    </template>
                  </Card>
                </div>

                <!-- Кнопка оплаты -->
                <Button
                  :label="`Поповнити на ${selectedAmount} грн`"
                  :disabled="!canProceed"
                  :loading="isProcessing"
                  size="large"
                  class="w-full mt-4"
                  @click="processPayment"
                />
              </div>
            </template>
          </Card>
        </div>

        <!-- Правая колонка - информация -->
        <div class="col-12 lg:col-4">
          <!-- Преимущества -->
          <Card class="mb-4">
            <template #header>
              <div class="p-4 border-bottom-1 surface-border">
                <h3 class="text-lg font-semibold text-900 m-0">Переваги поповнення</h3>
              </div>
            </template>
            
            <template #content>
              <div class="flex flex-column gap-3">
                <div class="flex align-items-start gap-3">
                  <i class="pi pi-check-circle text-green-500 text-xl mt-1"></i>
                  <div>
                    <h4 class="text-base font-semibold text-900 mb-1">Підняття в топ</h4>
                    <p class="text-600 text-sm m-0">Ваші оголошення будуть показані першими</p>
                  </div>
                </div>
                
                <div class="flex align-items-start gap-3">
                  <i class="pi pi-check-circle text-green-500 text-xl mt-1"></i>
                  <div>
                    <h4 class="text-base font-semibold text-900 mb-1">Додаткові послуги</h4>
                    <p class="text-600 text-sm m-0">Перевірка VIN, турбо продаж та інше</p>
                  </div>
                </div>
                
                <div class="flex align-items-start gap-3">
                  <i class="pi pi-check-circle text-green-500 text-xl mt-1"></i>
                  <div>
                    <h4 class="text-base font-semibold text-900 mb-1">Швидкий продаж</h4>
                    <p class="text-600 text-sm m-0">Більше переглядів = швидший продаж</p>
                  </div>
                </div>
              </div>
            </template>
          </Card>

          <!-- Тарифы -->
          <Card>
            <template #header>
              <div class="p-4 border-bottom-1 surface-border">
                <h3 class="text-lg font-semibold text-900 m-0">Тарифи послуг</h3>
              </div>
            </template>
            
            <template #content>
              <div class="flex flex-column gap-3">
                <div class="flex justify-content-between align-items-center">
                  <span class="text-600">Підняття в топ (1 день)</span>
                  <span class="font-semibold text-900">50 грн</span>
                </div>
                
                <div class="flex justify-content-between align-items-center">
                  <span class="text-600">Перевірка VIN</span>
                  <span class="font-semibold text-900">25 грн</span>
                </div>
                
                <div class="flex justify-content-between align-items-center">
                  <span class="text-600">Турбо продаж (7 днів)</span>
                  <span class="font-semibold text-900">150 грн</span>
                </div>
                
                <div class="flex justify-content-between align-items-center">
                  <span class="text-600">Виділення кольором</span>
                  <span class="font-semibold text-900">30 грн</span>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import MainLayout from '@/layouts/Mainlayout.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import RadioButton from 'primevue/radiobutton'

const router = useRouter()
const toast = useToast()

// Реактивные данные
const currentBalance = ref(1200)
const selectedAmount = ref(0)
const customAmount = ref(null)
const selectedPaymentMethod = ref('card')
const isProcessing = ref(false)

// Быстрые суммы
const quickAmounts = ref([100, 200, 500, 1000, 2000, 5000])

// Способы оплаты
const paymentMethods = ref([
  {
    id: 'card',
    name: 'Банківська картка',
    description: 'Visa, MasterCard, Приват24',
    icon: 'pi pi-credit-card',
    commission: null
  },
  {
    id: 'privat24',
    name: 'Приват24',
    description: 'Онлайн банкінг ПриватБанку',
    icon: 'pi pi-mobile',
    commission: null
  },
  {
    id: 'monobank',
    name: 'Monobank',
    description: 'Оплата через Monobank',
    icon: 'pi pi-mobile',
    commission: null
  },
  {
    id: 'liqpay',
    name: 'LiqPay',
    description: 'Картки, Apple Pay, Google Pay',
    icon: 'pi pi-wallet',
    commission: '2%'
  }
])

// Вычисляемые свойства
const commission = computed(() => {
  const method = paymentMethods.value.find(m => m.id === selectedPaymentMethod.value)
  if (method && method.commission) {
    const rate = parseFloat(method.commission.replace('%', '')) / 100
    return Math.round(selectedAmount.value * rate)
  }
  return 0
})

const totalAmount = computed(() => {
  return selectedAmount.value + commission.value
})

const canProceed = computed(() => {
  return selectedAmount.value >= 50 && selectedPaymentMethod.value
})

// Методы
const goBack = () => {
  router.push('/profile')
}

const selectAmount = (amount) => {
  selectedAmount.value = amount
  customAmount.value = null
}

const selectCustomAmount = () => {
  if (customAmount.value && customAmount.value >= 50) {
    selectedAmount.value = customAmount.value
  }
}

const selectPaymentMethod = (methodId) => {
  selectedPaymentMethod.value = methodId
}

const processPayment = async () => {
  if (!canProceed.value) return
  
  isProcessing.value = true
  
  try {
    // Имитация обработки платежа
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Обновляем баланс
    currentBalance.value += selectedAmount.value
    
    toast.add({
      severity: 'success',
      summary: 'Платіж успішний',
      detail: `Баланс поповнено на ${selectedAmount.value} грн`,
      life: 5000
    })
    
    // Сбрасываем форму
    selectedAmount.value = 0
    customAmount.value = null
    
    // Возвращаемся в профиль через 2 секунды
    setTimeout(() => {
      router.push('/profile')
    }, 2000)
    
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Помилка платежу',
      detail: 'Спробуйте ще раз або оберіть інший спосіб оплати',
      life: 5000
    })
  } finally {
    isProcessing.value = false
  }
}
</script>

<style scoped>
.top-up-page {
  min-height: 100vh;
}

.mobile-header {
  background: linear-gradient(135deg, var(--primary-color) 0%, #f7931e 100%);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0 0 1.5rem 1.5rem;
  margin: -1rem -1rem 1.5rem -1rem;
}

.payment-method-card {
  transition: all 0.2s ease;
}

.payment-method-card:hover {
  transform: translateY(-2px);
}

.payment-method-card.selected {
  border: 2px solid var(--primary-color);
  border-radius: var(--border-radius);
}

/* Адаптивность */
@media (max-width: 768px) {
  .top-up-page {
    padding: 0;
  }
}
</style> 