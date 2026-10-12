import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

// Shows the flash message shared by HandleInertiaRequests.
// Dismisses automatically after 4 seconds or manually with the close button.
export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);

    const message = flash?.success || flash?.error;
    const isError = !flash?.success && !!flash?.error;

    useEffect(() => {
        if (!message) {
            setVisible(false);
            return;
        }
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 4000);
        return () => clearTimeout(timer);
    }, [flash]); // new flash object on every Inertia response

    if (!visible || !message) return null;

    return (
        <div className="fixed inset-x-4 top-20 z-50 sm:left-auto sm:right-6 sm:w-96">
            <div
                role={isError ? 'alert' : 'status'}
                className={
                    'flex items-start justify-between gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg ' +
                    (isError
                        ? 'border-red-200 bg-red-50 text-red-800'
                        : 'border-emerald-200 bg-emerald-50 text-emerald-800')
                }
            >
                <p className="font-medium">{message}</p>
                <button
                    type="button"
                    onClick={() => setVisible(false)}
                    aria-label="Dismiss message"
                    className="rounded px-1 text-lg leading-none opacity-60 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current"
                >
                    &times;
                </button>
            </div>
        </div>
    );
}
