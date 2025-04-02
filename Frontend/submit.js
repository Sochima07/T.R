document.getElementById('submitButton').addEventListener('click', async () => {
  const ssn = document.getElementById('ssnInputControl').value;
  const refundAmount = document.getElementById('refundAmountInput').value;
  //Ensure SSN is a valid number
  if(!ssn){
    alert('Please enter a valid SSN');
  }else{
    console.log("ssn is found")
  }

  if(!refundAmount){
    alert('Please enter a valid refund amount');
  }else{
    console.log("refundAmount is found")
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