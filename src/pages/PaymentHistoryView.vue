<template>
  <MainLayout>
    <div class="payment-history-page pt-4">
      <!-- Мобильный хедер -->
      <div class="mobile-header md:hidden bg-gradient-to-r from-orange-400 to-orange-600 p-4 flex justify-content-between align-items-center mb-4 border-round">
        <Button 
          icon="pi pi-arrow-left" 
          text 
          class="text-white"
          @click="goBack"
        />
        <h1 class="text-xl font-semibold text-white m-0">Історія платежів</h1>
        <Button 
          icon="pi pi-download" 
          text 
          class="text-white"
          @click="exportHistory"
        />
      </div>

      <!-- Десктопный заголовок -->
      <div class="hidden md:flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="text-3xl font-bold text-900 m-0">Історія платежів</h1>
          <p class="text-600 mt-2 mb-0">Всі ваші транзакції та платежі</p>
        </div>
        <div class="flex gap-2">
          <Button
            label="Експорт"
            severity="secondary"
            outlined
            icon="pi pi-download"
            @click="exportHistory"
          />
          <Button
            label="Поповнити баланс"
            icon="pi pi-plus"
            @click="goToTopUp"
          />
        </div>
      </div>

      <!-- Статистика -->
      <div class="mb-4">
        <div class="grid">
          <div class="col-6 md:col-3">
            <Card class="text-center">
              <template #content>
                <div class="p-2">
                  <i class="pi pi-wallet text-3xl text-primary mb-2"></i>
                  <div class="text-xl font-bold text-900">{{ totalSpent }} грн</div>
                  <div class="text-sm text-600">Всього витрачено</div>
                </div>
              </template>
            </Card>
          </div>
          <div class="col-6 md:col-3">
            <Card class="text-center">
              <template #content>
                <div class="p-2">
                  <i class="pi pi-plus-circle text-3xl text-green-500 mb-2"></i>
                  <div class="text-xl font-bold text-900">{{ totalTopUps }} грн</div>
                  <div class="text-sm text-600">Поповнень</div>
                </div>
              </template>
            </Card>
          </div>
          <div class="col-6 md:col-3">
            <Card class="text-center">
              <template #content>
                <div class="p-2">
                  <i class="pi pi-calendar text-3xl text-blue-500 mb-2"></i>
                  <div class="text-xl font-bold text-900">{{ thisMonthSpent }} грн</div>
                  <div class="text-sm text-600">Цього місяця</div>
                </div>
              </template>
            </Card>
          </div>
          <div class="col-6 md:col-3">
            <Card class="text-center">
              <template #content>
                <div class="p-2">
                  <i class="pi pi-chart-line text-3xl text-orange-500 mb-2"></i>
                  <div class="text-xl font-bold text-900">{{ transactionCount }}</div>
                  <div class="text-sm text-600">Транзакцій</div>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>

      <!-- Фильтры -->
      <div class="mb-4">
        <Card>
          <template #content>
            <div class="grid">
              <div class="col-12 md:col-3">
                <label class="block text-sm font-medium text-900 mb-2">Тип операції</label>
                <Dropdown
                  v-model="selectedType"
                  :options="typeOptions"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Всі типи"
                  class="w-full"
                  @change="filterTransactions"
                />
              </div>
              
              <div class="col-12 md:col-3">
                <label class="block text-sm font-medium text-900 mb-2">Статус</label>
                <Dropdown
                  v-model="selectedStatus"
                  :options="statusOptions"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Всі статуси"
                  class="w-full"
                  @change="filterTransactions"
                />
              </div>
              
              <div class="col-12 md:col-4">
                <label class="block text-sm font-medium text-900 mb-2">Період</label>
                <Calendar
                  v-model="dateRange"
                  selectionMode="range"
                  :manualInput="false"
                  dateFormat="dd.mm.yy"
                  placeholder="Виберіть період"
                  class="w-full"
                  @date-select="filterTransactions"
                />
              </div>
              
              <div class="col-12 md:col-2 flex align-items-end">
                <Button
                  label="Скинути фільтри"
                  severity="secondary"
                  outlined
                  size="small"
                  class="w-full"
                  @click="resetFilters"
                />
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Таблица транзакций (десктоп) -->
      <div class="hidden md:block">
        <Card>
          <template #content>
            <DataTable
              :value="filteredTransactions"
              :paginator="true"
              :rows="10"
              :rowsPerPageOptions="[5, 10, 20, 50]"
              paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
              currentPageReportTemplate="{first} - {last} з {totalRecords}"
              responsiveLayout="scroll"
              :loading="loading"
              stripedRows
            >
              <Column field="date" header="Дата" sortable>
                <template #body="{ data }">
                  {{ formatDate(data.date) }}
                </template>
              </Column>
              
              <Column field="description" header="Опис" sortable />
              
              <Column field="type" header="Тип" sortable>
                <template #body="{ data }">
                  <Tag 
                    :value="getTypeLabel(data.type)" 
                    :severity="getTypeSeverity(data.type)"
                  />
                </template>
              </Column>
              
              <Column field="amount" header="Сума" sortable>
                <template #body="{ data }">
                  <span :class="data.amount > 0 ? 'text-green-600' : 'text-red-600'">
                    {{ data.amount > 0 ? '+' : '' }}{{ data.amount }} грн
                  </span>
                </template>
              </Column>
              
              <Column field="status" header="Статус" sortable>
                <template #body="{ data }">
                  <Tag 
                    :value="getStatusLabel(data.status)" 
                    :severity="getStatusSeverity(data.status)"
                  />
                </template>
              </Column>
              
              <Column header="Дії">
                <template #body="{ data }">
                  <div class="flex gap-2">
                    <Button
                      icon="pi pi-eye"
                      size="small"
                      text
                      @click="viewTransaction(data.id)"
                    />
                    <Button
                      icon="pi pi-download"
                      size="small"
                      text
                      @click="downloadReceipt(data.id)"
                    />
                  </div>
                </template>
              </Column>
            </DataTable>
          </template>
        </Card>
      </div>

      <!-- Таблица транзакций (мобильный) -->
      <div class="md:hidden">
        <Card>
          <template #content>
            <DataTable
              :value="filteredTransactions"
              :paginator="true"
              :rows="10"
              :rowsPerPageOptions="[5, 10, 20]"
              paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
              currentPageReportTemplate="{first} - {last} з {totalRecords}"
              responsiveLayout="scroll"
              :loading="loading"
              stripedRows
              size="small"
            >
              <Column field="date" header="Дата" sortable>
                <template #body="{ data }">
                  {{ formatDate(data.date) }}
                </template>
              </Column>
              
              <Column field="description" header="Опис" sortable />
              
              <Column field="type" header="Тип" sortable>
                <template #body="{ data }">
                  <Tag 
                    :value="getTypeLabel(data.type)" 
                    :severity="getTypeSeverity(data.type)"
                    size="small"
                  />
                </template>
              </Column>
              
              <Column field="amount" header="Сума" sortable>
                <template #body="{ data }">
                  <span :class="data.amount > 0 ? 'text-green-600' : 'text-red-600'">
                    {{ data.amount > 0 ? '+' : '' }}{{ data.amount }} грн
                  </span>
                </template>
              </Column>
              
              <Column field="status" header="Статус" sortable>
                <template #body="{ data }">
                  <Tag 
                    :value="getStatusLabel(data.status)" 
                    :severity="getStatusSeverity(data.status)"
                    size="small"
                  />
                </template>
              </Column>
              
              <Column header="Дії">
                <template #body="{ data }">
                  <div class="flex gap-2">
                    <Button
                      icon="pi pi-eye"
                      size="small"
                      text
                      @click="viewTransaction(data.id)"
                    />
                    <Button
                      icon="pi pi-download"
                      size="small"
                      text
                      @click="downloadReceipt(data.id)"
                    />
                  </div>
                </template>
              </Column>
            </DataTable>
          </template>
        </Card>
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
import Tag from 'primevue/tag'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import Paginator from 'primevue/paginator'

