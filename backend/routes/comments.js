// backend/routes/comments.js

const express = require("express");
const { getCommentsByNews, addComment } = require("../controllers/comments");
const { authenticateToken } = require("../middlewares/auth");
const router = express.Router();

router.get("/:newsId", getCommentsByNews); // Fetch all comments for a news
router.post("/", authenticateToken, addComment); // Add a comment to a news

module.exports = router;
