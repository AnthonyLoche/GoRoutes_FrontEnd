<!-- ProfilePhoto.vue -->
<script setup>
import { ref } from 'vue'

const props = defineProps({
    src: String,
})

const emit = defineEmits(['view', 'change'])
const isHover = ref(false)
</script>

<template>
    <div class="profile-photo" @mouseenter="isHover = true" @mouseleave="isHover = false">
        <img :src="props.src || 'https://th.bing.com/th/id/R.090b69301cb8a4f034f9bf94488069ea?rik=0J%2ba5Ubmt0AOvg&pid=ImgRaw&r=0'" alt="Foto de perfil" />
            <div v-if="isHover" class="overlay">
            <v-btn size="small" @click="emit('view')" color="white" icon="mdi-eye" />
            <v-btn size="small" @click="emit('change')" color="white" icon="mdi-camera" />
        </div>
    </div>
</template>

<style scoped>
.profile-photo {
    position: relative;
    width: 250px;
    height: 250px;
}
.profile-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}
.overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-radius: 8px;
    transition: 0.5s ease-in-out;
}

.profile-photo:hover .overlay {
    opacity: 1;
}
</style>
