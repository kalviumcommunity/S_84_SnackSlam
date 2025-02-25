const express = require('express');
const router = express.Router();
const Snack = require('./schema');

// CRUD Operations

// Create a new snack
router.post('/snacks', async (req, res) => {
    try {
        const { name, country, description } = req.body;
        if (!name || !country || typeof name !== 'string' || typeof country !== 'string') {
            return res.status(400).json({ message: 'Invalid input data' });
        }
        const snack = new Snack({ 
            name: name.trim(),
            country: country.trim(),
            description: description?.trim()
        });
        await snack.save();
        res.status(201).json(snack);
    } catch (error) {
        res.status(400).json({ message: 'Error saving snack', error: error.message });
    }
});


// Get all snacks
router.get('/snacks', async (req, res) => {
    try {
        const snacks = await Snack.find();
        res.status(200).json(snacks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching snacks', error });
    }
});

// Update a snack by ID
router.put('/snacks/:id', async (req, res) => {
    try {
        const updatedSnack = await Snack.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedSnack) {
            return res.status(404).json({ message: 'Snack not found' });
        }
        res.status(200).json(updatedSnack);
    } catch (error) {
        res.status(500).json({ message: 'Error updating snack', error });
    }
});

// Delete a snack by ID
router.delete('/snacks/:id', async (req, res) => {
    try {
        const deletedSnack = await Snack.findByIdAndDelete(req.params.id);
        if (!deletedSnack) {
            return res.status(404).json({ message: 'Snack not found' });
        }
        res.status(200).json({ message: 'Snack deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting snack', error });
    }
});

module.exports = router;
