export interface NewsItem {
  id: string;
  title: string;
  author: string;
  link: string;
  imageUrls: string[];
  pubDate: string | Date;
  isoDate: string | Date;
  description: string;
}