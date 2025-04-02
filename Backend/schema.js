const mongoose = require('mongoose');

// Define a simplified Snack schema
const snackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true},
    description: {type: String},
    created_by: { type: String, required: true,} 
},{ timestamps: true })

// Export the Snack model
const Snack = mongoose.model('Snack',snackSchema)
module.exports = Snack;
