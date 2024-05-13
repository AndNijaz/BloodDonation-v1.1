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

export function month(currMonth) {
  return months[currMonth];
}

export function parseDateToDatabase(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function calculateNextTimeDonate(currentDate, month) {
  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + month,
    currentDate.getDate()
  );
}

export function checkCanDonatedNow(dateCanDonate, months) {
  const currentDate = new Date();

  return (
    currentDate.getFullYear() === dateCanDonate.getFullYear() ||
    Math.abs(currentDate.getMonth() - dateCanDonate.getMonth()) > months
  );
}

export function parseDateToFrontend(date) {
  // console.log("OVO JE DATUM  " + date);
  return date.split("-").reverse().join("/");
}
