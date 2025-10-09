<script setup>
import { HeaderMain, AsideCompProfile } from '@/components'
import PolylineComp from './PolylineComp.vue';
// eslint-disable-next-line no-unused-vars
import MarkerPolyline from './MarkerPolyline.vue';
// eslint-disable-next-line no-unused-vars
import AbComp from './AbComp.vue';

const my_poly = "~uf_DjndiHdEOJQPa@n@KtEO~Lm@rT_Aja@uBZFLI@g@YMUQmAqHeDsUEs@p@F~BRn@D?c@BsB@aDBiDNmEX{CkBMcAIJsAVuD^oG^aEj@uBnAwB~^_\\xEsDrBgB{AyCmB{D[oACgAH{BUaAoBkCvAmApAiAfBeBwBuC{AyBa@a@gEyCnCyChDeDZFdA|Aj@|@KSeBgCQSdAiApAhBqAiBrAoA~A}AnAqA^WcA{AaDiEyAkBtBgBrD{CvEyDiKcPhKbPqB~AxBfDbFtHrIpM~EgE|KcK`FsEHe@Ko@}B}CqCsDWiAJyDd@mBxBkBv@o@dCwAnC@lDOvLvBbE|@zAl@`GnGjAnAnEbFnKlLjCxC`AkBISq@wB|@aBrAkCdHeDzE}BvBcAuBcGtBbGrBaApKmEvJuElB~Fz@tBOHvBnHRz@i@vEo@nEoB`BnBaBN?|AbGaVfSmEzDyAtAf@j@`CjClBtBjExEtDhErM~MzF`H\\dBLbGJlEbAbLXlB\\X~HeAtA_A|FcJxB}D@{@aA}Ek@}AeAyAe@u@PObByAvAaAtA[~PoA|EYzAVvBzBAHHj@x@^hBIj@LtBhBlCzBl@h@{AtAMNLOzAuAl@n@`B|A`BzAn@l@yBtBoAjAnAkAhEeErDmD`B_Bg@s@e@s@n@o@n@o@{B_DxEvG|AvBl@g@nAeAxAsAv@q@TXdAvA^r@t@tBPl@j@E`B`ArC|BbF|D|@t@tAcCR]|GqI`A_B`@sBTmF_@_D_@_BA_B|CsOlNkeAbAiFp@mA`CkChB_B~AeBbAs@zHa@rDKbAE@sA?eBQmC{AmC_BgDc@sA]mE\\aBt@gBrBiMlAqG~AcCjBwBxEcEv@iDn@yETa@nD}CrFcF|IaIbUoSrH{Gp@]dDdBdB`B|AlCd@^VMtBk@vBSnBDfBe@r@i@fBoCl@wB\\uL`@oCpAqDlBuBpAu@xCq@bL[tBc@vEeDtBk@dA?bB^x@b@vH`GhEdDlC~AtARhBIdAYv@e@pAeBhCuErAeCzDiHrAeAlBe@lEUjEs@tA}@bBcBzAeD~@{CjAsBpGwChEa@xE`@zDGvBaAhDeEbFoH|BiDlCmCjHkDzDa@~DLzINjBe@zAqAf@uAReCF{B\\_B`@s@rBuAvF{BnKiEvAeA`@o@TeAG}CUgEVoAbCwCnAeAfIaHhCsElB_AdDB`U`FbEnAvKbC|CpAhARvB_@bO_Pd@_@Kc@[aAiEkJoCeFsCwD_LiOwQyU{McJsWsPmXcPkM}IqEgE"

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
        <!-- <AbComp /> -->
        <PolylineComp :polyline="my_poly" />
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