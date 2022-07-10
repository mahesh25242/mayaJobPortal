<?php

namespace App\Providers;

use Laravel\Lumen\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        \App\Events\ExampleEvent::class => [
            \App\Listeners\ExampleListener::class,
        ],
        \App\Events\UserDeleteEvent::class => [
            \App\Listeners\UserDeleteListener::class,
        ],
        \App\Events\EmployerRegisterEvent::class => [
            \App\Listeners\EmployerRegisterListener::class,
        ],
        \App\Events\SeekerRegisterEvent::class => [
            \App\Listeners\SeekerRegisterListener::class,
        ],
        \App\Events\SentResumePDFEvent::class => [
            \App\Listeners\SentResumePDFEventListener::class,
        ],
    ];
}
