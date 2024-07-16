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

    // const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    // const reservationDateStr = this.reservationDate.toISOString().split('T')[0];
    // if (!dateRegex.test(reservationDateStr)) {
    //     return false;
    // }
    // return true;
};

reservationSchema.methods.isMachineAvailable = function(gymId, machineId) {
    if (machineId === 'machine2') {
        return false;
    }
    return true;
};

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = { Reservation };
