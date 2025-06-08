<template>
  <MainLayout>
    <div class="notifications-page pt-4">
      <!-- Мобильный хедер -->
      <div class="mobile-header md:hidden">
        <Button 
          icon="pi pi-arrow-left" 
          text 
          class="text-white"
          @click="goBack"
        />
        <h1 class="text-xl font-semibold text-white m-0">Сповіщення</h1>
        <Button 
          icon="pi pi-check-circle" 
          text 
          class="text-white"
          @click="markAllAsRead"
        />
      </div>

      <!-- Десктопный заголовок -->
      <div class="hidden md:flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="text-3xl font-bold text-900 m-0">Сповіщення</h1>
          <p class="text-600 mt-2 mb-0">Всі ваші повідомлення та оновлення</p>
        </div>
        <div class="flex gap-2">
          <Button
            label="Позначити всі як прочитані"
            severity="secondary"
            outlined
            icon="pi pi-check"
            @click="markAllAsRead"
          />
          <Button
            label="Очистити всі"
            severity="danger"
            outlined
            icon="pi pi-trash"
            @click="clearAllNotifications"
          />
        </div>
      </div>

      <!-- Фильтры -->
      <div class="mb-4">
        <div class="flex gap-2 overflow-x-auto pb-2">
          <Button
            :label="`Всі ${totalNotifications}`"
            :severity="activeFilter === 'all' ? 'primary' : 'secondary'"
            :outlined="activeFilter !== 'all'"
            size="small"
            @click="setFilter('all')"
          />
          <Button
            :label="`Непрочитані ${unreadCount}`"
            :severity="activeFilter === 'unread' ? 'primary' : 'secondary'"
            :outlined="activeFilter !== 'unread'"
            size="small"
            @click="setFilter('unread')"
          />
          <Button
            :label="`Прочитані ${readCount}`"
            :severity="activeFilter === 'read' ? 'primary' : 'secondary'"
            :outlined="activeFilter !== 'read'"
            size="small"
            @click="setFilter('read')"
          />
        </div>
      </div>

      <!-- Список уведомлений -->
      <div class="notifications-content">
        <div v-if="filteredNotifications.length === 0" class="text-center py-8">
          <i class="pi pi-bell-slash text-6xl text-400 mb-4"></i>
          <h3 class="text-xl font-semibold text-600 mb-2">Немає сповіщень</h3>
          <p class="text-600">Тут з'являться ваші повідомлення та оновлення</p>
        </div>

        <div v-else class="flex flex-column gap-3">
          <Card 
            v-for="notification in filteredNotifications" 
            :key="notification.id"
            class="notification-card cursor-pointer transition-all transition-duration-200 hover:shadow-3"
            :class="{ 'unread': !notification.read }"
            @click="markAsRead(notification.id)"
          >
            <template #content>
              <div class="flex gap-3 p-2">
                <div class="notification-icon flex-shrink-0">
                  <Avatar
                    :icon="getNotificationIcon(notification.type)"
                    :style="getNotificationIconStyle(notification.type)"
                    size="large"
                  />
                </div>
                
                <div class="flex-1">
                  <div class="flex justify-content-between align-items-start mb-2">
                    <h4 class="text-lg font-semibold text-900 m-0">{{ notification.title }}</h4>
                    <div class="flex align-items-center gap-2">
                      <small class="text-600">{{ formatDate(notification.date) }}</small>
                      <div 
                        v-if="!notification.read" 
                        class="w-2rem h-2rem bg-primary border-circle flex align-items-center justify-content-center"
                      >
                        <i class="pi pi-circle-fill text-xs text-white"></i>
                      </div>
                    </div>
                  </div>
                  
                  <p class="text-600 mb-3 line-height-3">{{ notification.message }}</p>
                  
                  <div class="flex justify-content-between align-items-center">
                    <Tag 
                      :value="getNotificationTypeLabel(notification.type)" 
                      :severity="getNotificationSeverity(notification.type)"
                      size="small"
                    />
                    
                    <Button
                      v-if="notification.actionLabel"
                      :label="notification.actionLabel"
                      size="small"
                      text
                      @click.stop="handleNotificationAction(notification)"
                    />
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>

      <!-- Пагинация (для десктопа) -->
      <div v-if="totalPages > 1" class="hidden md:flex justify-content-center mt-6">
        <Paginator
          :rows="itemsPerPage"
          :totalRecords="filteredNotifications.length"
          v-model:first="first"
        />
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
import Tag from 'primevue/tag'
import Avatar from 'primevue/avatar'
import Paginator from 'primevue/paginator'

const router = useRouter()
const toast = useToast()

// Реактивные данные
const activeFilter = ref('all')
const first = ref(0)
const itemsPerPage = ref(10)

