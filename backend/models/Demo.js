const mongoose = require('mongoose');

const demoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  time: { type: String, required: true },
  course: { type: String, required: true },
  demoBy: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },});

module.exports = mongoose.model('Demo', demoSchema);
