import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';

// Persistent navigation: user name, Dashboard, Tickets, New Ticket, Logout.
export default function AuthenticatedLayout({ header, children }) {
    const { user } = usePage().props.auth;
    const [menuOpen, setMenuOpen] = useState(false);

    const linkCls = (active) =>
        'rounded-md px-3 py-2 text-sm font-medium ' +
        (active ? 'bg-teal-50 text-teal-800' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900');

    const links = (
        <>
            <Link href={route('dashboard')} className={linkCls(route().current('dashboard'))}>Dashboard</Link>
            <Link href={route('tickets.index')} className={linkCls(route().current('tickets.index') || route().current('tickets.show') || route().current('tickets.edit'))}>Tickets</Link>
        </>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Head />
            <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center gap-6">
                        <Link href={route('dashboard')} className="text-lg font-bold tracking-tight text-teal-800">
                            HelpDesk
                        </Link>
                        <div className="hidden items-center gap-1 md:flex">{links}</div>
                    </div>

                    <div className="hidden items-center gap-3 md:flex">
                        <Link
                            href={route('tickets.create')}
                            className="rounded-md bg-teal-700 px-3.5 py-2 text-sm font-semibold text-white hover:bg-teal-800"
                        >
                            New Ticket
                        </Link>
                        <Link href={route('profile.edit')} className="text-sm font-medium text-gray-700 hover:text-gray-900">
                            {user.name}
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                        >
                            Log out
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMenuOpen((o) => !o)}
                        aria-expanded={menuOpen}
                        aria-label="Toggle menu"
                        className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            {menuOpen
                                ? <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                                : <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />}
                        </svg>
                    </button>
                </div>

                {menuOpen && (
                    <div className="space-y-1 border-t border-gray-200 px-4 py-3 md:hidden">
                        <div className="flex flex-col gap-1">{links}</div>
                        <Link
                            href={route('tickets.create')}
                            className="mt-2 block rounded-md bg-teal-700 px-3 py-2 text-center text-sm font-semibold text-white"
                        >
                            New Ticket
                        </Link>
                        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                            <Link href={route('profile.edit')} className="text-sm font-medium text-gray-700">{user.name}</Link>
                            <Link href={route('logout')} method="post" as="button" className="text-sm font-medium text-gray-600">
                                Log out
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            <FlashMessage />

            {header && (
                <header className="border-b border-gray-200 bg-white">
                    <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">{header}</div>
                </header>
            )}

            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
        </div>
    );
}
