<script setup lang="ts">
const newsStore = useNewsStore();

const { data: news, error } = await useAsyncData('news', () => newsStore.fetchNews());

</script>

<template>
  <div v-if="error">
    {{ error.message }}
  </div>
  <div v-else-if="!news">
    Загрузка новостей...
  </div>
  <div v-else>
    <NewsList :news="newsStore.paginatedNews" />
    <v-pagination 
      v-model="newsStore.currentPage" 
      :length="newsStore.totalPages" 
      @input="newsStore.changePage"
    />
  </div>
</template>

<style scoped>

</style>