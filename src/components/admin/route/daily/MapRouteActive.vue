<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { decode } from "@googlemaps/polyline-codec";
import { useGoRoutesStore } from "@/stores";

const goRoutesStore = useGoRoutesStore();

const routePath = ref([]);
const markerPositions = ref([]);
const activeMarkerIndex = ref(null);

const updateNextPassengerMarker = () => {
  const routeData = goRoutesStore.state.myDailyRouteDriver;
  if (!routeData?.presences?.length) {
    markerPositions.value = [];
    return;
  }

  const nextPassenger = routeData.presences.find(p => p.status !== "PRESENTE" && p.status !== "FALTOU");
  if (!nextPassenger) {
    markerPositions.value = [];
    return;
  }

  markerPositions.value = nextPassenger.address_passenger?.map(addr => ({
    lat: addr.latitude,
    lng: addr.longitude,
    address: addr.address,
    passenger: nextPassenger.passenger_name,
    status: nextPassenger.status || "NAO_PEGO",
  })) || [];
};

onMounted(async () => {
  await goRoutesStore.takeMyDailyRoute();
  
  const routeData = goRoutesStore.state.myDailyRouteDriver;
  if (!routeData) return;

  // Polyline
  if (routeData.overview_polyline?.points) {
    routePath.value = decode(routeData.overview_polyline.points).map(([lat, lng]) => ({ lat, lng }));
  } else if (typeof routeData.overview_polyline === "string") {
    routePath.value = decode(routeData.overview_polyline).map(([lat, lng]) => ({ lat, lng }));
  }

  updateNextPassengerMarker();
});

// Reage quando a rota muda na store
watch(() => goRoutesStore.state.myDailyRouteDriver, () => {
  const routeData = goRoutesStore.state.myDailyRouteDriver;
  if (!routeData) return;

  if (routeData.overview_polyline?.points) {
    routePath.value = decode(routeData.overview_polyline.points).map(([lat, lng]) => ({ lat, lng }));
  }
  updateNextPassengerMarker();
});

const mapCenter = computed(() => {
  if (routePath.value.length) return routePath.value[0];
  if (markerPositions.value.length) return markerPositions.value[0];
  const routeData = goRoutesStore.state.myDailyRouteDriver;
  if (routeData?.latitude_origin) {
    return { lat: routeData.latitude_origin, lng: routeData.longitude_origin };
  }
  return { lat: -26.3, lng: -48.8 };
});
</script>

<template>
  <div class="map-container" v-if="routePath.length || markerPositions.length">
    <GMapMap :center="mapCenter" :zoom="13" map-type-id="roadmap" style="width: 100%; height: 100vh">
      
      <GMapPolyline
        v-if="routePath.length"
        :path="routePath"
        :options="{ strokeColor: '#022840', strokeOpacity: 0.8, strokeWeight: 4 }"
      />

      <GMapMarker
        v-for="(pos, index) in markerPositions"
        :key="index"
        :position="{ lat: pos.lat, lng: pos.lng }"
        :icon="{ url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png', scaledSize: { width: 40, height: 40 }, anchor: { x: 20, y: 20 } }"
        @click="activeMarkerIndex = index"
      >
        <GMapInfoWindow v-if="activeMarkerIndex === index">
          <div>
            <strong>{{ pos.passenger }}</strong><br />
            {{ pos.address }}<br />
            <em :style="{color: pos.status === 'NAO_PEGO' ? 'red': 'green'}">Status: {{ pos.status }}</em>
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
.map-container { width: 100%; height: 100vh; }
.loading-msg { padding: 20px; text-align: center; font-weight: bold; }
</style>
