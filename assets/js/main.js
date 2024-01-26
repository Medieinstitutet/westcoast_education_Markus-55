import { createCard } from './dom.js';
import HttpClient from "./http.js";

const gallery = document.querySelector('#courses');

async function initPage() {
  const courses = await loadCourses();
  courses.forEach((course) => gallery.appendChild(createCard(course)));
}

const loadCourses = async () => {
  const url = 'http://localhost:3000/courses';
  const http = new HttpClient(url);
  const courses = await http.get();
  return courses;
};

const userEmail = localStorage.getItem('emailAddress');
const userPassword = localStorage.getItem('password');

console.log(userEmail, userPassword);
document.querySelector('#signoutBtn').addEventListener('click', () => {
  localStorage.removeItem('emailAddress');
  localStorage.removeItem('password');
  console.log('Loggin out the user...');
})

document.addEventListener('DOMContentLoaded', initPage);
