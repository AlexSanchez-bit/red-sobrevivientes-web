<template>
  <section class="py-16 bg-gray-50">
    <div class="max-w-5xl mx-auto px-4 text-center">
      <!-- Título -->
      <h2 class="text-4xl font-extrabold mb-4 text-gray-800">Quienes Somos</h2>
      <!-- Descripción -->
      <p class="text-gray-600 mb-12">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
        quis sem at nibh elementum imperdiet. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed
        cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
        imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed
        nisi. Nulla quis sem at nibh elementum imperdiet. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
        Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
        imperdiet. imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
        Sed nisi. Nulla quis sem at nibh elementum imperdiet. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
        libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh
        elementum imperdiet. imperdiet. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante
        dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
        quis sem at nibh elementum imperdiet. imperdiet. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
        Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
        imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed
        nisi. Nulla quis sem at nibh elementum imperdiet.
      </p>
      <!-- Grid de imágenes -->
      <!-- <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6"> -->
      <!--   <div -->
      <!--     v-for="(img, idx) in images" -->
      <!--     :key="idx" -->
      <!--     class="overflow-hidden rounded-xl shadow-lg" -->
      <!--   > -->
      <!--     <img -->
      <!--       :src="img" -->
      <!--       :alt="`Persona ${idx + 1}`" -->
      <!--       class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105" -->
      <!--     /> -->
      <!--   </div> -->
      <!-- </div> -->
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const images = ref([
  // Reemplaza estas URLs por las imágenes que encuentres en Google
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/46.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
  "https://randomuser.me/api/portraits/men/68.jpg",
  "https://randomuser.me/api/portraits/women/12.jpg",
]);
</script>

<style scoped>
/* Si quieres un borde suave alrededor de cada imagen */
img {
  border: 2px solid #e5e7eb; /* gris claro */
}
</style>
