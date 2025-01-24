// controllers/Article.js
const prisma = require('../prismaClient');

// Get all articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await prisma.article.findMany();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get article by ID
exports.getArticleById = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await prisma.article.findUnique({ where: { id: parseInt(id) } });
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create article
exports.createArticle = async (req, res) => {
  const { title, tags, categories, shortArticle, longArticle, image } = req.body;
  try {
    const newArticle = await prisma.article.create({
      data: { title, tags, categories, shortArticle, longArticle, image },
    });
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update article
exports.updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, tags, categories, shortArticle, longArticle, image } = req.body;
  try {
    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(id) },
      data: { title, tags, categories, shortArticle, longArticle, image },
    });
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete article
exports.deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.article.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};