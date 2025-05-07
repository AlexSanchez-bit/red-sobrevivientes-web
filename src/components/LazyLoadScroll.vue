<template>
  <div class="relative">
    <div class="[grid-area:main] w-full box-border">
      <div :class="displayClass ?? 'flex flex-col gap-2'">
        <slot v-for="(item, index) in items" :key="`item-${index}`" :item="item" name="item">
          {{ item }}
        </slot>

        <div v-if="items.length == 0 && !is_loading"
          class="text-center text-gray-300 flex items-center justify-center h-36 w-full">
          <slot>
            <h6 class="w-full">{{ $t("nothing_to_show") }}</h6>
          </slot>
        </div>

        <div ref="nextLoad">
          <Skeleton class="!w-full !h-full" v-if="current_page < all_pages || is_loading" />
        </div>
        <slot v-for="i in current_page < all_pages || is_loading ? 12 : 0" :key="`index-${i}`" name="skeletons">
          <Skeleton class="!w-full !h-full" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from "primevue";
import type { IGenericLister } from "@/utils/entities/IGenericLister";

const props = defineProps<{
  service: IGenericLister<any>;
  filter: any;
  displayClass?: string;
}>();
import { onMounted, ref, toRefs } from "vue";
import { useToastStorage } from "@/stores/ToasterStorage";

const { displayClass } = toRefs(props);

const filter = ref(props.filter);

const prevLoad = ref();
const nextLoad = ref();

const pages_count = ref(10);

const items = ref<any[]>([]);
const current_page = ref<number>(0);
const all_pages = ref<number>(0);

const is_loading = ref<boolean>(false);

const toast = useToastStorage();

const handlePrevIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (current_page.value >= 1) {
        current_page.value -= 1;
        loadData(-1);
      }
    }
  });
};
const handlePostIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (!is_loading.value && current_page.value < all_pages.value) {
        current_page.value += 1;
        loadData(1);
      }
    }
  });
};

onMounted(() => {
  loadData();
  const observerPrev = new IntersectionObserver(handlePrevIntersection, {
    root: null, // Usa el viewport completo como área de visualización
    threshold: 0.2, // Ejecuta el callback cuando el 10% del elemento esté en pantalla
  });
  const observerPost = new IntersectionObserver(handlePostIntersection, {
    root: null, // Usa el viewport completo como área de visualización
    threshold: 0.2, // Ejecuta el callback cuando el 10% del elemento esté en pantalla
  });

  // Comenzamos a observar el elemento
  // if (prevLoad.value) {
  //   observerPrev.observe(prevLoad.value);
  // }
  if (nextLoad.value) {
    observerPost.observe(nextLoad.value);
  }
});

const { GetAll } = props.service;

async function loadData(order: number = 1) {
  is_loading.value = true;

  console.log(current_page.value, all_pages.value);
  const { data, error } = await GetAll(
    current_page.value,
    pages_count.value,
    filter.value ?? {},
  );

  is_loading.value = false;

  if (data) {
    items.value = [...items.value, ...data.items];
    all_pages.value = data.totalPages;
  } else {
    if (Array.isArray(error.message)) {
      toast.notify("error", "Ocurrio un error", error.message.join(", "), 4000);
    } else {
      toast.notify("error", "Ocurrio un error", error.message, 4000);
    }
  }
}

const apply_filters = (nfilter?: any) => {
  current_page.value = 0;
  all_pages.value = 1;
  items.value = [];
  filter.value = nfilter ?? filter.value;
  window.scrollTo(0, 0);
  loadData();
};

defineExpose({
  apply_filters,
});
</script>

<style scoped>
.main-container-- {
  display: grid;
  grid-template-areas: " main main main main ";
  min-height: 100vh;
}
</style>
