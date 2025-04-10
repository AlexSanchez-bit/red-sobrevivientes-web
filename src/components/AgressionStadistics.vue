<template>
  <div class="grid">
    <!-- Selector -->
    <MainViewSwitch
      @selected="slectedTab = $event"
      class="scale-110 md:scale-150 my-8 mx-auto w-fit"
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
        <div class="flex flex-col gap-6">
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
            <!-- Total Testimonies Card -->
            <div
              class="bg-purple-100 text-purple-800 py-4 px-2 rounded-xl shadow-md"
            >
              <p class="font-bold text-lg">{{ total_testimonies }}</p>
              <p class="text-sm">Testimonios Totales</p>
            </div>
            <!-- Average per Category Card -->
            <div
              class="bg-purple-100 text-purple-800 py-4 px-2 rounded-xl shadow-md"
            >
              <p class="font-bold text-lg">{{ averagePerCategory }}</p>
              <p class="text-sm">Promedio / Categoría</p>
            </div>
            <!-- Other summary cards if needed -->
            <!-- Example: Most frequent category -->
            <!-- <div v-if="mostFrequentCategory" class="bg-purple-100 text-purple-800 py-4 px-2 rounded-xl shadow-md">
              <p class="font-bold text-lg">{{ mostFrequentCategory.count }}</p>
              <p class="text-sm">Más Frecuente: {{ mostFrequentCategory.name }}</p>
            </div> -->
          </div>

          <!-- Sección Estadísticas por Categoría -->
          <div class="mt-4">
            <h2 class="text-xl font-semibold mb-3 text-center text-[#6f2465]">
              Distribución por Categoría
            </h2>
            <Chart
              type="bar"
              :data="categoryChartData"
              :options="categoryChartOptions"
              class="max-w-2xl mx-auto h-[300px]"
            />
            <!-- Summary Cards for Categories (optional alternative/addition) -->
            <!-- <div class="grid grid-cols-2 gap-4 text-center max-w-md mx-auto mt-4">
              <div
                v-for="(item, index) in testimony_data"
                :key="index"
                class="bg-purple-100 text-purple-800 py-4 px-2 rounded-xl shadow-md"
              >
                <p class="font-bold text-lg">{{ item.count }}</p>
                <p class="text-sm">{{ item.name }}</p>
              </div>
            </div> -->
          </div>

          <!-- Sección Estadísticas por Edad -->
          <div class="mt-6">
            <h2 class="text-xl font-semibold mb-3 text-center text-[#6f2465]">
              Distribución por Edad
            </h2>
            <Chart
              type="bar"
              :data="ageChartData"
              :options="ageChartOptions"
              class="max-w-2xl mx-auto h-[300px]"
            />
            <!-- Optional: Add min/max/avg age display -->
            <div
              class="text-center mt-3 text-sm text-gray-600"
              v-if="ageStatsSummary.min !== Infinity"
            >
              <span>Edad Mín: {{ ageStatsSummary.min }}</span> |
              <span>Edad Máx: {{ ageStatsSummary.max }}</span> |
              <span>Edad Prom: {{ ageStatsSummary.avg.toFixed(1) }}</span>
            </div>
          </div>

          <!-- Sección Estadísticas por Género -->
          <div class="mt-6">
            <h2 class="text-xl font-semibold mb-3 text-center text-[#6f2465]">
              Distribución por Género
            </h2>
            <Chart
              type="doughnut"
              :data="genderChartData"
              :options="genderChartOptions"
              class="max-w-xs mx-auto h-[250px]"
            />
          </div>
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

// --- Refs ---
const service = useTestimonyService();
const slectedTab = ref("explora"); // Start with map or stats? 'descubre' shows stats first

const testimony_data = ref<{ name: string; count: number }[]>([]); // Explicit type
const testimony = ref<any[]>([]); // Consider defining a proper type/interface
const total_testimonies = ref(0);
const ageStatisticsRaw = ref<{ age: number; total: number }[]>([]);
const genderStatisticsRaw = ref<{ gender: string; total: number }[]>([]);

