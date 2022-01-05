<?php

namespace App\Events;

class SeekerRegisterEvent extends Event
{
    var $user;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($user=null)
    {
        $this->user = $user;
    }
}
