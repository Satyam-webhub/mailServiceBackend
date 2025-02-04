const moment = require('moment-timezone');





const addTimeIST = (istTimeStr) => {
    return moment.tz(istTimeStr, "Asia/Kolkata") // Parse IST time
        .add(5, 'hours')
        .add(30, 'minutes')
        .format("YYYY-MM-DDTHH:mm:ss"); // Return in same format
};






const convertToUTC = (istTime) => {
  // Parse the input time as IST
  const istMoment = moment.tz(istTime, 'YYYY-MM-DDTHH:mm:ss', 'Asia/Kolkata');

  // Convert IST to UTC
  const utcMoment = istMoment.utc();

  // Return the UTC time in the format expected by the `ics` library
  return [
    utcMoment.year(),
    utcMoment.month() + 1, // Months are 0-indexed in Moment.js
    utcMoment.date(),
    utcMoment.hour(),
    utcMoment.minute(),
  ];
};

module.exports = { convertToUTC ,addTimeIST };