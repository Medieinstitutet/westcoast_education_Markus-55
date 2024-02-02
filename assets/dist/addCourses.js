var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { loadCourses } from "./utility.js";
const handleAddCourse = () => {
    const addCourseForm = document.querySelector('#addCourseForm');
    const courseTitle = document.querySelector('#courseTitle');
    const coursePrice = document.querySelector('#coursePrice');
    const startDate = document.querySelector('#startDate');
    const daysToComplete = document.querySelector('#daysToComplete');
    const classroomAvailability = document.querySelector('#classroomAvailability');
    const onlineAvailability = document.querySelector('#onlineAvailability');
    const current = document.querySelector('#current');
    const popularCourse = document.querySelector('#popularCourse');
    const imageUrl = document.querySelector('#imageUrl');
    const description = document.querySelector('#description');
    if (addCourseForm) {
        addCourseForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
            event.preventDefault();
            const courses = yield loadCourses();
            const newCourse = {
                id: courses.length += 1,
                courseTitle: courseTitle ? courseTitle.value : '',
                coursePrice: coursePrice ? coursePrice.value : '',
                startDate: startDate ? startDate.value : '',
                daysToComplete: daysToComplete.value,
                classroomAvailability: classroomAvailability.value,
                onlineAvailability: onlineAvailability.value === 'true' ? true : false,
                current: current.value === 'true' ? true : false,
                popular: popularCourse.value === 'true' ? true : false,
                imageUrl: imageUrl ? imageUrl.value : '',
                description: description ? description.value : ''
            };
            try {
                const response = yield fetch('http://localhost:3000/courses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newCourse),
                });
                if (response.ok) {
                    alert('New course added successfully!');
                }
                else {
                    alert('Failed to add new course. Please try again.');
                }
            }
            catch (error) {
                console.error('Error:', error);
            }
        }));
    }
};
document.addEventListener('DOMContentLoaded', handleAddCourse);
