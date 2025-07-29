<script setup>
import { ref, onMounted } from "vue";
import { decode } from "@googlemaps/polyline-codec"; // Biblioteca para decodificar o polyline

const encodedPolyline =
  "|sf_DrndiHfGWJQPa@n@KtEOnG_@bPw@bc@gBlG]LBNEJe@WUE?UQmEeZe@_DEs@p@F~BRn@D?c@BsB@aDBiDB{Bd@mFkBMcAIJsAVuD^oG^aEj@uBnAwBhN_MtO_NxEsDrBgB{AyCmB{D[oADcEUaAoBkCvAmApAiAfBeBwBuC{AyBa@a@e@]iDmBFMf@w@fBaBhDeDZFdA|Aj@|@KSeBgCQSdAiApAhBqAiBrAoA~A}AnAqA^WcA{AW_@m@}@v@k@v@m@i@y@i@{@{AoBxAmA~DgDpB_BiKcPhKbPqB~A`G`JvFpIvDzFjBaB~DkDxOuN`@m@?g@o@mAkCiDgBmCO}ADqBXoARy@dA}@lAcAnB{AhB]rBHf@GjBGfBXrOzCzAl@vD|D`CjC~@fAhF|FbK|KpA~A`AkB{@kC|C{F|JyEnF_CuBcGtBbGdKyE~Bu@xFoC|BeAp@~BtBvFMT|@zClAlDm@zF[`CO|@oB`BnBaBN?p@tCj@lB{E|DgLtJkHnGyAtAf@j@`CjCbFnFxM~NvJ`KjAnAnAdC`@lL|ApPVpAf@J|Ek@nCwArAeBdHmLLeAQ{@sA{Fs@eAcAyAz@w@`CiBjA_@~WmBtADjBrAf@hAZt@z@LtBExE~DbBxAiBdBhBeBzA~AdEvDiE`EhEaEdJ}ImAgB~A_BaCeD`CdDbElFvAmArDaD~ByCGgBL{@n@cAx@y@`A{@l@e@Xv@v@rBjAzCv@|AfA}@fD_DtE{ElBiB~@iBb@y@\\m@^i@LLLLTcAJg@jA}GxBaQjGme@nB}Lp@yArBaCzFyFlBW|CQnFU~AG@}AEgEk@wAkCcFo@eBc@cEVeBn@sAvAkHf@{Dl@gElB{DjBwB~EeEz@aC|@}G~BaC`HiGzI_IjTsRhKgJlChAxBfB|@`BfAfBTMtAa@nCe@pBF`BWv@c@hBcCz@_Cv@qPjA_ElBcClA{@rBm@xBWhHMnDe@fE}ClBq@vAGnCt@~N`L`CbBtCd@nC_@bBoAxF_K~CkG|B}Br@WpJw@~CgAhBaBvAiCfAiDpAmCrEeCvEaA`G`@jAFvBMlBs@`BaBjAaBhCoDjEwGnC_DtHwDrBa@nFDtIPxBShBkAr@uAXoCDsBZkBjAcBbIkD~GqCzCqA`AeA`@kA?{B_@cFRuAxAyBfB{AlGiFhCuC|@oBzAsAhDKtJhB`JxB~DlAxJpBrFvBdADv@OjB{AnLmMj@e@Su@eEqJiBsDmC_EcMwPoQuUqBkBwDcCe\\aTuZsQwKoHeGuF"; // (use o full polyline aqui)

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
    style="width: 100%; height: 500px"
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
