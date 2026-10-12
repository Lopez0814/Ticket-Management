import { useState } from 'react';
import { router } from '@inertiajs/react';

// Delete button that asks for confirmation first (modal dialog).
export default function DeleteTicketButton({ ticket, className = '' }) {
    const [open, setOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const confirmDelete = () => {
        router.delete(route('tickets.destroy', ticket.id), {
            preserveScroll: true,
            onStart: () => setProcessing(true),
            onFinish: () => {
                setProcessing(false);
                setOpen(false);
            },
        });
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className={
                    'rounded-md border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 ' +
                    className
                }
            >
                Delete
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4">
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={`delete-title-${ticket.id}`}
                        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
                    >
                        <h2 id={`delete-title-${ticket.id}`} className="text-lg font-semibold text-gray-900">
                            Delete this ticket?
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            &ldquo;{ticket.title}&rdquo; will be permanently removed. This can&rsquo;t be undone.
                        </p>
                        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                disabled={processing}
                                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Keep ticket
                            </button>
                            <button
                                type="button"
                                onClick={confirmDelete}
                                disabled={processing}
                                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? 'Deleting…' : 'Delete ticket'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
