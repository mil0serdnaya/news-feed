<script setup>
defineProps(['article']);
</script>

<template>
  <article>
    <div>
      <p>{{ article.pubDate }}</p>
      <a :href="article.link" target="_blank">{{ article.title }}</a>
      <p>{{ article.description }}</p>
    </div>
  </article>
</template>

<style scoped lang="scss">

</style>