<script setup>
import { ref } from "vue"

const isDragging = ref(false)
const startY = ref(0)
const sheetHeight = ref(250)
const minHeight = 250 
const maxHeight = window.innerHeight * 0.8 

const onTouchStart = (e) => {
  isDragging.value = true
  startY.value = e.touches[0].clientY
}

// Durante o arraste
const onTouchMove = (e) => {
  if (!isDragging.value) return
  e.preventDefault()

  const delta = startY.value - e.touches[0].clientY
  let newHeight = sheetHeight.value + delta

  if (newHeight < minHeight) newHeight = minHeight
  if (newHeight > maxHeight) newHeight = maxHeight

  sheetHeight.value = newHeight
  startY.value = e.touches[0].clientY
}

const onTouchEnd = () => {
  isDragging.value = false
  const middle = (minHeight + maxHeight) / 2
  if (sheetHeight.value >= middle) {
    sheetHeight.value = maxHeight
  } else {
    sheetHeight.value = minHeight
  }
}
</script>

<template>
  <div
    class="bottom-sheet"
    :style="{ height: sheetHeight + 'px' }"
    @touchstart="onTouchStart"
    @touchmove.passive="false"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div class="drag-handle"></div>
    <div class="content">
      <h3>Resumo da Rota</h3>
      <p><strong>Destino:</strong> Rua das Flores, 123</p>
      <p><strong>Distância:</strong> 12 km</p>
      <p><strong>Tempo estimado:</strong> 25 min</p>
      <p><strong>Status:</strong> Em andamento</p>

      <div v-if="sheetHeight === maxHeight" class="extra-info">
        <h4>Detalhes:</h4>
        <ul>
          <li>Parada 1 - Av. Central, 456</li>
          <li>Parada 2 - R. João Silva, 789</li>
          <li>Parada final - Rua das Flores, 123</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.15);
  transition: height 0.2s ease;
  overflow: hidden;
}

.drag-handle {
  width: 40px;
  height: 5px;
  background: #ccc;
  border-radius: 3px;
  margin: 8px auto;
}

.content {
  padding: 16px;
}

.extra-info {
  margin-top: 12px;
}
</style>
