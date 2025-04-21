<template>
  <footer class="bg-primary/80 text-white py-4 px-2 lg:py-6 text-sm lg:text-md">
    <div
      class="container mx-auto flex flex-col md:flex-row md:items-start justify-between gap-4"
    >
      <!-- Marca / Información -->
      <div class="text-center md:text-left md:max-w-sm">
        <h3 class="text-lg lg:text-xl font-bold hover-animation">
          Red de Sobrevivientes de abuso Sexual Clerical
        </h3>
        <p class="mt-1 text-xs text-white/90">
          Acompañando y visibilizando a quienes han sido víctimas de violencia
          sexual clerical en Colombia.
        </p>
      </div>

      <!-- Redes Sociales -->
      <div class="text-center">
        <h4 class="font-semibold text-sm mb-1 hover-animation">
          Redes Sociales
        </h4>
        <div class="flex justify-center md:justify-start gap-2">
          <a
            href="https://www.instagram.com/redsobrevivientescol?igsh=Y3NiY3lyc2l2aHdt"
            target="_blank"
          >
            <Button
              icon="pi pi-instagram"
              class="p-button-rounded p-button-secondary !bg-transparent hover-animation !border-none !text-white"
              aria-label="Instagram"
            />
          </a>
          <!-- Ejemplo si activas Facebook más adelante -->
          <!-- <a href="https://facebook.com" target="_blank">
            <Button
              icon="pi pi-facebook"
              class="p-button-rounded p-button-secondary !bg-transparent hover-animation !border-none !text-white"
              aria-label="Facebook"
            />
          </a> -->
        </div>
      </div>

      <!-- Contacto -->
      <div class="text-center md:text-right md:max-w-xs">
        <h4 class="text-sm font-semibold mb-1 hover-animation">Contacto</h4>
        <p class="hover-animation">
          <a href="https://wa.me/573025834033/" target="_blank">
            Tel: +57 3025834033
          </a>
        </p>
        <p class="hover-animation">
          <a href="mailto:correo@direccion.com">
            Correo: correo@direccion.com
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Button from "primevue/button";
</script>

<style scoped>
.hover-animation {
  @apply hover:scale-105 transition-all duration-300;
}
</style>
