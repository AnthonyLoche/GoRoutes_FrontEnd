<script setup>
import { ref, onMounted } from "vue";
import { decode } from "@googlemaps/polyline-codec";

// Polyline codificada da rota
const encodedPolyline =
  "|sf_DrndiHfGWJQPa@n@KtEOnG_@bPw@bc@gBlG]LBNEJe@WUE?UQmEeZe@_DEs@p@F~BRn@D?c@BsB@aDBiDB{Bd@mFkBMcAIJsAVuD^oG^aEj@uBnAwBhN_MtO_NxEsDrBgB{AyCmB{D[oADcEUaAoBkCvAmApAiAfBeBwBuC{AyBa@a@e@]iDmBFMf@w@fBaBhDeDZFdA|Aj@|@KSeBgCQSdAiApAhBqAiBrAoA~A}AnAqA^WcA{AW_@m@}@v@k@v@m@i@y@i@{@{AoBxAmA~DgDpB_BiKcPhKbPqB~A`G`JvFpIvDzFjBaB~DkDxOuN`@m@?g@o@mAkCiDgBmCO}ADqBXoARy@dA}@lAcAnB{AhB]rBHf@GjBGfBXrOzCzAl@vD|D`CjC~@fAhF|FbK|KpA~A`AkB{@kC|C{F|JyEnF_CuBcGtBbGdKyE~Bu@xFoC|BeAp@~BtBvFMT|@zClAlDm@zF[`CO|@oB`BnBaBN?p@tCj@lB{E|DgLtJkHnGyAtAf@j@`CjCbFnFxM~NvJ`KjAnAnAdC`@lL|ApPVpAf@J|Ek@nCwArAeBdHmLLeAQ{@sA{Fs@eAcAyAz@w@`CiBjA_@~WmBtADjBrAf@hAZt@z@LtBExE~DbBxAiBdBhBeBzA~AdEvDiE`EhEaEdJ}ImAgB~A_BaCeD`CdDbElFvAmArDaD~ByCGgBL{@n@cAx@y@`A{@l@e@Xv@v@rBjAzCv@|AfA}@fD_DtE{ElBiB~@iBb@y@\\m@^i@LLLLTcAJg@jA}GxBaQjGme@nB}Lp@yArBaCzFyFlBW|CQnFU~AG@}AEgEk@wAkCcFo@eBc@cEVeBn@sAvAkHf@{Dl@gElB{DjBwB~EeEz@aC|@}G~BaC`HiGzI_IjTsRhKgJlChAxBfB|@`BfAfBTMtAa@nCe@pBF`BWv@c@hBcCz@_Cv@qPjA_ElBcClA{@rBm@xBWhHMnDe@fE}ClBq@vAGnCt@~N`L`CbBtCd@nC_@bBoAxF_K~CkG|B}Br@WpJw@~CgAhBaBvAiCfAiDpAmCrEeCvEaA`G`@jAFvBMlBs@`BaBjAaBhCoDjEwGnC_DtHwDrBa@nFDtIPxBShBkAr@uAXoCDsBZkBjAcBbIkD~GqCzCqA`AeA`@kA?{B_@cFRuAxAyBfB{AlGiFhCuC|@oBzAsAhDKtJhB`JxB~DlAxJpBrFvBdADv@OjB{AnLmMj@e@Su@eEqJiBsDmC_EcMwPoQuUqBkBwDcCe\\aTuZsQwKoHeGuF";

const markers = [
        [
            -26.2743225,
            -48.8215154
        ],
        [
            -26.2745862,
            -48.8205662
        ],
        [
            -26.2752928,
            -48.8188197
        ],
        [
            -26.2749506,
            -48.8171257
        ],
        [
            -26.2743446,
            -48.811934
        ],
        [
            -26.2783041,
            -48.8185767
        ],
        [
            -26.298096,
            -48.8118372
        ],
        [
            -26.3024044,
            -48.8109314
        ],
        [
            -26.3034241,
            -48.8170304
        ],
        [
            -26.3010555,
            -48.8213905
        ],
        [
            -26.3185899,
            -48.831045
        ],
        [
            -26.3187648,
            -48.8298967
        ],
        [
            -26.3220112,
            -48.8283438
        ],
        [
            -26.3197757,
            -48.833183
        ]
    ];

const routePath = ref([]);
const markerPositions = ref([]);

onMounted(() => {
  routePath.value = decode(encodedPolyline).map(([lat, lng]) => ({ lat, lng }));

  markerPositions.value = markers.map(([lat, lng]) => ({ lat, lng }));
});
</script>

<template>
  <GMapMap
    :center="routePath[0]"
    :zoom="13"
    map-type-id="roadmap"
    style="width: 100%; height: 600px"
  >
    <GMapPolyline
      :path="routePath"
      :options="{
        strokeColor: '#1976D2',
        strokeOpacity: 0.8,
        strokeWeight: 4
      }"
    />

    <GMapMarker
      v-for="(pos, index) in markerPositions"
      :key="index"
      :position="pos"
    />
  </GMapMap>
</template>
