// controllers/itemController.js
const Item = require('../models/Item');

exports.createItem = async (req, res) => {
  try {
    const { title, description, yearsUsed } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newItem = new Item({
      title,
      description,
      yearsUsed,
      image: imageUrl,
      owner: req.user._id,
      status: 'active'
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Create item error:', err);
    res.status(500).json({ message: 'Failed to save item' });
  }
};
