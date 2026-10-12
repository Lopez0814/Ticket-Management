<?php

namespace App\Http\Requests;

use App\Models\Ticket;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTicketRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Defers to TicketPolicy@update: non-owners get 403 before validation runs.
        return $this->user()->can('update', $this->route('ticket'));
    }

    public function rules(): array
    {
        return [
            'title'       => ['required', 'string', 'min:5', 'max:255'],
            'description' => ['required', 'string', 'min:10', 'max:5000'],
            'priority'    => ['required', Rule::in(Ticket::PRIORITIES)],
            'status'      => ['required', Rule::in(Ticket::STATUSES)],
            'category'    => ['required', Rule::in(Ticket::CATEGORIES)],
        ];
    }
}
