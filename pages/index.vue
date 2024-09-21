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
    <NewsList :news="news"/>
    <v-pagination :length="Math.ceil(news.length / 5)"></v-pagination>
  </div>
</template>

<style scoped>

</style>