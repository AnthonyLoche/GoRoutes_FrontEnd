<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores'
import Image from 'vue-material-design-icons/Image.vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({ modelValue: Boolean })

const file = ref(null)
const authStore = useAuthStore()

function handleFileChange(e) {
    const selected = e.target.files[0]
    if (selected) {
        file.value = selected
    }
}

async function uploadPhoto() {
    if (!file.value) return

    const reader = new FileReader()
    reader.onload = () => {
        authStore.state.user.photo = reader.result
    }
    reader.readAsDataURL(file.value)

    const formData = new FormData()
    formData.append('user_id', authStore.state.user.id)
    formData.append('picture', file.value)

    try {
        const response = await authStore.updatePicture(formData)
        console.log(response)
        emit('update:modelValue', false)
    } catch (error) {
        console.error('Erro ao enviar imagem:', error)
    }
}
</script>

<template>
    <v-dialog v-model="props.modelValue" max-width="500">
        <v-card>
            <div class="title">
                <div class="text">
                    <Image />
                    <h2>Alterar Foto de Perfil</h2>
                </div>
          
                <v-btn icon variant="text" @click="emit('update:modelValue', false)">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>
            <v-card-text>
                <v-file-input
                    label="Selecione uma nova imagem"
                    accept="image/*"
                    @change="handleFileChange"
                    show-size
                />
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="uploadPhoto" :disabled="!file">Enviar</v-btn>
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

span{
    display: flex;
    align-items: center;
    justify-content: center;
}

.text{
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
</style>