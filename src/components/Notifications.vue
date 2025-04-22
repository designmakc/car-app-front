<template>
  <div class="flex flex-column gap-3">
    <!-- Info notification -->
    <Message severity="info" :closable="true" class="w-full">
      <div class="flex align-items-center">
      <i class="pi pi-bell text-xl"></i>
      <span class="text-sm font-normal">Зареєструйтеся щоб зберегти історію пошуку</span>
      </div>
    </Message>

    <!-- Error notification -->
    <Message severity="error" :closable="true" class="w-full">
      <div class="flex align-items-center">
      <i class="pi pi-exclamation-triangle pi-cog text-xl"></i>
        <span class="text-sm font-normal">Повідомлення про помилку</span>
      </div>
    </Message>

    <!-- Warning notification -->
    <Message severity="warn" :closable="true" class="w-full">
      <div class="flex align-items-center">
      <i class="pi pi-exclamation-circle pi-cog text-xl"></i>
      <span class="text-sm font-normal">Важливе повідомлення</span>
      </div>
    </Message>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Message from 'primevue/message'
</script>

<style>
.p-message {
  margin: 0;
  padding: 0.75rem;
}

.pi {
  margin-right: 0.5rem;
}
</style> 