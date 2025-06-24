<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
const isEditing = ref(false)

function toggleEdit() {
    isEditing.value = !isEditing.value
}
</script>

<template>
    <section>
        <div class="photo">
            <img src="https://th.bing.com/th/id/OIP.wAOSqn_43AnsNcHffGrwHgHaGB?w=500&h=407&rs=1&pid=ImgDetMain"
                alt="Foto de perfil" />

            <div class="form-wrapper">

                <div class="form-grid">
                    <v-text-field v-model="authStore.state.user.name" label="Nome" variant="outlined"
                        :readonly="true" />
<v-text-field v-model="authStore.state.user.responsible_data.cpf" label="CPF" variant="outlined"
                    :readonly="true" />

                    <v-text-field v-model="authStore.state.user.username" label="Username" variant="outlined"
                        :readonly="!isEditing" />

                    <!-- Segunda linha -->
                    <v-text-field v-model="authStore.state.user.email" label="Email" variant="outlined"
                    :readonly="!isEditing" />
                    

                    <v-text-field class="full" v-model="authStore.state.user.telephone" label="Telefone"
                        variant="outlined" :readonly="!isEditing" />

                    <div class="edit-button full">
                        <v-btn @click="toggleEdit" color="primary" variant="tonal" prepend-icon="mdi-pencil-outline"
                            rounded="1">
                            Editar
                        </v-btn>
                        <v-btn @click="toggleEdit" color="primary" prepend-icon="mdi-content-save-outline" rounded="1">
                            Salvar
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.photo {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
    margin: 2rem auto;
}

.photo img {
    width: 250px;
    height: 250px;
    object-fit: cover;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
}

.edit-button {
    display: flex;
    align-items: end;
    justify-content: end;
    width: 100%;
    gap: 1rem;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    width: 100%;
}

.full {
    grid-column: span 2;
}
</style>
