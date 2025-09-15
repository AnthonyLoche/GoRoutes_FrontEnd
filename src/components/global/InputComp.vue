<script setup>
import { defineEmits } from "vue";

const props = defineProps({
    label: String,
    type: String,
    placeholder: String,
    modelValue: String,
    haveSubtext: Boolean,
    subtext: String,
    subtextLink: String,
    paddingProps: String,
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>
<template>
    <div>
        <v-text-field :label='props.label' variant="outlined" :placeholder='props.placeholder' density="compact" @input="updateValue" :type="props.type" class="fe" ></v-text-field>
        <a :href="props.subtextLink" v-if="props.haveSubtext" class="subtext"> {{ props.subtext }}</a>
    </div>
</template>
<style scoped>
.fe{
    margin-bottom: 0;
    margin-top: 0;
}
.fe:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset !important; /* força cor de fundo */
  -webkit-text-fill-color: #000 !important; /* cor do texto */
  caret-color: #000; /* cor do cursor */
}
/* Se quiser respeitar o tema dark/light */
.v-application.theme--light input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #fff inset !important;
  -webkit-text-fill-color: #000 !important;
}

.v-application.theme--dark input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #121212 inset !important;
  -webkit-text-fill-color: #fff !important;
}
div {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: .5rem auto;
}
a{
    font-size: 0.8rem;
    color: var(--primary-color);
    text-decoration: none;
    margin-top: -3.5%;
    align-self: flex-end;
}
</style>
