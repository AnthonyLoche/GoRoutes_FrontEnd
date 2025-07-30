<script setup>
const props = defineProps({
    modelValue: Boolean,
    src: String
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <v-dialog v-model="props.modelValue" max-width="600" close-on-click-outside="false" close-on-esc="true"
        transition="dialog-bottom-transition">
        <v-card height="100%">
            <div class="title">
                <h2>Foto de Perfil</h2>
            </div>
            <v-card-text>
                <v-img :src="props.src || 'https://via.placeholder.com/600x400'" contain />
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" text @click="emit('update:modelValue', false)">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.title {
    border-bottom: 2px solid var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .5rem;
}
</style>
