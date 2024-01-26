const createCard = (course) => {
  const div = document.createElement('div');
  div.classList.add('course-image');
  
  const button = document.createElement('button');
  button.classList.add('book-course');

  button.innerText = 'Book Availability';
  div.appendChild(createImage(course.imageUrl, course.id));
  div.appendChild(createCourseTitle(course));
  div.appendChild(createCourseStartDate(course));
  div.appendChild(daysToCompleteCourse(course));
  div.appendChild(createCourseLayout(course));
  div.appendChild(createCourseDescription(course));
  div.appendChild(button);

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
  if(course.classroomAvailability === true && course.onlineAvailability === true) {
    paragraph.appendChild(document.createTextNode(`Course layout: online and in classroom`));
  } else if(course.classroomAvailability === true) {
    paragraph.appendChild(document.createTextNode(`Course layout: in classroom`));
  } else {
    paragraph.appendChild(document.createTextNode(`Course layout: online`));
  }

  return paragraph;
};

const createCourseDescription = (course) => {
  const paragraph = document.createElement('p');
  paragraph.appendChild(document.createTextNode(`Description: ${course.description}`));

  return paragraph;
};

const createCourseList = (courses, element) => {
  courses.forEach((course) => {
    const container = createDiv();
    container.setAttribute('courseId', course.id);
    container.appendChild(createSpan(course.startDate));

    element.appendChild(container);
  });
};

const createDiv = () => document.createElement('div');

const createSpan = (text) => {
  const span = document.createElement('span');
  span.innerText = text;
  return span;
};

export { createCard, createCourseList };
