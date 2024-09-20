<script setup>
const { data: news, isFetching, error } = useFetch('/api/rss', {
  server: true,
});

const formattedNews = computed(() => {
  return news.value ? news.value.map(item => ({
    ...item,
    pubDate: formatDate(item.pubDate)
  })) : []
});
</script>

<template>
  <section>
    <div v-if="isFetching">Загрузка новостей...</div>
    <div v-else-if="error">Ошибка при загрузке новостей.</div>
    <div v-else>
      <ul>
        <li v-for="(article, index) in formattedNews" :key="index">
          <p>{{ article.pubDate }}</p>
          <a :href="article.link" target="_blank">{{ article.title }}</a>
          <p>{{ article.description }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>