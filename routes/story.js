const express = require('express');
const router = express.Router();
const {
	createStory,
	getStoryById,
	getAllStories,
} = require('../controllers/story');

const multer = require('multer');

const storage = multer.diskStorage({
	destination: './uploads',
	filename(req, file, cb) {
		let newName = Date.now() + '-' + file.originalname;
		newName = newName.split(' ').join('_');
		cb(null, newName);
	},
});

const upload = multer({ storage });

router.post('/', upload.single('picture'), createStory);
router.get('/', getAllStories);
router.get('/:id', getStoryById);

module.exports = router;
