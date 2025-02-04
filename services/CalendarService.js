const ics = require("ics");
const nodemailer = require("nodemailer");
const { convertToUTC ,addTimeIST } = require("../utils/timeUtils");

const createIcsEvent = (eventDetails) => {
  const { title, organizer, attendees, description, startTime, endTime } = eventDetails;

  // Convert IST to UTC
  const start = addTimeIST(startTime) ;
  const end = addTimeIST(endTime);

  const startUTC =convertToUTC(start) ;
  const endUTC = convertToUTC(end) ;


  const event = {
    start: startUTC,
    end: endUTC,
    title,
    description,
    organizer: { name: organizer, email: organizer },
    attendees: attendees.map((email) => ({ name: email, email })),
  };

  // Generate the .ics file content
  const { error, value } = ics.createEvent(event);
  if (error) {
    throw new Error('Failed to create .ics event: ' + error.message);
  }

  return value;
};

const sendEmailWithIcs = async (mailDetails, emails, icsFilePath) => {
  const { subject, text, html } = mailDetails;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emails.join(","),
    subject,
    text,
    html,
    attachments: [
      {
        filename: "event.ics",
        path: icsFilePath,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { createIcsEvent, sendEmailWithIcs };
