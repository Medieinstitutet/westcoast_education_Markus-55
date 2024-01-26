document.querySelector('#signinForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Fetch the list of signed-up users from the server
  const response = await fetch('http://localhost:3000/customers');
  const users = await response.json();

  const emailAddress = document.querySelector('#emailAddress').value;
  const password = document.querySelector('#password').value;

  const userExists = users.some((user) => user.emailAddress === emailAddress);
  const signedUpPassword = users.some((user) => user.password === password);

  const userEmail = localStorage.getItem('emailAddress');
  const userPassword = localStorage.getItem('password');
  localStorage.setItem('password', password);
  if((userExists && signedUpPassword)) {
    if(!userEmail && !userPassword) {
      console.log('Logging in user');
      localStorage.setItem('emailAddress', emailAddress);
      localStorage.setItem('password', password);
    } else {
      console.log('User is already logged in');
    }
  } else {
    console.log('User does not exist');
  }

  document.querySelector('#signoutBtn').addEventListener('click', () => {
    localStorage.removeItem('emailAddress');
    localStorage.removeItem('password');
    console.log('Loggin out the user...');
  })
});
