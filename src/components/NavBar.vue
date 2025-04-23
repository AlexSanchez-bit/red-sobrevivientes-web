<template>
  <nav
    class="p-2 sticky z-50 box-border transition-all duration-500 font-albra-serif-bold flex flex-col header w-full top-0 opacity-95 !text-black bg-white"
  >
    <div class="flex flex-row justify-between items-center">
      <router-link
        to="/"
        class="flex flex-row z-10 justify-center items-center bg-white rounded-full"
      >
        <img
          src="/logo/logo.png"
          class="h-10 w-auto sm:h-20 opacity-1 transition-all duration-200"
        />
      </router-link>

      <h1
        class="text-xs sm:text-sm md:text-xl lg:text-2xl font-bold text-center text-[#6f2456]"
      >
        RED DE SOBREVIVIENTES DE ABUSO SEXUAL CLERICAL
      </h1>

      <!-- Botón menú hamburguesa solo en móviles -->
      <span></span>
      <Button
        icon="pi pi-bars"
        @click="sidebarVisible = true"
        class="p-button-rounded p-button-text p-button-plain block md:!hidden"
      />
    </div>

    <!-- Menú escritorio -->
    <div
      class="flex-row gap-1 sm:gap-3 items-center w-full overflow-hidden transition-all duration-500 hidden md:flex mt-2 text-xs"
      :class="{
        '!h-8 opacity-100': scrolled_ammount >= 0,
        '!h-0 opacity-0': scrolled_ammount < 0 && scrolled > 0,
      }"
    >
      <router-link
        to="/map"
        class="hover:bg-gray-50/20 hover:text-zinc-950/40 text-black p-2 rounded-sm cursor-pointer lg:text-md uppercase"
      >
        Estadísticas y mapa
      </router-link>
      <router-link
        to="/us"
        class="hover:bg-gray-50/20 hover:text-zinc-950/40 text-black p-2 rounded-sm cursor-pointer lg:text-md uppercase"
      >
        Sobre nosotros
      </router-link>
      <span
        class="hover:bg-gray-50/20 hover:text-zinc-950/40 text-black p-2 rounded-sm cursor-pointer lg:text-md uppercase"
        @click="$refs.testimonybutton.openModal()"
      >
        Comparte tu historia
      </span>
      <span
        class="hover:bg-gray-50/20 hover:text-zinc-950/40 text-black p-2 rounded-sm cursor-pointer lg:text-md uppercase"
        @click="scrollToSection('blog')"
      >
        Blog
      </span>
      <span
        class="hover:bg-pink-100/30 bg-pink-50 text-[#6f2456] border border-[#6f2456] p-2 rounded-sm cursor-pointer lg:text-md font-semibold uppercase"
        @click="scrollToSection('donate')"
      >
        Haz una donación
      </span>
      <TestimonyButton ref="testimonybutton" class="hidden" />
    </div>
  </nav>

  <!-- 📱 SideBar para móviles -->
  <SideBar
    v-model:visible="sidebarVisible"
    position="right"
    class="md:hidden p-4"
  >
    <div class="flex flex-col gap-4 text-black">
      <router-link
        to="/map"
        class="uppercase font-semibold hover:underline cursor-pointer"
      >
        Estadísticas y mapa
      </router-link>
      <router-link
        to="/us"
        class="uppercase font-semibold hover:underline cursor-pointer"
      >
        Sobre nosotros
      </router-link>
      <span
        class="uppercase font-semibold hover:underline cursor-pointer"
        @click="$refs.testimonybutton.openModal()"
      >
        Comparte tu historia
      </span>
      <span
        class="uppercase font-semibold hover:underline cursor-pointer"
        @click="scrollToSection('blog')"
      >
        Blog
      </span>
      <span
        class="uppercase font-semibold bg-pink-100 text-[#6f2456] border border-[#6f2456] p-2 text-center rounded cursor-pointer"
        @click="scrollToSection('donate')"
      >
        Haz una donación
      </span>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Button from "primevue/button";
import SideBar from "primevue/sidebar";
import TestimonyButton from "@/components/Testimony/TestimonyButton.vue";

const sidebarVisible = ref(false);
const route = useRoute();
const router = useRouter();

const scrolled = ref<number>(0);
const scrolled_ammount = ref(-1);

// Maneja el scroll hacia un elemento por ID
const scrollToSection = async (id: string) => {
  if (!document.getElementById(id) && route.path !== "/") {
    await router.push("/");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
  sidebarVisible.value = false;
};

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (Math.abs(scrolled.value - window.scrollY) >= 0) {
      scrolled_ammount.value = Math.round(scrolled.value - window.scrollY);
    }
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

<style>
html {
  scroll-behavior: smooth;
}
</style>
