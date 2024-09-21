import { defineStore } from 'pinia';
import type { NewsItem } from '~/types/news';

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: [] as NewsItem[],
    filteredByDate: [] as NewsItem[],
    isLoading: false,
    error: null as string | null,
    startDate: null as string | null,
    endDate: null as string | null,
  }),

  actions: {
    async fetchNews() {
      this.isLoading = true;
      try {
        const { data } = await useFetch<NewsItem[]>('/api/news');
        this.news = data.value || [];
        return this.news;
      } catch (error) {
        this.error = 'Ошибка при получении новостей';
        return [];
      } finally {
        this.isLoading = false;
      }
    }
  }
})