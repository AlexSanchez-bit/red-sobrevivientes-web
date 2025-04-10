<template>
  <div class="grid">
    <!-- Selector -->
    <MainViewSwitch
      @selected="slectedTab = $event"
      class="scale-150 my-8 mx-auto w-fit"
    />

    <!-- Animación de transición -->
    <Transition name="fade-slide" mode="out-in">
      <!-- Modo Explora -->
      <div
        v-if="slectedTab === 'explora'"
        key="explora"
        class="col-12 md:col-8"
      >
        <MapContainer
          :markers="testimony"
          class="h-full shadow-3 border-round z-10"
        />
      </div>

      <!-- Modo Descubre -->
      <div
        v-else
        key="descubre"
        class="col-12 md:col-4 p-4 fade-slide-enter-active"
      >
        <div class="flex flex-col gap-5">
          <!-- Encabezado -->
          <div class="text-center">
            <h1 class="text-3xl font-bold mb-2 text-[#6f2465]">
              Estadísticas Actualizadas
            </h1>
            <p class="text-gray-600">
              Datos actualizados de testimonios aceptados
            </p>
          </div>

          <!-- Tarjetas Resumen -->
          <div class="grid grid-cols-2 gap-4 text-center max-w-md mx-auto">
            <div
              v-for="(item, index) in testimony_data"
              :key="index"
              class="bg-purple-100 text-purple-800 py-4 px-2 rounded-xl shadow-md"
            >
              <p class="font-bold text-lg">{{ item.count }}</p>
              <p class="text-sm">{{ item.name }}</p>
            </div>
          </div>

          <!-- Promedio -->
          <div class="text-center mt-2 text-gray-700">
            <p>
              Promedio por categoría:
              <span class="font-semibold text-[#6f2465]">
                {{ averagePerCategory }}
              </span>
            </p>
          </div>

          <!-- Gráfico -->
          <Chart
            type="bar"
            :data="chartData"
            :options="chartOptions"
            class="max-w-2xl mx-auto"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import Chart from "primevue/chart";
import MapContainer from "@/components/MapContainer.vue";
import { useTestimonyService } from "@/composables/Testimony/useTestimonyService";
import MainViewSwitch from "@/components/MainViewSwitch.vue";

const service = useTestimonyService();
const slectedTab = ref("explora");

const testimony_data = ref([]);
const testimony = ref([]);
const total_testimonies = ref(0);

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "Testimonios por Categoría",
      backgroundColor: "#6f2465",
      borderColor: "#5a1d50",
      data: [],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { backgroundColor: "#ffffff", bodyColor: "#6f2465" },
  },
  scales: {
    y: { beginAtZero: true, grid: { color: "#f3f4f6" } },
    x: { grid: { display: false } },
  },
});

const averagePerCategory = computed(() => {
  return testimony_data.value.length > 0
    ? (total_testimonies.value / testimony_data.value.length).toFixed(1)
    : 0;
});

onMounted(async () => {
  await loadData();
});

const loadData = async () => {
  try {
    const { totalCount } = await service.getCount([
      {
        field: "status",
        matchMode: "EQUALS",
        value: "ACCEPTED",
      },
    ]);

    total_testimonies.value = totalCount;

    const { data } = await service.getStadistics();

    testimony_data.value = data.map((val) => ({
      name: val.name,
      count: val.testimony.length,
    }));

    chartData.value = {
      labels: testimony_data.value.map((item) => item.name),
      datasets: [
        {
          ...chartData.value.datasets[0],
          data: testimony_data.value.map((item) => item.count),
        },
      ],
    };

    testimony.value = data
      .map((el) => {
        return el.testimony.map((pos) => {
          return {
            ...pos,
            category: { name: el.name, icon: el.image },
          };
        });
      })
      .flat()
      .map((pos) => ({
        position: [pos.location.lat, pos.location.lng],
        title: pos.name?.trim() || "Anónimo",
        description: pos.text,
        category: pos.category,
      }));
  } catch (error) {
    console.error("Error loading data:", error);
  }
};
</script>

<style scoped>
/* Animaciones */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Gráfico */
:deep(.p-chart) {
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>
