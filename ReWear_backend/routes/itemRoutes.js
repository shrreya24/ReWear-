const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { createItem } = require('../controllers/itemController');

router.post('/', authMiddleware, upload.single('image'), createItem);

module.exports = router;
