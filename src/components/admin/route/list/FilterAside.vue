<script setup>
const props = defineProps({
  filters: Object,
  statusOptions: Array,
  driverOptions: Array,
  vehicleOptions: Array,
});

const emit = defineEmits(['close']);

const localFilters = { ...props.filters };

const applyFilters = () => {
  emit('update:filters', localFilters);
  emit('close');
};

const clearFilters = () => {
  Object.keys(localFilters).forEach(key => {
    localFilters[key] = null;
  });
};
</script>

<template>
  <v-navigation-drawer
    location="right"
    temporary
    width="400"
  >
    <template #prepend>
      <v-toolbar density="compact">
        <v-toolbar-title>Filtros de Rotas</v-toolbar-title>
        <v-spacer />
        <v-btn icon="mdi-close" @click="$emit('close')" />
      </v-toolbar>
    </template>

    <v-card-text>
      <v-select
        v-model="localFilters.status"
        :items="statusOptions"
        label="Status"
        clearable
        variant="outlined"
        class="mb-4"
      />

      <v-select
        v-model="localFilters.driver"
        :items="driverOptions"
        label="Motorista"
        clearable
        variant="outlined"
        class="mb-4"
      />

      <v-select
        v-model="localFilters.vehicle"
        :items="vehicleOptions"
        label="Veículo"
        clearable
        variant="outlined"
        class="mb-4"
      />
    </v-card-text>

    <template #append>
      <v-card-actions>
        <v-btn variant="outlined" @click="clearFilters" class="mr-2">
          Limpar
        </v-btn>
        <v-btn color="primary" @click="applyFilters">
          Aplicar
        </v-btn>
      </v-card-actions>
    </template>
  </v-navigation-drawer>
</template>