<template>
  <MainLayout>
    <div class="support-page pt-4">
      <!-- Мобильный хедер -->
      <div class="mobile-header md:hidden">
        <Button 
          icon="pi pi-arrow-left" 
          text 
          class="text-white"
          @click="goBack"
        />
        <h1 class="text-xl font-semibold text-white m-0">Служба турботи</h1>
        <div class="w-2rem"></div>
      </div>

      <!-- Десктопный заголовок -->
      <div class="hidden md:flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="text-3xl font-bold text-900 m-0">Служба турботи</h1>
          <p class="text-600 mt-2 mb-0">Ми завжди готові допомогти вам</p>
        </div>
      </div>

      <div class="grid">
        <!-- Левая колонка - контакты и FAQ -->
        <div class="col-12 lg:col-8">
          <!-- Контактная информация -->
          <Card class="mb-4">
            <template #header>
              <div class="p-4 border-bottom-1 surface-border">
                <h3 class="text-xl font-semibold text-900 m-0">Контактна інформація</h3>
              </div>
            </template>
            
            <template #content>
              <div class="grid">
                <div class="col-12 md:col-6">
                  <div class="contact-item p-3 border-round hover:bg-primary-50 cursor-pointer transition-all transition-duration-200">
                    <div class="flex align-items-center gap-3">
                      <Avatar icon="pi pi-phone" class="bg-primary text-white" />
                      <div>
                        <h4 class="text-lg font-semibold text-900 mb-1">Телефон</h4>
                        <p class="text-600 m-0">+38 (067) 123-45-67</p>
                        <small class="text-500">Пн-Пт: 9:00-18:00</small>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="col-12 md:col-6">
                  <div class="contact-item p-3 border-round hover:bg-primary-50 cursor-pointer transition-all transition-duration-200">
                    <div class="flex align-items-center gap-3">
                      <Avatar icon="pi pi-envelope" class="bg-green-500 text-white" />
                      <div>
                        <h4 class="text-lg font-semibold text-900 mb-1">Email</h4>
                        <p class="text-600 m-0">support@carmarket.ua</p>
                        <small class="text-500">Відповідь протягом 24 годин</small>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="col-12 md:col-6">
                  <div class="contact-item p-3 border-round hover:bg-primary-50 cursor-pointer transition-all transition-duration-200">
                    <div class="flex align-items-center gap-3">
                      <Avatar icon="pi pi-send" class="bg-blue-500 text-white" />
                      <div>
                        <h4 class="text-lg font-semibold text-900 mb-1">Telegram</h4>
                        <p class="text-600 m-0">@carmarket_support</p>
                        <small class="text-500">Швидка відповідь</small>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="col-12 md:col-6">
                  <div class="contact-item p-3 border-round hover:bg-primary-50 cursor-pointer transition-all transition-duration-200">
                    <div class="flex align-items-center gap-3">
                      <Avatar icon="pi pi-clock" class="bg-orange-500 text-white" />
                      <div>
                        <h4 class="text-lg font-semibold text-900 mb-1">Графік роботи</h4>
                        <p class="text-600 m-0">Пн-Пт: 9:00-18:00</p>
                        <small class="text-500">Сб-Нд: 10:00-16:00</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Card>

          <!-- FAQ -->
          <Card>
            <template #header>
              <div class="p-4 border-bottom-1 surface-border">
                <h3 class="text-xl font-semibold text-900 m-0">Часті запитання</h3>
              </div>
            </template>
            
            <template #content>
              <Accordion :activeIndex="0">
                <AccordionTab 
                  v-for="(faq, index) in faqItems" 
                  :key="index"
                  :header="faq.question"
                >
                  <p class="line-height-3 text-600">{{ faq.answer }}</p>
                </AccordionTab>
              </Accordion>
            </template>
          </Card>
        </div>

        <!-- Правая колонка - форма обратной связи -->
        <div class="col-12 lg:col-4">
          <Card>
            <template #header>
              <div class="p-4 border-bottom-1 surface-border">
                <h3 class="text-xl font-semibold text-900 m-0">Написати нам</h3>
              </div>
            </template>
            
            <template #content>
              <form @submit.prevent="sendMessage" class="flex flex-column gap-4">
                <div>
                  <label class="block text-sm font-medium text-900 mb-2">Тема звернення</label>
                  <Dropdown
                    v-model="messageForm.subject"
                    :options="subjectOptions"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Оберіть тему"
                    class="w-full"
                    :class="{ 'p-invalid': submitted && !messageForm.subject }"
                  />
                  <small v-if="submitted && !messageForm.subject" class="p-error">Оберіть тему звернення</small>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-900 mb-2">Ваше ім'я</label>
                  <InputText
                    v-model="messageForm.name"
                    placeholder="Введіть ваше ім'я"
                    class="w-full"
                    :class="{ 'p-invalid': submitted && !messageForm.name }"
                  />
                  <small v-if="submitted && !messageForm.name" class="p-error">Введіть ваше ім'я</small>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-900 mb-2">Email</label>
                  <InputText
                    v-model="messageForm.email"
                    type="email"
                    placeholder="your@email.com"
                    class="w-full"
                    :class="{ 'p-invalid': submitted && (!messageForm.email || !isValidEmail) }"
                  />
                  <small v-if="submitted && !messageForm.email" class="p-error">Введіть email</small>
                  <small v-else-if="submitted && !isValidEmail" class="p-error">Введіть коректний email</small>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-900 mb-2">Повідомлення</label>
                  <Textarea
                    v-model="messageForm.message"
                    rows="5"
                    placeholder="Опишіть вашу проблему або запитання..."
                    class="w-full"
                    :class="{ 'p-invalid': submitted && !messageForm.message }"
                  />
                  <small v-if="submitted && !messageForm.message" class="p-error">Введіть повідомлення</small>
                </div>
                
                <div class="flex align-items-center gap-2">
                  <Checkbox 
                    v-model="messageForm.agreement" 
                    inputId="agreement" 
                    :binary="true"
                    :class="{ 'p-invalid': submitted && !messageForm.agreement }"
                  />
                  <label for="agreement" class="text-sm text-600">
                    Я погоджуюся з <a href="#" class="text-primary">умовами обробки персональних даних</a>
                  </label>
                </div>
                <small v-if="submitted && !messageForm.agreement" class="p-error">Підтвердіть згоду</small>
                
                <Button
                  type="submit"
                  label="Відправити повідомлення"
                  :loading="isSubmitting"
                  class="w-full"
                />
              </form>
            </template>
          </Card>

          <!-- Дополнительная информация -->
          <Card class="mt-4">
            <template #content>
              <div class="text-center p-3">
                <i class="pi pi-info-circle text-3xl text-primary mb-3"></i>
                <h4 class="text-lg font-semibold text-900 mb-2">Швидка допомога</h4>
                <p class="text-600 text-sm line-height-3 mb-3">
                  Для швидшого вирішення питань рекомендуємо спочатку ознайомитися з розділом FAQ
                </p>
                <Button
                  label="Переглянути FAQ"
                  severity="secondary"
                  outlined
                  size="small"
                  @click="scrollToFaq"
                />
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
import Avatar from 'primevue/avatar'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Checkbox from 'primevue/checkbox'

