<?php

namespace App\Events;

class SentResumePDFEvent extends Event
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
