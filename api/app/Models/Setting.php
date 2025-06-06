<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;

class Setting extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name','value', 'type'                 
    ];

    

    protected $appends = array('image_path');

    public function getImagePathAttribute()
    {        
        switch($this->type){
            case 'file':
                if(file_exists("assets/banner/{$this->value}")){
                    return url("assets/banner/{$this->value}");
                }else{
                    return null;
                }
                return 'Active';
            break;            
        }        
    }


    
}
