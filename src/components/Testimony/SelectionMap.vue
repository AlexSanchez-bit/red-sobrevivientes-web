<template>
  <div class="w-full p-6">
    <div class="map-container mx-auto max-w-2xl">
      <AutoComplete
        class="!w-full m-3 mx-auto max-w-2xl"
        v-model="searchQuery"
        optionLabel="display_name"
        :suggestions="searchResults"
        @complete="handleSearchInput"
      >
        <template #option="slotProps">
          <div
            class="flex items-center"
            @click="selectLocation(slotProps.option)"
          >
            <div>{{ slotProps.option.display_name }}</div>
          </div>
        </template>
      </AutoComplete>
      <l-map
        ref="map"
        :zoom="zoom"
        :center="center"
        :options="{ attributionControl: false }"
        @ready="onMapReady"
        @click="handleMapClick"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
          :attribution="attribution"
        />

        <!-- Marcadores existentes -->
        <l-marker
          v-for="(marker, index) in markers"
          :key="`existing-${index}`"
          :lat-lng="marker.position"
        >
          <l-popup>
            <div class="marker-popup">
              <h3 class="font-bold">{{ marker.title }}</h3>
              <p class="text-sm">{{ marker.description }}</p>
            </div>
          </l-popup>
        </l-marker>

        <!-- Marcador seleccionado -->
        <l-marker
          v-if="selectedPosition"
          :lat-lng="selectedPosition"
          :icon="selectedIcon"
        >
          <l-popup>
            <div class="p-2">
              <p class="font-semibold">Ubicación seleccionada:</p>
              <button
                @click="clearSelection"
                class="mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
              >
                Eliminar selección
              </button>
            </div>
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";
import AutoComplete from "primevue/autocomplete";

// Fix para los iconos
const selectedIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Configuración inicial del mapa
const zoom = ref(7);
const center = ref([4.570868, -74.297333]); // Coordenadas iniciales de Colombia
const mapObject = ref(null);
const selectedPosition = ref(null);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Marcadores de ejemplo
const markers = ref([]);

const onMapReady = (map) => {
  mapObject.value = map;
};

const emit = defineEmits(["location-selected"]);

const handleMapClick = (event) => {
  selectedPosition.value = event.latlng;
  // Emitir evento si es necesario
  emit("location-selected", event.latlng);
};

const clearSelection = () => {
  selectedPosition.value = null;
};
// Añadir estas variables reactivas
const searchQuery = ref("");
const searchResults = ref([]);
const searchTimeout = ref(null);

// Método para manejar la búsqueda
const handleSearchInput = async () => {
  clearTimeout(searchTimeout.value);
  searchTimeout.value = setTimeout(async () => {
    if (searchQuery.value.length > 2) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery.value)}&addressdetails=3&limit=5`,
        );
        const data = await response.json();
        searchResults.value = data;
      } catch (error) {
        searchResults.value = [];
      }
    } else {
      searchResults.value = [];
    }
  }, 500);
};

// Método para seleccionar un resultado
const selectLocation = (result) => {
  searchResults.value = [];
  searchQuery.value = result.display_name;
  const newPos = { lat: parseFloat(result.lat), lng: parseFloat(result.lon) };

  // Actualizar el mapa
  center.value = newPos;
  zoom.value = 14;

  handleMapClick({ latlng: newPos });
  // Centrar y animar el mapa
  if (mapObject.value) {
    mapObject.value.flyTo(newPos, 14);
  }
};

// Limpiar resultados al hacer clic fuera
document.addEventListener("click", (e) => {
  if (!e.target.closest(".relative")) {
    searchResults.value = [];
  }
});
</script>

<style scoped>
.map-container {
  height: 500px;
  width: 100%;
  z-index: 1;
}

.leaflet-container {
  height: 100%;
  width: 100%;
}

.marker-popup {
  @apply min-w-[200px] p-2;
}

.leaflet-marker-icon {
  filter: hue-rotate(
    120deg
  ); /* Color personalizado para el marcador seleccionado */
}

::v-deep input {
  @apply !w-full !m-3 !mx-auto;
}
</style>
