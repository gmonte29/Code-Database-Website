const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');  // Import the 'path' module

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (_req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({ storage: storage });

// In-memory storage for uploaded program data
const uploadedPrograms = [];

app.post('/upload', upload.single('programFile'), (req, res) => {
    const programData = {
        title: req.body.programTitle,
        language: req.body.programLanguage,
        programType: req.body.programType,
        programLink: '/uploads/' + req.file.filename
    };

    // Add the uploaded program data to the in-memory array
    uploadedPrograms.push(programData);

    res.json(programData);
});

app.get('/programs', (_req, res) => {
    // Send the array of uploaded program data as the response
    res.json(uploadedPrograms);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

