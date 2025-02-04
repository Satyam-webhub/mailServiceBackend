const express = require('express');
const bodyParser = require('body-parser');
const calendarRoutes = require('./routes/calendarRoutes');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

app.use(bodyParser.json());
app.use('/calendar', calendarRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});