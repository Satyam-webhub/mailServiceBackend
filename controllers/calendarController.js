const fs = require("fs");
const path = require("path");
const CalendarService = require("../services/CalendarService");

const sendInvite = async (req, res) => {
  try {
    const { mailDetails, eventDetails, emails } = req.body;

    // Create .ics file
    const icsContent = CalendarService.createIcsEvent(eventDetails);
    // const icsFilePath = path.join(__dirname, '../temp/event.ics');

    // Define file path for the ICS file
    const icsFilePath = path.join(
      __dirname,
      "../events",
      `${Date.now()}_event.ics`
    );

    // Define file path for the ICS file
    const folderPath = path.join(__dirname, "../events");

    // Ensure converted folder exists
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Ensure file_list.txt exists
    if (!fs.existsSync(icsFilePath)) {
      fs.writeFileSync(icsFilePath, "");
    }

    fs.writeFileSync(icsFilePath, icsContent);

    // Send email with .ics attachment
    await CalendarService.sendEmailWithIcs(mailDetails, emails, icsFilePath);

    // Clean up: Delete the .ics file after sending the email
    fs.unlinkSync(icsFilePath);

    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error in sendInvite:", error);
    res.status(500).json({ error: "Failed to send emails." });
  }
};

module.exports = { sendInvite };
