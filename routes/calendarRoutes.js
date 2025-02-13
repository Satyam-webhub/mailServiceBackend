const express = require('express');
const calendarController = require('../controllers/calendarController');

const router = express.Router();

router.post('/send-invite', calendarController.sendInvite);

module.exports = router;