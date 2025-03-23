<template>
  <div class="relative w-full h-full">
    <img
      v-show="!loading"
      :src="computedSrc"
      :alt="alt"
      @load="loading = false"
      @error="handleError"
      :class="imageClass ?? 'w-full h-full object-contain'"
    />
    <Skeleton
      v-if="loading"
      class="absolute top-0 left-0 !w-full !h-full"
      :class="imageClass"
    />
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from "primevue";
import { ref, computed, watch } from "vue";

const loading = ref(true);
const imageSrc = ref<string | null>(null);

const props = defineProps<{
  alt?: string;
  src: string | null;
  imageClass?: string;
}>();

// Computa la fuente de la imagen dependiendo de errores o si no se proporcionó src
const computedSrc = computed(() => imageSrc.value);

// Observa cambios en la prop `src` y reinicia la carga de la imagen
watch(
  () => props.src,
  (newSrc) => {
    if (newSrc) {
      imageSrc.value = newSrc;
      loading.value = true;
    }
  },
  { immediate: true },
);

// Manejo de error para asignar "/noimage.webp" en caso de falla
const handleError = () => {
  imageSrc.value = "/noimage.webp";
  loading.value = false;
};
</script>
