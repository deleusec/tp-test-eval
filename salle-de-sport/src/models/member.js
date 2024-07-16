const mongoose = require('mongoose');
const { Schema } = mongoose;

const memberSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, {
    timestamps: true
});

// Validation function as an instance method
memberSchema.methods.validateMember = function() {
    if (!this.firstName || !this.lastName || !this.email || !this.password) {
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
        return false;
    }
    if (this.password.length < 6) {
        return false;
    }
    return true;
};

const Member = mongoose.model('Member', memberSchema);

module.exports = { Member };