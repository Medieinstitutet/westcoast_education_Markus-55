import { loadCourses } from "./utility.js";

interface NewCourse {
  id: number,
  courseTitle: string,
  coursePrice: string,
  startDate: string,
  daysToComplete: number,
  classroomAvailability: boolean,
  onlineAvailability: boolean,
  current: boolean,
  popular: boolean,
  imageUrl: string,
  description: string
}

const handleAddCourse = () => {
  const addCourseForm = document.querySelector('#addCourseForm');

  const courseTitle: HTMLInputElement | null = document.querySelector('#courseTitle')  
  const coursePrice: HTMLInputElement | null = document.querySelector('#coursePrice')
  const startDate: HTMLInputElement | null = document.querySelector('#startDate')
  const daysToComplete: any  = document.querySelector('#daysToComplete')
  const classroomAvailability: any = document.querySelector('#classroomAvailability')
  const onlineAvailability: any = document.querySelector('#onlineAvailability')
  const current: any = document.querySelector('#current')
  const popularCourse: any = document.querySelector('#popularCourse')
  const imageUrl: HTMLInputElement | null = document.querySelector('#imageUrl')
  const description: HTMLInputElement | null = document.querySelector('#description')

  if(addCourseForm) {
    addCourseForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const courses = await loadCourses();

      const newCourse: NewCourse = {
        id: courses.length+=1,
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
        } else {
          alert('Failed to add new course. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }

}
document.addEventListener('DOMContentLoaded', handleAddCourse);
