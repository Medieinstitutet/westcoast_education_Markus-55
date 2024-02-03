import HttpClient from "./http.js";
const loadCourses = async () => {
    const url = 'http://localhost:3000/courses';
    const http = new HttpClient(url);
    const courses = await http.get();
    return courses;
};
const getUser = async (email) => {
    const url = `http://localhost:3000/customers?emailAddress=${email}`;
    const http = new HttpClient(url);
    const users = await http.get();
    return users;
};
const signoutBtnHandler = () => {
    const signoutBtn = document.querySelector('#signoutBtn');
    if (signoutBtn) {
        signoutBtn.addEventListener('click', () => {
            localStorage.removeItem('emailAddress');
            localStorage.removeItem('password');
            alert('User logged out');
            location.reload();
        });
    }
};
export { loadCourses, getUser, signoutBtnHandler };
