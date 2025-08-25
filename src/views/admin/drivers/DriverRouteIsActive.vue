<script setup>
import { HeaderRouteActive, MapRouteActive, CaptionRouteActive } from '@/components';
import { useGoRoutesStore } from '@/stores';

const goRoutesStore = useGoRoutesStore();

</script>

<template>
  <div class="route-view">
    <!-- {{ goRoutesStore.state.myActiveRoute?.passengers }} -->
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
