<template>
  <MainLayout>
    <div class="settings-page pt-4">
      <!-- Мобильный хедер -->
      <div class="mobile-header md:hidden">
        <Button 
          icon="pi pi-arrow-left" 
          text 
          class="text-white"
          @click="goBack"
        />
        <h1 class="text-xl font-semibold text-white m-0">Налаштування</h1>
        <div class="w-2rem"></div>
      </div>

      <!-- Десктопный заголовок -->
      <div class="hidden md:flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="text-3xl font-bold text-900 m-0">Налаштування профілю</h1>
          <p class="text-600 mt-2 mb-0">Керуйте налаштуваннями та особистою інформацією</p>
        </div>
      </div>

      <div class="grid">
        <!-- Основные настройки -->
        <div class="col-12">
          <!-- Личная информация -->
          <Card class="mb-4">
            <template #header>
              <div class="p-4 border-bottom-1 surface-border">
                <h3 class="text-xl font-semibold text-900 m-0">Особиста інформація</h3>
              </div>
            </template>
            
            <template #content>
              <!-- Уведомление о редактировании имени, фамилии и телефона -->
              <InlineMessage 
                severity="info" 
                class="mb-4"
              >
                Для редагування імені, прізвища та номера телефону зверніться до служби підтримки або до менеджера на авторинку CAR MARKET
              </InlineMessage>

              <form @submit.prevent="saveProfile" class="flex flex-column gap-4">
                <!-- Основная информация -->
                <div class="grid">
                  <div class="col-12 md:col-6">
                    <label class="block text-sm font-medium text-900 mb-2">Ім'я</label>
                    <InputText
                      v-model="profileForm.firstName"
                      class="w-full"
                      readonly
                      :pt="{ root: { class: 'surface-100' } }"
                    />
                  </div>
                  
                  <div class="col-12 md:col-6">
                    <label class="block text-sm font-medium text-900 mb-2">Прізвище</label>
                    <InputText
                      v-model="profileForm.lastName"
                      class="w-full"
                      readonly
                      :pt="{ root: { class: 'surface-100' } }"
                    />
                  </div>
                </div>

                <div class="grid">
                  <div class="col-12 md:col-6">
                    <label class="block text-sm font-medium text-900 mb-2">Email *</label>
                    <InputText
                      v-model="profileForm.email"
                      type="email"
                      placeholder="your@email.com"
                      class="w-full"
                      :class="{ 'p-invalid': submitted && (!profileForm.email || !isValidEmail) }"
                    />
                    <small v-if="submitted && !profileForm.email" class="p-error">Введіть email</small>
                    <small v-else-if="submitted && !isValidEmail" class="p-error">Введіть коректний email</small>
                  </div>
                  
                  <div class="col-12 md:col-6">
                    <label class="block text-sm font-medium text-900 mb-2">Телефон</label>
                    <InputText
                      v-model="profileForm.phone"
                      class="w-full"
                      readonly
                      :pt="{ root: { class: 'surface-100' } }"
                    />
                  </div>
                </div>

                <div class="grid">
                  <div class="col-12 md:col-6">
                    <label class="block text-sm font-medium text-900 mb-2">Дата народження</label>
                    <Calendar
                      v-model="profileForm.birthDate"
                      dateFormat="dd.mm.yy"
                      placeholder="Оберіть дату"
                      class="w-full"
                      :maxDate="maxBirthDate"
                    />
                  </div>
                  
                  <div class="col-12 md:col-6">
                    <label class="block text-sm font-medium text-900 mb-2">Місто</label>
                    <Dropdown
                      v-model="profileForm.city"
                      :options="cityOptions"
                      optionLabel="label"
                      optionValue="value"
                      placeholder="Оберіть місто"
                      class="w-full"
                      filter
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-900 mb-2">Про себе</label>
                  <Textarea
                    v-model="profileForm.about"
                    rows="3"
                    placeholder="Розкажіть про себе..."
                    class="w-full"
                    :maxlength="500"
                  />
                  <small class="text-600">{{ profileForm.about?.length || 0 }}/500 символів</small>
                </div>

                <div class="flex gap-2 justify-content-end">
                  <Button
                    label="Скасувати"
                    severity="secondary"
                    outlined
                    @click="cancelProfileChanges"
                  />
                  <Button
                    label="Зберегти профіль"
                    icon="pi pi-check"
                    type="submit"
                  />
                </div>
              </form>
            </template>
          </Card>

          <!-- Уведомления -->
          <Card class="mb-4">
            <template #header>
              <div class="p-4 border-bottom-1 surface-border">
                <h3 class="text-xl font-semibold text-900 m-0">Сповіщення</h3>
              </div>
            </template>
            
            <template #content>
              <div class="flex flex-column gap-4">
                <div class="flex justify-content-between align-items-center">
                  <div>
                    <h4 class="text-base font-medium text-900 mb-1">Email сповіщення</h4>
                    <p class="text-sm text-600 m-0">Отримувати сповіщення на електронну пошту</p>
                  </div>
                  <ToggleButton
                    v-model="settings.emailNotifications"
                    onLabel="Увімкнено"
                    offLabel="Вимкнено"
                    @change="saveSettings"
                  />
                </div>
                
                <div class="flex justify-content-between align-items-center">
                  <div>
                    <h4 class="text-base font-medium text-900 mb-1">SMS сповіщення</h4>
                    <p class="text-sm text-600 m-0">Отримувати SMS про важливі події</p>
                  </div>
                  <ToggleButton
                    v-model="settings.smsNotifications"
                    onLabel="Увімкнено"
                    offLabel="Вимкнено"
                    @change="saveSettings"
                  />
                </div>
                
                <div class="flex justify-content-between align-items-center">
                  <div>
                    <h4 class="text-base font-medium text-900 mb-1">Push сповіщення</h4>
                    <p class="text-sm text-600 m-0">Сповіщення в браузері</p>
                  </div>
                  <ToggleButton
                    v-model="settings.pushNotifications"
                    onLabel="Увімкнено"
                    offLabel="Вимкнено"
                    @change="saveSettings"
                  />
                </div>
                
                <Divider />
                
                <div>
                  <h4 class="text-base font-medium text-900 mb-3">Типи сповіщень</h4>
                  <div class="flex flex-column gap-3">
                    <div class="flex align-items-center gap-2">
                      <Checkbox 
                        v-model="settings.notificationTypes" 
                        inputId="new-messages" 
                        value="messages"
                        @change="saveSettings"
                      />
                      <label for="new-messages" class="text-sm">Нові повідомлення</label>
                    </div>
                    
                    <div class="flex align-items-center gap-2">
                      <Checkbox 
                        v-model="settings.notificationTypes" 
                        inputId="price-changes" 
                        value="price-changes"
                        @change="saveSettings"
                      />
                      <label for="price-changes" class="text-sm">Зміни цін на обрані авто</label>
                    </div>
                    
                    <div class="flex align-items-center gap-2">
                      <Checkbox 
                        v-model="settings.notificationTypes" 
                        inputId="new-ads" 
                        value="new-ads"
                        @change="saveSettings"
                      />
                      <label for="new-ads" class="text-sm">Нові оголошення за критеріями</label>
                    </div>
                    
                    <div class="flex align-items-center gap-2">
                      <Checkbox 
                        v-model="settings.notificationTypes" 
                        inputId="system" 
                        value="system"
                        @change="saveSettings"
                      />
                      <label for="system" class="text-sm">Системні повідомлення</label>
                    </div>
                  </div>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import MainLayout from '@/layouts/Mainlayout.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import ToggleButton from 'primevue/togglebutton'
