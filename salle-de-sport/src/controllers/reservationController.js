const { Reservation } = require('../models/reservation');

exports.create = async (req, res) => {
    try {
        const newReservation = new Reservation(req.body);
        await newReservation.save();
        res.status(201).send(newReservation);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};