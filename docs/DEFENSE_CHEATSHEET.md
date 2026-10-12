# Defense cheat sheet: be ready to explain any line

**Request flow:** browser (Inertia `<Link>`/`useForm`) > `routes/web.php` > `auth` middleware > `TicketController` > Form Request validates > Policy authorizes > Eloquent > `Inertia::render()` > React page.

**Why Inertia has no page reloads:** Inertia sends XHR requests with an `X-Inertia` header; the server replies with JSON (component name + props) and React swaps the page component.

**Why is the controller thin?** Validation is in Form Requests, authorization in `TicketPolicy`, so the controller only coordinates.

**How is user_id set?** `$request->user()->tickets()->create($validated)`: the relationship fills `user_id` from the logged-in user. It is not in `$fillable` and not in the form, so it can't be spoofed.

**What happens at `/tickets/5` if ticket 5 isn't mine?** `Gate::authorize('view', $ticket)` calls `TicketPolicy@view`, which compares `$user->id` to `$ticket->user_id`; false means 403, shown by `Pages/Error.jsx`.

**Where is mass assignment prevented?** `$fillable` on `Ticket`, and `$request->validated()` instead of `$request->all()`.

**Where is XSS prevented?** React escapes output by default; description is rendered as text with `whitespace-pre-wrap`, never `dangerouslySetInnerHTML`.

**CSRF?** Laravel's `VerifyCsrfToken` stays on; Inertia/Axios sends the XSRF cookie token automatically.

**Passwords?** `'password' => 'hashed'` cast (bcrypt via Laravel's default hasher); Breeze registration stores only the hash.

**Flash messages?** Controller `->with('success', 'Ticket created.')`; `HandleInertiaRequests::share()` exposes `flash`; `FlashMessage.jsx` shows it and hides it after 4 s or on click.

**Pagination?** `paginate(10)->withQueryString()` keeps filters across pages; `Pagination.jsx` renders the links as text.

**Production config?** `APP_ENV=production`, `APP_DEBUG=false`, MySQL via `DB_URL`, `migrate --force` on start, `npm run build` in the image, `URL::forceScheme('https')` + `trustProxies` in `bootstrap/app.php`.

**Why a string column instead of enum?** Portable across databases; `Rule::in()` enforces allowed values.
