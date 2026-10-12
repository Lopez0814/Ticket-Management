<?php

namespace App\Policies;

use App\Models\Ticket;
use App\Models\User;

/**
 * Only the owner of a ticket may view, update or delete it.
 * Anything else -> HTTP 403.
 */
class TicketPolicy
{
    public function view(User $user, Ticket $ticket): bool
    {
        return $user->id === $ticket->user_id;
    }

    public function update(User $user, Ticket $ticket): bool
    {
        return $user->id === $ticket->user_id;
    }

    public function delete(User $user, Ticket $ticket): bool
    {
        return $user->id === $ticket->user_id;
    }
}
