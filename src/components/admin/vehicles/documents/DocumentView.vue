<script setup>
const props = defineProps({
  modelValue: Boolean,
  src: String,
  type: String
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <v-dialog v-model="props.modelValue" max-width="800" transition="dialog-bottom-transition">
    <v-card>
      <div class="title">
        <h2>{{ props.type }}</h2>
      </div>
      <v-card-text>
        <iframe v-if="props.src?.file_download" :src="props.src?.file_download" width="100%" height="500px"></iframe>
        <p v-else>Nenhum documento disponível</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="primary" @click="emit('update:modelValue', false)">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.title {
  border-bottom: 2px solid var(--primary-color);
  padding: .5rem;
}
</style>
