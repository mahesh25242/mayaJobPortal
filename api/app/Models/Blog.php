<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Passport\HasApiTokens;

class Blog extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name','image',  'description',
        'meta_description', 'meta_keywords',
        'status', 'created_by', 
        'updated_by', 'deleted_by', 
    ];

    

    protected $casts = [        
        'status' => 'boolean',
        'created_by' => 'integer',
        'updated_by' => 'integer',
        'deleted_by' => 'integer'
    ];

    protected $appends = array('status_text');

    public function getStatusTextAttribute()
    {        
        switch($this->status){
            case 1:
                return 'Active';
            break;
            default:
            return 'In-Active';
            break;
        }
        return  $billedText;
    }

    
}
