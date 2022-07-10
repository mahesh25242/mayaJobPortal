<?php

namespace App\Listeners;

use App\Events\SentResumePDFEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Barryvdh\DomPDF\Facade as PDF;
use Mail;
use App\Mail\ResmeMail;


class SentResumePDFEventListener
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
    public function handle(SentResumePDFEvent $event)
    {        
        if($event->user){            
            // $pdf->save($this->public_path("seeker/pdf/seeker_{$event->user->id}.pdf"));
            $toEMail = $event->user->email;
            if(env('APP_ENV') == 'local'){
                $toEMail = env('DEVELOPER_MAIL');
            }
            try{
                Mail::to($toEMail)->send(new ResmeMail($event->user));
            }catch (\Swift_TransportException $e) {
                //  echo 'Caught exception: ',  $e->getMessage(), "\n";
            }
        }
    }
    private function  public_path($path = null)
    {
        return rtrim(app()->basePath('public/' . $path), '/');
    }
}
