# 🌅 Morning App

Минималистичное утреннее приложение для настройки на день с дыхательной практикой, глубокими цитатами и персонализированным контентом.

## ✨ Функции

- **Дыхательная практика**: 10 циклов дыхания (inhale/hold/exhale) с анимацией
- **Курируемые цитаты**: 57 глубоких цитат от Юнга, Франкла, стоиков и других мыслителей
- **AI-суммаризация**: Реальные статьи упрощаются до уровня junior разработчика
- **Персонализированный контент**: 
  - ML Insight из Dev.to
  - Medical/Health новости из NewsAPI
  - Мотивационные видео с YouTube

## 🚀 Быстрый запуск

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка API ключей (опционально)

Создайте файл `.env` в корне проекта:

```env
OPENROUTER_API_KEY=sk-or-v1-ваш_ключ
NEWSAPI_KEY=ваш_ключ_newsapi
YOUTUBE_API_KEY=ваш_ключ_youtube
PORT=3000
```

**Без ключей** приложение работает в демо-режиме с заранее заданным контентом.

#### Где получить ключи:

| Сервис | Ссылка | Тариф |
|--------|--------|-------|
| **OpenRouter** | [openrouter.ai/keys](https://openrouter.ai/keys) | Есть бесплатный лимит |
| **NewsAPI** | [newsapi.org/register](https://newsapi.org/register) | Developer (бесплатно) |
| **YouTube Data API** | [console.cloud.google.com](https://console.cloud.google.com/apis/library/youtube.googleapis.com) | Бесплатный квота |

### 3. Запуск сервера

```bash
npm start
```

### 4. Открыть в браузере

Перейдите на **http://localhost:3000**

## 📁 Структура проекта

```
morning/
├── server.js          # Бэкенд (Express + API интеграции)
├── quotes.js          # Библиотека из 60+ курируемых цитат
├── index.html         # Фронтенд (HTML/CSS/JS)
├── .env               # API ключи (не коммитить в git!)
├── package.json       # Зависимости и скрипты
└── README.md          # Этот файл
```

## 🔧 Как это работает

### Цитаты
- Локальная библиотека `quotes.js` (60+ цитат)
- Выбор по дню года + случайное окно в 7 дней
- Никаких внешних API — мгновенная загрузка
- Авторы: Карл Юнг, Виктор Франкл, Руми, Сенека, Ницше и др.

### Контент
1. **ML статья**: Fetch из Dev.to API → AI суммаризация через OpenRouter
2. **Health статья**: Fetch из NewsAPI → AI суммаризация
3. **Видео**: Поиск по YouTube API (темы: mindset, productivity, calm)

### Fallback логика
Если API ключ отсутствует или запрос не удался → показывается качественный демо-контент.

## 🎯 API Endpoint

### GET /morning

Возвращает весь контент для утренней сессии:

```json
{
  "quote": {
    "text": "The privilege of a lifetime is to become who you truly are.",
    "author": "Carl Jung"
  },
  "ml": {
    "title": "Understanding JavaScript Closures",
    "text": "AI-generated summary...",
    "image": "https://..."
  },
  "health": {
    "title": "New Study on Sleep",
    "text": "AI-generated summary...",
    "image": "https://..."
  },
  "video": {
    "id": "youtube_video_id"
  }
}
```

## 🛠 Технологии

- **Backend**: Node.js, Express
- **Frontend**: Vanilla JS, CSS (без фреймворков)
- **AI**: OpenRouter (модель qwen/qwen-2.5-72b-instruct)
- **APIs**: Dev.to, NewsAPI, YouTube Data API v3

## 📝 Заметки

- Приложение **не требует сборки** — работает напрямую
- Все API запросы выполняются **параллельно** для скорости
- Цитаты **не повторяются** в течение недели благодаря умной ротации
- Демо-режим позволяет тестировать UI без ключей

## 🔐 Безопасность

Файл `.env` **не должен** попадать в репозиторий. Добавьте его в `.gitignore`:

```
.env
node_modules/
```
