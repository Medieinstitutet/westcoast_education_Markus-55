import { createCard } from './dom.js';
import { bookCourse } from './booking.js';
import { loadCourses, signoutBtnHandler } from './utility.js';

async function initPage() {
  const popularCoursesDiv = document.querySelector('#popularCourses');
  const currentCoursesDiv = document.querySelector('#currentCourses');

  const courses = await loadCourses();

  const popularCourses = courses.filter(course => course.popular);
  const currentCourses = courses.filter(course => course.current)

  const userEmail = localStorage.getItem('emailAddress');
  const userPassword = localStorage.getItem('password');

  popularCourses.forEach(async (course) => {
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
    popularCoursesDiv.appendChild(card);
  });

  currentCourses.forEach(async (course) => {
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
    currentCoursesDiv.appendChild(card);
  });
}

signoutBtnHandler();

document.addEventListener('DOMContentLoaded', initPage);
  