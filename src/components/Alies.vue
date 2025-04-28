<template>
  <div id="alies" class="-translate-y-96"></div>
  <section class="my-8">
    <h2 class="text-2xl font-bold text-center mb-6 px-4">Nuestros Aliados</h2>
    <div class="flex flex-wrap justify-center gap-4 px-4">
      <a
        href="https://hipfunds.org"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center p-3 rounded-lg transition hover:shadow-md bg-white"
      >
        <div class="mr-2">
          <svg
            class="w-12 h-12 sm:w-16 sm:h-16"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="48" height="48" fill="white" />
            <path d="M5.33852 0H0V47.9999H5.33852V0Z" fill="#FF5D15" />
            <path d="M48 0H42.6615V47.9999H48V0Z" fill="#FF5D15" />
            <path d="M16.0223 0H10.6837V15.9557H16.0223V0Z" fill="#FF5D15" />
            <path d="M37.3832 0H32.0447V15.9557H37.3832V0Z" fill="#FF5D15" />
            <path d="M26.699 0H21.3605V5.3385H26.699V0Z" fill="#FF5D15" />
            <path
              d="M0 21.3006L0 26.6391L45.7664 26.6391V21.3006L0 21.3006Z"
              fill="#FF5D15"
            />
            <path
              d="M10.6837 10.6832V16.0217H37.3896V10.6832L10.6837 10.6832Z"
              fill="#FF5D15"
            />
            <path d="M32.0446 48H37.3831V32.0443H32.0446V48Z" fill="#FF5D15" />
            <path
              d="M10.6836 48H16.0221L16.0221 32.0443H10.6836L10.6836 48Z"
              fill="#FF5D15"
            />
            <path d="M21.3673 48H26.7059V42.6615H21.3673V48Z" fill="#FF5D15" />
            <path
              d="M37.3831 37.316V31.9775H10.6772V37.316H37.3831Z"
              fill="#FF5D15"
            />
          </svg>
        </div>
        <div>
          <h3 class="text-base sm:text-lg font-semibold">HIP Funds</h3>
          <!-- Tamaño de texto responsive -->
          <p class="text-xs sm:text-sm flex items-center">hipfunds.org</p>
        </div>
      </a>

      <a
        href="https://home.crin.org"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center p-3 rounded-lg transition hover:shadow-md bg-white"
      >
        <img
          src="https://images.squarespace-cdn.com/content/v1/5afadb22e17ba3eddf90c02f/1550581953048-JEOCLCQLF0JT37081BR6/favicon.ico?format=100w"
          alt="Logo de CRIN"
          class="w-12 h-12 sm:w-16 sm:h-16 object-contain mr-2"
        />
        <div>
          <h3 class="text-base sm:text-lg font-semibold">CRIN</h3>
          <!-- Tamaño de texto responsive -->
          <p class="text-xs sm:text-sm flex items-center">home.crin.org</p>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
/* Si quieres que todo tenga una transición más suavecita */
a {
  transition: all 0.3s ease;
}
</style>
