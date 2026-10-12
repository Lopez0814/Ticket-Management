<?php

namespace Tests\Feature;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TicketTest extends TestCase
{
    use RefreshDatabase;

    private function payload(array $overrides = []): array
    {
        return array_merge([
            'title' => 'Printer is offline',
            'description' => 'The 2nd floor printer shows offline.',
            'priority' => 'High',
            'status' => 'Open',
            'category' => 'Hardware',
        ], $overrides);
    }

    public function test_guests_are_redirected_to_login(): void
    {
        $this->get('/tickets')->assertRedirect('/login');
        $this->get('/tickets/create')->assertRedirect('/login');
        $this->post('/tickets', $this->payload())->assertRedirect('/login');
    }

    public function test_user_can_create_ticket_owned_by_themselves(): void
    {
        $user = User::factory()->create();
        $other = User::factory()->create();

        $this->actingAs($user)
            ->post('/tickets', $this->payload(['user_id' => $other->id])) // must be ignored
            ->assertRedirect()
            ->assertSessionHas('success', 'Ticket created.');

        $this->assertDatabaseHas('tickets', ['title' => 'Printer is offline', 'user_id' => $user->id]);
    }

    public function test_validation_rejects_bad_input(): void
    {
        $this->actingAs(User::factory()->create())
            ->post('/tickets', $this->payload(['title' => 'abc', 'priority' => 'Nope', 'description' => 'short']))
            ->assertSessionHasErrors(['title', 'priority', 'description']);
    }

    public function test_index_shows_only_own_tickets_paginated(): void
    {
        $user = User::factory()->create();
        Ticket::factory()->count(12)->for($user)->create();
        Ticket::factory()->count(3)->create();

        $this->actingAs($user)->get('/tickets')->assertInertia(fn ($page) => $page
            ->component('Tickets/Index')
            ->has('tickets.data', 10)
            ->where('tickets.total', 12));
    }

    public function test_other_users_cannot_view_edit_update_or_delete(): void
    {
        $owner = User::factory()->create();
        $intruder = User::factory()->create();
        $ticket = Ticket::factory()->for($owner)->create();

        $this->actingAs($intruder)->get("/tickets/{$ticket->id}")->assertForbidden();
        $this->actingAs($intruder)->get("/tickets/{$ticket->id}/edit")->assertForbidden();
        $this->actingAs($intruder)->put("/tickets/{$ticket->id}", $this->payload())->assertForbidden();
        $this->actingAs($intruder)->delete("/tickets/{$ticket->id}")->assertForbidden();

        $this->assertDatabaseHas('tickets', ['id' => $ticket->id]);
    }

    public function test_owner_can_update_and_delete(): void
    {
        $user = User::factory()->create();
        $ticket = Ticket::factory()->for($user)->create();

        $this->actingAs($user)->put("/tickets/{$ticket->id}", $this->payload(['status' => 'Resolved']))
            ->assertSessionHas('success', 'Ticket updated.');
        $this->assertDatabaseHas('tickets', ['id' => $ticket->id, 'status' => 'Resolved']);

        $this->actingAs($user)->delete("/tickets/{$ticket->id}")
            ->assertSessionHas('success', 'Ticket deleted.');
        $this->assertDatabaseMissing('tickets', ['id' => $ticket->id]);
    }
}
