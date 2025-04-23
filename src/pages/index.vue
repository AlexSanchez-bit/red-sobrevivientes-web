<template>
  <div class="min-h-screen pb-5">
    <FirstSlide />

    <h2 class="text-xl text-center my-3">
      ¿Eres Sobreviviente de Abuso Sexual Clerical?
    </h2>
    <div class="flex flex-row gap-3 w-full justify-center items-center">
      <TestimonyButton id="share_your_story" />

      <router-link to="/us">
        <Button
          label="No, pero quiero información."
          class="!border-[#6f2465] hover:!shadow-md !bg-transparent !text-[#6f2465] border hover:!border-[#5a1d50] font-bold !py-2 !px-6 !text-xl !rounded-full transition-all"
        />
      </router-link>
    </div>

    <ClericalAdvise />
    <div id="blog">
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import FirstSlide from "@/components/FirstSlide.vue";
import TestimonyButton from "@/components/Testimony/TestimonyButton.vue";
import Sliders from "@/components/Sliders.vue";
import { useBlogService } from "@/composables/Blog/useBlogService";
import BlogCarouselItem from "@/components/BlogCarouselItem.vue";
import Button from "primevue/button";
import ClericalAdvise from "@/components/SexualIssues/ClericalAdvise.vue";

const service = useBlogService();
</script>
