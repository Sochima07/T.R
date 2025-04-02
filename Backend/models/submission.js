const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  ssn: { type: String, required: true },
  refundAmount: { type: String, required: true },
});

module.exports = mongoose.model('Submission', SubmissionSchema);