const mongoose = require('mongoose');

const requestSchema = mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },
    createdFor: {
      type: String,
      required: true,
    },
    isPending: {
      type: Boolean,
      required: true,
      default: true,
    },
    isApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
    isRejected: {
      type: Boolean,
      required: true,
      default: false,
    },
    message: {
      type: String,
      required: true,
    },
    notifications: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
