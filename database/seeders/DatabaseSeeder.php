<?php

namespace Database\Seeders;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Demo account for the checking:
     *   email:    demo@helpdesk.test
     *   password: value of DEMO_PASSWORD (defaults to "password" locally)
     * Safe to run on every deploy: it never duplicates data.
     */
    public function run(): void
    {
        $demo = User::updateOrCreate(
            ['email' => 'demo@helpdesk.test'],
            ['name' => 'Demo User', 'password' => env('DEMO_PASSWORD', 'password')]
        );

        $other = User::updateOrCreate(
            ['email' => 'other@helpdesk.test'],
            ['name' => 'Other User', 'password' => env('DEMO_PASSWORD', 'password')]
        );

        if ($demo->tickets()->doesntExist()) {
            Ticket::factory()->count(14)->for($demo)->create();
        }

        // A ticket owned by someone else, handy for demonstrating the 403 during the defense.
        if ($other->tickets()->doesntExist()) {
            Ticket::factory()->count(2)->for($other)->create();
        }
    }
}
