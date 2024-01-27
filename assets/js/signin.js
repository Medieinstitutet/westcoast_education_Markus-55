import { signoutBtnHandler } from "./utility.js";

document.querySelector('#signinForm').addEventListener('submit', async event => {
    event.preventDefault();

    const emailAddress = document.querySelector('#emailAddress').value;
    const password = document.querySelector('#password').value;

    // Fetch the list of signed-up users from the server
    const response = await fetch(`http://localhost:3000/customers?emailAddress=${emailAddress}`);
    const userData = await response.json();

    if(userData.length > 0) {
      const user = userData[0];

      // Check if the entered password matches the stored password for the user
      if(user.password === password) {
        const userEmail = localStorage.getItem('emailAddress');
        const userPassword = localStorage.getItem('password');

        if(!userEmail && !userPassword) {
          alert('Logged in successfully');
          localStorage.setItem('emailAddress', emailAddress);
          localStorage.setItem('password', password);
        } else {
          alert('User is already logged in');
        }
      } else {
        alert('Incorrect password');
      }
    } else {
      alert('User does not exist');
    }
  });

  signoutBtnHandler();
