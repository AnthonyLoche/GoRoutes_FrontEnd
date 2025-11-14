<script setup>
import AccountCircle from "vue-material-design-icons/AccountCircle.vue"
import MapMarker from "vue-material-design-icons/MapMarker.vue";
import Document from "vue-material-design-icons/FileDocument.vue";
import DataDriverComp from "./DataDriverComp.vue";
import DocsDriverComp from "./DocsDriverComp.vue";
import MyAddressDriver from "./MyAddressDriver.vue";
</script>

<template>
  <section>
    <div class="title">
      <AccountCircle />
      <h2>Dados do Perfil</h2>
    </div>
    <DataDriverComp />
  </section>
  
  <section style="margin-top: 1rem;">
    <div class="title">
      <MapMarker />
      <h2>Meus Endereços</h2>
    </div>
    <MyAddressDriver />
  </section>

  <section style="margin-top: 1rem; margin-bottom: 2rem;">
    <div class="title">
      <Document />
      <h2>Meus Documentos</h2>
    </div>
    <DocsDriverComp />
  </section>

</template>


<style scoped>
.title {
  border-bottom: 2px solid var(--primary-color);
  display: flex;
  gap: 0.5rem;
}

span {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>