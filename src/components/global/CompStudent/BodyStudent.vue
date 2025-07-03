<script setup>
import AsideComp from './AsideComp.vue'
import NavBar from './NavBar.vue'
import InputFlutuante from './InputFlutuante.vue'
import LineTitle from './LineTitle.vue'

import userIcon from '../../../assets/images/UserIconCircle.png'
</script>
<template>
  <div>
    <NavBar />
    <div class="container">
      <AsideComp />
      <div class="body">
        <div class="dadosPessoais">
          <div class="lineTitle">
            
          <LineTitle titulo="Dados Pessoais" :imgSrc="userIcon"/>
          </div>
          <div class="table1">
            <section class="image">
              <div class="square">
                <img src="../../../assets/images/UserIcon.png" alt="" />
              </div>
            </section>
            <section class="name">
              <InputFlutuante label="Nome" v-model="nomeCompleto" style="width: 104%" />
              <InputFlutuante
                v-model="gmail"
                placeholderText="Digite seu gmail completo"
                label="Gmail"
                style="width: 104%"
              />
            </section>
          </div>
          <div class="table2">
            <InputFlutuante />
            <InputFlutuante />
            <InputFlutuante />
            <InputFlutuante />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
}
.body {
  width: 100vw;
}
.lineTitle{
  width: 90%;
}
.table1 {
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 3rem;
  margin-top: 30px;
}
.table2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 3rem;
}
.dadosPessoais {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.square {
  height: 200px;
  width: 200px;
  background-color: #2d1c5b4d;
  display: flex;
  justify-content: center;
  align-items: center;
}

.square img {
  height: 180px;
  width: 180px;
}
</style>
