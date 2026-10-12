# Deploying to Railway (MySQL, HTTPS)

1. Push the finished project to a **public GitHub repo** (commit often; never commit `.env`).
   Check `.gitignore` lists `.env` and that `.env.example` has no real values.
2. Railway > New Project > Deploy from GitHub repo. The root `Dockerfile` builds the app
   (`composer install`, `npm ci`, `npm run build`) and migrates on start (`php artisan migrate --force`).
3. In the same project: **+ New > Database > MySQL**.
4. Open the app service > **Variables** and add:

```
APP_NAME=HelpDesk
APP_ENV=production
APP_DEBUG=false
APP_KEY=            # run `php artisan key:generate --show` locally and paste the result
APP_URL=https://<your-app>.up.railway.app
DB_CONNECTION=mysql
DB_URL=${{MySQL.MYSQL_URL}}
SESSION_DRIVER=database
CACHE_STORE=database
LOG_CHANNEL=stderr
DEMO_PASSWORD=<choose one>
PORT=8080
```

5. Service > Settings > Networking > **Generate Domain** (target port 8080). Railway serves it over HTTPS.
6. Seed the demo account once (Railway CLI or the service shell): `php artisan db:seed --force`.
7. Verify: open the URL, register, create/edit/delete a ticket, then redeploy and confirm the data is still there.

Notes
- If Railway reports a different port than 8080, set the domain's target port to match.
- The app forces `https://` URLs in production and trusts Railway's proxy, so assets load without mixed-content errors.
- If the Dockerfile build fails, check the build log first; a Nixpacks/Railpack auto-build also works if you run `npm run build` and `php artisan migrate --force` in the build/start commands.
