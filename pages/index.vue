<script setup lang="ts">
const newsStore = useNewsStore();

const { data: news, error } = await useAsyncData('news', () => newsStore.fetchNews());
</script>

<template>
  <div v-if="error">
    {{ error }}
  </div>
  <div v-else-if="newsStore.isLoading">
    Загрузка новостей...
  </div>
  <div v-else>
    <WordFilter />
    <NewsList :news="newsStore.paginatedNews" />
    <v-pagination 
      v-model="newsStore.currentPage" 
      :length="newsStore.totalPages" 
      @input="newsStore.changePage"
    />
  </div>
</template>
