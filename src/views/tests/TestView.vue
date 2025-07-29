<script setup>
import { HeaderMain, AsideCompProfile } from '@/components'
import AbComp from './AbComp.vue';
import PolylineComp from './PolylineComp.vue';
import MarkerPolyline from './MarkerPolyline.vue';
</script>

<template>
  <div class="main-default">
    <div class="header">
      <HeaderMain />
    </div>
    <div class="grid">
      <div class="aside">
        <AsideCompProfile />
      </div>
      <div class="view">
        <MarkerPolyline />
      </div>
    </div>
  </div>
</template>


<style scoped>
.main-default {
    display: grid;
    grid-template-rows: 10% 90%;
    height: 100vh;
}

.header {
    width: 100%;
    height: 100%;
}

.grid {
    display: grid;
    grid-template-columns: 13% 87%;
}

.view {
    width: 100%;
    height: 100%;
    padding: 1rem;
    overflow-y: auto;
    margin: auto;
}

/* .main-default div {
    border: 1px solid #000;
} */

@media screen and (max-width: 1024px) {
    .grid {
        display: flex;
    }


}
</style>