<script setup>
import { HeaderMain, AsideCompProfile } from '@/components'
import PolylineComp from './PolylineComp.vue';
// eslint-disable-next-line no-unused-vars
import MarkerPolyline from './MarkerPolyline.vue';
// eslint-disable-next-line no-unused-vars
import AbComp from './AbComp.vue';

const my_poly = "hjs_Dfc`iHRN`IwHwAkB{DiF_JtI}@S_DkAcF?_VnBgFtDyFuIsDyCyQuKwUqNaE{DsFwDiEsCuD{DyHuHgCiCsAoDiAiB_BmAiLoHmFaFuDkDiEyAuNgC}Bu@eBQwHzByCh@{CJqNd@gTn@yVx@mDNeA|BwAlE`@fJFtLHfE~@jGl@fCfFlHr@q@`BwAdCiCpBpCVh@Wi@qBqCdAiApAhBqAiBh@g@xAuAlAoA|@{@RMo@aAk@y@m@}@nByAaCmDm@w@`Ay@ZWtFsEv@o@wEmHqDuFpDtFvElHw@n@y@n@^h@|CxEzCrEnE|GfCxDt@o@xBmBpDaDzEoEjHmHEe@_BcCmDqE]qABiDXqAbA}An@k@v@o@`CaB|CInDOnEt@zN~CzIdJ|CjDrKvLxC`Dh@p@^w@Z}@]eAW{@z@}Az@}ARg@Z_@pEqB|E}BvB_Az@a@gA_Dm@cBl@bBfA~Cx@_@`EiBbEmBnIoDlB}@X`At@|BpAzDnAxEt@lC[xCq@fG}BnB|BoBt@fDh@hBe@^kJ~HwHpG_IfH`GvGfKfLxL~LvFnG`AzBJfD`AzRdAdGpFi@fDsAbFsHrC}ELeA_AuEyAgDcAyAz@w@`CiBjA_@hNeAjKa@jBrAf@~@Dd@v@f@pAI|@BnB~A~CnCl@h@{AtAMNLOrFgFvCqCf@t@rAhBj@p@n@m@`B}An@o@{B_DzB~Co@n@aB|AeB`BiCdCsArAl@l@n@l@yBtBoAjAnAkAhEeEnAmAp@z@n@|@x@q@hB_BlC_C~CmCnBeBl@p@fB~C\\rARb@`AA|NnLxCgF~GmIbAmGAyE}@kDRcCfDeQ~CiVnIao@p@yBhA}AtBsBzBwBpA{AlBWbIc@hDKCeHwBkE{BsFO_FpBsGdBgMpAmEzAsBxHoHlAcIpA_CpMkLrOeN|NwM`HwF`E~BzD|FzDoAxECjCmAzB}DXcBXyKv@qExAuCdBaBpAo@~Dm@dL_@hAa@jFoDfDUpCfAjInGvEnDzBfAxALlBS`A]zDqFbDeGj@gA`DeFp@c@dFq@zD[~Bo@pA{@dB{BvAyDzB_FjHwCvDWdGf@hCQjCuAlDyE|FsIjAeB~CyCjH_DrDYnEPlIHvBu@hAoA`@}ANcDd@iDj@{@bFiCtCgA|KuEvAoBPcAa@oFBwB\\oAjEiExIwHjCqE|Bq@`Fd@hRhE~GnB`GfA`DvAvCd@pBw@lOgPqA}DkDgHeD{FaCaDuK{NsH}JaIuJuT_O_\\aS{IiFVoAy@e@"
       

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