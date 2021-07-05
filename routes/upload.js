const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const storage = multer.diskStorage({
	destination: './uploads',
	filename(req, file, cb) {
		let newName = Date.now() + '-' + file.originalname;
		newName = newName.split(' ').join('_');
		cb(null, newName);
	},
});

const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res, next) => {
	try {
		cloudinary.uploader.upload(req.file.path, async (error, result) => {
			if (error) {
				return next(error);
			}

			fs.unlinkSync(req.file.path);

			return res.json({ url: result.url });
		});
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
