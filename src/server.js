require('dotenv/config');

const express = require('express');
const cors = require('cors');

// Application essentials
const app = express();
const port = process.env.SVC_API_PORT_LOCAL;

// Get all routes availables
const routes = require('./routes');

// Config on Application
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// app.use(bodyParser.json());

// Import all endpoints availables
app.use(routes);

// Start application service
app.listen(port, () => {
    console.log('Node.js with Express starting server at port:', port)
});
