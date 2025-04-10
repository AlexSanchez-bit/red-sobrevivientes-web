<template>
  <div class="min-h-screen pb-5">
    <FirstSlide />
    <AgressionStadistics />
    <AboutUs />
    <Sliders class="my-3" :service="service" :filters="[]" :orders="[]">
      <template #header>
        <h6
          class="text-4xl text-center mt-6 decoration-black text-black uppercase"
        >
          Últimas Entradas
        </h6>
        <p
          class="underline text-center mb-6 text-zinc-800 decoration-black mt-4 cursor-pointer uppercase"
        ></p>
      </template>

      <template #item="{ item }">
        <BlogCarouselItem :item="item" />
      </template>
    </Sliders>

    <TestimonyButton />
    <DonationButton />
  </div>
</template>

<script lang="ts" setup>
import AboutUs from "@/components/AboutUs.vue";
import Card from "primevue/card";
import AgressionStadistics from "@/components/AgressionStadistics.vue";
import FirstSlide from "@/components/FirstSlide.vue";
import TestimonyButton from "@/components/Testimony/TestimonyButton.vue";
import Sliders from "@/components/Sliders.vue";
import { useBlogService } from "@/composables/Blog/useBlogService";
import BlogCarouselItem from "@/components/BlogCarouselItem.vue";
import DonationButton from "@/components/DonationButton.vue";

const service = useBlogService();
</script>
