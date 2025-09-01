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
        <v-text-field clearable :label='props.label' variant="outlined" :placeholder='props.placeholder' density="compact" @input="updateValue" :type="props.type" class="fe" ></v-text-field>
        <a :href="props.subtextLink" v-if="props.haveSubtext" class="subtext"> {{ props.subtext }}</a>
    </div>
</template>
<style scoped>
.fe{
    margin-bottom: 0;
    margin-top: 0;
}
div {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: .5rem auto;
}

</style>
