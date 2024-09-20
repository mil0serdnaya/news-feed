import Parser from "rss-parser";

export default defineEventHandler(async () => {
  const parser = new Parser();
  const url = 'http://static.feed.rbc.ru/rbc/logical/footer/news.rss';

  try {
    const feed = await parser.parseURL(url);

    return feed.items
    .map(item => ({
      title: item.title,
      author: item.creator,
      link: item.link,
      pubDate: item.pubDate || '',
      description: item.contentSnippet,
    }))
    .sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      
      return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA);
    });
    
  } catch (error) {
    console.error('Ошибка при парсинге RSS:', error);

    throw createError({
      status: 500,
      message: 'Ошибка при получении RSS'
    })
  }
});