<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ticket extends Model
{
    use HasFactory;

    public const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];
    public const STATUSES   = ['Open', 'In Progress', 'Resolved', 'Closed'];
    public const CATEGORIES = ['Hardware', 'Software', 'Network', 'Account', 'Other'];

    // Mass-assignment protection: user_id is NOT fillable.
    // It is always set from the authenticated user (see TicketController@store).
    protected $fillable = [
        'title',
        'description',
        'priority',
        'status',
        'category',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
