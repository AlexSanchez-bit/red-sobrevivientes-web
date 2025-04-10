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
      class="flex-row gap-1 sm:gap-3 items-center w-full overflow-hidden transition-all duration-500 hidden md:flex mt-2"
      :class="{
        'h-8 opacity-100': scrolled_ammount >= 0,
        'h-0 opacity-0': scrolled_ammount < 0 && scrolled > 50,
      }"
    >
      <span
        class="hover:bg-gray-50/20 hover:text-zinc-950/40 text-black p-2 rounded-sm cursor-pointer lg:text-md uppercase"
        @click="scrollToSection('stadistics')"
      >
        Estadísticas
      </span>
      <span
        class="hover:bg-gray-50/20 hover:text-zinc-950/40 text-black p-2 rounded-sm cursor-pointer lg:text-md uppercase"
        @click="scrollToSection('about_us')"
      >
        Sobre nosotros
      </span>
      <span
        class="hover:bg-gray-50/20 hover:text-zinc-950/40 text-black p-2 rounded-sm cursor-pointer lg:text-md uppercase"
        @click="scrollToSection('share_your_story')"
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
    </div>
  </nav>

  <!-- 📱 SideBar para móviles -->
  <SideBar
    v-model:visible="sidebarVisible"
    position="right"
    class="md:hidden p-4"
  >
    <div class="flex flex-col gap-4 text-black">
      <span
        class="uppercase font-semibold hover:underline cursor-pointer"
        @click="scrollToSection('statistics')"
      >
        Estadísticas
      </span>
      <span
        class="uppercase font-semibold hover:underline cursor-pointer"
        @click="scrollToSection('about_us')"
      >
        Sobre nosotros
      </span>
      <span
        class="uppercase font-semibold hover:underline cursor-pointer"
        @click="scrollToSection('share_your_story')"
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

const sidebarVisible = ref(false);
const route = useRoute();
const router = useRouter();

const scrolled = ref<number>(0);
const scrolled_ammount = ref(-1);

// Maneja el scroll hacia un elemento por ID
const scrollToSection = async (id: string) => {
  if (route.path !== "/") {
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

<style>
html {
  scroll-behavior: smooth;
}
</style>
