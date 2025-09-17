<script setup>
import { RouterView } from 'vue-router'
import { HeaderMain, AsideMain, FooterMain } from '@/components'
</script>

<template>

    <div class="main-default">
        <div class="header">
            <HeaderMain />
        </div>
        <div class="grid">
            <div class="aside">
                <AsideMain />
            </div>
            <div class="view">
                <RouterView />
            </div>
        </div>
    </div>
    <FooterMain />

</template>

<style scoped>
.main-default {
    display: grid;
    grid-template-rows: 10% 90%;
    height: 100vh;
}

.header {
    width: 100%;
    height: 100%;
}

.grid {
    display: grid;
    grid-template-columns: 13% 87%;
}

.view {
    overflow-y: auto;
}

@media screen and (max-width: 1024px) {
    .grid {
        display: flex;
        flex-direction: column;
    }

    .main-default {
        display: block;
    }


}
</style>