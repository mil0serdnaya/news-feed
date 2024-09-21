import { defineStore } from 'pinia';
import type { NewsItem } from '~/types/news';
import Parser from 'rss-parser';

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
      try {
        const parser = new Parser();
        const url = 'http://static.feed.rbc.ru/rbc/logical/footer/news.rss';
        const feed = await parser.parseURL(url);

        this.news = feed.items
          .map(item => ({
            title: item.title ?? 'Без названия',
            author: item.creator ?? 'Неизвестный автор',
            link: item.link ?? '#',
            pubDate: item.pubDate ? new Date(item.pubDate).toISOString() : '',
            description: item.contentSnippet ?? 'Нет описания',
          }))
          .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
      } catch (error) {
        this.error = 'Ошибка при получении RSS';
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