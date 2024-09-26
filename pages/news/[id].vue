<script setup lang="ts">
import { useNewsStore } from '~/stores/newsStore';

const route = useRoute();
const newsStore = useNewsStore();
const articleId = route.params.id;

const article = computed(() => newsStore.news.find(item => item.id === articleId));

if (!article.value) {
  await newsStore.fetchNews();
}

const isDialogOpen = ref(false);
const selectedImage = ref<string | undefined>(undefined);

const openImage = (imageUrl: string) => {
  selectedImage.value = imageUrl;
  isDialogOpen.value = true;
};
</script>

<template>
  <div v-if="article" class="article-container">
    <h2 class="article-title">{{ article.title }}</h2>

    <p class="article-meta">{{ article.pubDate }}, {{ article.author }}</p>

    <p class="article-description">{{ article.description }}</p>

    <a :href="article.link" class="article-link" target="_blank" rel="noopener noreferrer">{{ article.link }}</a>

    <v-carousel 
      v-if="article.imageUrls.length" 
      class="image-carousel"
      :show-arrows="article.imageUrls.length > 1"
      hide-delimiters
    >
      <v-carousel-item
        v-for="(imageUrl, index) in article.imageUrls"
        :key="index"
        cover
      >
        <nuxt-img
          :src="imageUrl"
          lazy
          class="carousel-image"
          @click="openImage(imageUrl)"
          alt="Image"
        />
      </v-carousel-item>
    </v-carousel>

    <v-dialog v-model="isDialogOpen" max-width="800">
      <v-img v-if="selectedImage" :src="selectedImage" alt="Full-size image" />
    </v-dialog>
  </div>

  <div v-else>
    <p>Новость не найдена</p>
  </div>
</template>

<style scoped>
.article-container {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.article-title {
  font-size: 2em;
  margin-bottom: 10px;
}

.article-meta {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 15px;
}

.article-description {
  font-size: 1.1em;
  margin-bottom: 20px;
}

.article-link {
  display: inline-block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

.article-link:hover {
  color: #0056b3;
}

.image-carousel {
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  max-height: 500px;
}

.carousel-image {
  cursor: pointer;
  border-radius: 8px;
  transition: transform 0.2s;
}

.carousel-image:hover {
  transform: scale(1.05);
}

.mt-4 {
  margin-top: 16px;
}
</style>
