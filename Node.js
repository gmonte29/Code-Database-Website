const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '.')));
/*
app.get('/', (_req, res) => {

    res.sendFile(path.join(__dirname, '.', 'index.html'));
});
*/
app.get('/:subdirectory', (req, res) => {
    const subdirectory = req.params.subdirectory;
    res.sendFile(path.join(__dirname, '.', '.', subdirectory, 'index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});