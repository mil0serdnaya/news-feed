<script setup lang="ts">
const route = useRoute();
const newsStore = useNewsStore();
const articleId = route.params.id;

const article = computed(() => newsStore.news.find(item => item.id === articleId));

if (!article.value) {
  await newsStore.fetchNews();
}
</script>

<template>
  <div v-if="article">
    <h1>{{ article.title }}</h1>
    <p>{{ article.pubDate }}</p>
    <p>{{ article.description }}</p>
  </div>
  <div v-else>
    <p>Новость не найдена</p>
  </div>
</template>