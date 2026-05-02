const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// Create Project (Admin Only)
router.post('/', auth(['Admin']), async (req, res) => {
    try {
        const newProject = new Project({ ...req.body, owner: req.user.id });
        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get All Projects (Admin sees all, Member sees assigned)
router.get('/', auth(), async (req, res) => {
    const filter = req.user.role === 'Admin' ? {} : { team: req.user.id };
    const projects = await Project.find(filter).populate('team', 'name email');
    res.json(projects);
});

module.exports = router;