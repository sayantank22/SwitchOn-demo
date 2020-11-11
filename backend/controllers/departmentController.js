const Department = require('../models/Department');

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    res.status(200).json({
      status: 'success',
      results: departments.length,
      data: { departments },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id).populate(
      'users',
      'name email gender'
    );

    res.status(200).json({
      status: 'success',
      data: { department },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const newDepartment = await Department.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newDepartment,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
