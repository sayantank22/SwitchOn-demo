const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUser,
  createUser,
  login,
} = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.route('/').get(auth, getAllUsers).post(createUser);
router.route('/:id').get(auth, getUser);
router.route('/login').post(login);

module.exports = router;
