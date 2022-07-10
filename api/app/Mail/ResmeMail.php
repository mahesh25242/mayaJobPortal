<?php
namespace App\Mail;
use Illuminate\Mail\Mailable;
use App\User;
class ResmeMail extends Mailable
{
    /**
     * Build the message.
     *
     * @return $this
     */
    public $user;
    public function __construct($user = null)
    {
        $this->user = $user;
    }



    public function build()
    {
        $attachemtnt = '';
        if($this->user->seeker && $this->user->seeker->exists()){
            $attachemtnt = $this->public_path("seeker/pdf/seeker_{$this->user->id}.pdf");
        }else{
            $attachemtnt = $this->public_path("employer/pdf/company_{$this->user->id}.pdf");
        }
        if($attachemtnt){
            return $this->view('email/ResmeMail', ["user" => $this->user])
            ->attach($attachemtnt);
        }
        
    }
    private function  public_path($path = null)
    {
        return rtrim(app()->basePath('public/' . $path), '/');
    }
}