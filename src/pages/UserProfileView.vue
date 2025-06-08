<template>
  <MainLayout>
    <div class="user-profile-page">
      <!-- Мобильный хедер -->
      <div class="mobile-header md:hidden">
        <Button 
          icon="pi pi-arrow-left" 
          text 
          class="text-white"
          @click="goBack"
        />
        <h1 class="text-xl font-semibold text-white m-0">Профіль</h1>
        <Button 
          icon="pi pi-check" 
          text 
          class="text-white"
          @click="saveProfile"
        />
      </div>

      <!-- Десктопный заголовок -->
      <div class="hidden md:flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="text-3xl font-bold text-900 m-0">Редагування профілю</h1>
          <p class="text-600 mt-2 mb-0">Оновіть свою особисту інформацію</p>
        </div>
        <div class="flex gap-2">
          <Button
            label="Скасувати"
            severity="secondary"
            outlined
            @click="cancelChanges"
          />
          <Button
            label="Зберегти"
            icon="pi pi-check"
            @click="saveProfile"
          />
        </div>
      </div>

      <div class="grid">
        <!-- Левая колонка - основная информация -->
        <div class="col-12 lg:col-8">
          <Card>
            <template #header>
              <div class="p-4 border-bottom-1 surface-border">
                <h3 class="text-xl font-semibold text-900 m-0">Особиста інформація</h3>
              </div>
            </template>
            
            <template #content>
              <form @submit.prevent="saveProfile" class="flex flex-column gap-4">
                <!-- Заголовок профиля -->
                <div class="text-center mb-4">
                  <h3 class="text-2xl font-bold text-900 m-0">{{ profileForm.firstName }} {{ profileForm.lastName }}</h3>
                  <p class="text-600 text-sm mt-1">Редагуйте свою особисту інформацію</p>
                </div>

                <!-- Основная информация -->
                <div class="grid">
                  <div class="col-12 md:col-6">
                    <label class="block text-sm font-medium text-900 mb-2">Ім'я *</label>
                    <InputText
                      v-model="profileForm.firstName"
                      placeholder="Введіть ваше ім'я"
                      class="w-full"
                      :class="{ 'p-invalid': submitted && !profileForm.firstName }"
                    />
                    <small v-if="submitted && !profileForm.firstName" class="p-error">Введіть ім'я</small>
                  </div>
                  
                  <div class="col-12 md:col-6">
                    <label class="block text-sm font-medium text-900 mb-2">Прізвище *</label>
                    <InputText
                      v-model="profileForm.lastName"
                      placeholder="Введіть ваше прізвище"
                      class="w-full"
                      :class="{ 'p-invalid': submitted && !profileForm.lastName }"
                    />
                    <small v-if="submitted && !profileForm.lastName" class="p-error">Введіть прізвище</small>
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
                    <label class="block text-sm font-medium text-900 mb-2">Телефон *</label>
                    <InputMask
                      v-model="profileForm.phone"
                      mask="+38 999 999-99-99"
                      placeholder="+38 XXX XXX-XX-XX"
                      class="w-full"
                      :class="{ 'p-invalid': submitted && !isValidPhone }"
                    />
                    <small v-if="submitted && !isValidPhone" class="p-error">Введіть коректний номер телефону</small>
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
                    <label class="block text-sm font-medium text-900 mb-2">Стать</label>
                    <Dropdown
                      v-model="profileForm.gender"
                      :options="genderOptions"
                      optionLabel="label"
                      optionValue="value"
                      placeholder="Оберіть стать"
                      class="w-full"
                    />
                  </div>
                </div>

                <div>
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

                <div>
                  <label class="block text-sm font-medium text-900 mb-2">Про себе</label>
                  <Textarea
                    v-model="profileForm.about"
                    rows="4"
                    placeholder="Розкажіть про себе..."
                    class="w-full"
                    :maxlength="500"
                  />
                  <small class="text-600">{{ profileForm.about?.length || 0 }}/500 символів</small>
                </div>
              </form>
            </template>
          </Card>
        </div>

        <!-- Правая колонка - дополнительная информация -->
        <div class="col-12 lg:col-4">
          <!-- Статистика профиля -->
          <Card class="mb-4">
            <template #header>
              <div class="p-4 border-bottom-1 surface-border">
                <h3 class="text-lg font-semibold text-900 m-0">Статистика профілю</h3>
              </div>
            </template>
            
            <template #content>
              <div class="flex flex-column gap-3">
                <div class="flex justify-content-between align-items-center">
                  <span class="text-600">Дата реєстрації</span>
                  <span class="font-medium">{{ registrationDate }}</span>
                </div>
                
                <div class="flex justify-content-between align-items-center">
                  <span class="text-600">Активних оголошень</span>
                  <span class="font-medium">{{ activeAdsCount }}</span>
                </div>
                
                <div class="flex justify-content-between align-items-center">
                  <span class="text-600">Продано автомобілів</span>
                  <span class="font-medium">{{ soldCarsCount }}</span>
                </div>
                
                <div class="flex justify-content-between align-items-center">
                  <span class="text-600">Рейтинг продавця</span>
                  <div class="flex align-items-center gap-1">
                    <Rating v-model="sellerRating" readonly :stars="5" />
                    <span class="text-sm text-600">({{ reviewsCount }})</span>
                  </div>
                </div>
              </div>
            </template>
          </Card>

          <!-- Настройки приватности -->
          <Card>
            <template #header>
              <div class="p-4 border-bottom-1 surface-border">
                <h3 class="text-lg font-semibold text-900 m-0">Налаштування приватності</h3>
              </div>
            </template>
            
            <template #content>
              <div class="flex flex-column gap-4">
                <div class="flex justify-content-between align-items-center">
                  <div>
                    <h4 class="text-base font-medium text-900 mb-1">Показувати телефон</h4>
                    <p class="text-sm text-600 m-0">Дозволити іншим користувачам бачити ваш номер</p>
                  </div>
                  <ToggleButton
                    v-model="privacySettings.showPhone"
                    onLabel="Так"
                    offLabel="Ні"
                  />
                </div>
                
                <div class="flex justify-content-between align-items-center">
                  <div>
                    <h4 class="text-base font-medium text-900 mb-1">Показувати email</h4>
                    <p class="text-sm text-600 m-0">Дозволити контакт через email</p>
                  </div>
                  <ToggleButton
                    v-model="privacySettings.showEmail"
                    onLabel="Так"
                    offLabel="Ні"
                  />
                </div>
                
                <div class="flex justify-content-between align-items-center">
                  <div>
                    <h4 class="text-base font-medium text-900 mb-1">Онлайн статус</h4>
                    <p class="text-sm text-600 m-0">Показувати коли ви в мережі</p>
                  </div>
                  <ToggleButton
                    v-model="privacySettings.showOnlineStatus"
                    onLabel="Так"
                    offLabel="Ні"
                  />
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
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import Textarea from 'primevue/textarea'
import Calendar from 'primevue/calendar'
import Dropdown from 'primevue/dropdown'
import Rating from 'primevue/rating'
import ToggleButton from 'primevue/togglebutton'

