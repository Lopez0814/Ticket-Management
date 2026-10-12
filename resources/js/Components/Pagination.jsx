import { Link } from '@inertiajs/react';

// Renders Laravel's paginator links as plain text (no raw HTML injection).
const clean = (label) =>
    label.replace('&laquo; Previous', 'Previous').replace('Next &raquo;', 'Next');

export default function Pagination({ links, from, to, total }) {
    if (!links || links.length <= 3) {
        return total > 0 ? (
            <p className="text-sm text-gray-500">Showing {from}–{to} of {total}</p>
        ) : null;
    }

    return (
        <nav aria-label="Pagination" className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-sm text-gray-500">Showing {from}–{to} of {total}</p>
            <div className="flex flex-wrap justify-center gap-1">
                {links.map((link, i) => {
                    const label = clean(link.label);
                    const cls =
                        'min-w-[2.25rem] rounded-md px-3 py-1.5 text-center text-sm font-medium ring-1 ring-inset ' +
                        (link.active
                            ? 'bg-teal-700 text-white ring-teal-700'
                            : link.url
                              ? 'bg-white text-gray-700 ring-gray-300 hover:bg-gray-50'
                              : 'cursor-not-allowed bg-gray-50 text-gray-400 ring-gray-200');

                    return link.url ? (
                        <Link key={i} href={link.url} preserveScroll className={cls} aria-current={link.active ? 'page' : undefined}>
                            {label}
                        </Link>
                    ) : (
                        <span key={i} className={cls}>{label}</span>
                    );
                })}
            </div>
        </nav>
    );
}
