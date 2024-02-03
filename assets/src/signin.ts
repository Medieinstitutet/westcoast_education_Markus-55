import { signoutBtnHandler } from './utility.js';

const signinBtn = document.querySelector('#signinForm #signinBtn');

if (signinBtn) {
  signinBtn.addEventListener('click', async event => {
    event.preventDefault();

    const emailAddress: any = document.querySelector('#emailAddress');
    const password: any = document.querySelector('#password');

    // Fetch the list of signed-up users from the server
    const response = await fetch(`http://localhost:3000/customers`);
    const userData = await response.json();

    const user = userData[0];

    const userEmail = localStorage.getItem('emailAddress');
    const userPassword = localStorage.getItem('password');

    if (!userEmail && !userPassword) {
      alert('Logged in successfully');
      localStorage.setItem('emailAddress', emailAddress.value);
      localStorage.setItem('password', password.value);
    } else {
      alert('User is already logged in');
    }
  });
}

signoutBtnHandler();
