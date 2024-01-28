import HttpClient from "./http.js";

const url = 'http://localhost:3000/customers';
const http = new HttpClient(url);
const usersData = await http.get();

const userBookingsDiv = document.querySelector('#customerBookings');

usersData.forEach((user) => {
  const userDiv = document.createElement('div');
  userDiv.classList.add('userBooking');

  const userNameHeading = document.createElement('h2');
  const userEmailHeading = document.createElement('p');
  const userNumberHeading = document.createElement('p');
  const billingAddressHeading = document.createElement('p');

  userNameHeading.textContent = `User: ${user.customerName} ${user.customerLastName}`;
  userEmailHeading.textContent = `Email: ${user.emailAddress}`;
  userNumberHeading.textContent = `Phone number: ${user.phoneNumber}`;
  billingAddressHeading.textContent = `Billing address: ${user.billingAddress}`;

  userDiv.appendChild(userNameHeading);
  userDiv.appendChild(userEmailHeading);
  userDiv.appendChild(userNumberHeading);
  userDiv.appendChild(billingAddressHeading);

  const bookingsList = document.createElement('ul');
  user.booking.forEach((booking) => {
    const bookingItem = document.createElement('li');
    bookingItem.innerHTML = `
      <br><li>Course Title: ${booking.courseTitle}</li>
      <li>Course ID: ${booking.courseId}</li>
      <li>Course Price: ${booking.coursePrice}</li>
      <li>Start Date: ${booking.startDate}</li>
      <li>Days to Complete: ${booking.daysToComplete}</li>
      <li>Booking Availability: ${booking.bookingAvailability}</li>
    `;
    bookingsList.appendChild(bookingItem);
  });

  userDiv.appendChild(bookingsList);
  userBookingsDiv.appendChild(userDiv);
});

const allBookings = usersData.map((user) => user.booking);

console.log(allBookings);
