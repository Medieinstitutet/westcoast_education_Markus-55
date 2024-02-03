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
        addCourseForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const courses = await loadCourses();
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
                const response = await fetch('http://localhost:3000/courses', {
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
        });
    }
};
document.addEventListener('DOMContentLoaded', handleAddCourse);
