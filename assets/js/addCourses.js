import { loadCourses } from "./utility.js";

const handleAddCourse = () => {
  
  document.querySelector('#addCourseForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const courses = await loadCourses();

    const newCourse = {
      id: `${courses.length+=1}`,
      courseTitle: document.querySelector('#courseTitle').value,
      coursePrice: document.querySelector('#coursePrice').value,
      startDate: document.querySelector('#startDate').value,
      daysToComplete: document.querySelector('#daysToComplete').value,
      classroomAvailability: document.querySelector('#classroomAvailability').value === 'true' ? true : false,
      onlineAvailability: document.querySelector('#onlineAvailability').value === 'true' ? true : false,
      current: document.querySelector('#current').value === 'true' ? true : false,
      popular: document.querySelector('#popularCourse').value === 'true' ? true : false,
      description: document.querySelector('#description').value
    }

    try {
      const response = await fetch('http://localhost:3000/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse),
      });
  
      if (response.ok) {
        alert('New course added successfully!');
        // You can redirect the user to the courses page or perform any other necessary action
      } else {
        alert('Failed to add new course. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }

  });

  // Call a function to send the new course data to the server
  // saveNewCourse(newCourse);
}

// const saveNewCourse = (newCourse) => {

// }

document.addEventListener('DOMContentLoaded', handleAddCourse);
