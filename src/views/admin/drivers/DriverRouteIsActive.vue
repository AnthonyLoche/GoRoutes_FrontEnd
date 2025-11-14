<script setup>
import { HeaderMobileDriver, MapRouteActive, CaptionRouteActive } from '@/components';


</script>

<template>
  <div class="route-view">
    <!-- {{ goRoutesStore.state.myActiveRoute?.passengers }} -->
    <HeaderMobileDriver />
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
