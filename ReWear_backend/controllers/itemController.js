const Item = require('../models/Item');

exports.addItem = async (req, res) => {
  try {
    const { title, description, category, size, condition, tags, image, uploader } = req.body;

    const item = new Item({
      title,
      description,
      category,
      size,
      condition,
      tags,
      image,
      uploader
    });

    await item.save();
    res.status(201).json({ message: 'Item listed successfully', item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('uploader', 'fullName email');
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
