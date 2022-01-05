<?php

namespace App\Listeners;

use App\Events\EmployerRegisterEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;




class EmployerRegisterListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\ExampleEvent  $event
     * @return void
     */
    public function handle(EmployerRegisterEvent $event)
    {        
        if($event->user){
           
        }
    }
}
