const mongoose = require('mongoose');

const MessSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        email: {
            type: String,
        },
        mess: {
            type: String,
        },
        phone: {
            type: String,
        },
       
    },
    { timestamps: true }
);

module.exports = mongoose.model('Mess', MessSchema);
