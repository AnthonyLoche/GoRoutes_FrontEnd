<script setup>
const props = defineProps({
  type: String,       
  src: String,        
  vehicleId: Number
})

const emit = defineEmits(['view', 'upload'])
</script>

<template>
  <div class="doc-card">
    <div class="doc-info">
      <strong>{{ type }}</strong>
    </div>
    <div class="doc-actions">
      <v-btn
        size="small"
        icon="mdi-eye"
        @click="emit('view', { type, src })"
        :disabled="!src"
      />
      <v-btn
        size="small"
        icon="mdi-upload"
        @click="emit('upload', { type, vehicleId })"
      />
    </div>
  </div>
</template>

<style scoped>
.doc-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--v-border-color, #ccc);
  padding: .5rem 1rem;
  border-radius: 8px;
  margin-bottom: .5rem;
}

.doc-actions{
    display: flex;
    gap: .5rem;
}
</style>
