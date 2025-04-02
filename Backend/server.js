const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Submission = require('./models/submission.js');

const app = express();console.log('Server started');
console.log('Connecting to MongoDB...');
console.log('MongoDB connected');
console.log('Error connecting to MongoDB:', err);
console.log('Server running on http://localhost:' + port);

app.post('/submit', async (req, res) => {
  console.log('Received submission request');
  const { ssn, refundAmount } = req.body;
  console.log('Submission data:', ssn, refundAmount);

  if (!ssn || !refundAmount) {
    console.log('Error: SSN and Refund Amount are required');
    return res.status(400).json({ error: 'SSN and Refund Amount are required' });
  }

  const submission = new Submission({ ssn, refundAmount });
  console.log('Creating new submission');

  try {
    await submission.save();
    console.log('Submission saved successfully');
    res.status(200).json({ message: 'Submission saved successfully' });
  } catch (error) {
    console.log('Error saving submission:', error);
    res.status(500).json({ error: 'Error saving submission' });
  }
});

app.get('/submissions', async (req, res) => {
  console.log('Received request for all submissions');
  try {
    const submissions = await Submission.find();
    console.log('Fetched submissions:', submissions);
    res.json(submissions);
  } catch (error) {
    console.log('Error fetching submissions:', error);
    res.status(500).json({ error: 'Error fetching submissions' });
  }
});
const port = 3000;

//connect MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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