// Тестовые данные
const notifications = ref([
  {
    id: 1,
    title: 'Нове повідомлення від покупця',
    message: 'Користувач Олександр залишив повідомлення щодо вашого Volkswagen Golf Plus 2009',
    type: 'message',
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 минут назад
    read: false,
    actionLabel: 'Переглянути'
  },
  {
    id: 2,
    title: 'Оголошення схвалено',
    message: 'Ваше оголошення "Ford Fusion 2016" успішно пройшло модерацію та опубліковано',
    type: 'approval',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 часа назад
    read: false,
    actionLabel: 'Переглянути'
  },
  {
    id: 3,
    title: 'Нагадування про оплату',
    message: 'Не забудьте поповнити баланс для підняття оголошення в топ',
    type: 'reminder',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 день назад
    read: true,
    actionLabel: 'Поповнити'
  },
  {
    id: 4,
    title: 'Новий відгук',
    message: 'Покупець залишив позитивний відгук про угоду',
    type: 'review',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 дня назад
    read: true,
    actionLabel: 'Переглянути'
  },
  {
    id: 5,
    title: 'Системне повідомлення',
    message: 'Оновлення умов використання платформи',
    type: 'system',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 дня назад
    read: true,
    actionLabel: 'Детальніше'
  },
  {
    id: 6,
    title: 'Запит на перегляд',
    message: 'Користувач хоче переглянути ваш автомобіль завтра о 14:00',
    type: 'appointment',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 дня назад
    read: true,
    actionLabel: 'Підтвердити'
  }
])

// Вычисляемые свойства
const totalNotifications = computed(() => notifications.value.length)
const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)
const readCount = computed(() => notifications.value.filter(n => n.read).length)

const filteredNotifications = computed(() => {
  let filtered = notifications.value
  
  if (activeFilter.value === 'unread') {
    filtered = filtered.filter(n => !n.read)
  } else if (activeFilter.value === 'read') {
    filtered = filtered.filter(n => n.read)
  }
  
  return filtered
})

const totalPages = computed(() => Math.ceil(filteredNotifications.value.length / itemsPerPage.value))

// Методы
const goBack = () => {
  router.push('/profile')
}

const setFilter = (filter) => {
  activeFilter.value = filter
  first.value = 0
}

const markAsRead = (notificationId) => {
  const notification = notifications.value.find(n => n.id === notificationId)
  if (notification && !notification.read) {
    notification.read = true
    toast.add({
      severity: 'success',
      summary: 'Позначено як прочитане',
      detail: 'Сповіщення позначено як прочитане',
      life: 2000
    })
  }
}

const markAllAsRead = () => {
  const unreadNotifications = notifications.value.filter(n => !n.read)
  unreadNotifications.forEach(n => n.read = true)
  
  if (unreadNotifications.length > 0) {
    toast.add({
      severity: 'success',
      summary: 'Всі позначені як прочитані',
      detail: `${unreadNotifications.length} сповіщень позначено як прочитані`,
      life: 3000
    })
  }
}

const clearAllNotifications = () => {
  notifications.value = []
  toast.add({
    severity: 'info',
    summary: 'Сповіщення очищені',
    detail: 'Всі сповіщення видалені',
    life: 3000
  })
}

const handleNotificationAction = (notification) => {
  toast.add({
    severity: 'info',
    summary: 'Дія виконана',
    detail: `${notification.actionLabel} для: ${notification.title}`,
    life: 3000
  })
}

const getNotificationIcon = (type) => {
  const icons = {
    message: 'pi pi-envelope',
    approval: 'pi pi-check-circle',
    reminder: 'pi pi-clock',
    review: 'pi pi-star',
    system: 'pi pi-cog',
    appointment: 'pi pi-calendar'
  }
  return icons[type] || 'pi pi-bell'
}

const getNotificationIconStyle = (type) => {
  const styles = {
    message: { backgroundColor: '#3b82f6', color: 'white' },
    approval: { backgroundColor: '#10b981', color: 'white' },
    reminder: { backgroundColor: '#f59e0b', color: 'white' },
    review: { backgroundColor: '#8b5cf6', color: 'white' },
    system: { backgroundColor: '#6b7280', color: 'white' },
    appointment: { backgroundColor: '#ef4444', color: 'white' }
  }
  return styles[type] || { backgroundColor: 'var(--primary-color)', color: 'white' }
}

const getNotificationTypeLabel = (type) => {
  const labels = {
    message: 'Повідомлення',
    approval: 'Схвалення',
    reminder: 'Нагадування',
    review: 'Відгук',
    system: 'Система',
    appointment: 'Зустріч'
  }
  return labels[type] || 'Сповіщення'
}

const getNotificationSeverity = (type) => {
  const severities = {
    message: 'info',
    approval: 'success',
    reminder: 'warning',
    review: 'secondary',
    system: 'secondary',
    appointment: 'danger'
  }
  return severities[type] || 'info'
}

const formatDate = (date) => {
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
</script>

<style scoped>
.notifications-page {
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

.notification-card {
  transition: all 0.2s ease;
}

.notification-card:hover {
  transform: translateY(-2px);
}

.notification-card.unread {
  border-left: 4px solid var(--primary-color);
  background: var(--primary-50);
}

.notification-icon {
  flex-shrink: 0;
}

/* Адаптивность */
@media (max-width: 768px) {
  .notifications-page {
    padding: 0;
  }
}
</style> 