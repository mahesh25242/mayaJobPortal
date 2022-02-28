<?php

namespace App\Listeners;

use App\Events\EmployerRegisterEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Barryvdh\DomPDF\Facade as PDF;



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
            $pdf = PDF::loadView('PDF.employer', array(
                
            ));
            $pdf->save(public_path("assets/employer/1.pdf"));
        }
    }
}
