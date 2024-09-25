import { defineStore } from 'pinia';
import type { NewsItem } from '~/types/news';

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: [] as NewsItem[],
    filteredNews: [] as NewsItem[],
    isLoading: false,
    error: null as string | null,
    currentPage: 1,
    itemsPerPage: 5,
    filterWords: '',
  }),

  actions: {
    async fetchNews() {
      this.isLoading = true;
      try {
        const { data } = await useFetch<NewsItem[]>('/api/news');
        this.news = data.value || [];
        this.applyFilter();
        return this.news;
      } catch (error) {
        this.error = 'Ошибка при получении новостей';
      } finally {
        this.isLoading = false;
      }
    },
    changePage(page: number) {
      this.currentPage = page;
    },
    setFilterWords(words: string) {
      this.filterWords = words;
      this.currentPage = 1;
      this.applyFilter();
    },
    applyFilter() {
      const filter = this.filterWords.toLowerCase();
      if (!filter) {
        this.filteredNews = this.news;
      } else {
        this.filteredNews = this.news.filter((item: NewsItem) =>
          item.title.toLowerCase().includes(filter) ||
          item.description?.toLowerCase().includes(filter)
        );
      }
    }
  },

  getters: {
    paginatedNews: (state) => {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      return state.filteredNews.slice(start, start + state.itemsPerPage);
    },
    totalPages: (state) => {
      return Math.ceil(state.filteredNews.length / state.itemsPerPage);
    }
  }
});
