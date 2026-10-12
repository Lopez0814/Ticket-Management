<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $tickets = $request->user()->tickets();

        $counts = (clone $tickets)
            ->selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        return Inertia::render('Dashboard', [
            'stats' => [
                'total'    => (int) $counts->sum(),
                'byStatus' => collect(Ticket::STATUSES)->mapWithKeys(fn ($s) => [$s => (int) ($counts[$s] ?? 0)]),
            ],
            'recent' => (clone $tickets)->latest()->take(5)->get(['id', 'title', 'priority', 'status', 'created_at']),
        ]);
    }
}