const router = useRouter()
const toast = useToast()

// Реактивные данные
const loading = ref(false)
const selectedType = ref(null)
const selectedStatus = ref(null)
const dateRange = ref(null)
const mobileFirst = ref(0)
const mobileItemsPerPage = ref(5)

// Опции для фильтров
const typeOptions = ref([
  { label: 'Всі типи', value: null },
  { label: 'Поповнення', value: 'topup' },
  { label: 'Підняття в топ', value: 'promotion' },
  { label: 'Платна послуга', value: 'service' },
  { label: 'Комісія', value: 'commission' }
])

const statusOptions = ref([
  { label: 'Всі статуси', value: null },
  { label: 'Успішно', value: 'success' },
  { label: 'В обробці', value: 'pending' },
  { label: 'Скасовано', value: 'cancelled' },
  { label: 'Помилка', value: 'failed' }
])

// Тестовые данные
const transactions = ref([
  {
    id: 1,
    date: new Date('2024-01-15'),
    description: 'Поповнення балансу',
    type: 'topup',
    amount: 500,
    status: 'success'
  },
  {
    id: 2,
    date: new Date('2024-01-14'),
    description: 'Підняття оголошення в топ',
    type: 'promotion',
    amount: -50,
    status: 'success'
  },
  {
    id: 3,
    date: new Date('2024-01-13'),
    description: 'Платна перевірка VIN',
    type: 'service',
    amount: -25,
    status: 'success'
  },
  {
    id: 4,
    date: new Date('2024-01-12'),
    description: 'Поповнення балансу',
    type: 'topup',
    amount: 1000,
    status: 'pending'
  },
  {
    id: 5,
    date: new Date('2024-01-11'),
    description: 'Комісія за продаж',
    type: 'commission',
    amount: -100,
    status: 'success'
  },
  {
    id: 6,
    date: new Date('2024-01-10'),
    description: 'Підняття оголошення в топ',
    type: 'promotion',
    amount: -50,
    status: 'failed'
  },
  {
    id: 7,
    date: new Date('2024-01-09'),
    description: 'Поповнення балансу',
    type: 'topup',
    amount: 300,
    status: 'success'
  },
  {
    id: 8,
    date: new Date('2024-01-08'),
    description: 'Платна послуга "Турбо продаж"',
    type: 'service',
    amount: -75,
    status: 'success'
  }
])

