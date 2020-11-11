const express = require('express');
const router = express.Router();

const {
  getAllRequests,
  getRequest,
  createRequest,
  updateRequest,
} = require('../controllers/requestController');
const auth = require('../middleware/authMiddleware');

router.route('/').get(auth, getAllRequests).post(auth, createRequest);
router.route('/:id').get(auth, getRequest).put(auth, updateRequest);

module.exports = router;