import Checkbox from 'primevue/checkbox'
import Divider from 'primevue/divider'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Calendar from 'primevue/calendar'
import Dropdown from 'primevue/dropdown'
import InlineMessage from 'primevue/inlinemessage'

const router = useRouter()
const toast = useToast()

// Данные профиля
const profileForm = ref({
  firstName: 'Микола',
  lastName: 'Онікійчук',
  email: 'mykola@example.com',
  phone: '+38 067 123-45-67',
  birthDate: new Date('1990-05-15'),
  city: 'kyiv',
  about: 'Досвідчений продавець автомобілів з 5-річним стажем.'
})

const submitted = ref(false)

// Опции для профиля
const cityOptions = ref([
  { label: 'Київ', value: 'kyiv' },
  { label: 'Харків', value: 'kharkiv' },
  { label: 'Одеса', value: 'odesa' },
  { label: 'Дніпро', value: 'dnipro' },
  { label: 'Львів', value: 'lviv' }
])

const maxBirthDate = ref(new Date())

// Настройки уведомлений
const settings = ref({
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  notificationTypes: ['messages', 'system']
})

// Вычисляемые свойства для профиля
const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(profileForm.value.email)
})

// Методы для профиля
const saveProfile = () => {
  submitted.value = true
  
  if (!profileForm.value.email || !isValidEmail.value) {
    toast.add({
      severity: 'warn',
      summary: 'Помилка валідації',
      detail: 'Перевірте правильність заповнення полів',
      life: 3000
    })
    return
  }

  // TODO: API call to save profile
  toast.add({
    severity: 'success',
    summary: 'Профіль збережено',
    detail: 'Ваші дані успішно оновлені',
    life: 3000
  })
  
  submitted.value = false
}

const cancelProfileChanges = () => {
  // Сброс формы к исходным значениям
  profileForm.value = {
    firstName: 'Микола',
    lastName: 'Онікійчук',
    email: 'mykola@example.com',
    phone: '+38 067 123-45-67',
    birthDate: new Date('1990-05-15'),
    city: 'kyiv',
    about: 'Досвідчений продавець автомобілів з 5-річним стажем.'
  }
  submitted.value = false
  
  toast.add({
    severity: 'info',
    summary: 'Зміни скасовані',
    detail: 'Форма повернута до початкового стану',
    life: 2000
  })
}

// Методы для настроек
const goBack = () => {
  router.push('/profile')
}

const saveSettings = () => {
  // Имитация сохранения настроек
  toast.add({
    severity: 'success',
    summary: 'Налаштування збережені',
    detail: 'Ваші налаштування успішно оновлені',
    life: 2000
  })
}



// Утилиты для отображения данных
const formatDate = (date) => {
  if (!date) return 'Не вказано'
  return date.toLocaleDateString('uk-UA')
}

const getCityLabel = (cityValue) => {
  if (!cityValue) return 'Не вказано'
  const city = cityOptions.value.find(option => option.value === cityValue)
  return city ? city.label : 'Не вказано'
}

onMounted(() => {
  // Проверяем авторизацию
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  if (!isAuthenticated) {
    router.push('/auth')
  }
})
</script>

<style scoped>
.settings-page {
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

/* Адаптивность */
@media (max-width: 768px) {
  .settings-page {
    padding: 0;
  }
}
</style> 