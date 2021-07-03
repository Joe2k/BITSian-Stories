const express = require('express');
const router = express.Router();
const {
	createStory,
	getStoryById,
	getAllStories,
} = require('../controllers/story');

router.post('/', createStory);
router.get('/', getAllStories);
router.get('/:id', getStoryById);

module.exports = router;