const filteredTransactions = ref([...transactions.value])

// Вычисляемые свойства
const totalSpent = computed(() => {
  return Math.abs(transactions.value
    .filter(t => t.amount < 0 && t.status === 'success')
    .reduce((sum, t) => sum + t.amount, 0))
})

const totalTopUps = computed(() => {
  return transactions.value
    .filter(t => t.amount > 0 && t.status === 'success')
    .reduce((sum, t) => sum + t.amount, 0)
})

const thisMonthSpent = computed(() => {
  const thisMonth = new Date().getMonth()
  const thisYear = new Date().getFullYear()
  
  return Math.abs(transactions.value
    .filter(t => {
      const tDate = new Date(t.date)
      return t.amount < 0 && 
             t.status === 'success' && 
             tDate.getMonth() === thisMonth && 
             tDate.getFullYear() === thisYear
    })
    .reduce((sum, t) => sum + t.amount, 0))
})

const transactionCount = computed(() => transactions.value.length)

const paginatedTransactions = computed(() => {
  const start = mobileFirst.value
  const end = start + mobileItemsPerPage.value
  return filteredTransactions.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredTransactions.value.length / mobileItemsPerPage.value))

// Методы
const goBack = () => {
  router.push('/profile')
}

const goToTopUp = () => {
  router.push('/profile/top-up')
}

const filterTransactions = () => {
  let filtered = [...transactions.value]
  
  if (selectedType.value) {
    filtered = filtered.filter(t => t.type === selectedType.value)
  }
  
  if (selectedStatus.value) {
    filtered = filtered.filter(t => t.status === selectedStatus.value)
  }
  
  if (dateRange.value && dateRange.value.length === 2) {
    const [startDate, endDate] = dateRange.value
    filtered = filtered.filter(t => {
      const tDate = new Date(t.date)
      return tDate >= startDate && tDate <= endDate
    })
  }
  
  filteredTransactions.value = filtered
  mobileFirst.value = 0
}

const resetFilters = () => {
  selectedType.value = null
  selectedStatus.value = null
  dateRange.value = null
  filteredTransactions.value = [...transactions.value]
  mobileFirst.value = 0
  
  toast.add({
    severity: 'info',
    summary: 'Фільтри скинуті',
    detail: 'Всі фільтри очищені',
    life: 2000
  })
}

const viewTransaction = (transactionId) => {
  toast.add({
    severity: 'info',
    summary: 'Деталі транзакції',
    detail: `Перегляд транзакції #${transactionId}`,
    life: 3000
  })
}

const downloadReceipt = (transactionId) => {
  toast.add({
    severity: 'success',
    summary: 'Завантаження',
    detail: `Квитанція для транзакції #${transactionId} завантажується`,
    life: 3000
  })
}

const exportHistory = () => {
  toast.add({
    severity: 'success',
    summary: 'Експорт',
    detail: 'Історія платежів експортується',
    life: 3000
  })
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const getTypeLabel = (type) => {
  const labels = {
    topup: 'Поповнення',
    promotion: 'Просування',
    service: 'Послуга',
    commission: 'Комісія'
  }
  return labels[type] || type
}

const getTypeSeverity = (type) => {
  const severities = {
    topup: 'success',
    promotion: 'info',
    service: 'warning',
    commission: 'secondary'
  }
  return severities[type] || 'secondary'
}

const getStatusLabel = (status) => {
  const labels = {
    success: 'Успішно',
    pending: 'В обробці',
    cancelled: 'Скасовано',
    failed: 'Помилка'
  }
  return labels[status] || status
}

const getStatusSeverity = (status) => {
  const severities = {
    success: 'success',
    pending: 'warning',
    cancelled: 'secondary',
    failed: 'danger'
  }
  return severities[status] || 'secondary'
}

onMounted(() => {
  // Сортируем транзакции по дате (новые сначала)
  transactions.value.sort((a, b) => new Date(b.date) - new Date(a.date))
  filteredTransactions.value = [...transactions.value]
})
</script>

<style scoped>
.payment-history-page {
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

.transaction-card {
  transition: all 0.2s ease;
}

.transaction-card:hover {
  transform: translateY(-2px);
}

/* Адаптивность */
@media (max-width: 768px) {
  .payment-history-page {
    padding: 0;
  }
}
</style> 