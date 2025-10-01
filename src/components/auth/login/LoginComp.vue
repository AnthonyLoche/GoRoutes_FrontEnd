<script setup>
import BgImage from "@/components/auth/BgImage.vue";
import captionComp from "@/components/auth/login/CaptionComp.vue";
import { InputComp, LogoComp, ButtonComp } from "@/components";
import { useAuthStore } from "@/stores";

import { reactive, onMounted, onUnmounted } from "vue";
import ButtonCompBorded from "@/components/global/ButtonCompBorded.vue";

const authStore = useAuthStore();

const login = reactive({
    email: "",
    password: ""
});

const isScreenLarge = reactive({
    value: window.innerWidth > 1024
});

const handleLogin = () => {
  authStore.login(login.email, login.password);
};

const updateScreenSize = () => {
  isScreenLarge.value = window.innerWidth > 1024;
};

onMounted(() => {
  window.addEventListener("resize", updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<template>
    <div class="container">
        <div class="login-container">
            <LogoComp :variant="2" />
            <div class="form-container">
                <InputComp
                    label="Email"
                    type="text"
                    placeholder="Enter your email"
                    v-model="login.email"
                    :haveSubtext="false"
                    padding-props="1.3rem"
                />
                <InputComp
                    label="Senha"
                    type="password"
                    placeholder="Enter your password"
                    v-model="login.password"
                    :haveSubtext="true"
                    subtext="Esqueci minha senha?"
                    :subtext-link="'/blank/forgot-password'"
                    padding-props="1.3rem"
                    @keyup.enter="handleLogin"
                    style="margin-top: -10px;"
                />
                <div v-if="authStore.state.error" class="error-message">
                    {{ authStore.state.message }}
                </div>
                <ButtonComp
                    name="LOGIN"
                    padding=".5rem"
                    @click="handleLogin"
                />
                <captionComp pCaption="Ainda não é nosso cliente?" txtLink="Cadastre-se" link="/blank/register" />
            </div>
        </div>
        <div class="aside">
            <div></div>
            <div></div>
        </div>
    </div>
    <div class="back" v-if="isScreenLarge.value">
        <BgImage :variant="1" />
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    min-width: 100%;
    padding-left: 10rem;
}

.aside {
    margin: auto;
    gap: 1rem;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.aside > div {
    width: 100%;
    min-height: 40vh;
    border-radius: 20px;
}

.login-container {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    height: calc(100vh - 7rem);
    width: 33%;
    margin-top: 7rem;
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    max-width: 400px;
    border-radius: 20px;
}

.error-message {
    color: #ff0000;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    text-align: center;
    width: 100%;
}

/* MOBILE */
@media screen and (max-width: 1024px) {
    .container {
        flex-direction: column;
        height: auto;
        padding: 1rem;
    }

    .login-container {
        width: 100%;
        padding: 2rem 0;
        margin-top: 15%;
    }

    .aside {
        display: none;
    }

    .form-container {
        width: 100%;
        padding: 0 1rem 1rem 1rem;
    }

    .back {
        display: none; /* corrige o fundo */
    }
}

/* Ajustes para botão funcionar no mobile */
.button-wrapper {
    display: flex;
    justify-content: center;
    pointer-events: none; /* evita que div bloqueie touch */
}

.button-wrapper button {
    pointer-events: auto; /* botão continua clicável */
    touch-action: manipulation; /* força touch funcionar */
}
</style>
