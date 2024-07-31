const Task = require('../models/task');

const createTask = async (req, res) => {
    const { title, description, status, priority, deadline } = req.body;

    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        const task = new Task({ title, description, status, priority, deadline, user: req.user.id });
        await task.save()
        res.status(201).json(task);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}

const getTasks = async (req, res) => {
    
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json(tasks);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

const updateTask = async (req, res) => {

    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    const { title, description, status, priority, deadline } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(
        req.params.id,
        { title, description, status, priority, deadline },
        { new: true }
        );
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteTask = async (req, res) => {

    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).end();
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

module.exports = { createTask, getTasks, updateTask, deleteTask };