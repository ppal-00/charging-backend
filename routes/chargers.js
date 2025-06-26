const express = require('express');
const router = express.Router();
const Charger = require('../models/Charger');
const auth = require('../middleware/auth');

// Create a charger
router.post('/', auth, async (req, res) => {
  try {
    const charger = await Charger.create({ ...req.body, user: req.user });
    res.status(201).json(charger);
  } catch (err) {
    res.status(500).json({ message: 'Error creating charger' });
  }
});

// Get all chargers
router.get('/', auth, async (req, res) => {
  try {
    const chargers = await Charger.find({ user: req.user });
    res.json(chargers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching chargers' });
  }
});

// Update a charger
router.put('/:id', auth, async (req, res) => {
  try {
    const charger = await Charger.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(charger);
  } catch (err) {
    res.status(500).json({ message: 'Error updating charger' });
  }
});

// Delete a charger
router.delete('/:id', auth, async (req, res) => {
  try {
    await Charger.findByIdAndDelete(req.params.id);
    res.json({ message: 'Charger deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting charger' });
  }
});

module.exports = router;
