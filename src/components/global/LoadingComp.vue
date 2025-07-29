<script setup>
import { useLoadingStore } from "@/stores";
import { computed } from "vue";

const loadingStore = useLoadingStore();
const isLoading = computed(() => loadingStore.isLoading);
</script>

<template>
  <v-overlay
    :model-value="isLoading"
    class="d-flex align-center justify-center"
    persistent
    scrim="white"
    z-index="9999"
  >
    <div class="overlay-content">
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
        width="6"
      />
    </div>
  </v-overlay>
</template>

<style scoped>
.overlay-content {
  background-color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
