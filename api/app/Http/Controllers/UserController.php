<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;


class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function checkLogin(Request $request){
        $validator = Validator::make($request->all(), [                       
            'email' => ['required', 'email'],
            'password' => ['required'],                        
        ]);
        
       
        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        return response(['message' => 'Successfully save', 'status' => false]);
    }

    public function registerEmployer(Request $request){
       
        $validator = Validator::make($request->all(), [            
            'category' => ['required'],
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users,email,NULL,id,deleted_at,NULL'],
            'phone' => ['required', 'unique:users,phone,NULL,id,deleted_at,NULL', 'integer'],            
            'contact_name' => ['required'],
            'address' => ['required'],
            'country' => ['required'],            
            'state' => ['string'],
            'district' => ['required', 'string'],
            'city' => ['required', 'string'],                                                
        ]);
        
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        return response(['message' => 'Successfully save', 'status' => false]);
    }

    public function registerSeeker(Request $request){
        $validator = Validator::make($request->all(), [
            'category' => ['required'],
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users,email,NULL,id,deleted_at,NULL'],
            'phone' => ['required', 'unique:users,phone,NULL,id,deleted_at,NULL', 'integer'],            
            'nationality' => ['required'],
            'address' => ['required'],
            'country' => ['required'],            
            'state' => ['string'],
            'district' => ['required', 'string'],
            'city' => ['required', 'string'],                                                
            'pin' => ['required', 'string'],                                                
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        return response(['message' => 'Successfully save', 'status' => false]);
    }
    //
}
