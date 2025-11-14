<script setup>
import { HeaderMain, AsideDriverComp , FooterMain} from '@/components'
</script>

<template>

    <div class="main-default">
        <div class="header">
            <HeaderMain />
        </div>
        <div class="grid">
            <div class="aside">
                <AsideDriverComp />
            </div>
            <div class="view">
                Eskebede
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
    width: 70%;
    height: 100%;
    padding: 1rem;
    overflow-y: auto;
    margin: auto;
}

/* .main-default div {
    border: 1px solid #000;
} */

@media screen and (max-width: 1024px) {
    .grid {
        display: flex;
    }

    .view{
        width:100%;
    }


}
</style>