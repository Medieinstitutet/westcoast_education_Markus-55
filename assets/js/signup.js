import { signoutBtnHandler } from "./utility.js";
import HttpClient from "./http.js";

const signupForm = document.querySelector('#signupForm');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const emailAddress = document.querySelector('#emailAddress').value;

  // Fetch the list of signed-up users from the server
  const response = await fetch('http://localhost:3000/customers');
  const users = await response.json();
  
  const userExists = users.some((user) => user.emailAddress === emailAddress);

  const url = 'http://localhost:3000/customers';
  const http = new HttpClient(url);
  const usersData = await http.get();

  if(!userExists) {
    const data = {
      id: `${usersData.length+=1}`,
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
      alert('logged in with with:', data.emailAddress);
      localStorage.setItem('emailAddress', emailAddress);
      localStorage.setItem('password', password);
    } else {
      alert('Failed to login');
    }
    console.log(result);
  } else {
    alert('User already signed up');
  }
});

signoutBtnHandler();
