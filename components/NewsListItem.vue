<script setup>
defineProps(['article']);
</script>

<template>
  <article class="news-article">
    <p class="news-article__date">{{ article.pubDate }}</p>
    <NuxtLink :to="`/news/${article.id}`" class="news-article__link">{{ article.title }}</NuxtLink>
    <p class="news-article__description">{{ article.description }}</p>
  </article>
</template>

<style lang="scss">
.news-article {
  padding: 16px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  &__date {
    color: #757575;
    font-size: 14px;
    margin-bottom: 8px;
  }

  &__link {
    font-size: 20px;
    font-weight: 500;
    color: #1A73E8;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &__description {
    margin-top: 12px;
    font-size: 16px;
    color: #424242;
  }
}
</style>