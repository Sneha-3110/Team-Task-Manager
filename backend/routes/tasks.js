const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Create Task (Admin Only)
router.post('/', auth(['Admin']), async (req, res) => {
    try {
        const { title, description, assignedTo, dueDate, project } = req.body;

        if (!title) return res.status(400).json({ msg: 'Task title is required' });

        if (assignedTo) {
            const member = await User.findOne({ _id: assignedTo, role: 'Member' });
            if (!member) return res.status(400).json({ msg: 'Assigned user must be a member' });
        }

        const task = new Task({ title, description, assignedTo, dueDate, project });
        await task.save();
        await task.populate('assignedTo', 'name email');
        res.json(task);
    } catch (err) { res.status(500).send('Server Error'); }
});

// Get Tasks (Members see only their tasks, Admins see all)
router.get('/', auth(), async (req, res) => {
    const filter = req.user.role === 'Admin' ? {} : { assignedTo: req.user.id };
    const tasks = await Task.find(filter).populate('assignedTo', 'name');
    res.json(tasks);
});

// Update Status (Anyone assigned can do this)
router.patch('/:id', auth(), async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(task);
    } catch (err) { res.status(500).send('Server Error'); }
});

module.exports = router;
