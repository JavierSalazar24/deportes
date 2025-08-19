<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\MovimientoBancario;
use App\Observers\MovimientoBancarioObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        MovimientoBancario::observe(MovimientoBancarioObserver::class);
    }
}
