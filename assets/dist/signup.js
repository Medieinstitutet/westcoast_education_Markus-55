import { signoutBtnHandler } from "./utility.js";
import HttpClient from "./http.js";
const signupForm = document.querySelector('#signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const customerName = document.querySelector('#customerName');
        const emailAddress = document.querySelector('#emailAddress');
        const customerLastName = document.querySelector('#customerLastName');
        const billingAddress = document.querySelector('#billingAddress');
        const phoneNumber = document.querySelector('#phoneNumber');
        const password = document.querySelector('#password');
        // Fetch the list of signed-up users from the server
        const response = await fetch('http://localhost:3000/customers');
        const users = await response.json();
        const userExists = users.some((user) => user.emailAddress === emailAddress);
        const url = 'http://localhost:3000/customers';
        const http = new HttpClient(url);
        const usersData = await http.get();
        if (!userExists) {
            const data = {
                id: usersData.length += 1,
                customerName: customerName ? customerName.value : '',
                customerLastName: customerLastName ? customerLastName.value : '',
                billingAddress: billingAddress ? billingAddress.value : '',
                emailAddress: emailAddress ? emailAddress.value : '',
                phoneNumber: phoneNumber.value,
                password: password ? password.value : '',
                booking: []
            };
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
                alert('Successfully signed up!');
                localStorage.setItem('emailAddress', emailAddress);
                localStorage.setItem('password', password);
            }
            else {
                alert('Failed to login');
            }
            console.log(result);
        }
        else {
            alert('User already signed up');
        }
    });
}
signoutBtnHandler();
