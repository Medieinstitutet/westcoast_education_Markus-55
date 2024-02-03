import { createCard } from './dom.js';
import { bookCourse } from './booking.js';
import { loadCourses, signoutBtnHandler } from './utility.js';
const allCourses = document.querySelector('#courses');
async function initPage() {
    const courses = await loadCourses();
    const userEmail = localStorage.getItem('emailAddress');
    const userPassword = localStorage.getItem('password');
    courses.forEach((course) => {
        const card = createCard(course);
        const onlineAndClassroom = card.querySelector('.bookOnlineAndClassroom');
        const bookOnline = card.querySelector('.bookOnline');
        const bookClassroom = card.querySelector('.bookClassroom');
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
        allCourses ? allCourses.appendChild(card) : '';
    });
}
signoutBtnHandler();
document.addEventListener('DOMContentLoaded', initPage);
