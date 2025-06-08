<template>
  <MainLayout>
    <div class="profile-hub px-0">
      <!-- Компактный профиль пользователя -->
      <Card class="user-card mb-4" :pt="{ root: { class: 'surface-200 shadow-none' }, body: { class: 'p-2 md:p-4' } }">
        <template #content>
          <div class="flex align-items-center justify-content-between">
            <div class="flex-1">
              <div class="flex align-items-center gap-2 mb-2">
                <h2 class="text-xl font-bold text-900 m-0">{{ userName }}</h2>
                <Button 
                  icon="pi pi-cog" 
                  severity="secondary"
                  text
                  size="small"
                  class="p-1"
                  @click="showSettings"
                />
              </div>
              <p class="text-900 font-medium mb-3">{{ userPhone }}</p>
              <div class="flex align-items-center gap-3">
                <Tag value="Верифікований" severity="secondary" class="text-xs" />
                <span class="text-xs text-600">• На сайті з {{ registrationDate }}</span>
              </div>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-primary mb-2">{{ userBalance }}₴</div>
              <div class="flex flex-column gap-2">
                <Button 
                  label="Поповнити" 
                  size="small" 
                  severity="success"
                  class="w-full"
                  @click="quickTopUp"
                />
                <Button 
                  label="Транзакції" 
                  size="small" 
                  severity="secondary"
                  outlined
                  class="w-full"
                  @click="goToPaymentHistory"
                />
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- Быстрые действия -->
      <div class="flex flex-column md:flex-row gap-3 mb-4">
        <div class="flex gap-2 flex-1">
          <Button 
            label="Додати оголошення" 
            icon="pi pi-plus" 
            class="flex-1"
            @click="addNewCar"
          />
          <Button 
            label="Шукати авто" 
            icon="pi pi-search" 
            severity="secondary"
            class="flex-1"
            @click="browseCatalog"
          />
        </div>
        
        <!-- Быстрая статистика -->
        <div class="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          <div class="stat-card text-center p-2 border-round bg-blue-50 cursor-pointer flex-shrink-0" style="min-width: 90px" @click="goToMyCars">
            <div class="text-xl font-bold text-blue-600">{{ stats.activeCars }}</div>
            <div class="text-xs text-600">Активні авто</div>
          </div>
          <div class="stat-card text-center p-2 border-round bg-green-50 cursor-pointer flex-shrink-0" style="min-width: 90px" @click="goToFavorites">
            <div class="text-xl font-bold text-green-600">{{ stats.favorites }}</div>
            <div class="text-xs text-600">Обране</div>
          </div>
          <div class="stat-card text-center p-2 border-round bg-orange-50 cursor-pointer flex-shrink-0" style="min-width: 90px" @click="showNotifications">
            <div class="text-xl font-bold text-orange-600">{{ stats.unreadNotifications }}</div>
            <div class="text-xs text-600">Сповіщення</div>
          </div>
          <div class="stat-card text-center p-2 border-round bg-purple-50 cursor-pointer flex-shrink-0" style="min-width: 90px" @click="showViewsAnalytics">
            <div class="text-xl font-bold text-purple-600">{{ stats.totalViews }}</div>
            <div class="text-xs text-600">Переглядів</div>
          </div>
        </div>
      </div>

      <!-- Мои автомобили (превью) -->
      <Card class="mb-4" :pt="{ root: { class: 'shadow-none' }, body: { class: 'px-0' } }">
        <template #header>
          <div class="p-0 ">
            <h3 class="text-lg font-semibold text-900 m-0">Мої автомобілі</h3>
          </div>
        </template>
        <template #content>
          <div v-if="myCarsPreview.length === 0" class="text-center p-0">
            <i class="pi pi-car text-4xl text-400 mb-2"></i>
            <p class="text-600 m-0">У вас поки немає оголошень</p>
          </div>
          <div v-else>
            <div class="grid">
              <div 
                v-for="car in myCarsPreview.slice(0, 5)" 
                :key="car.id" 
                class="col-12 md:col-6"
              >
                <div class="car-preview-card p-3 border-round border-1 surface-border cursor-pointer hover:bg-gray-50" @click="editCar(car.id)">
                  <div class="flex gap-3">
                    <img :src="car.image" :alt="car.title" class="w-4rem h-3rem object-cover border-round" />
                    <div class="flex-1">
                      <h4 class="text-sm font-semibold text-900 m-0 mb-1">{{ car.title }}</h4>
                      <div class="flex justify-content-between align-items-center">
                        <span class="text-primary font-bold">${{ car.price.toLocaleString() }}</span>
                        <div class="flex align-items-center gap-2">
                          <Tag 
                            :value="car.status" 
                            :severity="getStatusSeverity(car.status)"
                            class="text-xs"
                          />
                          <span class="text-xs text-600">{{ car.views }} переглядів</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-3">
              <Button 
                label="Переглянути всі автомобілі" 
                severity="secondary"
                outlined
                @click="goToMyCars"
              />
            </div>
          </div>
        </template>
      </Card>

      <!-- Останні транзакції -->
      <Card class="mb-4" :pt="{ root: { class: 'shadow-none' }, body: { class: 'px-0' } }">
        <template #header>
          <div class="p-0">
            <h3 class="text-lg font-semibold text-900 m-0">Останні транзакції</h3>
          </div>
        </template>
        <template #content>
          <div v-if="recentTransactions.length === 0" class="text-center p-0">
            <i class="pi pi-credit-card text-4xl text-400 mb-2"></i>
            <p class="text-600 m-0">У вас поки немає транзакцій</p>
          </div>
          <div v-else>
            <DataTable 
              :value="recentTransactions.slice(0, 5)" 
              size="small"
              :pt="{
                root: { class: 'text-xs' },
                header: { class: 'p-0' },
                tbody: { class: 'text-xs' }
              }"
            >
              <Column field="description" header="Опис" class="text-xs">
                <template #body="{ data }">
                  <div class="flex align-items-center gap-2">
                    <div class="transaction-icon p-1 border-round" :class="getTransactionIconClass(data.type)" style="width: 1.2rem; height: 1.2rem;">
                      <i :class="getTransactionIcon(data.type)" class="text-white" style="font-size: 0.6rem;"></i>
                    </div>
                    <span class="text-xs">{{ data.description }}</span>
                  </div>
                </template>
              </Column>
              
              <Column field="date" header="Дата" class="text-xs">
                <template #body="{ data }">
                  <span class="text-xs text-600">{{ formatDateTime(data.date) }}</span>
                </template>
              </Column>
              
              <Column field="amount" header="Сума" class="text-xs">
                <template #body="{ data }">
                  <span class="text-xs font-bold" :class="data.amount > 0 ? 'text-green-600' : 'text-red-600'">
                    {{ data.amount > 0 ? '+' : '' }}{{ data.amount }}₴
                  </span>
                </template>
              </Column>
              
              <Column field="status" header="Статус" class="text-xs">
                <template #body="{ data }">
                  <Tag 
                    :value="data.status" 
                    :severity="getTransactionStatusSeverity(data.status)"
                    class="text-xs"
                  />
                </template>
              </Column>
            </DataTable>
            
            <div class="text-center mt-3">
              <Button 
                label="Дивитися всі транзакції" 
                severity="secondary"
                outlined
                size="small"
                @click="goToPaymentHistory"
              />
            </div>
          </div>
        </template>
      </Card>

      <!-- Дополнительные действия -->
      <div class="grid">
        <div class="col-6">
          <div class="quick-link text-center p-3 cursor-pointer hover:bg-gray-50 border-round" @click="contactSupport">
            <i class="pi pi-question-circle text-2xl text-600 mb-2"></i>
            <div class="text-sm font-medium text-900">Підтримка</div>
          </div>
        </div>
        <div class="col-6">
          <div class="quick-link text-center p-3 cursor-pointer hover:bg-gray-50 border-round" @click="logout">
            <i class="pi pi-sign-out text-2xl text-red-500 mb-2"></i>
            <div class="text-sm font-medium text-red-500">Вийти з акаунта</div>
          </div>
        </div>
      </div>

      <!-- Боковая панель уведомлений -->
      <Sidebar v-model:visible="notificationsSidebar" position="right" class="w-full md:w-20rem">
        <template #header>
          <h3 class="m-0">Повідомлення</h3>
        </template>
        
        <div class="flex flex-column gap-3">
          <div 
            v-for="notification in notifications" 
            :key="notification.id"
            class="notification-item p-3 border-round border-1 surface-border"
            :class="{ 'bg-blue-50': !notification.read }"
          >
            <div class="flex align-items-start gap-2">
              <i :class="notification.icon" class="text-primary mt-1"></i>
              <div class="flex-1">
                <h4 class="text-sm font-medium text-900 m-0 mb-1">{{ notification.title }}</h4>
                <p class="text-xs text-600 m-0 mb-1">{{ notification.message }}</p>
                <span class="text-xs text-500">{{ formatTime(notification.time) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <template #footer>
          <Button 
            label="Всі повідомлення" 
            text 
            class="w-full" 
            @click="goToNotifications"
          />
        </template>
      </Sidebar>

      <!-- Боковая панель истории платежей -->
      <Sidebar v-model:visible="paymentsSidebar" position="right" class="w-full md:w-25rem">
        <template #header>
          <h3 class="m-0">Останні платежі</h3>
        </template>
        
        <div class="flex flex-column gap-3">
          <div 
            v-for="payment in recentPayments" 
            :key="payment.id"
            class="payment-item p-3 border-round border-1 surface-border"
          >
            <div class="flex justify-content-between align-items-center mb-2">
              <span class="text-sm font-medium text-900">{{ payment.description }}</span>
              <Tag 
                :value="payment.status" 
                :severity="payment.status === 'Успішно' ? 'success' : 'warning'"
                class="text-xs"
              />
            </div>
            <div class="flex justify-content-between align-items-center">
              <span class="text-xs text-600">{{ formatDate(payment.date) }}</span>
              <span class="text-sm font-bold" :class="payment.amount > 0 ? 'text-green-600' : 'text-red-600'">
                {{ payment.amount > 0 ? '+' : '' }}{{ payment.amount }}₴
              </span>
            </div>
          </div>
        </div>
        
        <template #footer>
          <Button 
            label="Вся історія" 
            text 
            class="w-full" 
            @click="goToPaymentHistory"
          />
        </template>
      </Sidebar>

      <!-- Боковая панель аналитики просмотров -->
      <Sidebar v-model:visible="viewsAnalyticsSidebar" position="right" class="w-full md:w-25rem">
        <template #header>
          <h3 class="m-0">Аналітика переглядів</h3>
        </template>
        
        <div class="flex flex-column gap-3">
          <!-- Общая статистика -->
          <Card>
            <template #content>
              <div class="grid text-center">
                <div class="col-4">
                  <div class="text-lg font-bold text-primary">{{ stats.totalViews }}</div>
                  <div class="text-xs text-600">Всього</div>
                </div>
                <div class="col-4">
                  <div class="text-lg font-bold text-green-600">{{ viewsAnalytics.reduce((sum, car) => sum + car.viewsToday, 0) }}</div>
                  <div class="text-xs text-600">Сьогодні</div>
                </div>
                <div class="col-4">
                  <div class="text-lg font-bold text-blue-600">{{ viewsAnalytics.reduce((sum, car) => sum + car.viewsWeek, 0) }}</div>
                  <div class="text-xs text-600">За тиждень</div>
                </div>
              </div>
            </template>
          </Card>

          <!-- По автомобилям -->
          <div 
            v-for="car in viewsAnalytics" 
            :key="car.id"
            class="analytics-item p-3 border-round border-1 surface-border"
          >
            <h4 class="text-sm font-medium text-900 m-0 mb-2">{{ car.carTitle }}</h4>
            
            <div class="grid text-center mb-2">
              <div class="col-3">
                <div class="text-sm font-bold text-primary">{{ car.views }}</div>
                <div class="text-xs text-600">Всього</div>
              </div>
              <div class="col-3">
                <div class="text-sm font-bold text-green-600">{{ car.viewsToday }}</div>
                <div class="text-xs text-600">Сьогодні</div>
              </div>
              <div class="col-3">
                <div class="text-sm font-bold text-orange-600">{{ car.calls }}</div>
                <div class="text-xs text-600">Дзвінки</div>
              </div>
              <div class="col-3">
                <div class="text-sm font-bold text-red-600">{{ car.favorites }}</div>
                <div class="text-xs text-600">В обране</div>
              </div>
            </div>
            
            <div class="flex justify-content-between align-items-center">
              <span class="text-xs text-600">Конверсія: {{ ((car.calls / car.views) * 100).toFixed(1) }}%</span>
              <Button 
                label="Деталі" 
                text 
                size="small"
                @click="viewCarDetails(car.id)"
              />
            </div>
          </div>
        </div>
        
        <template #footer>
          <Button 
            label="Повна аналітика" 
            text 
            class="w-full" 
            @click="goToFullAnalytics"
          />
        </template>
      </Sidebar>

      <!-- Модальное окно быстрого пополнения -->
      <Dialog v-model:visible="topUpDialog" modal header="Поповнити баланс" class="w-full md:w-30rem">
        <div class="flex flex-column gap-3">
          <div>
            <label class="block text-sm font-medium text-900 mb-2">Сума поповнення</label>
            <div class="grid">
              <div class="col-4" v-for="amount in quickAmounts" :key="amount">
                <Button 
                  :label="amount + '₴'" 
                  :outlined="selectedAmount !== amount"
                  size="small"
                  class="w-full"
                  @click="selectedAmount = amount"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-900 mb-2">Або введіть суму</label>
            <InputNumber 
              v-model="selectedAmount" 
              placeholder="Введіть суму" 
              class="w-full"
              :min="10"
              :max="10000"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-900 mb-2">Спосіб оплати</label>
            <SelectButton 
              v-model="paymentMethod" 
              :options="paymentOptions" 
              optionLabel="label" 
              optionValue="value"
              class="w-full"
            />
          </div>
        </div>
        
        <template #footer>
          <div class="flex gap-2">
            <Button label="Скасувати" severity="secondary" outlined @click="topUpDialog = false" />
            <Button label="Поповнити" @click="processTopUp" />
          </div>
        </template>
      </Dialog>
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
import Tag from 'primevue/tag'
import Sidebar from 'primevue/sidebar'
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber'
import SelectButton from 'primevue/selectbutton'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const router = useRouter()
const toast = useToast()

// Данные пользователя
const userName = ref('Микола Онікійчук')
const userPhone = ref('+38 067 123-45-67')
const userBalance = ref(1250)

// Статистика
const stats = ref({
  activeCars: 3,
  favorites: 12,
  unreadNotifications: 5,
  totalViews: 1847
})

// Боковые панели
const notificationsSidebar = ref(false)
const paymentsSidebar = ref(false)
const viewsAnalyticsSidebar = ref(false)

// Модальные окна
const topUpDialog = ref(false)

// Быстрое пополнение
const selectedAmount = ref(500)
const paymentMethod = ref('card')
const quickAmounts = ref([100, 250, 500, 1000])
const paymentOptions = ref([
  { label: 'Банківська картка', value: 'card' },
  { label: 'Apple Pay', value: 'apple' },
  { label: 'Google Pay', value: 'google' }
])

// Превью автомобилей
const myCarsPreview = ref([
  {
    id: 1,
    title: 'Volkswagen Golf Plus 2009',
    price: 19999,
    status: 'Активне',
    views: 245,
    image: 'https://via.placeholder.com/80x60/007bff/ffffff?text=VW'
  },
  {
    id: 2,
    title: 'Ford Fusion 2016',
    price: 25999,
    status: 'На модерації',
    views: 12,
    image: 'https://via.placeholder.com/80x60/28a745/ffffff?text=Ford'
  }
])

// Уведомления
const notifications = ref([
  {
    id: 1,
    title: 'Нове повідомлення',
    message: 'Покупець цікавиться вашим Volkswagen Golf',
    time: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
    icon: 'pi pi-envelope'
  },
  {
    id: 2,
    title: 'Оголошення схвалено',
    message: 'Ваше оголошення Ford Fusion опубліковано',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
    icon: 'pi pi-check-circle'
  },
  {
    id: 3,
    title: 'Нагадування',
    message: 'Продовжіть оголошення до завтра',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    icon: 'pi pi-clock'
  }
])

// Последние платежи
const recentPayments = ref([
  {
    id: 1,
    description: 'Поповнення балансу',
    amount: 500,
    status: 'Успішно',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24)
  },
  {
    id: 2,
    description: 'Підняття в топ',
    amount: -50,
    status: 'Успішно',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)
  }
])

