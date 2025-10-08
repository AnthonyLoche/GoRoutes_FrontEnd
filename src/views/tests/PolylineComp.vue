<script setup>
import { ref, onMounted } from "vue";
import { decode } from "@googlemaps/polyline-codec"; // Biblioteca para decodificar o polyline

const encodedPolyline =
  "~uf_DjndiHdEOJQPa@n@KtEO~Lm@rT_Aja@uBZFLI@g@YMUQmAqHeDsUEs@p@F~BRn@D?c@BsB@aDBiDNmEX{CkBMcAIJsAVuD^oG^aEj@uBnAwB~^_\\xEsDrBgB{AyCmB{D[oACgAH{BUaAoBkCvAmApAiAfBeBwBuC{AyBa@a@gEyCnCyChDeDZFdA|Aj@|@KSeBgCQSdAiApAhBqAiBrAoA~A}AnAqA^WcA{AaDiEyAkBtBgBrD{CvEyDiKcPhKbPqB~AxBfDbFtHrIpM~EgE|KcK`FsEHe@Ko@}B}CqCsDWiAJyDd@mBxBkBv@o@dCwAnC@lDOvLvBbE|@zAl@`GnGjAnAnEbFnKnLjCxC`AkBISq@wB|@aBrAkCdHeDzE}BvBcAuBcGtBbGrBaApKmEvJuElB~Fz@tBOHvBnHRz@i@vEo@nEoB`BnBaBN?|AbGaVfSmEzDyAtAf@j@`CjClBtBjExEtDhErM~MzF`H\\dBLbGJlEbAbLXlB\\X~HeAtA_A|FcJxB}D@{@aA}Ek@}AeAyAe@u@PObByAvAaAtA[~PoA|EYzAVvBzBAHHj@x@^hBIj@LtBhBlCzBl@h@{AtAMNLOzAuAl@n@`B|A`BzAn@l@yBtBoAjAnAkAhEeErDmD`B_Bg@s@e@s@n@o@n@o@{B_DxEvG|AvBl@g@nAeAxAsAv@q@TXdAvA^r@t@tBPl@j@E`B`ArC|BbF|D|@t@tAcCR]|GqI`A_B`@sBTmF_@_D_@_BA_B|CsOlNkeAbAiFp@mA`CkChB_B~AeBbAs@zHa@rDKbAE@sA?eBQmC{AmC_BgDc@sA]mE\\aBt@gBrBiMlAqG~AcCjBwBxEcEv@iDn@yETa@nD}CrFcF|IaIbUoSrH{Gp@]dDdBdB`B|AlCd@^VMtBk@vBSnBDfBe@r@i@fBoCl@wB\\uL`@oCpAqDlBuBpAu@xCq@bL[tBc@vEeDtBk@dA?bB^x@b@vH`GhEdDlC~AtARhBIdAYv@e@pAeBhCuErAeCzDiHrAeAlBe@lEUjEs@tA}@bBcBzAeD~@{CjAsBpGwChEa@xE`@zDGvBaAhDeEbFoH|BiDlCmCjHkDzDa@~DLzINjBe@zAqAf@uAReCF{B\\_B`@s@rBuAvF{BnKiEvAeA`@o@TeAG}CUgEVoAbCwCnAeAfIaHhCsElB_AdDB`U`FbEnAvKbC|CpAhARvB_@bO_Pd@_@Kc@[aAiEkJoCeFsCwD_LiOwQyU{McJsWsPmXcPkM}IqEgE";

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
