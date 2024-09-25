<script setup lang="ts">
import { ref, watch } from 'vue';
import { useNewsStore } from '~/stores/newsStore';

const newsStore = useNewsStore();
const filterText = ref('');

watch(filterText, (newVal) => {
  newsStore.setFilterWords(newVal);
});
</script>

<template>
  <v-text-field
    v-model="filterText"
    label="Фильтр по словам"
    variant="outlined"
  />
</template>

<style scoped>
/* Стили по необходимости */
</style>
