// Color-coded badges. Class names are written out in full so Tailwind can detect them.
const PRIORITY = {
    Low: 'bg-slate-100 text-slate-700 ring-slate-300',
    Medium: 'bg-yellow-100 text-yellow-800 ring-yellow-300',
    High: 'bg-orange-100 text-orange-800 ring-orange-300',
    Urgent: 'bg-red-100 text-red-800 ring-red-300',
};

const STATUS = {
    Open: 'bg-blue-100 text-blue-800 ring-blue-300',
    'In Progress': 'bg-violet-100 text-violet-800 ring-violet-300',
    Resolved: 'bg-emerald-100 text-emerald-800 ring-emerald-300',
    Closed: 'bg-gray-200 text-gray-700 ring-gray-300',
};

const base = 'inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset';

export function PriorityBadge({ value }) {
    return <span className={`${base} ${PRIORITY[value] ?? PRIORITY.Low}`}>{value}</span>;
}

export function StatusBadge({ value }) {
    return <span className={`${base} ${STATUS[value] ?? STATUS.Closed}`}>{value}</span>;
}
