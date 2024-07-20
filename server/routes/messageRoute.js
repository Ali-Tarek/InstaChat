const express = require('express');
const { addMsg, getAllMsgs } = require('../controllers/messageController');

const router = express.Router();

router.post('/addmsg', addMsg);
router.post('/allmsgs', getAllMsgs);

module.exports = router;