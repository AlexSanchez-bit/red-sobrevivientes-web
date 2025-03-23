<template>
  <div class="grid">
    <!-- Sección del Mapa -->
    <div class="col-12 md:col-8">
      <MapContainer
        :markers="testimony"
        class="h-full shadow-3 border-round z-10"
      />
    </div>

    <!-- Sección de Estadísticas Mejorada -->
    <div class="col-12 md:col-4 p-4">
      <div class="flex flex-col gap-4">
        <!-- Encabezado -->
        <div class="text-center mb-4">
          <h1 class="text-3xl font-bold mb-2" style="color: #6f2465">
            Estadísticas Actualizadas
          </h1>
          <p class="text-gray-600">Datos actualizados de testimonios</p>
        </div>

        <!-- Tarjetas de Resumen -->
        <ul class="list-none text-start max-w-2xl mx-auto">
          <li v-for="(item, index) in testimony_data" :key="index">
            <p>
              <b>{{ item.name }}</b
              >: {{ item.count }}
            </p>
          </li>
        </ul>

        <div>
          <Chart
            type="bar"
            :data="chartData"
            :options="chartOptions"
            class="!mx-auto max-w-2xl"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import Chart from "primevue/chart";
import MapContainer from "@/components/MapContainer.vue";
import { useTestimonyService } from "@/composables/Testimony/useTestimonyService";

const service = useTestimonyService();

// Datos reactivos
const testimony_data = ref([]);
const testimony = ref([]);
const total_testimonies = ref(0);

// Configuración del gráfico
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

// Calculados
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

    // Actualizar gráfico
    chartData.value = {
      labels: testimony_data.value.map((item) => item.name),
      datasets: [
        {
          ...chartData.value.datasets[0],
          data: testimony_data.value.map((item) => item.count),
        },
      ],
    };

    // Procesar datos para el mapa
    testimony.value = data
      .map((el) => el.testimony)
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
/* Estilos personalizados */
:deep(.p-chart) {
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

:deep(.pi) {
  vertical-align: text-bottom;
}
</style>
