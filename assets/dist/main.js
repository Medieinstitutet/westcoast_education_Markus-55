import { createCard } from './dom.js';
import { bookCourse } from './booking.js';
import { loadCourses, signoutBtnHandler } from './utility.js';
async function initPage() {
    const courses = await loadCourses();
    const popularCourses = courses.filter((course) => course.popular);
    const currentCourses = courses.filter((course) => course.current);
    const popularCoursesDiv = document.querySelector('#popularCourses');
    const currentCoursesDiv = document.querySelector('#currentCourses');
    const bookOnline = document.querySelector('.bookOnline');
    const bookClassroom = document.querySelector('.bookClassroom');
    const onlineAndClassroom = document.querySelector('.bookOnlineAndClassroom');
    const userEmail = localStorage.getItem('emailAddress');
    const userPassword = localStorage.getItem('password');
    if (popularCoursesDiv) {
        popularCourses.forEach(async (course) => {
            const card = createCard(course);
            // Check if the user is logged in before allowing to book
            if (userEmail && userPassword) {
                if (onlineAndClassroom) {
                    onlineAndClassroom.addEventListener('click', async () => {
                        await bookCourse(course, 'online and in classroom', userEmail);
                    });
                }
                if (bookOnline) {
                    bookOnline.addEventListener('click', async () => {
                        await bookCourse(course, 'online', userEmail);
                    });
                }
                if (bookClassroom) {
                    bookClassroom.addEventListener('click', async () => {
                        await bookCourse(course, 'in classroom', userEmail);
                    });
                }
            }
            popularCoursesDiv.appendChild(card);
        });
    }
    if (currentCoursesDiv) {
        currentCourses.forEach(async (course) => {
            const card = createCard(course);
            // Check if the user is logged in before allowing to book
            if (userEmail && userPassword) {
                if (onlineAndClassroom) {
                    onlineAndClassroom.addEventListener('click', async () => {
                        await bookCourse(course, 'online and in classroom', userEmail);
                    });
                }
                if (bookOnline) {
                    bookOnline.addEventListener('click', async () => {
                        await bookCourse(course, 'online', userEmail);
                    });
                }
                if (bookClassroom) {
                    bookClassroom.addEventListener('click', async () => {
                        await bookCourse(course, 'in classroom', userEmail);
                    });
                }
            }
            currentCoursesDiv.appendChild(card);
        });
    }
}
signoutBtnHandler();
document.addEventListener('DOMContentLoaded', initPage);
