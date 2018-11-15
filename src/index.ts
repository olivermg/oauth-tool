import * as express from "express";
import { Application, Request, Response } from "express";
import * as https from "https";
import axios from "axios";
import * as qs from "querystring";
import * as path from "path";

async function run(app: Application, env) {
    //app.use(express.static(__dirname + '/public'));

    app.get('/', async (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, "..", "public", "index.html"));
    });

    app.get('/oauth2', async (req: Request, res: Response) => {
        const querystring = qs.stringify({
            client_id:     env.clientId,
            redirect_uri:  `${env.baseUrl}:${env.port}/oauth2/callback`,
            response_type: "code",
            scope:         env.scopes,
        });

        const apiUrl = `${env.apiAuthUrl}?${querystring}`;

        console.log(`Will redirect User agent to ${apiUrl}`);
        res.redirect(302, apiUrl);
    });

    app.get('/oauth2/callback', async (req: Request, res: Response) => {
        const code = req.query.code;

        const tokenRes = await axios.post(env.apiTokenUrl, qs.stringify({
            grant_type:    "authorization_code",
            client_id:     env.clientId,
            client_secret: env.clientSecret,
            redirect_uri:  `${env.baseUrl}:${env.port}/oauth2/callback`,
            code,
        })).catch((err) => {
            console.log("ERROR:", err);
        });
        const tokenData = tokenRes && tokenRes.data;

        tokenRes && res.header("Content-type", tokenRes.headers['content-type']);
        res.send(tokenData);
    });

    app.listen(env.port, () => console.log(`Listening on port ${env.port}.`));
}

const env = {
    baseUrl:      process.env.BASEURL || "http://localhost",
    port:         process.env.PORT || "8080",
    clientId:     process.env.API_CLIENTID,
    clientSecret: process.env.API_CLIENTSECRET,
    apiAuthUrl:   process.env.API_AUTHURL,
    apiTokenUrl:  process.env.API_TOKENURL,
    scopes:       process.env.SCOPES || "openid",
};

run(express(), env);
