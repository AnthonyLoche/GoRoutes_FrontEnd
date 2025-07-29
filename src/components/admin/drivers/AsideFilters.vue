<template>
    <div class="asideMain" @click.self="emit('close')">
        <aside>
            <header class="aside-header">
                <strong>Filtros</strong>
                <v-btn icon="mdi-close" variant="text" @click="emit('close')" />
            </header>
            <v-divider />
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-select v-model="filters.carrier" :items="carrierOptions" label="Carrier Name" clearable
                            variant="outlined" density="compact" />
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-select v-model="filters.orgPort" :items="portOptions" label="Origin Port" clearable
                            variant="outlined" density="compact" />
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-select v-model="filters.destPort" :items="portOptions" label="Destination Port" clearable
                            variant="outlined" density="compact" />
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-text-field v-model="filters.transitTime" label="Transit Time" type="number" clearable
                            variant="outlined" density="compact" />
                    </v-col>
                </v-row>
            </v-card-text>
        </aside>
    </div>
</template>

<script setup>
defineProps({
    filters: Object,
    carrierOptions: Array,
    portOptions: Array
})
const emit = defineEmits(['close'])
</script>

<style scoped>
.asideMain {
    width: 100%;
    height: 100%;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: flex-end;
    z-index: 999;
}

aside {
    width: 30%;
    height: 100%;
    background-color: white;
    padding: 16px;
    overflow-y: auto;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
}

.aside-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}
</style>
