<!--
/**
 * MetaHead.vue
 * 
 * Компонент для управління SEO метаданими в Inertia.js SSR
 * Використовується в кожній сторінці для встановлення title, description та keywords
 */
-->

<template>
  <Head>
    <title>{{ title }}</title>
    <meta name="description" :content="description" />
    <meta name="keywords" :content="keywords" />
    <meta name="robots" :content="robots" />
    
    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" :content="ogTitle || title" />
    <meta property="og:description" :content="ogDescription || description" />
    <meta property="og:image" :content="ogImage" v-if="ogImage" />
    <meta property="og:url" :content="ogUrl" v-if="ogUrl" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" :content="twitterTitle || title" />
    <meta name="twitter:description" :content="twitterDescription || description" />
    <meta name="twitter:image" :content="twitterImage || ogImage" v-if="twitterImage || ogImage" />
    
    <!-- Additional meta tags -->
    <meta name="author" content="Car Market" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Canonical URL -->
    <link rel="canonical" :href="canonicalUrl" v-if="canonicalUrl" />
  </Head>
</template>

<script setup>
// 1. Імпорти Inertia
import { Head } from '@inertiajs/vue3'

// 2. Props компонента
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'Car Market - продаж та купівля автомобілів в Україні'
  },
  keywords: {
    type: String,
    default: 'автомобілі, продаж авто, купити авто, car market, ukraine'
  },
  robots: {
    type: String,
    default: 'index, follow'
  },
  
  // Open Graph
  ogTitle: {
    type: String,
    default: ''
  },
  ogDescription: {
    type: String,
    default: ''
  },
  ogImage: {
    type: String,
    default: ''
  },
  ogUrl: {
    type: String,
    default: ''
  },
  
  // Twitter
  twitterTitle: {
    type: String,
    default: ''
  },
  twitterDescription: {
    type: String,
    default: ''
  },
  twitterImage: {
    type: String,
    default: ''
  },
  
  // Canonical
  canonicalUrl: {
    type: String,
    default: ''
  }
})
</script> 