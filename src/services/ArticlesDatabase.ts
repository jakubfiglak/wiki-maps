const articlesKey = 'articles';

function ArticlesDatabase() {
  let articles = getArticles();

  function getArticles() {
    try {
      const articles = localStorage.getItem(articlesKey);

      if (articles) {
        return JSON.parse(articles);
      } else {
        return [];
      }
    } catch (e) {
      console.error('Error while reading articles from localStorage', e);
    }
  }

  function addArticle(id: number) {
    try {
      articles.push(id);
      localStorage.setItem(articlesKey, JSON.stringify(articles));
    } catch (e) {
      console.error('Error while adding article to localStorage', e);
    }
  }

  const api = {
    refresh() {
      articles = getArticles();
    },
    isArticleRead(id: number): boolean {
      return articles.includes(id);
    },
    setArticleAsRead(id: number) {
      addArticle(id);
    },
  };

  return api;
}

export default ArticlesDatabase();
