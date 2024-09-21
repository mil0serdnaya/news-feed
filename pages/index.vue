<script setup lang="ts">
const newsStore = useNewsStore();

await newsStore.fetchNews();
</script>

<template>
  <div v-if="newsStore.isLoading">
    Загрузка новостей...
  </div>
  <div v-else-if="!newsStore.error && !newsStore.isLoading">
    <FiltersBar />
    <NewsList :news="newsStore.news"/>
    <v-pagination :length="4"></v-pagination>
  </div>
</template>

<style scoped>

</style>