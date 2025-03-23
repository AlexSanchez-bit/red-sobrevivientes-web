<template>
  <footer class="bg-yellow-50 text-black py-3 px-2 lg:p-6 text-md">
    <div
      class="container mx-auto flex flex-col gap-1 md:flex-row justify-between items-center"
    >
      <!-- Sección de marca/información -->
      <div class="md:mb-0 text-sm text-center md:text-left">
        <h3 class="text-md lg:text-xl font-bold hover-animation">
          Red de Sobrevivientes Colombia
        </h3>
      </div>

      <!-- Sección de redes sociales -->
      <div class="md:mb-0 text-center">
        <h4 class="font-semibold text-sm mb-0 hover-animation">
          Redes Sociales
        </h4>
        <div class="flex justify-center gap-1">
          <Button
            icon="pi pi-facebook"
            size="normal"
            class="p-button-rounded p-button-secondary !bg-transparent hover-animation"
            aria-label="Facebook"
          />
          <Button
            icon="pi pi-instagram"
            class="p-button-rounded p-button-secondary !bg-transparent hover-animation"
            aria-label="Instagram"
          />
        </div>
      </div>

      <!-- Sección de información de contacto -->
      <div class="text-center md:text-right">
        <h4 class="text-sm font-semibold hover-animation">Contacto</h4>
        <a href="https://wa.me/5350273412/">
          <p class="text-sm hover-animation">Tel: +53 50272812</p>
        </a>
        <a href="mailto.funalo@gmail.com">
          <p class="text-sm hover-animation">Correo: correo@direccion.com</p>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Button from "primevue/button";
</script>

<style scoped>
.hover-animation {
  /* Opcional: puedes ajustar los colores o agregar más estilos personalizados */
  @apply hover:scale-105;
  @apply transition-all;
  @apply duration-300;
}
</style>
