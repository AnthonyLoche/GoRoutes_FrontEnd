<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { decode } from "@googlemaps/polyline-codec";
import { useGoRoutesStore } from "@/stores";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const goRoutesStore = useGoRoutesStore();

const map = ref(null);
const routePath = ref([]);
const markerPositions = ref([]);

// Inicializar mapa
const initializeMap = () => {
  const center = mapCenter.value;
  
  map.value = new maplibregl.Map({
    container: 'map',
    style: {
      version: 8,
      sources: {
        'osm': {
          type: 'raster',
          tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '© OpenStreetMap Contributors'
        }
      },
      layers: [{
        id: 'osm',
        type: 'raster',
        source: 'osm'
      }]
    },
    center: [center.lng, center.lat],
    zoom: 13,
    pitch: 60, // Vista 3D mais acentuada
    bearing: 0,
    antialias: true // Suavização para melhor visualização 3D
  });

  map.value.on('load', () => {
    // Adicionar controles
    map.value.addControl(new maplibregl.NavigationControl({ showCompass: true }));
    map.value.addControl(new maplibregl.ScaleControl());
    
    // Adicionar camada 3D de terreno (opcional)
    map.value.addSource('terrain', {
      type: 'raster-dem',
      url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
      tileSize: 256
    });
    
    map.value.setTerrain({ source: 'terrain', exaggeration: 1.5 });

    // Adicionar elementos ao mapa
    addRouteToMap();
    addMarkersToMap();
  });
};

// Adicionar rota ao mapa
const addRouteToMap = () => {
  if (!routePath.value.length || !map.value) return;

  const coordinates = routePath.value.map(point => [point.lng, point.lat]);

  map.value.addSource('route', {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: coordinates
      }
    }
  });

  map.value.addLayer({
    id: 'route',
    type: 'line',
    source: 'route',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#022840',
      'line-width': 4,
      'line-opacity': 0.8
    }
  });

  // Adicionar animação 3D à rota
  map.value.addLayer({
    id: 'route-3d',
    type: 'line',
    source: 'route',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#1a73e8',
      'line-width': 2,
      'line-opacity': 0.6,
      'line-gradient': [
        'interpolate',
        ['linear'],
        ['line-progress'],
        0, 'blue',
        1, 'cyan'
      ]
    }
  });
};

// Adicionar marcadores ao mapa
const addMarkersToMap = () => {
  if (!markerPositions.value.length || !map.value) return;

  const features = markerPositions.value.map((pos, index) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [pos.lng, pos.lat]
    },
    properties: {
      id: index,
      passenger: pos.passenger,
      address: pos.address,
      status: pos.status
    }
  }));

  map.value.addSource('passengers', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: features
    }
  });

  // Criar ícone SVG personalizado para passageiros
  const passengerSvg = `
    <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" fill="#FF9800" stroke="#FFFFFF" stroke-width="4"/>
      <circle cx="50" cy="35" r="12" fill="#FFFFFF"/>
      <path d="M35 65 Q50 85 65 65" fill="#FFFFFF"/>
      <text x="50" y="58" text-anchor="middle" fill="#FF9800" font-size="28" font-weight="bold">👤</text>
    </svg>
  `;

  const passengerImage = new Image();
  passengerImage.onload = () => {
    map.value.addImage('passenger-icon', passengerImage);
    
    map.value.addLayer({
      id: 'passengers',
      type: 'symbol',
      source: 'passengers',
      layout: {
        'icon-image': 'passenger-icon',
        'icon-size': 1,
        'icon-allow-overlap': true,
        'icon-ignore-placement': true
      }
    });

    // Adicionar popups
    map.value.on('click', 'passengers', (e) => {
      const feature = e.features[0];
      if (feature) {
        const props = feature.properties;
        new maplibregl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`
            <div style="padding: 12px; min-width: 200px;">
              <strong style="color: #022840; font-size: 14px;">👤 ${props.passenger}</strong><br />
              <p style="margin: 8px 0; font-size: 12px; color: #666;">${props.address}</p>
              <span style="color: ${props.status === 'NAO_PEGO' ? '#f44336' : '#4CAF50'}; font-size: 12px; font-weight: bold;">
                Status: ${props.status}
              </span>
            </div>
          `)
          .addTo(map.value);
      }
    });

    // Mudar cursor ao passar sobre marcadores
    map.value.on('mouseenter', 'passengers', () => {
      map.value.getCanvas().style.cursor = 'pointer';
    });
    map.value.on('mouseleave', 'passengers', () => {
      map.value.getCanvas().style.cursor = '';
    });
  };
  passengerImage.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(passengerSvg);
};

// Atualizar próximo passageiro
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
    lat: parseFloat(addr.latitude),
    lng: parseFloat(addr.longitude),
    address: addr.address,
    passenger: nextPassenger.passenger_name,
    status: nextPassenger.status || "NAO_PEGO",
  })) || [];

  // Atualizar marcadores no mapa se já estiver carregado
  if (map.value && map.value.isStyleLoaded()) {
    updateMapMarkers();
  }
};

