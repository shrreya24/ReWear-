const SwapRequest = require('../models/SwapRequest');
const Item = require('../models/Item');

// POST /api/swap/request
exports.createRequest = async (req, res) => {
  try {
    const { itemId } = req.body;
    const requesterId = req.user._id;

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const ownerId = item.uploader;
    if (ownerId.toString() === requesterId.toString()) {
      return res.status(400).json({ message: "You cannot request your own item" });
    }

    const alreadyRequested = await SwapRequest.findOne({ itemId, requesterId });
    if (alreadyRequested) return res.status(400).json({ message: "Already requested" });

    const swapRequest = await SwapRequest.create({
      itemId,
      ownerId,
      requesterId
    });

    res.status(201).json({ message: "Swap request sent", swapRequest });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/swap/incoming
exports.getIncomingRequests = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const requests = await SwapRequest.find({ ownerId })
      .populate('itemId')
      .populate('requesterId', 'fullName email');

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/swap/respond
exports.respondToRequest = async (req, res) => {
  try {
    const { requestId, decision } = req.body;
    const ownerId = req.user._id;

    const request = await SwapRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.ownerId.toString() !== ownerId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!['accepted', 'rejected'].includes(decision)) {
      return res.status(400).json({ message: "Invalid decision" });
    }

    request.status = decision;
    await request.save();

    // Optional: mark item unavailable if accepted
    if (decision === 'accepted') {
      const item = await Item.findById(request.itemId);
      if (item) {
        item.isAvailable = false;
        await item.save();
      }
    }

    res.status(200).json({ message: `Request ${decision}`, request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
