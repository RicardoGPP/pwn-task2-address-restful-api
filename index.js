//Imports required dependencies.
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const addresses = require('./routes/addresses.js');

//Creates an express server.
const app = express();

//Sets conversion middlewares.
app.use(express.json());

//Sets logging middleware.
app.use(morgan('common'));

//Sets addresses resource/router middleware.
app.use('/enderecos', addresses);

//Sets default 404 middleware.
app.use((_, res) => {
    res.status(404).send('<h2>404 - Resource not found.</h2>');
});

//Starts the server.
const startServer = () => {
    app.listen(process.env.NODE_PORT);
};

//Starts the server with HTTPS.
const startHttpsServer = () => {
    const https = require('https');
    const fs = require('fs');

    const options = {
        key: fs.readFileSync(process.env.SSL_KEY_LOCATION),
        cert: fs.readFileSync(process.env.SSL_CERT_LOCATION)
    };

    https.createServer(options, app).listen(process.env.NODE_PORT);
};

//Puts server up.
if (process.env.USE_HTTPS != 'true') {
    startServer();
} else {
    startHttpsServer();
}