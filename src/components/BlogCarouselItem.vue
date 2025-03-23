<template>
  <Card
    class="w-full sm:w-[25rem] hover:shadow-xl transition-all duration-300 cursor-pointer border-round-lg overflow-hidden"
  >
    <template #header>
      <router-link :to="`/blog/${item.id}`">
        <div class="relative h-48 overflow-hidden">
          <img
            alt="blog header"
            :src="item.image ?? '/noimage.png'"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div
            class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 px-4 py-3"
          >
            <h2 class="text-white font-bold text-xl mb-1 line-clamp-1">
              {{ item.title }}
            </h2>

            <p class="text-gray-300 text-sm">
              {{ item.user.name }}
            </p>
            <p class="text-gray-300 text-sm">
              {{ formatDate(item.created_at) }}
            </p>
          </div>
        </div>
      </router-link>
    </template>

    <template #content>
      <div
        class="prose prose-sm max-w-none text-gray-600 line-clamp-3"
        v-html="item.text"
      ></div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import Card from "primevue/card";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const formatDate = (dateString) => {
  return format(new Date(dateString), "dd MMM yyyy");
};
</script>

<style>
.prose-sm p {
  @apply mb-2;
}

.prose-sm ul {
  @apply list-disc pl-4;
}

.prose-sm ol {
  @apply list-decimal pl-4;
}

.prose-sm a {
  @apply text-[#6f2465] hover:underline;
}
</style>
