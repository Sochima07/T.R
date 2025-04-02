document.getElementById('submitButton').addEventListener('click', async () => {
  const ssn = document.getElementById('ssnInputControl').value;
  const refundAmount = document.getElementById('refundAmountInput').value;
  
  // Validate SSN Format
  const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
  if (!ssn.match(ssnRegex)) {
    alert('Invalid SSN format. Use XXX-XX-XXXX.');
    return;
  }

  // Ensure refundAmount is a valid number
  if (isNaN(refundAmount) || refundAmount === "") {
    alert("Refund Amount must be a number.");
    return;
  }

  if (!ssn || !refundAmount) {
    alert('Please fill out both SSN and Refund Amount.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ssn, refundAmount }),
    });

    if (response.ok) {
      alert('Submission successful!');
    } else {
      alert('Error submitting data.');
    }
  } catch (error) {
    console.error(error);
    alert('Network error.');
  }
});