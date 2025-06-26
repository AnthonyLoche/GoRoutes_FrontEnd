<script setup>
import AccountCircle from "vue-material-design-icons/AccountCircle.vue"
import DataDriverComp from "./DataDriverComp.vue";
</script>

<template>
  <section>
    <div class="title">
        <AccountCircle />
        <h2>Dados do Perfil</h2>
    </div>
    <DataDriverComp />
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