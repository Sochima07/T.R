const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Submission = require('./models/submission');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ssnDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Store submission
app.post('/submit', async (req, res) => {
  const { ssn, refundAmount } = req.body;

  if (!ssn || !refundAmount) {
    return res.status(400).json({ error: 'SSN and Refund Amount are required' });
  }

  const submission = new Submission({ ssn, refundAmount });

  try {
    await submission.save();
    res.status(200).json({ message: 'Submission saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving submission' });
  }
});

// Get all submissions (Admin)
app.get('/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching submissions' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});