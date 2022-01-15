<?php

namespace App\Listeners;

use App\Events\UserDeleteEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;




class UserDeleteListener
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
    public function handle(UserDeleteEvent $event)
    {        
        if($event->user){
           if($event->user->seeker && $event->user->seeker()->exists()){
               $event->user->seeker->delete();
               $event->user->delete();
           }else if($event->user->employer && $event->user->employer()->exists()){
                if($event->user->employer->seekerPreference->exists()){
                    $event->user->employer->seekerPreference->delete();
                }
                $event->user->employer->delete();
                $event->user->delete();
           }
        }
    }
}
