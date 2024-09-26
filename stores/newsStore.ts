import { defineStore } from 'pinia';
import type { NewsItem } from '~/types/news';

export const useNewsStore = defineStore('news', () => {
  const news = ref<NewsItem[]>([]);
  const filteredNews = ref<NewsItem[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const itemsPerPage = ref(5);
  const filterWords = ref('');
  const startDate = ref<Date | null>(null);
  const endDate = ref<Date | null>(null);

  const fetchNews = async () => {
    isLoading.value = true;
    try {
      const { data } = await useFetch<NewsItem[]>('/api/news');
      news.value = data.value || [];
      applyFilter();
      return news;
    } catch {
      error.value = 'Ошибка при получении новостей';
    } finally {
      isLoading.value = false;
    }
  };

  const changePage = (page: number) => {
    currentPage.value = page;
  };

  const setFilterWords = (words: string) => {
    filterWords.value = words;
    currentPage.value = 1;
    applyFilter();
  };

  const setDateFilter = ({ startDate: newStartDate, endDate: newEndDate } : { startDate: Date | null; endDate: Date | null }) => {
    startDate.value = newStartDate;
    endDate.value = newEndDate;
    applyFilter();
  };

  const resetDateFilter = () => {
    startDate.value = null;
    endDate.value = null;
    applyFilter();
  };

  const applyFilter = () => {
    let filtered = news.value;

    const filter = filterWords.value.toLowerCase();
    if (filter) {
      filtered = filtered.filter((item: NewsItem) =>
        item.title.toLowerCase().includes(filter) || item.description?.toLowerCase().includes(filter)
      );
    }

    if (startDate.value || endDate.value) {
      filtered = filtered.filter((item: NewsItem) => {
        const newsDate = new Date(item.pubDate).getTime();
        const start = startDate.value ? new Date(startDate.value).getTime() : null;
        const end = endDate.value ? new Date(endDate.value).getTime() : null;

        return (!start || newsDate >= start) && (!end || newsDate <= end);
      });
    }

    filteredNews.value = filtered;
  };

  const paginatedNews = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return filteredNews.value.slice(start, start + itemsPerPage.value);
  });

  const totalPages = computed(() => {
    return Math.ceil(filteredNews.value.length / itemsPerPage.value);
  });

  return {
    news,
    filteredNews,
    isLoading,
    error,
    currentPage,
    itemsPerPage,
    filterWords,
    startDate,
    endDate,
    fetchNews,
    changePage,
    setFilterWords,
    setDateFilter,
    resetDateFilter,
    paginatedNews,
    totalPages,
  };
});
