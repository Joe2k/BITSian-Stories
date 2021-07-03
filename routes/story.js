const express = require('express');
const router = express.Router();
const { createStory } = require('../controllers/story');

router.post('/', createStory);

module.exports = router;
