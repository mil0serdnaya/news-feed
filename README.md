# RBC News Feed Application

A Vue.js application for displaying and filtering news from RBC's RSS feed with pagination functionality.

Application uses RBC's RSS feed: http://static.feed.rbc.ru/rbc/logical/footer/news.rss

## 📌 Features

### 🏠 Main Page

1. **Application Header**
   - App title
   - News refresh capability

2. **News Filter**
   - Keyword input field
   - Real-time headline filtering

3. **News List**
   - Sorted by date (newest first)
   - Each news item displays:
     - Publication date
     - Clickable headline (links to detail page)
     - Brief description
   - Pagination with max 5 items per page

4. **Pagination Controls**
   - Page navigation
   - Current page indicator

### 📄 News Detail Page

1. **Headline**
2. **Metadata**
   - Publication date
   - Author name (when available)
3. **Full news content**
4. **Image Gallery** (when available)
   - Slider
   - Fullscreen view capability
5. **Link to original article** on RBC website

## 🛠 Technical Requirements

**Tech Stack:**
- Vue 3 (Composition API)
- Nuxt 3
- Vuetify recommended for UI components

## 🚀 Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/mil0serdnaya/news-feed.git

2. Install dependencies:

   ```bash
   npm install

3. Run in development mode:

   ```bash
   npm run dev

4. For production build:

   ```bash
   npm run build