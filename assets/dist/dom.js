let bookOnline;
let bookClassroom;
let bookOnlineAndClassroom;
const createCard = (course) => {
    const div = document.createElement('div');
    div.classList.add('course-image');
    bookOnline = document.createElement('button');
    bookClassroom = document.createElement('button');
    bookOnlineAndClassroom = document.createElement('button');
    bookOnline.classList.add('bookOnline');
    bookClassroom.classList.add('bookClassroom');
    bookOnlineAndClassroom.classList.add('bookOnlineAndClassroom');
    div.appendChild(createImage(course.imageUrl, course.id.toString()));
    div.appendChild(createCourseTitle(course));
    div.appendChild(getCoursePrice(course));
    div.appendChild(createCourseStartDate(course));
    div.appendChild(daysToCompleteCourse(course));
    div.appendChild(createCourseLayout(course));
    div.appendChild(createCourseDescription(course));
    div.appendChild(bookOnline);
    div.appendChild(bookClassroom);
    div.appendChild(bookOnlineAndClassroom);
    return div;
};
const createImage = (imageUrl, id) => {
    const image = document.createElement('img');
    image.setAttribute('src', `../img/${imageUrl}`);
    image.setAttribute('id', id);
    return image;
};
const createCourseTitle = (course) => {
    const paragraph = document.createElement('p');
    paragraph.appendChild(document.createTextNode(`Course: ${course.courseTitle}`));
    return paragraph;
};
const getCoursePrice = (course) => {
    const paragraph = document.createElement('p');
    paragraph.appendChild(document.createTextNode(`Course price: ${course.coursePrice}`));
    return paragraph;
};
const createCourseStartDate = (course) => {
    const paragraph = document.createElement('p');
    paragraph.appendChild(document.createTextNode(`Start date: ${course.startDate}`));
    return paragraph;
};
const daysToCompleteCourse = (course) => {
    const paragraph = document.createElement('p');
    paragraph.appendChild(document.createTextNode(`Days to complete: ${course.daysToComplete}`));
    return paragraph;
};
const createCourseLayout = (course) => {
    const paragraph = document.createElement('p');
    if (course.classroomAvailability === true && course.onlineAvailability === true) {
        bookOnline.innerText = 'Book online';
        bookClassroom.innerText = 'Book in classroom';
        bookOnlineAndClassroom.innerText = 'Book online and in classroom';
        paragraph.appendChild(document.createTextNode(`Course layout: online and in classroom`));
    }
    else if (course.classroomAvailability === true) {
        bookClassroom.innerText = 'Book in classroom';
        paragraph.appendChild(document.createTextNode(`Course layout: in classroom`));
    }
    else {
        bookOnline.innerText = 'Book online';
        paragraph.appendChild(document.createTextNode(`Course layout: online`));
    }
    return paragraph;
};
const createCourseDescription = (course) => {
    const paragraph = document.createElement('p');
    paragraph.appendChild(document.createTextNode(`Description: ${course.description}`));
    return paragraph;
};
export { createCard };