const router = useRouter()
const toast = useToast()

// Реактивные данные
const submitted = ref(false)

// Форма профиля
const profileForm = ref({
  firstName: 'Микола',
  lastName: 'Онікійчук',
  email: 'mykola@example.com',
  phone: '+38 067 123-45-67',
  birthDate: new Date('1985-05-15'),
  gender: 'male',
  city: 'kyiv',
  about: 'Досвідчений автолюбитель з 15-річним стажем. Продаю тільки перевірені автомобілі.'
})

// Настройки приватности
const privacySettings = ref({
  showPhone: true,
  showEmail: false,
  showOnlineStatus: true
})

// Статистика
const activeAdsCount = ref(3)
const soldCarsCount = ref(12)
const sellerRating = ref(4.5)
const reviewsCount = ref(28)

// Опции для выпадающих списков
const genderOptions = ref([
  { label: 'Чоловік', value: 'male' },
  { label: 'Жінка', value: 'female' },
  { label: 'Не вказувати', value: 'other' }
])

const cityOptions = ref([
  { label: 'Київ', value: 'kyiv' },
  { label: 'Харків', value: 'kharkiv' },
  { label: 'Одеса', value: 'odesa' },
  { label: 'Дніпро', value: 'dnipro' },
  { label: 'Львів', value: 'lviv' },
  { label: 'Запоріжжя', value: 'zaporizhzhia' },
  { label: 'Кривий Ріг', value: 'kryvyi-rih' },
  { label: 'Миколаїв', value: 'mykolaiv' },
  { label: 'Маріуполь', value: 'mariupol' },
  { label: 'Вінниця', value: 'vinnytsia' }
])

// Вычисляемые свойства
const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(profileForm.value.email)
})

const isValidPhone = computed(() => {
  const phoneDigits = profileForm.value.phone?.replace(/\D/g, '') || ''
  return phoneDigits.length === 12 && phoneDigits.startsWith('38')
})

const maxBirthDate = computed(() => {
  const today = new Date()
  today.setFullYear(today.getFullYear() - 18) // Минимум 18 лет
  return today
})

const registrationDate = computed(() => {
  return new Date().toLocaleDateString('uk-UA')
})

// Методы
const goBack = () => {
  router.push('/profile')
}

const saveProfile = () => {
  submitted.value = true
  
  // Валидация
  if (!profileForm.value.firstName || 
      !profileForm.value.lastName || 
      !profileForm.value.email || 
      !isValidEmail.value ||
      !isValidPhone.value) {
    toast.add({
      severity: 'warn',
      summary: 'Помилка валідації',
      detail: 'Заповніть всі обов\'язкові поля коректно',
      life: 3000
    })
    return
  }
  
  // Имитация сохранения
  toast.add({
    severity: 'success',
    summary: 'Профіль збережено',
    detail: 'Ваші дані успішно оновлені',
    life: 3000
  })
  
  submitted.value = false
}

const cancelChanges = () => {
  // Сброс формы к исходным значениям
  profileForm.value = {
    firstName: 'Микола',
    lastName: 'Онікійчук',
    email: 'mykola@example.com',
    phone: '+38 067 123-45-67',
    birthDate: new Date('1985-05-15'),
    gender: 'male',
    city: 'kyiv',
    about: 'Досвідчений автолюбитель з 15-річним стажем. Продаю тільки перевірені автомобілі.'
  }
  
  submitted.value = false
  
  toast.add({
    severity: 'info',
    summary: 'Зміни скасовані',
    detail: 'Форма повернута до початкового стану',
    life: 2000
  })
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
.user-profile-page {
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
  .user-profile-page {
    padding: 0;
  }
}
</style> 