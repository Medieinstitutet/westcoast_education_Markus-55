import { isLoggedIn } from "./utility.js";

if(isLoggedIn) {
  document.querySelector('.book-course').addEventListener('click' () )
  console.log('User logged in:', isLoggedIn);
} else {
  console.log('User not logged in');
}


