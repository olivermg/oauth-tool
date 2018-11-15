# oauth-tool

This tool helps you to run through an OAuth2 authorization flow in order to
retrieve an Access Token.

It is thought to be a utility for developers that e.g. need to try out or
debug an API and are facing the issue that before being able to make any
API requests they need to go through an OAuth2 authorization flow.

## How to run

1. `cd` to the root folder of this project.

2. Create a file `.env` there and specify the confguration that is
   appropriate for the API that you want to authorize against. The entries in
   this file must be in the form `KEY=VALUE`, e.g. `PORT=8080`.

   These are the supported vars:

   env var name          | sample value                         | default value    |  meaning
   ----------------------|--------------------------------------|------------------|-----------------------------
   BASEURL               | http://localhost                     | http://localhost | The URL to this application
   PORT                  | 8080                                 | 8080             | The Port to this application
   API_CLIENTID          | abcdef0123456789                     |                  | Your application's client id that you got from your API provider for
   API_CLIENTSECRET      | xyz987654321                         |                  | Your application's client secret that you got from your API provider
   API_AUTHURL           | https://yourapi/oauth2/authorize     |                  | The OAuth2 URL of your API for getting the authorization code (OAuth2 step 1)
   API_TOKENURL          | https://yourapi/oauth2/token         |                  | The OAuth2 URL of your API for getting an Access token (OAuth2 step 2)
   SCOPES                | id api email refresh_token           | openid           | A space separated list of scopes that your authorization flow shall request

3. Download dependencies if you haven't done so before:
   ```
   yarn install
   ```

3. Start the application:
   ```
   yarn start
   ```

4. Navigate your browser to `$BASEURL:$PORT`, e.g. `http://localhost:8080`.

5. Click the `OAuth2` link. This will redirect your to your
   API provider (`API_AUTHURL`).

6. You will probably have to confirm access (if you haven't done so before).

7. If everything worked fine, you will be redirected back to this application
   (`$BASEURL:$PORT/oauth2/callback`) and the Access Token (plus more stuff)
   granted by your OAuth2 provider will be shown in your browser window.

   You can use that info to use `curl` or whatever to make requests against
   your API.
