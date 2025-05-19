<template>
  <div class="w-full p-6 h-fit">
    <h1 class="text-md lg:text-4xl font-bold mb-4 text-center max-w-2xl mx-auto">
      Mapa colombiano de los delitos de abuso sexual y de conciencia cometidos
      en entornos eclesiásticos.
    </h1>

    <div class="map-container mx-auto max-w-4xl border-2 border-purple-200 rounded-xl overflow-hidden shadow-xl">
      <l-map class="!z-10" ref="map" :zoom="zoom" :center="center" :options="{ attributionControl: false }">
        <!-- Mapa más estilizado -->
        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="Watercolor" />

        <!-- Marcadores personalizados -->
        <l-marker v-for="(marker, index) in markers" :key="index" :lat-lng="marker.position" :icon="customIcon(marker)">
          <l-popup>
            <div class="marker-popup">
              <h3 class="font-bold text-[#6f2465] mb-1">{{ marker.title }}</h3>
              <p class="text-sm text-gray-700">{{ marker.category.name }}</p>
              <p class="text-sm text-gray-700 line-clamp-8" v-html="marker.description.replaceAll('\n', '<br />')">
              </p>
            </div>
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";

const props = defineProps(["markers"]);
const { markers } = toRefs(props);

const zoom = ref(7);
const center = ref([4.570868, -74.297333]); // Colombia

// Icono personalizado con logo y color personalizado
const customIcon = (marker) => {
  return L.divIcon({
    html: `
  <div style="
    position: relative;
    width: 42px;
    height: 42px;
    background-color: #6f2465;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    border: 2px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
  " class="hover:scale-150 transition-all duration-300 ease-in-out">
    <img src="${marker.category.icon}" alt="icono" style="
      transform: rotate(45deg);
      width: 30px;
      height: 30px;
      border-radius: 50%;
      object-fit: cover;
    " />
  </div>
  `,
    className: "",
    iconSize: [42, 42],
    iconAnchor: [21, 42],
    popupAnchor: [0, -45],
  });
};
</script>

<style scoped>
.map-container {
  height: 500px;
  width: 100%;
}

.leaflet-container {
  height: 100%;
  width: 100%;
}

.marker-popup h3 {
  margin: 0;
  font-size: 1rem;
}

.marker-popup p {
  margin: 0;
  font-size: 0.85rem;
}
</style>