// Последние транзакции
const recentTransactions = ref([
  {
    id: 1,
    description: 'Поповнення балансу через картку',
    amount: 1000,
    status: 'Успішно',
    type: 'topup',
    date: new Date(Date.now() - 1000 * 60 * 30)
  },
  {
    id: 2,
    description: 'Підняття оголошення в топ',
    amount: -150,
    status: 'Успішно',
    type: 'promotion',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2)
  },
  {
    id: 3,
    description: 'Оплата за VIP статус',
    amount: -300,
    status: 'Успішно',
    type: 'subscription',
    date: new Date(Date.now() - 1000 * 60 * 60 * 6)
  },
  {
    id: 4,
    description: 'Поповнення через Apple Pay',
    amount: 500,
    status: 'Успішно',
    type: 'topup',
    date: new Date(Date.now() - 1000 * 60 * 60 * 12)
  },
  {
    id: 5,
    description: 'Оплата за додаткові фото',
    amount: -75,
    status: 'Успішно',
    type: 'service',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24)
  },
  {
    id: 6,
    description: 'Повернення коштів',
    amount: 200,
    status: 'Успішно',
    type: 'refund',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
  },
  {
    id: 7,
    description: 'Поповнення балансу',
    amount: 750,
    status: 'Успішно',
    type: 'topup',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)
  },
  {
    id: 8,
    description: 'Оплата за термінове розміщення',
    amount: -100,
    status: 'Успішно',
    type: 'promotion',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4)
  },
  {
    id: 9,
    description: 'Поповнення через Google Pay',
    amount: 300,
    status: 'В обробці',
    type: 'topup',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
  },
  {
    id: 10,
    description: 'Оплата за виділення кольором',
    amount: -50,
    status: 'Успішно',
    type: 'service',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6)
  },
  {
    id: 11,
    description: 'Поповнення балансу через банк',
    amount: 2000,
    status: 'Успішно',
    type: 'topup',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
  },
  {
    id: 12,
    description: 'Оплата за автопродовження',
    amount: -250,
    status: 'Успішно',
    type: 'subscription',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8)
  }
])

