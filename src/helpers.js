export function unixToDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const formattedDate = date.toLocaleString("en-US", {year: "numeric"});
  return formattedDate;
}

// convert year to 2 unix strings from Jan 1 to Dec 31
export function yearToUnix(year, condition) {
  let unixDate;
  if (condition === 'start') {
    unixDate = Math.floor(new Date(`${year}-01-01`).getTime() / 1000);
  } else if (condition === 'end') {
    unixDate = Math.floor(new Date(`${year}-12-31`).getTime() / 1000);
  }
  return unixDate;
}