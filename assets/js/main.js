import { createCard } from './dom.js';
import HttpClient from "./http.js";

const gallery = document.querySelector('#courses');

async function initPage() {
  const courses = await loadCourses();
  const userEmail = localStorage.getItem('emailAddress');
  const userPassword = localStorage.getItem('password');

  courses.forEach((course) => {
    const card = createCard(course);

    // Check if the user is logged in before allowing to book
    if(userEmail && userPassword) {
      card.querySelector('.bookOnlineAndClassroom').addEventListener('click', async () => {
        await bookCourse(course, 'online and in classroom', userEmail);
      });
      card.querySelector('.bookOnline').addEventListener('click', async () => {
        await bookCourse(course, 'online', userEmail);
      });
      card.querySelector('.bookClassroom').addEventListener('click', async () => {
        await bookCourse(course, 'in classroom', userEmail);
      });
    }

    gallery.appendChild(card);
  });
}

const bookCourse = async (course, bookingAvailability, email) => {
  const bookingInfo = {
    courseId: course.id,
    courseTitle: course.courseTitle,
    startDate: course.startDate,
    daysToComplete: course.daysToComplete,
    bookingAvailability: bookingAvailability
  }
  const userResponse = await fetch(`http://localhost:3000/customers?emailAddress=${email}`);
  const userData = await userResponse.json();

  // Check if the user data is found
  if(userData.length > 0) {
    const user = userData[0];

    const isAlreadyBooked = user.booking.some((booking) => {
      return booking.courseId === course.id && booking.bookingAvailability === bookingAvailability;
    });
    
    if(!isAlreadyBooked) {
      if(user) {
        const hasBookedOnlineAndClassroom = user.booking.some((booking) => {
          return booking.courseId === course.id && booking.bookingAvailability === 'online and in classroom';
        });

        const hasBookedOnline = user.booking.some((booking) => {
          return booking.courseId === course.id && booking.bookingAvailability === 'online';
        });

        const hasBookedClassroom = user.booking.some((booking) => {
          return booking.courseId === course.id && booking.bookingAvailability === 'in classroom';
        });

        if(bookingAvailability === 'online and in classroom') {
          if(hasBookedOnline || hasBookedClassroom) {
            alert('You have already booked with separate layouts for this course');
            return;
          }
        } else if(bookingAvailability === 'online') {
          if(hasBookedOnlineAndClassroom) {
            alert('You have already booked with the combined layout for this course');
            return;
          }
        } else if(bookingAvailability === 'in classroom') {
          if (hasBookedOnlineAndClassroom) {
            alert('You have already booked with the combined layout for this course');
            return;
          }
        }
        user.booking.push(bookingInfo);

        // Update the user's data on the server
        const updateResponse = await fetch(`http://localhost:3000/customers/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        const updateResult = await updateResponse.json();
        console.log('Booking saved:', updateResult);

        // Notify the user about the successful booking
        alert(`Booked ${course.courseTitle} ${bookingAvailability}`);
      } else {
        alert('You have already booked for this course layout');
      }
    } else {
      alert('You have already booked for this course layout');
    }
  }
}

const loadCourses = async () => {
  const url = 'http://localhost:3000/courses';
  const http = new HttpClient(url);
  const courses = await http.get();
  return courses;
};

document.querySelector('#signoutBtn').addEventListener('click', () => {
  localStorage.removeItem('emailAddress');
  localStorage.removeItem('password');
  alert('User logged out');
  location.reload();
});

document.addEventListener('DOMContentLoaded', initPage);
  