// Аналитика просмотров
const viewsAnalytics = ref([
  {
    id: 1,
    carTitle: 'Volkswagen Golf Plus 2009',
    views: 245,
    viewsToday: 12,
    viewsWeek: 89,
    calls: 8,
    favorites: 15
  },
  {
    id: 2,
    carTitle: 'Ford Fusion 2016',
    views: 189,
    viewsToday: 5,
    viewsWeek: 34,
    calls: 3,
    favorites: 7
  },
  {
    id: 3,
    carTitle: 'BMW X5 2018',
    views: 567,
    viewsToday: 23,
    viewsWeek: 156,
    calls: 19,
    favorites: 42
  }
])

// Вычисляемые свойства
const registrationDate = computed(() => {
  return 'березня 2023'
})

// Методы навигации
const goToMyCars = () => {
  router.push('/profile/my-cars')
}

const goToFavorites = () => {
  router.push('/profile/favorites')
}

const goToNotifications = () => {
  notificationsSidebar.value = false
  router.push('/profile/notifications')
}

const goToPaymentHistory = () => {
  paymentsSidebar.value = false
  router.push('/profile/payment-history')
}

const editProfile = () => {
  router.push('/profile/settings')
}

const showSettings = () => {
  router.push('/profile/settings')
}

const contactSupport = () => {
  router.push('/profile/support')
}

