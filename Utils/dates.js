var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// const date = new Date();

export function month(currMonth) {
  return months[currMonth];
  // const currentDate = new Date();
  // const year = currentDate.getFullYear();
  // const month = currentDate.getMonth();
  // const newMonth = month - num;

  // // Calculate the new year and month
  // let newYear = year;
  // let newMonthIndex = newMonth;
  // while (newMonthIndex < 0) {
  //   newYear--;
  //   newMonthIndex += 12;
  // }

  // const newDate = new Date(newYear, newMonthIndex, 1);
  // const formattedDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
  //   .toString()
  //   .padStart(2, "0")}-${newDate.getDate().toString().padStart(2, "0")}`;

  // console.log(formattedDate);
  // return formattedDate;
}

export function day(num) {
  let day = date.getDate();
  if (num) day = date.getDate() - num;
  return day;
}

export function year(num) {
  let year = date.getFullYear();
  if (num) year = date.getFullYear() - num;
  return year;
}
// export function lastMonth() {}
// export function nextMonth() {}
