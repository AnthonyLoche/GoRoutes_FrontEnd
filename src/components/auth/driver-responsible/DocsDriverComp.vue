<script setup>
import PlusIcon from "vue-material-design-icons/Plus.vue";
</script>
<template>
    <section>
        <div class="container-item">
            <h2>CNH</h2>
        <div class="item">
        <input type="file" id="file" />
        <label for="file">
            <span><PlusIcon /></span>
            Adicionar Documento
        </label>    
    </div>
    </div>
    <div class="container-item">
            <h2>CURSO</h2>
        <div class="item">
        <input type="file" id="file" />
        <label for="file">
            <span><PlusIcon /></span>
            Adicionar Documento
        </label>    
    </div>
    </div>
    <div class="container-item">
            <h2>TOXICOLÓGICO</h2>
        <div class="item">
        <input type="file" id="file" />
        <label for="file">
            <span><PlusIcon /></span>
            Adicionar Documento
        </label>    
    </div>
    </div>
    </section>
</template>
<style scoped>
section{
    margin-top: 2rem;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
}
.container-item{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.item{
    width: 90%;
    margin: auto;
    border: 2px dashed var(--primary-color);
    border-radius: 8px;
    height: 12rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
.item:hover{
    background-color: rgba(0, 0, 0, 0.05);
}
input[type="file"]{
    width: 100%;
    height: 100%;
    display: none;
}
label{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
}
@media screen and (max-width: 1024px) {
    section{
        grid-template-columns: 1fr;
    }
    .item{
        height: 8rem;
    }
}
</style>