<script setup>
import { ref, onMounted } from 'vue'

const carPosition = ref(null)
const routePath = ref([])
const waypoints = ref([])

const carIcon = {
  url: 'https://cdn-icons-png.flaticon.com/512/744/744465.png',
  scaledSize: { width: 50, height: 50 },
  anchor: { x: 25, y: 25 },
}

// Pontos da rota (5 endereços)
const points = [
  { lat: -26.394889, lng: -48.738833 }, // Ponto 1 (origem)
  { lat: -26.390, lng: -48.732 },       // Ponto 2
  { lat: -26.385, lng: -48.728 },       // Ponto 3
  { lat: -26.380, lng: -48.720 },       // Ponto 4
  { lat: -26.377528, lng: -48.725444 }, // Ponto 5 (destino)
]

waypoints.value = points

function waitForGoogle() {
  return new Promise(resolve => {
    const check = () => {
      if (window.google && window.google.maps && window.google.maps.geometry) resolve()
      else setTimeout(check, 100)
    }
    check()
  })
}

function getRoutePoints(origin, destination) {
  return new Promise((resolve, reject) => {
    const directionsService = new google.maps.DirectionsService()
    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result.routes.length) {
          const route = result.routes[0]
          const path = google.maps.geometry.encoding.decodePath(route.overview_polyline)
          const points = path.map(latlng => ({
            lat: latlng.lat(),
            lng: latlng.lng(),
          }))
          resolve(points)
        } else {
          reject(status)
        }
      }
    )
  })
}

async function checkPassedPoints() {
  const carLatLng = new google.maps.LatLng(carPosition.value.lat, carPosition.value.lng)
  const threshold = 20 // metros

  waypoints.value = waypoints.value.filter(point => {
    const pointLatLng = new google.maps.LatLng(point.lat, point.lng)
    const dist = google.maps.geometry.spherical.computeDistanceBetween(carLatLng, pointLatLng)
    return dist > threshold
  })

}

function moveCarSmoothly(from, to, duration = 1000) {
  const steps = 60
  const delay = duration / steps
  let step = 0

  const deltaLat = (to.lat - from.lat) / steps
  const deltaLng = (to.lng - from.lng) / steps

  return new Promise(resolve => {
    const interval = setInterval(() => {
      if (step >= steps) {
        clearInterval(interval)
        resolve()
        return
      }

      carPosition.value = {
        lat: from.lat + deltaLat * step,
        lng: from.lng + deltaLng * step
      }

      checkPassedPoints()

      step++
    }, delay)
  })
}

async function buildFullRoute(points) {
  let fullPath = []

  for (let i = 0; i < points.length - 1; i++) {
    const segment = await getRoutePoints(points[i], points[i + 1])
    if (i === 0) fullPath = segment
    else fullPath = [...fullPath, ...segment.slice(1)]
  }

  return fullPath
}

async function followRoute(points) {
  for (let i = 0; i < points.length - 1; i++) {
    await moveCarSmoothly(points[i], points[i + 1])
  }
}

onMounted(async () => {
  await waitForGoogle()

  routePath.value = await buildFullRoute(points)

  carPosition.value = routePath.value[0]

  await followRoute(routePath.value)
})
</script>

<template>
  <GMapMap
    :center="carPosition || points[0]"
    :zoom="15"
    style="width: 100%; height: 80vh"
    map-type-id="roadmap"
  >
    <GMapPolyline
      v-if="routePath.length"
      :path="routePath"
      :options="{
        strokeColor: '#4285F4',
        strokeWeight: 5,
        strokeOpacity: 0.7,
      }"
    />

    <GMapMarker
      v-for="(point, idx) in waypoints"
      :key="idx"
      :position="point"
    />

    <GMapMarker
      v-if="carPosition"
      :position="carPosition"
      :icon="carIcon"
    />
  </GMapMap>
</template>
