const mongoose = require('mongoose');
const { Schema } = mongoose;

const reservationSchema = new Schema({
    memberId: {
        type: Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    gymId: {
        type: String,
        required: true
    },
    machineId: {
        type: String,
        required: true
    },
    reservationDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

// Validation function
reservationSchema.methods.validateReservation = function() {
    if (!this.memberId || !this.gymId || !this.machineId || !this.reservationDate) {
        return false;
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(this.reservationDate.toISOString().split('T')[0])) {
        return false;
    }
    return true;
};

// Dummy function to check machine availability (for demonstration)
reservationSchema.methods.isMachineAvailable = function(gymId, machineId) {
    // This function should check the availability of the machine
    // For this example, let's assume machine2 is unavailable
    if (machineId === 'machine2') {
        return false;
    }
    return true;
};

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = { Reservation };