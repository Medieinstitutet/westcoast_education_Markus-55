var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createCard } from './dom.js';
import { bookCourse } from './booking.js';
import { loadCourses, signoutBtnHandler } from './utility.js';
const allCourses = document.querySelector('#courses');
function initPage() {
    return __awaiter(this, void 0, void 0, function* () {
        const courses = yield loadCourses();
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
                    onlineAndClassroom.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                        yield bookCourse(course, 'online and in classroom', userEmail);
                    }));
                }
                if (bookOnline) {
                    bookOnline.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                        yield bookCourse(course, 'online', userEmail);
                    }));
                }
                if (bookClassroom) {
                    bookClassroom.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                        yield bookCourse(course, 'in classroom', userEmail);
                    }));
                }
            }
            allCourses ? allCourses.appendChild(card) : '';
        });
    });
}
signoutBtnHandler();
document.addEventListener('DOMContentLoaded', initPage);
