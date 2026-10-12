import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketForm from '@/Components/TicketForm';

export default function Create({ options }) {
    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-900">New ticket</h1>}>
            <Head title="New Ticket" />
            <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-5 sm:p-8">
                <TicketForm options={options} />
            </div>
        </AuthenticatedLayout>
    );
}
