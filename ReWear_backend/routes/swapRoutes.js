const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createRequest,
  getIncomingRequests,
  respondToRequest
} = require('../controllers/swapController');

router.post('/request', protect, createRequest);
router.get('/incoming', protect, getIncomingRequests);
router.post('/respond', protect, respondToRequest);

module.exports = router;
