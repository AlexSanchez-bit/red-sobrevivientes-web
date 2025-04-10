<template>
  <div class="flex justify-center">
    <div
      class="relative flex items-center bg-gray-200 rounded-full p-1 shadow-inner w-[220px] h-[48px] cursor-pointer"
    >
      <!-- Fondo animado -->
      <div
        class="absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] bg-primary text-white rounded-full transition-all duration-300"
        :class="selected === 'descubre' ? 'translate-x-full' : ''"
      ></div>

      <!-- Botones -->
      <button
        class="flex-1 z-10 text-sm font-semibold transition-colors duration-300 rounded-full"
        :class="selected === 'explora' ? 'text-white' : 'text-primary'"
        @click="selected = 'explora'"
      >
        Explora
      </button>
      <button
        class="flex-1 z-10 text-sm font-semibold transition-colors duration-300 rounded-full"
        :class="selected === 'descubre' ? 'text-white' : 'text-primary'"
        @click="selected = 'descubre'"
      >
        Descubre
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const selected = ref<string>("explora");

const emit = defineEmits<{
  (e: "selected", value: string): void;
}>();

watch(selected, (nv) => {
  emit("selected", nv);
});
</script>
