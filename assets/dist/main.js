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
function initPage() {
    return __awaiter(this, void 0, void 0, function* () {
        const courses = yield loadCourses();
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
            popularCourses.forEach((course) => __awaiter(this, void 0, void 0, function* () {
                const card = createCard(course);
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
                popularCoursesDiv.appendChild(card);
            }));
        }
        if (currentCoursesDiv) {
            currentCourses.forEach((course) => __awaiter(this, void 0, void 0, function* () {
                const card = createCard(course);
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
                currentCoursesDiv.appendChild(card);
            }));
        }
    });
}
signoutBtnHandler();
document.addEventListener('DOMContentLoaded', initPage);