// --- Chart Data Refs ---
const categoryChartData = ref(
  getInitialChartData("Testimonios por Categoría", "#6f2465", "#5a1d50"),
);
const ageChartData = ref(
  getInitialChartData("Distribución por Edad", "#a855f7", "#9333ea"),
); // Purple-500/600
const genderChartData = ref({
  // Specific for Doughnut
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [
        // Define colors for gender segments
        "#fb7185", // rose-400 (Female)
        "#60a5fa", // blue-400 (Male)
        "#a3a3a3", // neutral-400 (Other)
        "#facc15", // yellow-400 (Prefer not to say - Add if needed)
      ],
      hoverBackgroundColor: [
        "#f43f5e", // rose-500
        "#3b82f6", // blue-500
        "#737373", // neutral-500
        "#eab308", // yellow-500
      ],
    },
  ],
});

// --- Chart Options Refs ---
const categoryChartOptions = ref(getBarChartOptions());
const ageChartOptions = ref(getBarChartOptions());
const genderChartOptions = ref(getDoughnutChartOptions());

// --- Computed Properties ---
const averagePerCategory = computed(() => {
  return testimony_data.value.length > 0
    ? (total_testimonies.value / testimony_data.value.length).toFixed(1)
    : "0.0";
});

// Calculate Min/Max/Avg Age
const ageStatsSummary = computed(() => {
  if (!ageStatisticsRaw.value || ageStatisticsRaw.value.length === 0) {
    return { min: Infinity, max: -Infinity, avg: 0, totalCount: 0 };
  }
  let min = Infinity;
  let max = -Infinity;
  let sum = 0;
  let totalCount = 0;
  ageStatisticsRaw.value.forEach((item) => {
    if (item.age < min) min = item.age;
    if (item.age > max) max = item.age;
    sum += item.age * item.total;
    totalCount += item.total;
  });
  return {
    min,
    max,
    avg: totalCount > 0 ? sum / totalCount : 0,
    totalCount,
  };
});

// --- Lifecycle Hooks ---
onMounted(async () => {
  await loadData();
});

// --- Helper Functions ---
function getInitialChartData(
  label: string,
  backgroundColor: string,
  borderColor: string,
) {
  return {
    labels: [],
    datasets: [
      {
        label: label,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        data: [],
        borderWidth: 1, // Added for better bar visibility
      },
    ],
  };
}

function getBarChartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false, // Important for setting height via class
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#374151", // gray-700
        bodyColor: "#6f2465",
        borderColor: "#e5e7eb", // gray-200
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#f3f4f6" }, // light gray
        ticks: { color: "#4b5563" }, // gray-600
      },
      x: {
        grid: { display: false },
        ticks: { color: "#4b5563" }, // gray-600
      },
    },
  };
}

function getDoughnutChartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false, // Important for setting height via class
    plugins: {
      legend: {
        position: "bottom", // Better placement for doughnut
        labels: {
          color: "#4b5563", // gray-600
        },
      },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#374151",
        bodyColor: "#4b5563", // Use gray here for better contrast with segment colors
        borderColor: "#e5e7eb",
        borderWidth: 1,
      },
    },
    cutout: "60%", // Makes it a doughnut instead of a pie
  };
}

// Gender label mapping
const genderLabelsMap: Record<string, string> = {
  FEMALE: "Femenino",
  MALE: "Masculino",
  OTHER: "Otro",
  // Add more if your API might return different values
  // 'PREFER_NOT_TO_SAY': 'Prefiere no decir'
};

