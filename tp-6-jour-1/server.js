const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'src/views')));

let courses = [];

app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Nom et email sont requis' });
    }
    res.status(200).json({ message: 'Formulaire reçu!' });
});

app.post('/enroll', (req, res) => {
    const { courses: newCourses } = req.body;
    const conflicts = courses.some(existingCourse => {
        return Object.entries(newCourses).some(([subject, { day, time }]) => {
            return existingCourse.day === day && existingCourse.time === time;
        });
    });
    if (conflicts) {
        return res.status(400).json({ message: 'Un cours est déjà inscrit à ce jour.' });
    }
    courses.push(newCourses);
    res.status(200).json({ message: 'Inscription aux cours réussie!' });
});

app.get('/courses', (req, res) => {
    res.status(200).json({ courses });
});

const startServer = (port) => {
    return app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

module.exports = { app, startServer };
