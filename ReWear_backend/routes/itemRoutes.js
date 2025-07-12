const express = require('express');
const router = express.Router();
const multer = require('multer');
const Item = require('../models/itemModel');
const { protect } = require('../middleware/authMiddleware');

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder where images go
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// POST /api/items/upload
router.post('/upload', protect, upload.single('photo'), async (req, res) => {
  try {
    const { title, description, yearsUsed } = req.body;

    const item = new Item({
      title,
      description,
      yearsUsed,
      imageUrl: req.file.filename,
      owner: req.user._id
    });

    await item.save();
    res.status(201).json({ message: 'Item uploaded successfully', item });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

module.exports = router;
