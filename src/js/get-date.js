const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];

const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const monthNumber = String(today.getMonth()).padStart(2, '0');
    const month = monthNames[monthNumber];
    const year = String(today.getFullYear()).padStart(2, '0');
    const fullDate = day + ' ' + month + ' ' + year;
    return fullDate;
}

const parseGetDate = (date) => {
  const fullDateOld = date.slice(0, 10);
  const parseDay = fullDateOld.slice(8);
  const numberMonth = fullDateOld.slice(5,7);
  const sliceMonth = numberMonth[0] === '0' ? numberMonth.slice(1) : numberMonth;
  const parseMonth = monthNames.find((month, index) => index === sliceMonth - 1);
  const parseYear = fullDateOld.slice(0, 4);
  const fullDate = parseDay + ' ' + parseMonth + ' ' + parseYear;
  return fullDate;
}

export { getCurrentDate, parseGetDate }