// backend/routes/votes.js

const express = require("express");
const { addVote, getVotes } = require("../controllers/votes");
const { authenticateToken } = require("../middlewares/auth");
const router = express.Router();

router.post("/", authenticateToken, addVote); // Add a vote
router.get("/summary", getVotes); // Get votes summary

module.exports = router;
