<?php

namespace App\Listeners;

use App\Events\SeekerRegisterEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Barryvdh\DomPDF\Facade as PDF;



class SeekerRegisterListener
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
    public function handle(SeekerRegisterEvent $event)
    {        
        if($event->user){
            $pdf = PDF::loadView('PDF.seeker', array(
                "user" => $event->user
            ));
            $pdf->save($this->public_path("seeker/pdf/seeker_{$event->user->id}.pdf"));
        }
    }
    private function  public_path($path = null)
    {
        return rtrim(app()->basePath('public/' . $path), '/');
    }
}
