<template>
  <NavBar />
  <router-view v-slot="{ Component, route }" class="min-h-screen">
    <transition name="page-opacity" mode="out-in">
      <component :is="Component" :key="route.fullPath" />
    </transition>
    <Footer v-show="!filter_routes.includes(route.name.toString())" />
  </router-view>
</template>
<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
const filter_routes = [
  "brand.details",
  "category.details",
  "products",
  "history",
];
</script>

<style scoped>
.page-opacity-enter-active,
.page-opacity-leave-active {
  transition: all 0.3s ease;
}

.page-opacity-enter-from,
.page-opacity-leave-to {
  scale: 0.95;
  opacity: 0;
}

.page-opacity-enter-to,
.page-opacity-leave-from {
  scale: 1;
  opacity: 1;
}
</style>
