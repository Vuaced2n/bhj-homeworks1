'use strict'

/**
 * Возращает время в секундах
 * @param data в виде '00:00:00' час:мин:сек
 * @returns {number}
 */
function convertTime(data) {
  const newData = data.split(':');
  return (+newData[0] * 3600 + +newData[1] * 60 + +newData[2]);
}

const timer = document.getElementById('timer');

//Часть 1
let startCounter = +timer.textContent;

const timerId = setInterval(() => {

  if (startCounter > 0) {
    startCounter--;
    timer.textContent = `${(startCounter < 10) ? '0' + startCounter : startCounter}`;
  } else {
    clearInterval(timerId);
    alert('Вы победили в конкурсе');
  }

}, 1000);



// Часть 2

// timer.textContent = '00:01:15';
//
// let setTime = convertTime(timer.textContent);
//
// const timerId = setInterval(() => {
//   setTime = setTime - 1;
//   let hours = Math.trunc(setTime / 3600)
//   let minutes = Math.trunc((setTime - hours * 3600) / 60)
//   let seconds = Math.trunc((setTime - hours * 3600 - minutes * 60))
//
//   if (hours < 10) hours = '0' + hours;
//   if (minutes < 10) minutes = '0' + minutes;
//   if (seconds < 10) seconds = '0' + seconds;
//
//   timer.textContent = `${hours}:${minutes}:${seconds}`;
//
//   if ((+hours === 0) && (+minutes === 0) && (+seconds === 0)) {
//     setTimeout(() => {
//       alert('Вы победили в конкурсе!');
//     }, 500);
//     clearInterval(timerId);
//   }
// }, 1000);



//Часть 3

// let startCounter = +document.getElementById('timer').textContent;
//
// const timerId = setInterval(() => {
//
//   if (startCounter > 0) {
//     startCounter--;
//     document.getElementById('timer').textContent = `${(startCounter < 10) ? '0' + startCounter : startCounter}`;
//   } else {
//     clearInterval(timerId);
//     location.assign('https://drive.google.com/file/d/1wiE82vjZT7oMeTESxFl1eGJ_4-F119Zp/view?usp=sharing');
//   }
//
// }, 1000);

// let startCounter = +timer.textContent;
//
// const timerId = setInterval(() => {
//
//   if (startCounter > 0) {
//     startCounter--;
//     timer.textContent = `${(startCounter < 10) ? '0' + startCounter : startCounter}`;
//   } else {
//     clearInterval(timerId);
//     location.assign('https://drive.google.com/file/d/1wiE82vjZT7oMeTESxFl1eGJ_4-F119Zp/view?usp=sharing');
//   }
//
// }, 1000);
