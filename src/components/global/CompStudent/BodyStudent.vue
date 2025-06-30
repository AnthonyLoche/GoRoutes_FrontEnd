<script setup>
// import AsideComp from './AsideComp.vue';
// import NavBar from './NavBar.vue';
import InputFlutuante from './InputFlutuante.vue'
</script>
<template>
  <div>
    <div class="header">
      <div class="inline">
        <img src="../../../assets/images/UserIconCircle.png" alt="" />Dados Pessoais
      </div>
      <hr />
    </div>
    <div class="body">
      <section class="image">
        <div class="square"><img src="../../../assets/images/UserIcon.png" alt="" /></div>
      </section>
    </div>
    <InputFlutuante
      v-model="nome"
      placeholderText="Digite seu nome completo"
      label="Nome Completo"
    />
  </div>
</template>
<style scoped>
.inline {
  display: flex;
  align-items: center;
}

.square {
  height: 200px;
  width: 200px;
  background-color: #2d1c5b4d;
  justify-content: center;
  align-items: center;
}

.square img {
  height: 180px;
  width: 180px;
}
</style>
