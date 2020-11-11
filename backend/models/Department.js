const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  ],
  departmentName: {
    type: String,
    required: true,
  },
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
