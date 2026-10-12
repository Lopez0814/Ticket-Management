import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketForm from '@/Components/TicketForm';

export default function Edit({ ticket, options }) {
    return (
        <AuthenticatedLayout header={<h1 className="text-xl font-semibold text-gray-900">Edit ticket</h1>}>
            <Head title={`Edit: ${ticket.title}`} />
            <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-5 sm:p-8">
                <TicketForm ticket={ticket} options={options} />
            </div>
        </AuthenticatedLayout>
    );
}
