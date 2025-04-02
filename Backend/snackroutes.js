const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Snack = require('./schema');

// Middleware for validation errors
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Create a new snack with validation
router.post(
    '/snacks',
    [
        body('name').trim().notEmpty().withMessage('Name is required').isString(),
        body('country').trim().notEmpty().withMessage('Country is required').isString(),
        body('description').optional().trim().isString(),
    ],
    validateRequest,
    async (req, res) => {
        try {
            const { name, country, description } = req.body;
            const snack = new Snack({ name, country, description });
            await snack.save();
            res.status(201).json(snack);
        } catch (error) {
            res.status(400).json({ message: 'Error saving snack', error: error.message });
        }
    }
);

// Get all snacks
router.get('/snacks', async (req, res) => {
    try {
        const snacks = await Snack.find();
        res.status(200).json(snacks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching snacks', error });
    }
});

// Update a snack by ID with validation
router.put(
    '/snacks/:id',
    [
        body('name').optional().trim().isString().withMessage('Name must be a string'),
        body('country').optional().trim().isString().withMessage('Country must be a string'),
        body('description').optional().trim().isString().withMessage('Description must be a string'),
    ],
    validateRequest,
    async (req, res) => {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: 'Update data is required' });
            }
            const updatedSnack = await Snack.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!updatedSnack) {
                return res.status(404).json({ message: 'Snack not found' });
            }
            res.status(200).json(updatedSnack);
        } catch (error) {
            res.status(500).json({ message: 'Error updating snack', error });
        }
    }
);

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
