<template>
  <div class="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
    <h1
      class="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-8 text-primary"
    >
      ¡APRENDE A IDENTIFICAR Y PREVENIR EL ABUSO SEXUAL CLERICAL!
    </h1>
    <div class="masonry-container h-full">
      <div v-for="(url, idx) in imageUrls" :key="idx" class="masonry-item">
        <!-- PrimeVue Image with preview enabled -->
        <Image
          :src="url"
          alt="Masonry Image"
          preview
          class="w-full block rounded-lg"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Image from "primevue/image";

// Lista inicial de URLs de imágenes
const imageUrls = ref<string[]>([
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/5.jpg",
]);
</script>

<style scoped>
.masonry-container {
  display: grid;
  gap: 24px;
  grid-auto-flow: dense;
  grid-template-columns: 1fr;
  align-items: start;
}

/* 2 columnas en pantallas medianas */
@media (min-width: 640px) {
  .masonry-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Máximo 3 columnas en pantallas grandes */
@media (min-width: 1124px) {
  .masonry-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

.masonry-item {
  padding: 4px;
}

/* Offset tipo ladrillo sólo en columnas múltiples */
@media (min-width: 640px) {
  .masonry-item:nth-child(3n + 2) {
    margin-top: 32px;
  }
}

.masonry-item img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 0.5rem;
}
</style>
