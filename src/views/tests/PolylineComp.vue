<script setup>
import { ref, onMounted } from "vue";
import { decode } from "@googlemaps/polyline-codec"; // Biblioteca para decodificar o polyline

const encodedPolyline =
  "|sf_DrndiHfGWJQ`Am@dNo@bPw@bc@gBzGYZk@WU[QmEeZe@_DEs@p@F~BRn@D?c@BsB@aDBiDB{Bd@mFkBMcAIJsAVuD^oG^aEj@uBnAwBhN_MnVsSrBgB{AyCmB{D[oADcEUaAoBkCvAmApAiAfBeBwBuC{AyBa@a@gEyCxH_IZFdA|Aj@|@qB{Cr@}ApAhBqAiBrAoA~A}AnAqA^WcA{AW_@m@}@v@k@v@m@i@y@i@{@{AoBxAmA~DgDxNrTyNsTpB_BiKcPiBwCaA_BtAgAlEmDhFaEpB{A^n@f@x@nCmBvQyOrIqH|DiDIsAUgDWgDm@kICu@@ADC@Kp@wCvI}XDuHIga@tB_GbK_VbP}_@~BuFRcBO}@iAOmBJiQt@wG\\wG\\CgACgAq@Bp@CBfABfAvG]vG]xGYvGY@~A@`B@xBBzEeOd^iLfXg@zACnDJl^Y~GaK`\\I@?ThBtU~Dti@TdCQh@aGrB_@dANNnCeBlIYjUtEzIdJpPbRxC`Dh@p@^w@Z}@]eAW{@z@}Az@}ARg@Z_@pEqB|E}BvB_Az@a@gA_Dm@cBl@bBfA~Cx@_@`EiBbEmBnIoDlB}@X`At@|BpAbEjAtEx@hC[xCq@fG}BnB|BoBt@fDh@hBe@^kJ~HwHpG_IfH`GvGfKfLxL~LvFnG`AzBJfDpAbSp@pFzAHpF_AvAaA|FcJxB}D@{@aA}EqBwDSeAbByAvAaAtSkB|EYzAVtBdCHj@x@^hBI`DvBlCzBl@h@{AtAzAuAl@n@`B|Ar@l@rAsAhCeCfE_En@o@{B_D|EvG`BtBj@e@lAcAxAqArDeE?}@XaCdAsAbCwBvBxF`A|BZl@z@s@z@w@bB}AdCmCdFkFlC{EZZZ{AdA}FvD{Y`Iik@rByDzBsB|C_DbAs@lCIhH_@v@CbAE@sA?eBQmCqCmF}AkECqErByGrB}NxAkDvAcBhFmElAsBfAkIpA}AjMcLrQaPlQcPlCgBtEtClD~EtEkAjECvCwB`BeDVwDVuIdAwE|DwE`Bo@nKk@tEa@|A{@xEwC`D?zDxBxGfFhF|DrCt@pCUtAs@pDyFpCiFdAsBfDoE^ShHq@|FoA|AoAfDuHjCsElIsCdCCzHd@pBc@tB{AnD_FxFmIrFuFrH}CfUFtBaA|@uAf@sFn@qDx@aA~E{BdFqBfJmEn@uAYmIbAgEbPyNdC}DpCa@|KhBnKjCrLtCnHdCbCN~ByAdJ_KzAaBXcAiCqGmCoFuIgMiToY{GcIkUiOy\\sSkQmKwLgK";

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
