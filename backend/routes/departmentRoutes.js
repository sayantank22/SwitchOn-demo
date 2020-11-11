const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');

const {
  getAllDepartments,
  getDepartment,
  createDepartment,
} = require('../controllers/departmentController');

router.route('/').get(auth, getAllDepartments).post(createDepartment);
router.route('/:id').get(auth, getDepartment);

module.exports = router;
