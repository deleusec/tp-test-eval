const express = require('express');
const path = require('path');
const router = express.Router();
const memberController = require('./controllers/memberController');
const reservationController = require('./controllers/reservationController');

// API routes
router.post('/api/members', memberController.register);
router.post('/api/reservations', reservationController.create);

// Serve HTML pages
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'memberRegistration.html'));
});

router.get('/gymSelection', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'gymSelection.html'));
});

router.get('/machineSelection', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'machineSelection.html'));
});

router.get('/reservationConfirmation', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'reservationConfirmation.html'));
});

module.exports = router;