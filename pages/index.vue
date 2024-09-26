<script setup lang="ts">
const newsStore = useNewsStore();

const { data: news, error } = await useAsyncData('news', () => newsStore.fetchNews());
</script>

<template>
  <div class="news-page">
    <div v-if="error">
      {{ error }}
    </div>

    <div v-else-if="newsStore.isLoading">
      Загрузка новостей...
    </div>

    <div v-else>
      <FiltersBar />

      <NewsList :news="newsStore.paginatedNews" />

      <div class="pagination">
        <v-pagination 
          v-model="newsStore.currentPage" 
          :length="newsStore.totalPages" 
          @input="newsStore.changePage"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.news-page {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 24px;
  }
}
</style>
