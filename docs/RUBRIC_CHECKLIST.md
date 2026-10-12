# Rubric checklist (target: 5 in every criterion)

## Functionality
- [ ] Create, read (index + details), update, delete all work. Backend: `Backend/app/Http/Controllers/TicketController.php`
- [ ] No full page reloads: every link uses Inertia `<Link>` / `router`. Frontend: `Frontend/resources/js/Pages/Tickets/*`
- [ ] `useForm` with field errors, input kept after failed submit, button disabled while processing: `Components/TicketForm.jsx`
- [ ] Server validation in Form Requests: `StoreTicketRequest`, `UpdateTicketRequest`
- [ ] Pagination 10 per page + filters (search, status, priority, category)

## UI/UX
- [ ] Tailwind only, no Bootstrap, no inline `style`
- [ ] Table on desktop, stacked cards on phone (`Tickets/Index.jsx`)
- [ ] Persistent navbar: user name, Dashboard, Tickets, New Ticket, Logout (`Layouts/AuthenticatedLayout.jsx`)
- [ ] Flash messages: "Ticket created." / "Ticket updated." / "Ticket deleted." (`HandleInertiaRequests` + `FlashMessage.jsx`)
- [ ] Color-coded priority and status badges, friendly empty states, delete confirmation modal

## Security
- [ ] Register, login, logout with hashed passwords (Breeze + `'password' => 'hashed'` cast)
- [ ] All ticket routes inside `auth` middleware: guests go to `/login`
- [ ] `TicketPolicy` (view/update/delete owner only): other user's ticket -> 403 (test it: open `/tickets/<other user's id>` while logged in as demo)
- [ ] `Rule::in()` for priority, status, category
- [ ] `$fillable` set, `user_id` never fillable, set via `$request->user()->tickets()->create(...)`
- [ ] CSRF left enabled; no `dangerouslySetInnerHTML`
- [ ] `.env` in `.gitignore`; `.env.example` has no real values; **check `git log` for leaked secrets**
- [ ] Production: `APP_ENV=production`, `APP_DEBUG=false`

## Deployment
- [ ] Live HTTPS URL on Railway, reachable during checking
- [ ] Railway MySQL connected (not SQLite); data survives redeploy
- [ ] `migrate --force` and `npm run build` run during deploy
- [ ] Demo account seeded; public repo with many commits

## Before the defense
- [ ] Run `php artisan test` (all green)
- [ ] Read `DEFENSE_CHEATSHEET.md`
