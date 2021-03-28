import { DBArticle } from '../types';

const articlesKey = 'articles';

function ArticlesDatabase() {
  let articles: DBArticle[] = [];

  const localStorageArticles = getArticles();
  if (localStorageArticles) {
    articles = localStorageArticles;
  }

  function getArticles() {
    try {
      const articles = localStorage.getItem(articlesKey);

      if (articles) {
        return JSON.parse(articles) as DBArticle[];
      } else {
        return [];
      }
    } catch (e) {
      console.error('Error while reading articles from localStorage', e);
    }
  }

  function addArticle(article: DBArticle) {
    const existingArticle = articles.find((art) => art.id === article.id);
    if (!existingArticle) {
      try {
        articles.unshift(article);
        localStorage.setItem(articlesKey, JSON.stringify(articles));
      } catch (e) {
        console.error('Error while adding article to localStorage', e);
      }
    }
  }

  const api = {
    isArticleRead(id: number): boolean {
      const article = articles.find((article) => article.id === id);
      if (article) {
        return true;
      }
      return false;
    },
    setArticleAsRead(article: DBArticle) {
      addArticle(article);
    },
    articles,
  };

  return api;
}

export default ArticlesDatabase();
