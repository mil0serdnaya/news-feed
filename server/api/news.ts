import Parser from "rss-parser";
import type { NewsItem } from "~/types/news";

export default defineEventHandler(async () => {
  const parser = new Parser();
  const url = 'http://static.feed.rbc.ru/rbc/logical/footer/news.rss';

  try {
    const feed = await parser.parseURL(url);
    const news: NewsItem[] = feed.items
      .map(item => ({
        title: item.title ?? 'Без названия',
        author: item.creator ?? 'Неизвестный автор',
        link: item.link ?? '#',
        pubDate: item.pubDate 
          ? new Date(item.pubDate).toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })
          : '',
        description: item.contentSnippet ?? 'Нет описания',
      }))
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    return news;
  } catch (error) {
    throw createError({
      status: 500,
      message: 'Ошибка при получении RSS'
    })
  }
});