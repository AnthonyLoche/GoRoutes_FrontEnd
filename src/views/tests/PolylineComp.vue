<script setup>
import { ref, onMounted } from "vue";
import { decode } from "@googlemaps/polyline-codec"; // Biblioteca para decodificar o polyline

const encodedPolyline =
  "~uf_DjndiHdEOJQPa@n@KtEOnG_@nDMrT_AjTiAvCGfGc@LFL?LI@g@YMUQmAqHeDsUEs@p@F~BRn@D?c@BsB@aDBiDNmEX{CkBMcAIJsAVuD^oG^aEj@uBnAwB~^_\\xEsDrBgB{AyCmB{D[oACgAH{BUaAoBkCvAmApAiAfBeBwBuC{AyBa@a@e@]iDmBFMf@w@fBaBhDeDHKPRdA|Aj@|@DJEKKSeBgCQSdAiApAhBqAiBrAoA~A}AnAqA^WcA{AW_@m@}@v@k@v@m@i@y@i@{@{AoBxAmA~DgDpB_BiKcPhKbPqB~A`G`JvFpIvDzFjBaB~DkDlF_FjHuG`@m@?g@o@mA{EeGc@yA@gDXoARy@dA}@lAcAnB{AhB]bADvACjBGfBXrOzCzAl@vD|D`CjCpC`DhKjLpCtCpA~A`AkB{@kCfC{ET_@|C{AnM}FuBcGtBbGdKyE~Bu@xFoC|BeAp@~BvBtFOHbAdDfApDGlAaAnHO|@oB`BnBaBLM@Lp@tCj@lB{E|DgLtJeKdJ`GvGfKfLzIjJ|ArAvFnG`AzBJfDVnHHrC^vDp@`FRb@pFi@tBk@p@g@pAcBxDpFx@|ALxHlDAlDGFtEJtJpYg@bP[hAOnB_ArH_Fn\\oT`BqAzFoJxCgF~GmI^iAb@cEAyE}@kDRcCfDeQ~CiVnIao@p@yBhA}AtBsBzBwBpA{AlBWbIc@hDKCeHwBkE{A}C_@uAU{BDcB`@kAnAgEdBgMTsAz@yBzAsB`AeAxBeBdB_BVc@b@}Ah@eFRw@|@gAhFqEfFyEnHuGbFoE|NwM|FkFb@K`E~BdAjAtBpDzDoAxECjBq@^[zB}DXcBXyKv@qExAuCdBaBpAo@~Dm@dL_@hAa@fCqBbB}@pBYt@BtA^z@f@jInGvEnD~@n@z@VxALlBS`A]bA}@vBsD~@cBbBaDj@gApAiCnA{Ap@c@n@UtD[zD[~Bo@pA{@dB{BvAyD|@eC|@yAbEoBfBg@nBYfA@pCTrBPhCQjCuAlDyE|FsIjAeB~CyCjH_DrDYnEPlIHvBu@hAoA`@}ANcDHeBZcAj@{@VWjEqBtAi@~@]|KuE`AeATi@PcAa@oFBwB\\oAfAuAhAaAx@q@xIwHt@qAh@mAj@q@n@a@lAOzABdC`@dPlDbAZ~GnB`GfA`DvApA^dADv@Ox@g@nIeJ|DaEqA}DkDgHeD{FaCaDuK{NsH}J{C_EeDuDuT_O_\\aSmQkKsKqI_BaB";

const routePath = ref([]);

onMounted(() => {
  // Decodifica os pontos para coordenadas lat/lng
  const decoded = decode(encodedPolyline).map(([lat, lng]) => ({ lat, lng }));
  routePath.value = decoded;
});
</script>

<template>
  <GMapMap
    :center="routePath[0]"
    :zoom="13"
    map-type-id="roadmap"
    style="width: 100%; height: 800px"
  >
    <GMapPolyline
      :path="routePath"
      :options="{
        strokeColor: '#1976D2',
        strokeOpacity: 0.8,
        strokeWeight: 4
      }"
    />
  </GMapMap>
</template>
