const signupForm = document.querySelector('#signupForm');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const emailAddress = document.querySelector('#emailAddress').value;

  // Fetch the list of signed-up users from the server
  const response = await fetch('http://localhost:3000/customers');
  const users = await response.json();
  
  const userExists = users.some((user) => user.emailAddress === emailAddress);

  if(!userExists) {
    // Proceed with sign-up
    const data = {
      customerName: document.querySelector('#customerName').value,
      customerLastName: document.querySelector('#customerLastName').value,
      billingAddress: document.querySelector('#billingAddress').value,
      emailAddress,
      phoneNumber: document.querySelector('#phoneNumber').value,
      password: document.querySelector('#password').value,
      booking: []
    }

    console.log(data.emailAddress);

    const signupResponse = await fetch('http://localhost:3000/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await signupResponse.json();
    if (result) {
      console.log('Success with:', data.emailAddress, data.password);
    } else {
      console.log('Failed');
    }
    console.log(result);
  } else {
    console.log('User already signed up');
  }
});
