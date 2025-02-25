const mongoose = require('mongoose');

// Define a simplified Snack schema
const snackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true},
    description: {type: String}
});

// Export the Snack model
module.exports = mongoose.model('Snack', snackSchema);
