<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <!-- Encabezado con título y datos del autor -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold mb-2">
        {{ blog?.title }}
      </h1>
      <p class="text-gray-500">
        {{ blog?.user?.name }} | {{ formatDate(blog?.created_at) }}
      </p>
    </div>

    <!-- Imagen principal -->
    <div class="mb-6">
      <img
        :src="blog?.image ?? '/noimage.png'"
        alt="Blog image"
        class="w-full h-auto object-cover rounded-md"
      />
    </div>

    <!-- Contenido del texto del blog -->
    <div class="prose max-w-none text-gray-700" v-html="blog?.text"></div>
  </div>
</template>

<script setup lang="ts">
import { useBlogService } from "@/composables/Blog/useBlogService";
import { Pagination } from "@/utils/entities/Pagination";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { format } from "date-fns";

// Instanciamos el servicio y obtenemos la ruta
const service = useBlogService();
const route = useRoute();

// Referencia reactiva para almacenar la entrada del blog
const blog = ref(null);

// Cuando se monta el componente, obtenemos la entrada por ID
onMounted(async () => {
  const resp = await service.getAll(
    [
      {
        field: "id",
        matchMode: "EQUALS",
        value: route.params.id as string,
      },
    ],
    new Pagination(0, 1),
    [],
  );
  blog.value = resp[0];
});

// Formateador de fechas
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return format(new Date(dateString), "dd MMM yyyy");
};
</script>

<style scoped>
.prose p {
  @apply mb-4;
}

.prose ul {
  @apply list-disc pl-4;
}

.prose ol {
  @apply list-decimal pl-4;
}

.prose a {
  @apply text-[#6f2465] hover:underline;
}
</style>
