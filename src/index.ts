import * as express from "express";
import * as https from "https";
import axios from "axios";
import * as qs from "querystring";

const app = express();

const baseUrl = process.env.BASEURL || "http://localhost";
const port = process.env.PORT || 8080;
const clientId = process.env.API_CLIENTID;
const clientSecret = process.env.API_CLIENTSECRET;
const apiAuthUrl = process.env.API_AUTHURL;
const apiTokenUrl = process.env.API_TOKENURL;
const scopes = process.env.SCOPES || "openid";

function oauth1() {
    //https.get();
}

function run() {
    app.get('/', (req, res) => {
        const querystring = qs.stringify({
            client_id: clientId,
            redirect_uri: `${baseUrl}:${port}/callback`,
            response_type: "code",
            scope: scopes,
        });

        res.redirect(`${apiAuthUrl}?${querystring}`);
    });

    app.get('/callback', (req, res) => {
        console.log(req);
        res.send('CALLBACK!');
    });

    app.listen(port);
}

run();
