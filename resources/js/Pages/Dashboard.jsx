import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PriorityBadge, StatusBadge } from '@/Components/Badges';

export default function Dashboard({ stats, recent }) {
    const cards = [
        { label: 'Total tickets', value: stats.total, tone: 'text-gray-900' },
        { label: 'Open', value: stats.byStatus['Open'], tone: 'text-blue-700' },
        { label: 'In progress', value: stats.byStatus['In Progress'], tone: 'text-violet-700' },
        { label: 'Resolved', value: stats.byStatus['Resolved'], tone: 'text-emerald-700' },
    ];

    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>}>
            <Head title="Dashboard" />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {cards.map((c) => (
                    <div key={c.label} className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
                        <p className="text-sm text-gray-500">{c.label}</p>
                        <p className={`mt-1 text-3xl font-semibold ${c.tone}`}>{c.value}</p>
                    </div>
                ))}
            </div>

            <section className="mt-8 rounded-xl border border-gray-200 bg-white">
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <h2 className="font-semibold text-gray-900">Recent tickets</h2>
                    <Link href={route('tickets.index')} className="text-sm font-medium text-teal-700 hover:text-teal-900">
                        View all
                    </Link>
                </div>

                {recent.length === 0 ? (
                    <div className="px-5 py-12 text-center">
                        <p className="font-medium text-gray-900">No tickets yet</p>
                        <p className="mt-1 text-sm text-gray-500">File your first support request to see it here.</p>
                        <Link href={route('tickets.create')} className="mt-4 inline-block rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800">
                            New Ticket
                        </Link>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-100">
                        {recent.map((t) => (
                            <li key={t.id}>
                                <Link href={route('tickets.show', t.id)} className="flex flex-col gap-2 px-5 py-4 hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between">
                                    <span className="font-medium text-gray-900">{t.title}</span>
                                    <span className="flex gap-2">
                                        <PriorityBadge value={t.priority} />
                                        <StatusBadge value={t.status} />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </AuthenticatedLayout>
    );
}
