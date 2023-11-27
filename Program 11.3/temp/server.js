const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = 3000;

app.use(cors());

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

app.post('/upload', upload.single('programFile'), (req, res) => {
    const programData = {
        title: req.file.originalname,
        language: 'Unknown', // You might want to implement language detection
        programType: 'Unknown', // You might want to implement type detection
        programLink: '/uploads/' + req.file.filename
    };

    res.json(programData);
});

app.get('/program', (_req, res) => {

    // Logic to retrieve program code based on programTitle
    // ...

    // Send the program code as the response
    res.send(programCode);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});