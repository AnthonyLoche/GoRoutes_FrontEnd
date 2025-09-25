<script setup>
import { ref, computed, onMounted } from "vue";
import { decode } from "@googlemaps/polyline-codec";
import { useGoRoutesStore } from "@/stores";

const goRoutesStore = useGoRoutesStore();

const routePath = ref([]);
const markerPositions = ref([]);
const activeMarkerIndex = ref(null);

onMounted(async () => {
  await goRoutesStore.takeMyDailyRoute();

  console.log("📦 Dados da rota:", goRoutesStore.state.myActiveRoute);

  const routeData = goRoutesStore.state.myActiveRoute;

  // Polyline
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

  // 🔑 Pega apenas o PRÓXIMO passageiro não pego
  if (Array.isArray(routeData?.presences)) {
    const nextPassenger = routeData.presences.find(p => p.status !== "PRESENTE");

    if (nextPassenger) {
      markerPositions.value = nextPassenger.address_passenger.map(addr => ({
        lat: addr.latitude,
        lng: addr.longitude,
        address: addr.address,
        passenger: nextPassenger.passenger_name,
        status: nextPassenger.status,
      }));
    }
  }
});

const mapCenter = computed(() => {
  if (routePath.value.length > 0) return routePath.value[0];
  if (markerPositions.value.length > 0) return markerPositions.value[0];
  if (goRoutesStore.state.myActiveRoute?.latitude_origin) {
    return {
      lat: goRoutesStore.state.myActiveRoute.latitude_origin,
      lng: goRoutesStore.state.myActiveRoute.longitude_origin,
    };
  }
  return { lat: -26.3, lng: -48.8 };
});
</script>

<template>
  <div class="map-container" v-if="routePath.length || markerPositions.length">
    <GMapMap :center="mapCenter" :zoom="13" map-type-id="roadmap" style="width: 100%; height: 100vh">
      
      <!-- Polyline -->
      <GMapPolyline
        v-if="routePath.length"
        :path="routePath"
        :options="{
          strokeColor: '#db5507',
          strokeOpacity: 0.8,
          strokeWeight: 4
        }"
      />

      <!-- Só o próximo passageiro -->
      <GMapMarker
        v-for="(pos, index) in markerPositions"
        :key="index"
        :position="{ lat: pos.lat, lng: pos.lng }"
        :icon="{
          url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
          scaledSize: { width: 40, height: 40 },
          anchor: { x: 20, y: 20 }
        }"
        @click="activeMarkerIndex = index"
      >
        <GMapInfoWindow v-if="activeMarkerIndex === index">
          <div>
            <strong>{{ pos.passenger }}</strong><br />
            {{ pos.address }}<br />
            <em>Status: {{ pos.status }}</em>
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
