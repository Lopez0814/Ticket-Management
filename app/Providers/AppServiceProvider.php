<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Production is served over HTTPS behind Railway's proxy:
        // force https:// so assets/links never cause mixed-content errors.
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }
    }
}
