const express = require('express');
const https = require('https');
const qs = require('querystring');

const app = express();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

function oauth1() {
    https.get();
}

function run() {
    app.get('/', (req, res) => {
        const querystring = qs.stringify({

        });

        res.redirect();
    });

    app.listen(8081);
}

run();
