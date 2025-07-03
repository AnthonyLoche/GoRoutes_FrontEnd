<script setup>
const props = defineProps({
  titulo: { type: String, default: "Dados Pessoais" },
  imgSrc: { type: String, default: "../../../assets/images/UserIconCircle.png" },
})
</script>

<template>
  <div>
    <div class="header">
      <div class="inline">
        <img :src="props.imgSrc" alt="imagem cabeçalho" />
        <h2>{{ props.titulo }}</h2>
      </div>
      <hr/>
    </div>
  </div>
</template>
<style scoped>
.header {
  width: 90%;
}
.header h2 {
  font-family: 'Homenaje', sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
}
.inline {
  display: flex;
  align-items: center;
  margin-left: 3rem;
}
img{
    width: 20px;
    height: 20px;
}
hr {
  border: 1px solid black;
}
</style>
