<script setup>
import { ref, computed, onMounted } from "vue";
import { decode } from "@googlemaps/polyline-codec";
import { useGoRoutesStore, useAuthStore } from "@/stores";

const goRoutesStore = useGoRoutesStore();
const authStore = useAuthStore();

const routePath = ref([]);
const markerPositions = ref([]);
const activeMarkerIndex = ref(null); // índice do marcador clicado

onMounted(async () => {
  await goRoutesStore.getRouteByDriverId();

  console.log("📦 Dados da rota:", goRoutesStore.state.myActiveRoute);

  const routeData = Array.isArray(goRoutesStore.state.myActiveRoute)
    ? goRoutesStore.state.myActiveRoute[0]
    : goRoutesStore.state.myActiveRoute;

  if (routeData?.overview_polyline?.points) {
    routePath.value = decode(routeData.overview_polyline.points).map(([lat, lng]) => ({
      lat,
      lng,
    }));
  } else if (typeof routeData?.overview_polyline === "string") {
    routePath.value = decode(routeData.overview_polyline).map(([lat, lng]) => ({
      lat,
      lng,
    }));
  }

  if (Array.isArray(routeData?.coords_passageiros)) {
    markerPositions.value = routeData.coords_passageiros.map(p => ({
      lat: p.lat,
      lng: p.lng,
      address: p.address,
    }));
  }
});

const mapCenter = computed(() => {
  if (routePath.value.length > 0) return routePath.value[0];
  if (markerPositions.value.length > 0) return markerPositions.value[0];
  return { lat: -26.3, lng: -48.8 };
});
</script>

<template>
  <div class="map-container" v-if="routePath.length">
    <GMapMap :center="mapCenter" :zoom="13" map-type-id="roadmap" style="width: 100%; height: 100vh">
      
      <GMapPolyline
        :path="routePath"
        :options="{
          strokeColor: '#db5507',
          strokeOpacity: 0.8,
          strokeWeight: 4
        }"
      />

      <GMapMarker
        v-for="(pos, index) in markerPositions"
        :key="index"
        :position="{ lat: pos.lat, lng: pos.lng }"
        :icon="{
          url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          scaledSize: { width: 40, height: 40 },
          anchor: { x: 20, y: 20 }
        }"
        @click="activeMarkerIndex = index"
      >
        <GMapInfoWindow v-if="activeMarkerIndex === index">
          <div>
            <strong>Passageiro {{ index + 1 }}</strong><br />
            {{ pos.address }}
          </div>
        </GMapInfoWindow>
      </GMapMarker>
    </GMapMap>
  </div>

  <div v-else class="loading-msg">
    Carregando rota...
  </div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
}

.loading-msg {
  padding: 20px;
  text-align: center;
  font-weight: bold;
}
</style>
