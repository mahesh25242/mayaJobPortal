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
           
        $oauthClient = \App\Models\OauthClient::where("password_client", 1)->get()->first();

        $tokenRequest = $request->create(
            url("v1/oauth/token"),
            'POST'
        );


        $tokenRequest->request->add([
            "grant_type" => "password",
            "username" => $request->input("email", ''),
            "password" => $request->input("password", ''),
            "client_id" => $oauthClient->id,
            "client_secret" => $oauthClient->secret,
        ]);
        try {
           return $response= app()->handle($tokenRequest);
        } catch (\Exception $e) {
            return response(["success" => false, "message"=> "user not found"], 401);
        }        

    }

    public function refreshToken(Request $request){
        $validator = Validator::make($request->all(), [
            'refresh_token' => ['required'],            
        ]);

        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
      
        $oauthClient = \App\Models\OauthClient::where("password_client", 1)->get()->first();
        $tokenRequest = $request->create(
            url("v1/oauth/token"),
            'POST'
        );

        $tokenRequest->request->add([
            'grant_type' => 'refresh_token',
            "client_id" => $oauthClient->id,
            "client_secret" => $oauthClient->secret,
            'refresh_token' => $request->input("refresh_token", ''),
            'scope' => '',
        ]);
        try {
           return $response= app()->handle($tokenRequest);
        } catch (\Exception $e) {
            return response(["success" => false, "message"=> "token expired"], 408);
        }    
    }

    public function registerEmployer(Request $request, $id=0){
       
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
        
        
        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        return response(['message' => 'Successfully save', 'status' => false]);
    }

    public function registerSeeker(Request $request, $id=0){
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
