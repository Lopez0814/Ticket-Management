import { Link, useForm } from '@inertiajs/react';

const inputCls = (error) =>
    'mt-1 block w-full rounded-md border-0 px-3 py-2 text-sm shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset ' +
    (error ? 'ring-red-400 focus:ring-red-500' : 'ring-gray-300 focus:ring-teal-600');

function Field({ label, htmlFor, error, hint, children }) {
    return (
        <div>
            <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-800">{label}</label>
            {children}
            {hint && !error && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
            {error && <p id={`${htmlFor}-error`} role="alert" className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}

// Shared by Create and Edit. useForm keeps the typed values after a failed
// submit, shows field-level errors and exposes `processing`.
export default function TicketForm({ ticket = null, options }) {
    const isEdit = ticket !== null;

    const { data, setData, post, put, processing, errors } = useForm({
        title: ticket?.title ?? '',
        description: ticket?.description ?? '',
        priority: ticket?.priority ?? 'Medium',
        status: ticket?.status ?? 'Open',
        category: ticket?.category ?? options.categories[0],
    });

    const submit = (e) => {
        e.preventDefault();
        isEdit ? put(route('tickets.update', ticket.id)) : post(route('tickets.store'));
    };

    const select = (id, values) => (
        <select
            id={id}
            value={data[id]}
            onChange={(e) => setData(id, e.target.value)}
            className={inputCls(errors[id])}
            aria-invalid={!!errors[id]}
            aria-describedby={errors[id] ? `${id}-error` : undefined}
        >
            {values.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
    );

    return (
        <form onSubmit={submit} noValidate className="space-y-6">
            <Field label="Title" htmlFor="title" error={errors.title} hint="5 to 255 characters.">
                <input
                    id="title"
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className={inputCls(errors.title)}
                    aria-invalid={!!errors.title}
                    aria-describedby={errors.title ? 'title-error' : undefined}
                    maxLength={255}
                    autoFocus
                />
            </Field>

            <Field label="Description" htmlFor="description" error={errors.description} hint="At least 10 characters. Say what happened and what you already tried.">
                <textarea
                    id="description"
                    rows={6}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className={inputCls(errors.description)}
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? 'description-error' : undefined}
                />
            </Field>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <Field label="Priority" htmlFor="priority" error={errors.priority}>
                    {select('priority', options.priorities)}
                </Field>
                <Field label="Status" htmlFor="status" error={errors.status}>
                    {select('status', options.statuses)}
                </Field>
                <Field label="Category" htmlFor="category" error={errors.category}>
                    {select('category', options.categories)}
                </Field>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Link
                    href={isEdit ? route('tickets.show', ticket.id) : route('tickets.index')}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-md bg-teal-700 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {processing ? 'Saving…' : isEdit ? 'Save changes' : 'Create ticket'}
                </button>
            </div>
        </form>
    );
}
