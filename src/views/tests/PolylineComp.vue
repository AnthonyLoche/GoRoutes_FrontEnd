<script setup>
import { ref, onMounted } from "vue";
import { decode } from "@googlemaps/polyline-codec";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const props = defineProps({
  polyline: {
    type: String,
    required: true
  }
});

const map = ref(null);
const currentPositionIndex = ref(0);
const isAnimating = ref(false);
const routePath = ref([]);

// Decodificar polyline e converter para formato [lng, lat]
const decoded = decode(props.polyline).map(([lat, lng]) => [lng, lat]);
routePath.value = decoded;

const startAnimation = () => {
  if (isAnimating.value) return;
  isAnimating.value = true;
  currentPositionIndex.value = 0;
  animateCar();
};

const stopAnimation = () => {
  isAnimating.value = false;
};

const animateCar = () => {
  if (!isAnimating.value || currentPositionIndex.value >= routePath.value.length) {
    isAnimating.value = false;
    return;
  }

  const [lng, lat] = routePath.value[currentPositionIndex.value];
  
  // Atualizar posição do carro no mapa 3D
  if (map.value) {
    // Mover o ponto do carro
    map.value.getSource('car').setData({
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        }
      }]
    });

    // Voar até a posição com inclinação 3D
    map.value.flyTo({
      center: [lng, lat],
      bearing: getBearing(currentPositionIndex.value),
      pitch: 60, // Inclinação 3D
      zoom: 16,
      essential: true,
      duration: 1000
    });
  }

  currentPositionIndex.value++;
  setTimeout(animateCar, 100);
};

// Calcular direção baseada na posição atual
const getBearing = (index) => {
  if (index >= routePath.value.length - 1) return 0;
  
  const [lng1, lat1] = routePath.value[index];
  const [lng2, lat2] = routePath.value[index + 1];
  
  const y = Math.sin(lng2 - lng1) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - 
           Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1);
  
  return (Math.atan2(y, x) * 180) / Math.PI;
};

const resetAnimation = () => {
  isAnimating.value = false;
  currentPositionIndex.value = 0;
  
  if (map.value) {
    const [lng, lat] = routePath.value[0];
    map.value.getSource('car').setData({
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        }
      }]
    });
    
    map.value.flyTo({
      center: [lng, lat],
      zoom: 13,
      pitch: 0,
      bearing: 0
    });
  }
};

onMounted(() => {
  // Inicializar mapa MapLibre 3D
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
    center: routePath.value[0],
    zoom: 13,
    pitch: 45, // Inclinação inicial 3D
    bearing: 0
  });

  map.value.on('load', () => {
    // Adicionar fonte da rota
    map.value.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: routePath.value
        }
      }
    });

    // Adicionar camada da rota
    map.value.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#1976D2',
        'line-width': 4,
        'line-opacity': 0.8
      }
    });

    // Adicionar fonte do carro
    map.value.addSource('car', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: routePath.value[0]
          }
        }]
      }
    });

    // Adicionar camada do carro
    map.value.addLayer({
      id: 'car',
      type: 'symbol',
      source: 'car',
      layout: {
        'icon-image': 'car-icon',
        'icon-size': 1,
        'icon-rotate': ['get', 'bearing'],
        'icon-rotation-alignment': 'map',
        'icon-allow-overlap': true
      }
    });

    // Adicionar ícone personalizado do carro
    const size = 50;
    const carSvg = `
      <svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="30" width="80" height="40" rx="10" fill="#FF0000"/>
        <circle cx="25" cy="70" r="8" fill="#333"/>
        <circle cx="75" cy="70" r="8" fill="#333"/>
        <rect x="20" y="20" width="60" height="15" rx="5" fill="#FF4444"/>
      </svg>
    `;

    const carImage = new Image();
    carImage.onload = () => {
      map.value.addImage('car-icon', carImage);
    };
    carImage.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(carSvg);

    // Adicionar controles de navegação 3D
    map.value.addControl(new maplibregl.NavigationControl());
  });
});
</script>

<template>
  <div class="map-container">
    <div id="map"></div>
    <div class="controls">
      <div class="control-group">
        <button @click="startAnimation" :disabled="isAnimating" class="btn btn-start">
          {{ isAnimating ? '🔄 Em movimento...' : '🚗 Iniciar Viagem 3D' }}
        </button>
        <button @click="stopAnimation" :disabled="!isAnimating" class="btn btn-stop">
          ⏹️ Parar
        </button>
        <button @click="resetAnimation" class="btn btn-reset">
          🔄 Reiniciar
        </button>
      </div>
      <div class="info">
        <div>📍 Pontos: {{ routePath.length }}</div>
        <div>🎯 Posição: {{ currentPositionIndex }}/{{ routePath.length }}</div>
        <div>🎮 Use o mouse para rotacionar e inclinar o mapa 3D</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 700px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}

#map {
  width: 100%;
  height: 100%;
}

.controls {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  backdrop-filter: blur(10px);
  min-width: 250px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.btn {
  padding: 12px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-align: center;
}

.btn-start {
  background: linear-gradient(135deg, #1976D2, #1565C0);
  color: white;
}

.btn-start:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.4);
}

.btn-stop {
  background: linear-gradient(135deg, #f44336, #d32f2f);
  color: white;
}

.btn-stop:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.4);
}

.btn-reset {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  color: white;
}

.btn-reset:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.4);
}

.btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.info {
  color: #666;
  font-size: 12px;
  line-height: 1.4;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #1976D2;
}

.info div {
  margin-bottom: 4px;
}

.info div:last-child {
  margin-bottom: 0;
  font-weight: 600;
  color: #1976D2;
}
</style>