<script setup>
import { HeaderRouteActive, MapRouteActive, CaptionRouteActive } from '@/components';
</script>

<template>
  <div class="route-view">
    <HeaderRouteActive />
    <MapRouteActive />
    <CaptionRouteActive />
  </div>
</template>

<style scoped>
.route-view {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
