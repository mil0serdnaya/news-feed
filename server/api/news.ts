import Parser from "rss-parser";
import type { NewsItem } from "~/types/news";

export default defineEventHandler(async () => {
  const parser = new Parser({
    customFields: {
      item: [
        ['enclosure', { keepArray: true }]
      ]
    }
  });
  const url = 'http://static.feed.rbc.ru/rbc/logical/footer/news.rss';

  try {
    const feed = await parser.parseURL(url);
    const news: NewsItem[] = feed.items
      .map(item => {
        let imageUrls: string[] = [];
        if (Array.isArray(item.enclosure)) {
          imageUrls = item.enclosure
            .filter(enc => enc.url && enc.type.startsWith('image/'))
            .map(enc => enc.url);
        } else if (item.enclosure && item.enclosure.url) {
          imageUrls.push(item.enclosure.url);
        }

        return {
          id: item.guid ?? '',
          title: item.title ?? 'Без названия',
          author: item.creator ?? '',
          link: item.link ?? '#',
          imageUrls,
          pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
          description: item.contentSnippet ?? 'Нет описания',
        };
      })
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    return news;
  } catch (error) {
    throw createError({
      status: 500,
      message: 'Ошибка при получении RSS'
    });
  }
});
