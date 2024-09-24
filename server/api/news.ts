import Parser from "rss-parser";
import type { NewsItem } from "~/types/news";

export default defineEventHandler(async () => {
  const parser = new Parser();
  const url = 'http://static.feed.rbc.ru/rbc/logical/footer/news.rss';

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  try {
    const feed = await parser.parseURL(url);
    const news: NewsItem[] = feed.items
      .map(item => ({
        id: item.guid ?? '',
        title: item.title ?? 'Без названия',
        author: item.creator ?? 'Неизвестный автор',
        link: item.link ?? '#',
        imageUrl: item.enclosure?.url ?? '',
        pubDate: item.pubDate ? formatDate(item.pubDate) : '',
        isoDate: item.isoDate ?? '',
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
