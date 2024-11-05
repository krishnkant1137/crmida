const mongoose = require('mongoose');

const facultiesAdminSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Faculty name
  email: { type: String, required: true, unique: true }, // Unique email for faculties
  password: { type: String, required: true }, // Password field
  facultyId: { type: String, required: true, unique: true } // Unique faculty ID
});

module.exports = mongoose.model('FacultiesAdmin', facultiesAdminSchema);
