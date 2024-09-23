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
    currentPage: 1,
    itemsPerPage: 5,
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
      } finally {
        this.isLoading = false;
      }
    },
    changePage(page: number) {
      this.currentPage = page;
    }
  },

  getters: {
    paginatedNews: (state) => {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      return state.news.slice(start, start + state.itemsPerPage);
    },
    totalPages: (state) => {
      return Math.ceil(state.news.length / state.itemsPerPage);
    },
  }
});
