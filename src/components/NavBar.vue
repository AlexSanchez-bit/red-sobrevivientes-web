<template>
  <nav
    class="p-2 sticky z-50 box-border transition-all duration-500 font-albra-serif-bold flex flex-col header w-full top-0 opacity-95 !text-black bg-white"
    :class="{
      'text-white': scrolled <= 60 && route.path == '/',
      'text-black': scrolled > 43,
    }"
  >
    <div class="flex flex-row justify-between items-center">
      <router-link
        to="/"
        class="flex flex-row z-10 justify-center items-center bg-white rounded-full"
      >
        <img
          src="/logo/logo.png"
          class="h-12 sm:h-20 opacity-1 transition-all duration-200"
        />
      </router-link>
      <h1 class="text-2xl font-bold text-center text-[#6f2456]">
        Red de Sobrevivientes Colombia
      </h1>
      <div></div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from "vue";

const sidebarVisible = ref(false);

import { useRoute } from "vue-router";

const route = useRoute();

const scrolled = ref<number>(0);

const scrolled_ammount = ref(-1);

onMounted(() => {
  window.addEventListener("scroll", (ev) => {
    if (Math.abs(scrolled.value - window.scrollY) >= 10) {
      scrolled_ammount.value = Math.round(scrolled.value - window.scrollY);
    }
    scrolled.value = window.scrollY;
  });
});

watch(
  () => route.path,
  () => {
    sidebarVisible.value = false;
  },
);
</script>

<style scoped>
a {
  text-transform: uppercase;
}
</style>
