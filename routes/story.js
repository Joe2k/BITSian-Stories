const express = require('express');
const router = express.Router();
const {
	createStory,
	getStoryById,
	getAllStories,
	getStoryByUniqueName,
	getStroiesByCategory,
	updateStory,
	updateSearchMetrics,
	updateUserMetrics,
	getAllMetrics,
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
router.get('/category/:category', getStroiesByCategory);
router.get('/metrics', getAllMetrics);
// router.get('/:id', getStoryById);
router.get('/:uniqueName', getStoryByUniqueName);
router.put('/:uniqueName', updateStory);
router.post('/search/:search', updateSearchMetrics);
router.post('/newUser', updateUserMetrics);

module.exports = router;
