<script setup>
defineProps(['article']);
</script>

<template>
  <article>
    <div>
      <p>{{ article.pubDate }}</p>
      <NuxtLink :to="`/news/${article.id}`">{{ article.title }}</NuxtLink>
      <p>{{ article.description }}</p>
    </div>
  </article>
</template>

<style scoped lang="scss">

</style>