// Быстрые действия
const showNotifications = () => {
  notificationsSidebar.value = true
}

const showPaymentHistory = () => {
  paymentsSidebar.value = true
}

const showViewsAnalytics = () => {
  viewsAnalyticsSidebar.value = true
}

const quickTopUp = () => {
  topUpDialog.value = true
}

const addNewCar = () => {
  router.push('/add-car')
}

const browseCatalog = () => {
  router.push('/catalog')
}

const editCar = (carId) => {
  toast.add({
    severity: 'info',
    summary: 'Редагування авто',
    detail: `Редагування автомобіля #${carId}`,
    life: 2000
  })
}

const processTopUp = () => {
  if (!selectedAmount.value || selectedAmount.value < 10) {
    toast.add({
      severity: 'warn',
      summary: 'Помилка',
      detail: 'Мінімальна сума поповнення 10₴',
      life: 3000
    })
    return
  }

  userBalance.value += selectedAmount.value
  topUpDialog.value = false
  
  toast.add({
    severity: 'success',
    summary: 'Баланс поповнено',
    detail: `Додано ${selectedAmount.value}₴ на ваш рахунок`,
    life: 3000
  })
}

const logout = () => {
  localStorage.removeItem('isAuthenticated')
  router.push('/')
  
  toast.add({
    severity: 'info',
    summary: 'Вихід виконано',
    detail: 'До побачення!',
    life: 2000
  })
}

