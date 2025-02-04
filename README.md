<h2>Create a .env file for storing sensitive information:</h2>
<br>
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password // use app password of your gmail
PORT
```
<br>

<h2> Api Endpoint</h2>
<br>
```
/calendar/send-invite
```
<br>


<h2>Inputing Json Format</h2>
<br>

```
{
  "mailDetails": {
    "subject": "Team Meeting",
    "text": "Please join the team meeting.",
    "html": "<p>Please join the team meeting.</p>"
  },
  "eventDetails": {
    "title": "Team Meeting",
    "organizer": "organizer@example.com",
    "attendees": ["attendee1@example.com", "attendee2@example.com"],
    "description": "Quarterly team meeting.",
    "startTime": "2025-02-10T15:30:00",
    "endTime": "2025-02-10T16:30:00"
  },
  "emails": ["attendee1@example.com", "attendee2@example.com"]
}
```