const router = useRouter()
const toast = useToast()

// Реактивные данные
const submitted = ref(false)
const isSubmitting = ref(false)

// Форма обратной связи
const messageForm = ref({
  subject: null,
  name: '',
  email: '',
  message: '',
  agreement: false
})

// Опции для темы обращения
const subjectOptions = ref([
  { label: 'Технічна підтримка', value: 'technical' },
  { label: 'Питання по оплаті', value: 'payment' },
  { label: 'Проблема з оголошенням', value: 'listing' },
  { label: 'Скарга на користувача', value: 'complaint' },
  { label: 'Пропозиція', value: 'suggestion' },
  { label: 'Інше', value: 'other' }
])

// FAQ данные
const faqItems = ref([
  {
    question: 'Як розмістити оголошення?',
    answer: 'Для розміщення оголошення натисніть кнопку "Продати авто" на головній сторінці, заповніть всі необхідні поля та завантажте фотографії автомобіля. Після модерації ваше оголошення буде опубліковано.'
  },
  {
    question: 'Скільки коштує розміщення оголошення?',
    answer: 'Базове розміщення оголошення безкоштовне. Додаткові послуги, такі як підняття в топ (50 грн/день) або турбо продаж (150 грн/тиждень), допоможуть збільшити кількість переглядів.'
  },
  {
    question: 'Як поповнити баланс?',
    answer: 'Перейдіть в особистий кабінет, оберіть "Поповнення балансу", введіть суму та оберіть зручний спосіб оплати. Мінімальна сума поповнення - 50 грн.'
  },
  {
    question: 'Чому моє оголошення не відображається?',
    answer: 'Всі оголошення проходять модерацію протягом 24 годин. Переконайтеся, що ви вказали всю необхідну інформацію та завантажили якісні фотографії.'
  },
  {
    question: 'Як зв\'язатися з покупцем?',
    answer: 'Контактна інформація продавця відображається в оголошенні. Ви можете зателефонувати або написати повідомлення через форму на сайті.'
  },
  {
    question: 'Що робити, якщо виникли проблеми з угодою?',
    answer: 'У разі виникнення спірних ситуацій зверніться до служби підтримки. Ми допоможемо вирішити конфлікт та захистити ваші інтереси.'
  }
])

// Вычисляемые свойства
const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(messageForm.value.email)
})

// Методы
const goBack = () => {
  router.push('/profile')
}

const sendMessage = async () => {
  submitted.value = true
  
  // Валидация
  if (!messageForm.value.subject || 
      !messageForm.value.name || 
      !messageForm.value.email || 
      !isValidEmail.value ||
      !messageForm.value.message || 
      !messageForm.value.agreement) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Имитация отправки сообщения
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast.add({
      severity: 'success',
      summary: 'Повідомлення відправлено',
      detail: 'Ми отримали ваше звернення та відповімо найближчим часом',
      life: 5000
    })
    
    // Сброс формы
    messageForm.value = {
      subject: null,
      name: '',
      email: '',
      message: '',
      agreement: false
    }
    submitted.value = false
    
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Помилка відправки',
      detail: 'Спробуйте ще раз або зверніться по телефону',
      life: 5000
    })
  } finally {
    isSubmitting.value = false
  }
}

const scrollToFaq = () => {
  // Прокрутка к FAQ секции
  const faqElement = document.querySelector('.p-accordion')
  if (faqElement) {
    faqElement.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.support-page {
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

.contact-item {
  transition: all 0.2s ease;
}

.contact-item:hover {
  transform: translateY(-2px);
}

/* Адаптивность */
@media (max-width: 768px) {
  .support-page {
    padding: 0;
  }
}
</style> 