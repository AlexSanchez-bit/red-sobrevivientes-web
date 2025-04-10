<script setup lang="ts">
import { usePromotionService } from "@/composables/Promotion/usePromotionService";
import type { IPromotion } from "@/services/Promotion/Promotion.service";
import { Pagination } from "@/utils/entities/Pagination";
import { Skeleton } from "primevue";
import Carousel from "primevue/carousel";
import { onMounted, ref } from "vue";

const service = usePromotionService();

const promotions = ref<Partial<IPromotion>[]>([{ image: "full.jpeg" }]);

import { FilterMatchMode } from "@primevue/core/api";

onMounted(async () => {
  const data = await service.getAll(
    [
      {
        field: "start_date",
        matchMode: FilterMatchMode.DATE_BEFORE,
        value: new Date(),
      },
    ],
    new Pagination(0, 100),
    [
      {
        field: "start_date",
        order: 0,
      },
    ],
  );

  if (data) {
    promotions.value = [promotions.value[0], ...data];
  }
});

onMounted(() => {});
</script>

<template>
  <div class="relative w-full h-[40dvh] md:h-[75dvh]" id="main">
    <div class="absolute z-10 overflow-hidden w-full h-[40dvh] md:h-[75dvh]">
      <Carousel
        v-if="promotions.length > 0"
        :value="promotions"
        :numScroll="1"
        :showNavigators="false"
        circular
        :autoplayInterval="3000"
        class="flex-1 transform w-full"
      >
        <template #item="{ data }">
          <div class="w-full relative group">
            <Img
              :src="data.image"
              imageClass="object-cover z-10 w-full h-[40dvh] md:h-[75dvh] transition-transform duration-300 group-hover:scale-105"
            />
            <h2
              class="text-3xl w-full absolute top-2 text-center md:text-4xl font-bold text-white mb-2 z-20"
              v-html="data.text"
            ></h2>
            <div
              class="absolute bottom-0 left-0 right-0 w-full h-full flex flex-col items-center justify-end pb-8 px-4 text-center"
            >
              <div class="max-w-3xl w-full space-y-4">
                <a
                  v-if="data.redirection_url && data.redirection_text"
                  :href="data.redirection_url"
                  class="inline-block bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl mt-4"
                >
                  {{ data.redirection_text }}
                </a>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
      <Skeleton class="flex-1 w-full !h-full" v-else />
    </div>
  </div>
</template>

<style scoped>
.see_more {
  animation: mover 2s infinite alternate;
}

@keyframes mover {
  0% {
    transform: translate(-50%, 0%);
    /* Escala normal */
  }

  50% {
    transform: translate(-50%, -75%);
    /* Escala a la mitad y mueve hacia arriba */
  }

  100% {
    transform: translate(-50%, 0%);
    /* Vuelve a la normalidad */
  }
}

:deep .p-carousel-content {
  overflow: hidden;
}
@media (max-width: 1024px) {
  .h-mid-screen {
    height: 50vh !important;
  }
}
</style>
