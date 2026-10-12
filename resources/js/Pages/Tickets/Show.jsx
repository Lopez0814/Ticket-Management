import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PriorityBadge, StatusBadge } from '@/Components/Badges';
import DeleteTicketButton from '@/Components/DeleteTicketButton';

const fmt = (iso) => new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

export default function Show({ ticket }) {
    return (
        <AuthenticatedLayout
            header={
                <Link href={route('tickets.index')} className="text-sm font-medium text-teal-700 hover:text-teal-900">
                    &larr; Back to tickets
                </Link>
            }
        >
            <Head title={ticket.title} />

            <article className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-5 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <h1 className="break-words text-2xl font-semibold text-gray-900">{ticket.title}</h1>
                    <div className="flex shrink-0 gap-2">
                        <Link href={route('tickets.edit', ticket.id)} className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Edit
                        </Link>
                        <DeleteTicketButton ticket={ticket} />
                    </div>
                </div>

                <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div><dt className="text-xs text-gray-500">Priority</dt><dd className="mt-1"><PriorityBadge value={ticket.priority} /></dd></div>
                    <div><dt className="text-xs text-gray-500">Status</dt><dd className="mt-1"><StatusBadge value={ticket.status} /></dd></div>
                    <div><dt className="text-xs text-gray-500">Category</dt><dd className="mt-1 text-sm font-medium text-gray-900">{ticket.category}</dd></div>
                    <div><dt className="text-xs text-gray-500">Ticket</dt><dd className="mt-1 text-sm font-medium text-gray-900">#{ticket.id}</dd></div>
                </dl>

                <div className="mt-8">
                    <h2 className="text-sm font-medium text-gray-500">Description</h2>
                    {/* Rendered as escaped text; never dangerouslySetInnerHTML. */}
                    <p className="mt-2 whitespace-pre-wrap break-words text-gray-800">{ticket.description}</p>
                </div>

                <p className="mt-8 border-t border-gray-100 pt-4 text-xs text-gray-500">
                    Created {fmt(ticket.created_at)} &middot; Last updated {fmt(ticket.updated_at)}
                </p>
            </article>
        </AuthenticatedLayout>
    );
}
