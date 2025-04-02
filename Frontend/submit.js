document.getElementById('submitButton').addEventListener('click', async () => {
  const ssn = document.getElementById('ssnInputControl').value;
  const refundAmount = document.getElementById('refundAmountInput').value;
  
  //Ensure SSN is a valid number
  function isSSNValid(ssn) {
    const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
    return ssnRegex.test(ssn);
  }

    if (!ssn) {
      ssnError.textContent = "SSN is required.";
      return;
    }

    if (!isSSNValid(ssn)) {
      ssnError.textContent = "Invalid SSN format. Use XXX-XX-XXXX.";
      return;
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
  }else{
    console.log("Both SSN and Refund Amount are found")
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
    alert('Network error.')
    }

  });