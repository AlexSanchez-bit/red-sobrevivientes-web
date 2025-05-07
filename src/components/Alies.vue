<template>
  <div id="alies" class="-translate-y-96"></div>
  <section class="my-8">
    <h2 class="text-2xl font-bold text-center mb-6 px-4">Nuestros Aliados</h2>
    <div class="flex flex-wrap justify-center gap-4 px-4">
      <a :href="alie.link" target="_blank" rel="noopener noreferrer" v-for="alie in allies" :key="alie.name"
        class="flex items-center p-3 rounded-lg transition hover:shadow-md bg-white">
        <img :src="alie.icon" alt="Logo" class="w-12 h-12 sm:w-16 sm:h-16 object-contain mr-2" />
        <div>
          <h3 class="text-base sm:text-lg font-semibold">{{ alie.name }}</h3>
          <!-- Tamaño de texto responsive -->
          <p class="text-xs sm:text-sm flex items-center">{{ alie.link.split('://')[1] }}</p>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAlliesService } from '@/composables/Allies/useAlliesService';
import type { IAllies } from '@/services/Allies/Allies.service';
import { Pagination } from '@/utils/entities/Pagination';
import { onMounted, ref } from 'vue';

const allies = ref<IAllies[]>([])
const service = useAlliesService()

onMounted(async () => {
  const resp = await service.getAll([], new Pagination(0, 100), [])
  if (resp) {
    allies.value = resp
  }
})
</script>

<style scoped>
/* Si quieres que todo tenga una transición más suavecita */
a {
  transition: all 0.3s ease;
}
</style>
