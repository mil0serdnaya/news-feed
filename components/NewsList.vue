<script setup>
defineProps(['news'])
</script>

<template>
  <section>
    <ul class="news-list">
      <NewsListItem
        v-for="(article, index) in news"
        :key="index"
        :article="article"
      />
    </ul>
  </section>
</template>


<style scoped lang="scss">
  .news-list {
    display: grid;
    gap: 16px;
  }
</style>