// --- Data Loading ---
const loadData = async () => {
  try {
    // 1. Get Total Count
    const { totalCount, error: countError } = await service.getCount([
      { field: "status", matchMode: "EQUALS", value: "ACCEPTED" },
    ]);
    if (countError)
      throw new Error("Failed to get total count: " + countError.message);
    total_testimonies.value = totalCount ?? 0;

    // 2. Get Category Statistics
    const { data: categoryStats, error: categoryError } =
      await service.getStadistics();
    if (categoryError)
      throw new Error(
        "Failed to get category statistics: " + categoryError.message,
      );

    if (categoryStats) {
      testimony_data.value = categoryStats.map((val) => ({
        name: val.name,
        count: val.testimony?.length ?? 0, // Add nullish coalescing for safety
      }));

      // Update Category Chart
      categoryChartData.value = {
        labels: testimony_data.value.map((item) => item.name),
        datasets: [
          {
            ...categoryChartData.value.datasets[0], // Keep existing style settings
            data: testimony_data.value.map((item) => item.count),
          },
        ],
      };

      // Prepare data for the map (already existing logic)
      testimony.value = categoryStats
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
    } else {
      testimony_data.value = [];
      categoryChartData.value.labels = [];
      categoryChartData.value.datasets[0].data = [];
      testimony.value = [];
    }

    // 3. Get Age Statistics
    const { data: age_statistics, error: ageError } =
      await service.getAgeStadistics();
    if (ageError) console.error("Error loading age statistics:", ageError); // Log but don't necessarily stop everything
    ageStatisticsRaw.value = age_statistics || []; // Store raw data

    // Process Age Statistics for Chart (Grouped)
    const ageGroups = {
      "0-11": 0,
      "12-17": 0,
      "18-24": 0,
      "25-34": 0,
      "35-44": 0,
      "45+": 0,
      Desconocido: 0, // Optional: For entries without age? Assuming API filters them out.
    };
    let totalAgeCount = 0;
    if (ageStatisticsRaw.value) {
      ageStatisticsRaw.value.forEach((item) => {
        totalAgeCount += item.total;
        if (item.age >= 0 && item.age <= 11) ageGroups["0-11"] += item.total;
        else if (item.age >= 12 && item.age <= 17)
          ageGroups["12-17"] += item.total;
        else if (item.age >= 18 && item.age <= 24)
          ageGroups["18-24"] += item.total;
        else if (item.age >= 25 && item.age <= 34)
          ageGroups["25-34"] += item.total;
        else if (item.age >= 35 && item.age <= 44)
          ageGroups["35-44"] += item.total;
        else if (item.age >= 45) ageGroups["45+"] += item.total;
        else ageGroups["Desconocido"] += item.total; // Handle potential null/invalid ages if needed
      });
    }
    // Update Age Chart Data
    ageChartData.value = {
      labels: Object.keys(ageGroups),
      datasets: [
        {
          ...ageChartData.value.datasets[0], // Keep existing style settings
          data: Object.values(ageGroups),
        },
      ],
    };

    // 4. Get Gender Statistics
    const { data: gender_statistics, error: genderError } =
      await service.getGenderStadistics();
    if (genderError)
      console.error("Error loading gender statistics:", genderError); // Log but don't stop
    genderStatisticsRaw.value = gender_statistics || []; // Store raw data

    // Update Gender Chart
    if (genderStatisticsRaw.value) {
      genderChartData.value = {
        labels: genderStatisticsRaw.value.map(
          (item) => genderLabelsMap[item.gender] || item.gender,
        ), // Map keys to readable labels
        datasets: [
          {
            ...genderChartData.value.datasets[0], // Keep existing style settings
            data: genderStatisticsRaw.value.map((item) => item.total),
          },
        ],
      };
    } else {
      genderChartData.value.labels = [];
      genderChartData.value.datasets[0].data = [];
    }
  } catch (error) {
    console.error("Error loading dashboard data:", error);
    // Maybe show a user-facing error message here
  }
};
</script>

<style scoped>
/* Animaciones (keep existing) */
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

/* Gráfico (keep existing, applies to all charts) */
:deep(.p-chart) {
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>
