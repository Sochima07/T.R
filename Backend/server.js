const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Submission = require('./models/submission.js');

const app = express();
const port = 3000;

// Logging server start
console.log('Server started');

// Connect to MongoDB
console.log('Connecting to MongoDB...');
mongoose.connect('mongodb://localhost:27017/yourDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root route to prevent "Cannot GET /" error
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Store submission
app.post('/submit', async (req, res) => {
  console.log('Received submission request');

  const { ssn, refundAmount } = req.body;
  console.log('Submission data:', ssn, refundAmount);

  if (!ssn || !refundAmount) {
    console.log('Error: SSN and Refund Amount are required');
    return res.status(400).json({ error: 'SSN and Refund Amount are required' });
  }

  const submission = new Submission({ ssn, refundAmount });

  try {
    await submission.save();
    console.log('Submission saved successfully');
    res.status(200).json({ message: 'Submission saved successfully' });
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ error: 'Error saving submission' });
  }
});

// Get all submissions (Admin)
app.get('/submissions', async (req, res) => {
  console.log('Received request for all submissions');

  try {
    const submissions = await Submission.find();
    console.log('Fetched submissions:', submissions);
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Error fetching submissions' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});