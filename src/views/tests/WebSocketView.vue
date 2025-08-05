<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const motoristaId = 1
const STATUS_KEY = 'motorista_status'

const status = ref(localStorage.getItem(STATUS_KEY) || 'parado')
const carPosition = ref(null)
let socket = null
let watchId = null

const dragging = ref(false)
const startX = ref(0)
const sliderX = ref(0)
const threshold = 120

function initWebSocket() {
  socket = new WebSocket(`ws://localhost:8000/ws/localizacao/${motoristaId}/`)

  socket.onopen = () => {
    console.log('WebSocket conectado')
    sendCurrentLocation()
  }

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    carPosition.value = {
      lat: data.latitude,
      lng: data.longitude,
      user_id: 22
    }
  }

  socket.onclose = () => {
    console.warn('WebSocket desconectado, tentando reconectar...')
    setTimeout(initWebSocket, 3000)
  }
}

function sendCurrentLocation() {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const data = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        user_id: 22
      }
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(data))
        console.log('Localização enviada (única):', data)
      }
    },
    (err) => {
      console.warn('Erro ao obter localização única:', err)
    }
  )
}

function startSendingLocation() {
  if (watchId !== null) return

  watchId = navigator.geolocation.watchPosition(
    (pos) => {
      const data = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        user_id: 22
      }
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(data))
        console.log('Localização enviada (contínua):', data)
      }
    },
    (err) => {
      console.warn('Erro ao enviar localização contínua:', err)
    },
    { enableHighAccuracy: true, maximumAge: 0 }
  )
}

function stopSendingLocation() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId)
    watchId = null
  }
}

function toggleStatus() {
  if (status.value === 'parado') {
    status.value = 'em transito'
  } else {
    status.value = 'parado'
  }

  localStorage.setItem(STATUS_KEY, status.value)

  if (status.value === 'em transito') {
    startSendingLocation()
  } else {
    stopSendingLocation()
    sendCurrentLocation()
  }
}

// Slide drag events
function startDrag(e) {
  dragging.value = true
  startX.value = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX
}

function onDrag(e) {
  if (!dragging.value) return
  const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX
  const deltaX = clientX - startX.value
  sliderX.value = Math.max(0, Math.min(deltaX, 200))
}

function endDrag() {
  if (!dragging.value) return
  dragging.value = false

  if (sliderX.value > threshold) {
    toggleStatus()
  }

  sliderX.value = 0
}

watch(status, (newStatus) => {
  if (newStatus === 'em transito') {
    startSendingLocation()
  } else {
    stopSendingLocation()
    sendCurrentLocation()
  }
})

onMounted(() => {
  initWebSocket()
  if (status.value === 'em transito') {
    startSendingLocation()
  } else {
    sendCurrentLocation()
  }
})

onUnmounted(() => {
  stopSendingLocation()
  if (socket) socket.close()
})
</script>

<template>
  <h1>Localização do Carro em Tempo Real</h1>

  <div
    class="slider-container"
    @mousedown="startDrag"
    @touchstart="startDrag"
    @mouseup="endDrag"
    @touchend="endDrag"
    @mousemove="onDrag"
    @touchmove="onDrag"
  >
    <div class="slider-track" :class="{ active: status === 'em transito' }">
      <div
        class="slider-button"
        :style="{ left: `${sliderX}px` }"
      >
        {{ status === 'em transito' ? '⏹' : '▶️' }}
      </div>
      <span class="slider-label">
        {{ status === 'em transito' ? 'Deslize para Parar' : 'Deslize para Ativar' }}
      </span>
    </div>
  </div>

  <p>Status atual: <strong>{{ status }}</strong></p>

  <GMapMap
    :center="carPosition || { lat: -26.2743225, lng: -48.8215154 }"
    :zoom="15"
    style="width: 100%; height: 80vh"
    map-type-id="roadmap"
  >
    <GMapMarker
      v-if="carPosition"
      :position="carPosition"
      :icon="carIcon"
    />
  </GMapMap>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 1rem;
}
.slider-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  user-select: none;
}
.slider-track {
  position: relative;
  width: 220px;
  height: 50px;
  background-color: #ddd;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}
.slider-track.active {
  background-color: #ff6464;
}
.slider-button {
  position: absolute;
  top: 5px;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  font-weight: bold;
  transition: left 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 10;
}
.slider-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 14px;
  color: #333;
  pointer-events: none;
}
p {
  text-align: center;
  font-weight: bold;
}
</style>
