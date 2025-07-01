<script setup>
// import AsideComp from './AsideComp.vue'
// import NavBar from './NavBar.vue'
import InputFlutuante from './InputFlutuante.vue'
</script>
<template>
  <div>
    <NavBar />
    <AsideComp />
    <div class="body">
      <div class="dadosPessoais">
        <div class="header">
          <div class="inline">
            <img src="../../../assets/images/UserIconCircle.png" alt="" />
            <h2>Dados Pessoais</h2>
          </div>
          <hr />
        </div>
        <div class="table1">
          <section class="image">
            <div class="square"><img src="../../../assets/images/UserIcon.png" alt="" /></div>
          </section>
          <section class="name">
            <InputFlutuante />
            <InputFlutuante
              v-model="gmail"
              placeholderText="Digite seu gmail completo"
              label="Gmail"
            />
          </section>
        </div>
        <div class="table2">
          <InputFlutuante/>
          <InputFlutuante/>
          <InputFlutuante/>
          <InputFlutuante/> 
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.body{
  width: 100%;
}
.header {
  width: 100%;
}
.header h2 {
  font-family: 'Homenaje', sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
}
.inline {
  display: flex;
  align-items: center;
}
.table1 {
  display: flex;
}
.table2{
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 3rem;
}
.dadosPessoais {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
