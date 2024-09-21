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
        const { data } = await useFetch<NewsItem[]>('/api/news', {
          method: 'GET',
        });
        this.news = data.value || [];
      } catch (error) {
        this.error = 'Ошибка при получении новостей';
      } finally {
        this.isLoading = false;
      }
    },
    filterByDate() {
      if (this.startDate && this.endDate) {
        const start = new Date(this.startDate).getTime();
        const end = new Date(this.endDate).getTime();

        this.filteredByDate = this.news.filter(item => {
          const pubDate = new Date(item.pubDate).getTime();
          return pubDate >= start && pubDate <= end;
        });
      } else {
        this.filteredByDate = this.news;
      }
    }
  }
})