const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Admins use this list while assigning tasks.
router.get('/members', auth(['Admin']), async (req, res) => {
    try {
        const members = await User.find({ role: 'Member' }).select('name email role');
        res.json(members);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
