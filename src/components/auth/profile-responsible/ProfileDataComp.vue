<script setup>
import AccountCircle from "vue-material-design-icons/AccountCircle.vue"
import DataComp from "./DataComp.vue";
import AddressComp from "./AddressComp.vue";
import Map from "vue-material-design-icons/Map.vue";
</script>

<template>
  <section>
    <div class="title">
        <AccountCircle />
        <h2>Dados do Perfil</h2>
    </div>
    <DataComp />
    <div class="title">
        <Map />
        <h2>Dados de Endereço</h2>
    </div>
    <AddressComp />
  </section>
</template>


<style scoped>
.title{
    border-bottom: 2px solid var(--primary-color);
    display: flex;
    gap: 0.5rem;
}

span{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>