const express = require("express");
const router = express.Router();
const article = require("../controllers/Article/Article");

router.get("/get_all_the_Article", article);
router.patch("/update_article/:id", article);
router.post("/create_article", article);
router.delete("/delete_article/:id", article);

module.exports = router;

// router/article.js
const express = require('express');
const articleController = require('../controllers/Article/Article');



router.get('/articles', articleController.getArticles);
router.get('/articles/:id', articleController.getArticleById);
router.post('/articles', articleController.createArticle);
router.put('/articles/:id', articleController.updateArticle);
router.delete('/articles/:id', articleController.deleteArticle);

module.exports = router;
