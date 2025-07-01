<template>
  <div class="conteudo">
    <div class="meu-box">
      <input
        type="text"
        v-model="nomeCompletoLocal"
        class="input-nome"
        :placeholder="placeholder"
        @focus="placeholder = ''"
        @blur="placeholder = defaultPlaceholder"
      />
      <label class="label-nome">{{ label }}</label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholderText: { type: String, default: 'Nome Completo' },
  label: { type: String, default: 'Nome Completo' },
})

const nomeCompletoLocal = ref(props.modelValue)
const placeholder = ref(props.placeholderText)
const defaultPlaceholder = props.placeholderText
</script>

<style scoped>
.conteudo {
  width: 20rem;
  padding: 20px;
  margin: 0 auto;
  padding-top: 40px;
  font-family: Arial;
}

.meu-box {
  position: relative;
}

.input-nome {
  width: 100%;
  position: relative;
  font-size: 0.9rem;
  color: #000;
  border-radius: 10px;
  border: 1px solid #2d1c5b;
  padding: 10px 10px 10px 0px;
  box-sizing: content-box;
  z-index: 2;
  padding: 0.7rem 1rem;
}
.input-nome::placeholder {
  margin-left: 20px;
}

.label-nome {
  width: fit-content;
  height: 1rem;
  padding: 5px;
  font-size: 0.7rem;
  position: absolute;
  color: #353dcc;
  background-color: white;
  top: 3px;
  bottom: 0;
  left: 30px;
  right: 0;
  transition: 0.3s;
}

.input-nome + .label-nome {
  margin-top: 0px;
  top: -30%;
  z-index: 2;
  transition: 0.2s;
}

.input-nome {
  border-bottom-width: 2px;
  outline: none;
}

/*
Se quiser ter o :focus com ação no label 
.input-nome:focus + .label-nome {
  margin-top: 0px;
  top: -30%;
  z-index: 2;
  transition: 0.2s;
}

.input-nome:focus {
  border-bottom-width: 2px;
  outline: none;
}
*/
</style>
