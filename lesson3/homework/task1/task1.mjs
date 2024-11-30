/*Задача 1. Розробити додаток з такими маршрутами:
Маршрут     Що повертає:
season - повертає пору року
day - повертає поточний день
time - повертає час дня (ранок, обід, вечеря)
*/

import express from "express";
const app = express();
const port = 3000;

const monthNumber = new Date().getMonth();
function monthName(number) {
  let month;
  if (number < 2 || number === 11) {
    month = "Winter";
  } else if (number < 5) {
    month = "Spring";
  } else if (number < 8) {
    month = "Summer";
  } else if (number < 11) {
    month = "Autumn";
  } else {
    month = "something wrong";
  }
  return month;
}
const dayNumber = new Date().getDay();
function dayName(number) {
  switch (number) {
    case 1:
      return "Monday";
      break;
    case 2:
      return "Tuesday";
      break;
    case 3:
      return "Wednesday";
      break;
    case 4:
      return "Thursday";
      break;
    case 5:
      return "Friday";
      break;
    case 6:
      return "Saturday";
      break;
    case 0:
      return "Sunday";
      break;

    default:
      return "Invalid day";
  }
}

const hourNumber = new Date().getHours();
function dayTime(number) {
  if (number >= 6 && number < 12) {
    return "Morning";
  } else if (number >= 12 && number < 18) {
    return "Noon";
  } else if (number >= 18 && number < 22) {
    return "Evening";
  } else {
    return "Night";
  }
}

// Маршрут для GET запиту до кореневого шляху
app.get("/", (req, res) => {
  res.send("Hi, World!");
});
app.get("/season", (req, res) => {
  res.send(monthName(monthNumber));
});
app.get("/day", (req, res) => {
  res.send(dayName(dayNumber));
});

app.get("/time", (req, res) => {
  res.send(dayTime(hourNumber));
});
// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
});
