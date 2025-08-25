<script setup>
import AccountCircle from "vue-material-design-icons/AccountCircle.vue"
import DataComp from "./DataComp.vue";
import DependantsComp from "./DependantsComp.vue";
import AccountChild from "vue-material-design-icons/AccountChild.vue";
</script>

<template>
  <section>
    <div class="title">
        <AccountCircle />
        <h2>Dados do Perfil</h2>
    </div>
    <DataComp />
    <div class="title">
        <AccountChild />
        <h2>Dependentes:</h2>
    </div>
    <DependantsComp />
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
@media (max-width: 1024px) {
  section{
    width: 100%;
  }
  .title h2{
        font-size: 1.2rem;
    }
}
</style>