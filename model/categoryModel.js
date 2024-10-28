const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
 
    slNo: {
        type: Number,  // Serial number for the category
        required: true,
    },
    name: {
        type: String,  // Name of the category
        required: true,
        trim: true
    },
    status: {
        type: String,  // Status can be 'active', 'inactive', etc.
        enum:  ['active', 'inactive'],   // Restrict values to 'active' or 'inactive'
        default: 'active'
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});



module.exports = mongoose.model('Category', categorySchema);
