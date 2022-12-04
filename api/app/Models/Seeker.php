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

class Seeker extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'category_id', 'phone', 'address', 'home_address', 'country', 'nationality',
        'state', 'city', 'district',  'pin',
        'dob', 'gender', 'religion', 'marital', 'languages',
        'status', 'edu_qualification', 'tech_qualification',
        'experience', 'academic_profile', 'expected_salary',
        'admin_note', 'lat', 'lng', 'created_by',
        'updated_by', 'deleted_by'
    ];

    protected $casts = [
        'user_id' => 'integer',
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
    }
    
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function category()
    {
        return $this->belongsTo('App\Models\Category');
    }

}
