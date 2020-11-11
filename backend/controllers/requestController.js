const Request = require('../models/Request');
const User = require('../models/User');

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: requests.length,
      data: { requests },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getRequest = async (req, res) => {
  const request = await Request.findById(req.params.id);

  if (request) {
    res.status(200).json({
      status: 'success',
      data: { request },
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.createRequest = async (req, res) => {
  try {
    if (req.body.createdBy === req.body.createdFor)
      throw new Error('Action not permitted');

    const sender = await User.findOne({ name: req.body.createdBy }).select(
      'department'
    );
    if (sender === undefined) throw new Error('Action not permitted');

    const reciever = await User.findOne({ name: req.body.createdFor }).select(
      'department'
    );

    if (sender.department.equals(reciever.department)) {
      throw new Error('Action not permitted');
    }

    const newRequest = await Request.create({
      ...req.body,
      notifications: `${req.user.name} generated a request`,
    });

    res.status(201).json({
      status: 'success',
      data: {
        tour: newRequest,
      },
    });
  } catch (error) {
    if (error.message == 'Action not permitted') {
      res.status(401).json({
        status: 'fail',
        message: error.message,
      });
    }
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.updateRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        isPending: false,
        notifications: req.body.isApproved
          ? `${req.user.name} approved a request`
          : `${req.user.name} rejected a request`,
      },
      {
        new: true, //the new updated document gets returned
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: { request },
    });
  } catch (error) {
    if (error.message == `Cannot read property '_id' of null`) {
      res.status(401).json({
        status: 'fail',
        message: 'Action not permitted!',
      });
    }
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};
