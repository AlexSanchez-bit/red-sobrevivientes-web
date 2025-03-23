<template>
  <div class="w-full p-6 h-fit">
    <h1 class="text-4xl font-bold mb-4 text-center max-w-2xl mx-auto">
      Mapa colombiano de los delitos de abuso sexual y de conciencia cometidos
      en entornos eclesiásticos.
    </h1>
    <div class="map-container mx-auto max-w-2xl">
      <l-map
        class="!z-10"
        ref="map"
        :zoom="zoom"
        :center="center"
        :options="{ attributionControl: false }"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        />

        <l-marker
          v-for="(marker, index) in markers"
          :key="index"
          :lat-lng="marker.position"
        >
          <l-popup>
            <div class="marker-popup">
              <h3>{{ marker.title }}</h3>
              <p>{{ marker.description }}</p>
            </div>
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from "vue";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";

// Configuración inicial del mapa
const zoom = ref(7);
const center = ref([4.570868, -74.297333]); // Coordenadas de Madrid (ejemplo)

const props = defineProps(["markers"]);

const { markers } = toRefs(props);

// Marcadores de ejemplo
</script>

<style>
.map-container {
  height: 500px;
  width: 100%;
}

.leaflet-container {
  height: 100%;
  width: 100%;
}

:deep(leaflet-container) {
  @apply !z-10;
}
</style>