// Утилиты
const getStatusSeverity = (status) => {
  switch (status) {
    case 'Активне': return 'success'
    case 'На модерації': return 'warning'
    case 'Неактивне': return 'secondary'
    default: return 'info'
  }
}

const formatTime = (date) => {
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (minutes < 60) {
    return `${minutes} хв тому`
  } else if (hours < 24) {
    return `${hours} год тому`
  } else {
    return `${days} дн тому`
  }
}

const formatDate = (date) => {
  return date.toLocaleDateString('uk-UA')
}

const formatDateTime = (date) => {
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (minutes < 60) {
    return `${minutes} хв тому`
  } else if (hours < 24) {
    return `${hours} год тому`
  } else if (days < 7) {
    return `${days} дн тому`
  } else {
    return date.toLocaleDateString('uk-UA')
  }
}

const getTransactionIcon = (type) => {
  switch (type) {
    case 'topup': return 'pi pi-plus'
    case 'promotion': return 'pi pi-arrow-up'
    case 'subscription': return 'pi pi-star'
    case 'service': return 'pi pi-cog'
    case 'refund': return 'pi pi-undo'
    default: return 'pi pi-credit-card'
  }
}

const getTransactionIconClass = (type) => {
  switch (type) {
    case 'topup': return 'bg-green-500'
    case 'promotion': return 'bg-blue-500'
    case 'subscription': return 'bg-purple-500'
    case 'service': return 'bg-orange-500'
    case 'refund': return 'bg-cyan-500'
    default: return 'bg-gray-500'
  }
}