// Atualizar marcadores no mapa
const updateMapMarkers = () => {
  if (!map.value || !map.value.getSource('passengers')) return;

  const features = markerPositions.value.map((pos, index) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [pos.lng, pos.lat]
    },
    properties: {
      id: index,
      passenger: pos.passenger,
      address: pos.address,
      status: pos.status
    }
  }));

  map.value.getSource('passengers').setData({
    type: 'FeatureCollection',
    features: features
  });
};

// Centralizar no próximo passageiro
const focusOnNextPassenger = () => {
  if (!map.value || !markerPositions.value.length) return;

  const nextPassenger = markerPositions.value[0];
  map.value.flyTo({
    center: [nextPassenger.lng, nextPassenger.lat],
    zoom: 16,
    pitch: 60,
    bearing: 0,
    essential: true,
    duration: 1500
  });
};

// Centralizar na rota completa
const focusOnRoute = () => {
  if (!map.value || !routePath.value.length) return;

  const bounds = new maplibregl.LngLatBounds();
  routePath.value.forEach(point => {
    bounds.extend([point.lng, point.lat]);
  });

  map.value.fitBounds(bounds, {
    padding: 50,
    pitch: 45,
    bearing: 0,
    duration: 1000
  });
};

onMounted(async () => {
  await goRoutesStore.takeMyDailyRoute();
  
  const routeData = goRoutesStore.state.myDailyRouteDriver;
  if (!routeData) return;

  // Decodificar polyline
  if (routeData.overview_polyline?.points) {
    routePath.value = decode(routeData.overview_polyline.points).map(([lat, lng]) => ({ 
      lat: parseFloat(lat), 
      lng: parseFloat(lng) 
    }));
  } else if (typeof routeData.overview_polyline === "string") {
    routePath.value = decode(routeData.overview_polyline).map(([lat, lng]) => ({ 
      lat: parseFloat(lat), 
      lng: parseFloat(lng) 
    }));
  }

  updateNextPassengerMarker();
  
  // Inicializar mapa após próximo tick para garantir DOM
  nextTick(() => {
    initializeMap();
  });
});

// Watch para atualizações
watch(() => goRoutesStore.state.myDailyRouteDriver, () => {
  const routeData = goRoutesStore.state.myDailyRouteDriver;
  if (!routeData) return;

  // Atualizar rota
  if (routeData.overview_polyline?.points) {
    routePath.value = decode(routeData.overview_polyline.points).map(([lat, lng]) => ({ 
      lat: parseFloat(lat), 
      lng: parseFloat(lng) 
    }));
  }

  updateNextPassengerMarker();

  // Atualizar mapa se já estiver carregado
  if (map.value && map.value.isStyleLoaded()) {
    if (map.value.getSource('route')) {
      const coordinates = routePath.value.map(point => [point.lng, point.lat]);
      map.value.getSource('route').setData({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: coordinates
        }
      });
    }
    updateMapMarkers();
  }
});

const mapCenter = computed(() => {
  if (routePath.value.length) return routePath.value[0];
  if (markerPositions.value.length) return markerPositions.value[0];
  const routeData = goRoutesStore.state.myDailyRouteDriver;
  if (routeData?.latitude_origin) {
    return { 
      lat: parseFloat(routeData.latitude_origin), 
      lng: parseFloat(routeData.longitude_origin) 
    };
  }
  return { lat: -26.3, lng: -48.8 };
});
</script>

<template>
  <div class="map-container" v-if="routePath.length || markerPositions.length">
    <div id="map"></div>
    
    <!-- Overlay de controles -->
    <div class="map-controls">
      <button 
        class="control-btn" 
        @click="focusOnNextPassenger"
        :disabled="!markerPositions.length"
        title="Focar no próximo passageiro"
      >
        <span class="control-icon">👤</span>
      </button>
      <button 
        class="control-btn" 
        @click="focusOnRoute"
        :disabled="!routePath.length"
        title="Ver rota completa"
      >
        <span class="control-icon">🗺️</span>
      </button>
    </div>
  </div>

  <div v-else class="loading-container">
    <div class="loading-content">
      <div class="loading-spinner"></div>
      <p>Carregando rota...</p>
    </div>
  </div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
  position: relative;
  margin-top: 3rem;
}

#map {
  width: 100%;
  height: 100%;
}

.map-controls {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 10;
}

.control-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 2px solid #022840;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.control-btn:hover:not(:disabled) {
  transform: scale(1.1);
  background: #022840;
}

.control-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.control-icon {
  font-size: 1.2rem;
}

.control-btn:hover:not(:disabled) .control-icon {
  filter: brightness(0) invert(1);
}

.loading-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.loading-content {
  text-align: center;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #022840;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-content p {
  color: #022840;
  font-weight: 600;
  margin: 0;
}
</style>