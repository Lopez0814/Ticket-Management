import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PriorityBadge, StatusBadge } from '@/Components/Badges';
import Pagination from '@/Components/Pagination';
import DeleteTicketButton from '@/Components/DeleteTicketButton';

const fmt = (iso) => new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

const selectCls = 'rounded-md border-0 px-3 py-2 text-sm shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-teal-600';

export default function Index({ tickets, filters, options }) {
    const [values, setValues] = useState({
        search: filters.search ?? '',
        status: filters.status ?? '',
        priority: filters.priority ?? '',
        category: filters.category ?? '',
    });

    const hasFilters = Object.values(values).some(Boolean);

    const apply = (next) => {
        setValues(next);
        const query = Object.fromEntries(Object.entries(next).filter(([, v]) => v));
        router.get(route('tickets.index'), query, { preserveState: true, preserveScroll: true, replace: true });
    };

    const change = (key) => (e) => apply({ ...values, [key]: e.target.value });

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between gap-3">
                    <h1 className="text-xl font-semibold text-gray-900">My tickets</h1>
                    <Link href={route('tickets.create')} className="rounded-md bg-teal-700 px-3.5 py-2 text-sm font-semibold text-white hover:bg-teal-800">
                        New Ticket
                    </Link>
                </div>
            }
        >
            <Head title="Tickets" />

            <form
                onSubmit={(e) => { e.preventDefault(); apply(values); }}
                className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5"
            >
                <input
                    type="search"
                    value={values.search}
                    onChange={(e) => setValues({ ...values, search: e.target.value })}
                    placeholder="Search by title"
                    aria-label="Search by title"
                    className={`${selectCls} lg:col-span-2`}
                />
                <select value={values.status} onChange={change('status')} aria-label="Filter by status" className={selectCls}>
                    <option value="">All statuses</option>
                    {options.statuses.map((s) => <option key={s}>{s}</option>)}
                </select>
                <select value={values.priority} onChange={change('priority')} aria-label="Filter by priority" className={selectCls}>
                    <option value="">All priorities</option>
                    {options.priorities.map((p) => <option key={p}>{p}</option>)}
                </select>
                <select value={values.category} onChange={change('category')} aria-label="Filter by category" className={selectCls}>
                    <option value="">All categories</option>
                    {options.categories.map((c) => <option key={c}>{c}</option>)}
                </select>
                {hasFilters && (
                    <button
                        type="button"
                        onClick={() => apply({ search: '', status: '', priority: '', category: '' })}
                        className="text-left text-sm font-medium text-teal-700 hover:text-teal-900 sm:col-span-2 lg:col-span-5"
                    >
                        Clear filters
                    </button>
                )}
            </form>

            {tickets.data.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
                    <p className="font-medium text-gray-900">
                        {hasFilters ? 'No tickets match these filters' : 'You have no tickets yet'}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        {hasFilters ? 'Try a different search or clear the filters.' : 'Create a ticket when you need IT help and track it here.'}
                    </p>
                    {!hasFilters && (
                        <Link href={route('tickets.create')} className="mt-5 inline-block rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800">
                            Create your first ticket
                        </Link>
                    )}
                </div>
            ) : (
                <>
                    {/* Desktop / tablet: table */}
                    <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white md:block">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50 text-left font-medium text-gray-600">
                                <tr>
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3">Category</th>
                                    <th className="px-4 py-3">Priority</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Created</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {tickets.data.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50">
                                        <td className="max-w-xs truncate px-4 py-3 font-medium text-gray-900">
                                            <Link href={route('tickets.show', t.id)} className="hover:text-teal-800">{t.title}</Link>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{t.category}</td>
                                        <td className="px-4 py-3"><PriorityBadge value={t.priority} /></td>
                                        <td className="px-4 py-3"><StatusBadge value={t.status} /></td>
                                        <td className="whitespace-nowrap px-4 py-3 text-gray-600">{fmt(t.created_at)}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-end gap-2">
                                                <Link href={route('tickets.edit', t.id)} className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                                    Edit
                                                </Link>
                                                <DeleteTicketButton ticket={t} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Phone: stacked cards */}
                    <ul className="space-y-3 md:hidden">
                        {tickets.data.map((t) => (
                            <li key={t.id} className="rounded-xl border border-gray-200 bg-white p-4">
                                <Link href={route('tickets.show', t.id)} className="block font-medium text-gray-900">{t.title}</Link>
                                <p className="mt-1 text-xs text-gray-500">{t.category} &middot; {fmt(t.created_at)}</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <PriorityBadge value={t.priority} />
                                    <StatusBadge value={t.status} />
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <Link href={route('tickets.edit', t.id)} className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-center text-sm font-medium text-gray-700">
                                        Edit
                                    </Link>
                                    <DeleteTicketButton ticket={t} className="flex-1 py-2" />
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6">
                        <Pagination links={tickets.links} from={tickets.from} to={tickets.to} total={tickets.total} />
                    </div>
                </>
            )}
        </AuthenticatedLayout>
    );
}
