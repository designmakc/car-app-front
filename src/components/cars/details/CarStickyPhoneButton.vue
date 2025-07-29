<!--
/**
 * CarStickyPhoneButton.vue
 * 
 * Фіксована кнопка для мобільної версії з номером телефону продавця
 * При натисканні відкриває модальне вікно з контактною інформацією
 */
-->

<template>
  <div class="sticky-phone-btn md:hidden p-3">
    <Button 
      class="w-full p-3 shadow-3"
      severity="success"
      @click="handleOpenDialog"
    >
      {{ maskedPhone }}
    </Button>
    <Dialog
      v-model:visible="visible"
      modal
      :style="{ width: '100vw', maxWidth: '100vw', bottom: 0, left: 0 }"
      :pt="{ root: 'border-round-top-3xl', header: 'pb-0' }"
      :dismissableMask="true"
      position="bottom"
    >
      <template #header>
        <span class="font-bold text-xl">{{ sellerName }}</span>
      </template>
      <div>
        <CarContactBlock
          :sellerName="''"
          :registrationDate="registrationDate"
          :location="location"
          :phoneNumber="phoneNumber"
          :isPhoneVisible="true"
          :showPanel="false"
          @show-phone="handleShowPhone"
          @show-on-map="handleShowOnMap"
          @request-consultation="handleRequestConsultation"
          @phone-call="handlePhoneCall"
        />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
// 1. Імпорти Vue
import { ref, computed } from 'vue'

// 2. Імпорти PrimeVue компонентів
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

// 3. Імпорти локальних компонентів
import CarContactBlock from './CarContactBlock.vue'

// 4. Props компонента
const props = defineProps({
  sellerName: {
    type: String,
    default: ''
  },
  registrationDate: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  phoneNumber: {
    type: String,
    required: true
  }
})

// 5. Events з типізацією
const emit = defineEmits({
  'show-phone': null,
  'show-on-map': null,
  'request-consultation': null,
  'phone-call': (type) => ['private', 'market'].includes(type),
  'dialog-open': null,
  'dialog-close': null
})

// 6. Reactive стан
const visible = ref(false)

// 7. Computed властивості
const maskedPhone = computed(() => {
  if (!props.phoneNumber) return 'XXX XXX XX XX'
  
  try {
    // Маскуємо номер як (097) XXX XX XX
    const match = props.phoneNumber.match(/(\d{3})\s?(\d{3})\s?(\d{2})\s?(\d{2})/)
    if (match) {
      return `(${match[1]}) XXX XX XX`
    }
    return 'XXX XXX XX XX'
  } catch (error) {
    console.warn('Error masking phone:', error)
    return 'XXX XXX XX XX'
  }
})

// 8. Event handlers
const handleOpenDialog = () => {
  visible.value = true
  emit('dialog-open')
}

const handleShowPhone = () => {
  emit('show-phone')
}

const handleShowOnMap = () => {
  emit('show-on-map')
}

const handleRequestConsultation = () => {
  emit('request-consultation')
}

const handlePhoneCall = (type) => {
  emit('phone-call', type)
}
</script>

<style scoped>
.sticky-phone-btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 70px;
  z-index: 1000;
}
</style> 