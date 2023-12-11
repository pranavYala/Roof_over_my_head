const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'src')));

// index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './src/', 'index.html'));
});

// Set the port and start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
