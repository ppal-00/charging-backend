const mongoose = require('mongoose');

const ChargerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    latitude: Number,
    longitude: Number,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  powerOutput: Number, // in kW
  connectorType: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

module.exports = mongoose.model('Charger', ChargerSchema);
