<template>
  <div>
    <Sliders class="my-3" :service="service" :filters="[]" :orders="[]">
      <!-- Cabecera personalizada -->
      <template #header>
        <h1
          class="text-md lg:text-3xl text-center font-semibold text-primary"
          id="about_us"
        >
          Conoce a los miembros de nuestro Staff
        </h1>
      </template>

      <!-- Ítem: toda la tarjeta es un enlace -->
      <template #item="{ item }">
        <a
          :href="item.profile_link"
          target="_blank"
          rel="noopener noreferrer"
          class="block overflow-hidden rounded-lg relative group"
        >
          <img
            :src="item.picture"
            alt="Foto de {{ item.name }}"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <!-- Overlay: siempre visible en móvil, solo en hover en escritorio -->
          <div
            class="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white p-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
          >
            <h6 class="text-lg font-bold">{{ item.name }}</h6>
            <h6 class="text-sm">{{ item.speciality }}</h6>
          </div>
        </a>
      </template>
    </Sliders>
  </div>
</template>

<script setup lang="ts">
import { useStaffMemberService } from "@/composables/StaffMembers/useStaffMembers";
import Sliders from "@/components/Sliders.vue";

const service = useStaffMemberService();
</script>

<style scoped>
/* Imagen escala en hover solo en escritorio */
@media (min-width: 768px) {
  .group:hover img {
    transform: scale(1.1);
  }
}
</style>
