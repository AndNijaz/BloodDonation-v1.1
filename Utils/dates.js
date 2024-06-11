const date = new Date();

const months = [
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

export function checkCanDonatedNow(lastDonationDate, months) {
  const today = new Date();
  const nextEligibleDate = new Date(lastDonationDate);
  nextEligibleDate.setMonth(nextEligibleDate.getMonth() + months);

  return today >= nextEligibleDate;
}

export function parseDateToFrontend(date) {
  return date.split("-").reverse().join("/");
}
