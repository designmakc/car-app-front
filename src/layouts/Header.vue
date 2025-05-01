<template>
  <div class="header-wrapper surface-900 w-full">
    <div class="container">
      <!-- Desktop Header -->
      <div class="hidden lg:flex justify-content-between align-items-center py-4 ">
        
        <div class="flex align-items-center gap-4">
          <router-link to="/" class="no-underline flex align-items-center">
            <img src="@/assets/logo-orang2.svg" alt="CarMarket Logo" height="40" />
          </router-link>
          <span class="text-500 font-base text-sm ">Авторинок<br>без меж ©</span>
        </div>

        <nav class="flex gap-4 align-items-center font-base font-normal text-sm font-weight-400">
          <IconField>
              <InputIcon class="pi pi-search" />
              <InputText v-model="value1" placeholder="Пошук по каталогу" size="large"/>
          </IconField>
          
          <div class="flex gap-2 align-items-center">
            <Button label="Обране" icon="pi pi-heart-fill" class="p-button-rounded p-button-outlined border-2 border-primary text-white hover:surface-800" badge="1" badgeSeverity="success" aria-label="Обране" />
            <!-- <Button label="Увійти" icon="pi pi-user" class="p-button-rounded p-button-primary " /> -->
            <Button icon="pi pi-user" severity="success" rounded aria-label="Мій кабінет" />
          </div>
        </nav>
        
        
      </div>
      
        
      

      <!-- Tablet Header -->
      <div class="hidden md:flex lg:hidden justify-content-between align-items-center py-2">
        <div class="flex align-items-center">
          <router-link to="/" class="no-underline">
            <img src="@/assets/logo-orang2.svg" alt="CarMarket Logo" height="32" />
          </router-link>
        </div>

        <div class="flex gap-2 align-items-center">
          <Button icon="pi pi-heart" class="p-button-rounded p-button-outlined border-1 border-gray-700 text-500 hover:surface-800" aria-label="Обране" />
          <Button label="Увійти" class="p-button-rounded p-button-warning" />
          <Button icon="pi pi-bars" class="p-button-rounded p-button-text text-500 hover:text-white" aria-label="Меню" />
        </div>
      </div>

      <!-- Mobile Header -->
      <div class="flex md:hidden justify-content-between align-items-center py-2">
        <router-link to="/" class="no-underline">
          <img src="@/assets/logo-orang2.svg" alt="CarMarket Logo" height="28" />
        </router-link>

        <div class="flex gap-2 align-items-center">
          <Button label="Увійти" class="p-button-rounded p-button-warning text-sm" />
          <Button icon="pi pi-bars" class="p-button-rounded p-button-text text-500 hover:text-white" aria-label="Меню" />
        </div>
      </div>
    
    </div>
    
    <!-- Menubar на всю ширину з контейнером всередині -->
    <div class="w-full bg-primary-200">
      <div class="menubar-wrapper max-w-7xl box-border">
        <Menubar
          :model="items"
          class="border-none shadow-none bg-transparent"
        >
          <template #item="{ item, props, hasSubmenu, root }">
            <a v-ripple class="flex items-center" v-bind="props.action">
              <span :class="item.icon" class="text-orange-900 mr-2" />
              <span class="text-orange-900 ">{{ item.label }}</span>
              <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]" />
            </a>
          </template>
        </Menubar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'

const items = [
  {
    label: 'Головна',
    icon: 'pi pi-home'
  },
  {
    label: 'Контакти',
    icon: 'pi pi-phone'
  }
]
</script>

<style scoped>


.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
}


.menubar-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 0rem;  
  box-sizing: border-box;
}

@media screen and (max-width: 576px) {
  .container {
    padding: 0 1.5rem;
  }
}

/* Стилі для кнопок */


:deep(.p-button.p-button-text:hover) {
  background: transparent;
}



/* Стилі для логотипу */
.no-underline {
  transition: opacity 0.2s ease;
}

.no-underline:hover {
  opacity: 0.8;
}

.no-underline:focus {
  outline: none;
  box-shadow: none;
}


</style> 