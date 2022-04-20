"use strict";

const futureDate = new Date(2023, 0, 1);
const timer = document.querySelector('#timer');


function getRemaindingTime() {
    let todayDate = new Date();
    let timeToEnd = futureDate.getTime() - todayDate.getTime();

    let dateInfo = getDateInfo(timeToEnd)
        .map((item) => format(item));

    timer.innerHTML = `
        <div>${dateInfo[0]}<span>Days</span></div>
        <div>${dateInfo[1]}<span>Hours</span></div>
        <div>${dateInfo[2]}<span>Minutes</span></div>
        <div>${dateInfo[3]}<span>Seconds</span></div>`

    if (timeToEnd < 0) {
        timer.innerHTML = '<h1>Timer is over</h1>';
        clearInterval(timerId);
    }
}


const getDateInfo = (remainingTime) => {
    // values in ms
    let oneMin = 60 * 1000;
    let oneHour = oneMin * 60;
    let oneDay = oneHour * 24;

    // calculate all values
    let days = Math.floor((remainingTime / oneDay));
    let hours = Math.floor((remainingTime % oneDay) / oneHour);
    let minutes = Math.floor((remainingTime % oneHour) / oneMin);
    let seconds = Math.floor((remainingTime % oneMin) / 1000);

    return [days, hours, minutes, seconds]
}


const format = (item) => {
    if (item < 10) {
        return '0' + item;
    }

    return item;
}


//countdown
let timerId = setInterval(getRemaindingTime, 1000);
// set initial values
getRemaindingTime();
