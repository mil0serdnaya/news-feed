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
    <template v-if="isFetching">
      <div>Загрузка новостей...</div>
    </template>

    <template v-else-if="error">
      <div>Ошибка при загрузке новостей.</div>
    </template>

    <template v-else>
      <ul>
        <NewsListItem
          v-for="(article, index) in formattedNews"
          :key="index"
          :article="article"
        />
      </ul>
    </template>
  </section>
</template>


<style scoped lang="scss">

</style>