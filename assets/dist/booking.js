var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getUser } from './utility.js';
const bookCourse = (course, bookingAvailability, email) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield getUser(email);
    const user = users.find((user) => user);
    const bookingInfo = {
        courseId: course.id,
        courseTitle: course.courseTitle,
        coursePrice: course.coursePrice,
        startDate: course.startDate,
        daysToComplete: course.daysToComplete,
        bookingAvailability: bookingAvailability,
        customerName: user.customerName,
        customerLastName: user.customerLastName,
        billingAddress: user.billingAddress,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
    };
    const userEmailResponse = yield fetch(`http://localhost:3000/customers?emailAddress=${email}`);
    const userEmailData = yield userEmailResponse.json();
    // Check if the user data is found
    if (userEmailData.length > 0) {
        const user = userEmailData[0];
        const isAlreadyBooked = user.booking.some((booking) => {
            return (booking.courseId === course.id &&
                booking.bookingAvailability === bookingAvailability);
        });
        if (!isAlreadyBooked) {
            if (user) {
                const hasBookedOnlineAndClassroom = user.booking.some((booking) => {
                    return (booking.courseId === course.id &&
                        booking.bookingAvailability === 'online and in classroom');
                });
                const hasBookedOnline = user.booking.some((booking) => {
                    return (booking.courseId === course.id &&
                        booking.bookingAvailability === 'online');
                });
                const hasBookedClassroom = user.booking.some((booking) => {
                    return (booking.courseId === course.id &&
                        booking.bookingAvailability === 'in classroom');
                });
                if (bookingAvailability === 'online and in classroom') {
                    if (hasBookedOnline || hasBookedClassroom) {
                        alert('You have already booked with separate layouts for this course');
                        return;
                    }
                }
                else if (bookingAvailability === 'online') {
                    if (hasBookedOnlineAndClassroom) {
                        alert('You have already booked with the combined layout for this course');
                        return;
                    }
                }
                else if (bookingAvailability === 'in classroom') {
                    if (hasBookedOnlineAndClassroom) {
                        alert('You have already booked with the combined layout for this course');
                        return;
                    }
                }
                user.booking.push(bookingInfo);
                // Update the user's data on the server
                const updateResponse = yield fetch(`http://localhost:3000/customers/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });
                const updateResult = yield updateResponse.json();
                alert(`You have successfully booked the course ${course.courseTitle} ${bookingAvailability}.
          Booking Information:
          Customer name: ${updateResult.booking[0].customerName} ${updateResult.booking[0].customerLastName}
          Course price: ${updateResult.booking[0].coursePrice}
          Billing Address: ${updateResult.booking[0].billingAddress}
          Email Address: ${updateResult.booking[0].emailAddress}
          Phone Number: ${updateResult.booking[0].phoneNumber}`);
            }
            else {
                alert('You have already booked for this course layout');
            }
        }
        else {
            alert('You have already booked for this course layout');
        }
    }
});
export { bookCourse };
