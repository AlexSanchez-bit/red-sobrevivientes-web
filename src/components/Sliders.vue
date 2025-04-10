<template>
  <div ref="container" class="h-20" v-if="!onscreen" />

  <div
    v-if="loading || promotions.length > 0"
    class="transition-all duration-1000 ease-in-out"
    :class="{
      'translate-y-full opacity-0': !onscreen,
      'translate-y-0 opacity-100': onscreen,
    }"
  >
    <slot name="header"></slot>

    <!-- Carrusel de carga con Skeleton (mientras loading es true) -->
    <swiper-container
      v-if="loading"
      :loop="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      }"
      :breakpoints="breakpoints ?? default_bp"
      :pagination="{
        clickable: true,
        dynamicBullets: true,
      }"
      :navigation="true"
      class="min-h-80 w-full"
    >
      <swiper-slide v-for="(item, index) in skeletonItems" :key="index">
        <div class="relative w-full h-[26rem]">
          <Skeleton class="!h-80" />
        </div>
      </swiper-slide>
    </swiper-container>

    <!-- Carrusel de promociones (cuando loading es false) -->
    <swiper-container
      v-else
      :loop="true"
      :autoplay="{
        delay: promotions.length > 3 ? 3000 : 10000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      }"
      :breakpoints="breakpoints ?? default_bp"
      :pagination="{
        clickable: true,
        dynamicBullets: true,
      }"
      :navigation="true"
      class="w-full"
    >
      <swiper-slide v-for="(promotion, index) in promotions" :key="index">
        <div class="w-full">
          <slot name="item" :item="promotion"></slot>
        </div>
      </swiper-slide>

      <!-- Botones de navegación y paginación -->
      <swiper-button-prev class="custom-prev">
        <template #button-prev>
          <i class="fas fa-chevron-left"></i>
          a
        </template>
      </swiper-button-prev>
      <swiper-button-next slot="button-next" class="custom-next">
        <i class="fas fa-chevron-right"></i>
      </swiper-button-next>
      <swiper-pagination slot="pagination"></swiper-pagination>
    </swiper-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRefs } from "vue";
import Skeleton from "primevue/skeleton";
import { ListerService } from "@/utils/service/TableService";
import { Pagination } from "@/utils/entities/Pagination";
import type { Sorter } from "@/utils/entities/Sorters";
import { Filter } from "@/utils/entities/Filter";

const loading = ref(true);
const onscreen = ref(false);
const container = ref<HTMLElement | null>(null);

const props = defineProps<{
  service: ListerService<any>;
  filters: Filter[];
  orders: Sorter[];
  breakpoints?: any;
}>();

// Breakpoints para el slider:

const default_bp = {
  0: {
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: false,
  },
  // Móvil grande (540px - 767px)
  540: {
    slidesPerView: 1,
    spaceBetween: 15,
  },
  650: {
    slidesPerView: 1.2,
    spaceBetween: 15,
  },
  // Tablet pequeña (768px - 991px)
  700: {
    slidesPerView: 1.4,
    spaceBetween: 20,
  },
  800: {
    slidesPerView: 1.7,
    spaceBetween: 20,
  },
  // Tablet grande (992px - 1199px)
  992: {
    slidesPerView: 2.2,
    spaceBetween: 25,
  },
  // Desktop pequeño (1200px - 1439px)
  1000: {
    slidesPerView: 2,
    spaceBetween: 30,
  },
  1200: {
    slidesPerView: 2.4,
    spaceBetween: 30,
  },
  // Desktop medio (1440px - 1679px)
  1440: {
    slidesPerView: 2.8,
    spaceBetween: 35,
  },
  // Desktop grande (1680px - 1919px)
  1680: {
    slidesPerView: 3.4,
    spaceBetween: 40,
  },
  // Pantallas extra grandes (1920px+)
  1920: {
    slidesPerView: 4,
    spaceBetween: 45,
  },
  2000: {
    slidesPerView: 4.8,
    spaceBetween: 45,
  },
};

// Array donde se almacenan las promociones
const promotions = ref<any[]>([]);

// Array estático para los Skeleton items
const skeletonItems = [1, 2, 3, 4, 5, 6];

onMounted(async () => {
  // IntersectionObserver para activar la animación cuando el contenedor entra en pantalla
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        onscreen.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.9 },
  );

  if (container.value) {
    observer.observe(container.value);
  }

  // Llamada al servicio para obtener las promociones
  loading.value = true;

  const resp = await props.service.getAll(
    props.filters,
    new Pagination(0, 10),
    props.orders,
  );
  loading.value = false;
  if (resp) {
    promotions.value = resp;
  }
});
</script>

<style scoped>
/* Aseguramos que el contenedor de Swiper ocupe el 100% del ancho */
swiper-container {
  width: 100%;
}

/* Eliminamos el width forzado en cada slide para que Swiper lo calcule */
swiper-slide {
  /* Sin reglas forzadas de ancho */
}

/* Para móviles, forzamos que cada slide tenga el 100% del ancho */
@media (max-width: 575px) {
  swiper-slide {
    width: 100% !important;
  }
}
</style>
