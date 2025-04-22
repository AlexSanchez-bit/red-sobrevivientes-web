<template>
  <footer class="bg-primary/80 text-white py-4 px-2 lg:py-6 text-sm lg:text-md">
    <div class="container mx-auto grid lg:grid-cols-3 gap-4 grid-cols-1">
      <!-- Marca / Información -->
      <div class="text-center md:text-left md:max-w-sm">
        <h3 class="text-lg font-bold hover-animation">
          RED DE SOBREVIVIENTES DE ABUSO SEXUAL CLERICAL
        </h3>
        <p class="mt-1 text-sm text-white/90">
          DENUNCIA A LA IGLESIA NO EN LA IGLESIA
        </p>
      </div>

      <!-- Redes Sociales -->
      <div
        class="text-center flex flex-col justify-center items-center md:justify-start"
      >
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
          <a href="https://x.com/Sobrevivien_Col" target="_blank">
            <Button
              icon="pi pi-twitter"
              class="p-button-rounded p-button-secondary !bg-transparent hover-animation !border-none !text-white"
              aria-label="X"
            />
          </a>
        </div>
      </div>

      <!-- Contacto -->
      <div class="text-center md:text-right md:max-w-xs">
        <h4 class="text-sm font-semibold mb-1 hover-animation">Contacto</h4>
        <p class="hover-animation">
          <a href="https://wa.me/573025834033/" target="_blank">
            Tel: +57 302 5834033
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
