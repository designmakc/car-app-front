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
      @click="visible = true"
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
        <span class="font-bold text-xl ">{{ sellerName }}</span>
      </template>
      <div>
        <CarContactBlock
          :sellerName="''"
          :registrationDate="registrationDate"
          :location="location"
          :phoneNumber="phoneNumber"
          :isPhoneVisible="true"
          :showPanel="false"
        />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import CarContactBlock from './CarContactBlock.vue';

const props = defineProps({
  sellerName: String,
  registrationDate: String,
  location: String,
  phoneNumber: String
});

const visible = ref(false);

const maskedPhone = computed(() => {
  // Маскуємо номер як (097) XXX XX XX
  const match = props.phoneNumber.match(/(\d{3})\s?(\d{3})\s?(\d{2})\s?(\d{2})/);
  if (match) {
    return `(${match[1]}) XXX XX XX`;
  }
  return 'XXX XXX XX XX';
});
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