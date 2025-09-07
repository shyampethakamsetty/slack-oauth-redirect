# Slack OAuth Redirect (Vercel)

Tiny serverless function that provides a stable HTTPS redirect URL for Slack OAuth and forwards the callback to your local backend.

## How it works
- Slack redirects to this Vercel function (stable HTTPS)
- The function 302-redirects to `http://localhost:8000/integrations/slack/oauth2callback` with original `code` and `state`
- Your local FastAPI backend completes the token exchange and stores credentials in Redis

## Files
- `vercel.json` – Vercel config
- `api/slack_oauth_redirect.js` – redirect handler

## Deploy
```bash
cd slack-oauth-redirect
npm install -g vercel
vercel login
vercel
```

Copy the deployed URL, e.g.:
```
https://your-app.vercel.app/api/slack_oauth_redirect
```

## Configure
- Slack App → OAuth & Permissions → Redirect URLs: add your deployed URL
- Backend `.env`:
```
SLACK_OAUTH_REDIRECT_URL=https://your-app.vercel.app/api/slack_oauth_redirect
```
- Restart backend

## Test
- Click “Connect to Slack” in your app
- Flow: Slack → Vercel → localhost backend callback
- Backend stores credentials in Redis as before 