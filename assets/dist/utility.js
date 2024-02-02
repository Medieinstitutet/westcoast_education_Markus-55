var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import HttpClient from "./http.js";
const loadCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'http://localhost:3000/courses';
    const http = new HttpClient(url);
    const courses = yield http.get();
    return courses;
});
const getUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `http://localhost:3000/customers?emailAddress=${email}`;
    const http = new HttpClient(url);
    const users = yield http.get();
    return users;
});
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
