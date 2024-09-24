export interface NewsItem {
  id: string;
  title: string;
  author: string;
  link: string;
  imageUrl: string;
  pubDate: string | Date;
  isoDate: string | Date;
  description: string;
}