const getTransactionStatusSeverity = (status) => {
  switch (status) {
    case 'Успішно': return 'success'
    case 'В обробці': return 'warning'
    case 'Скасовано': return 'danger'
    default: return 'info'
  }
}

const viewCarDetails = (carId) => {
  viewsAnalyticsSidebar.value = false
  router.push(`/car/${carId}`)
}

const goToFullAnalytics = () => {
  viewsAnalyticsSidebar.value = false
  toast.add({
    severity: 'info',
    summary: 'Повна аналітика',
    detail: 'Функція в розробці',
    life: 3000
  })
}

onMounted(() => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  if (!isAuthenticated) {
    router.push('/auth')
  }
})
</script>

<style scoped>
.profile-hub {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}





.stat-card {
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.action-card {
  transition: all 0.2s ease;
}

.action-card:hover {
  transform: translateY(-2px);
}

.car-preview-card {
  transition: all 0.2s ease;
}

.car-preview-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.quick-link {
  transition: all 0.2s ease;
}

.quick-link:hover {
  transform: translateY(-1px);
}

.notification-item {
  transition: all 0.2s ease;
}

.payment-item {
  transition: all 0.2s ease;
}

.analytics-item {
  transition: all 0.2s ease;
}

.transaction-item {
  transition: all 0.2s ease;
}

.transaction-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.transaction-icon {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Адаптивность */
@media (max-width: 768px) {
  .profile-hub {
    padding: 0.5rem;
  }
  
  .user-card :deep(.p-card-content) {
    padding: 1rem;
  }
}
</style> 