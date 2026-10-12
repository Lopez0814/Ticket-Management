import { Head, Link, usePage } from '@inertiajs/react';

const COPY = {
    403: { title: 'This ticket belongs to someone else', text: 'You can only view, edit or delete tickets you created.' },
    404: { title: 'Page not found', text: 'The page or ticket you are looking for does not exist.' },
    500: { title: 'Something went wrong', text: 'The server hit an error. Please try again in a moment.' },
    503: { title: 'Back soon', text: 'The service is temporarily unavailable.' },
};

export default function Error({ status }) {
    const { auth } = usePage().props;
    const { title, text } = COPY[status] ?? COPY[500];

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <Head title={`${status} ${title}`} />
            <div className="max-w-md text-center">
                <p className="text-5xl font-bold text-teal-700">{status}</p>
                <h1 className="mt-4 text-xl font-semibold text-gray-900">{title}</h1>
                <p className="mt-2 text-gray-600">{text}</p>
                <Link
                    href={auth?.user ? route('tickets.index') : route('login')}
                    className="mt-6 inline-block rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
                >
                    {auth?.user ? 'Go to my tickets' : 'Go to login'}
                </Link>
            </div>
        </div>
    );
}
