<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Hash;

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
            'password' => ['required', 'min:6'],    
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
      
        if(Auth::check() && Auth::user()->role_id){
            //create user
            $user = \App\Models\User::updateOrCreate(
                [
                    'id'   => $id,
                ],
                [
                    'name' => $request->input('name', ''),
                    'email' => $request->input('email', ''),
                    'phone' => $request->input('phone', ''),
                    'status' => $request->input('status', 1),
                    'password' =>  Hash::make($request->input('password', '')),
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                ],
            );

            //create employer
            $employer = \App\Models\Employer::updateOrCreate(
                [
                    'user_id'   => $user->id,
                ],
                [
                    'name' => $request->input('name', ''),
                    'phone' => $request->input('phone', ''),
                    'address' => $request->input('address', ''),
                    'country' => $request->input('country', ''),
                    'state' => $request->input('state', ''),
                    'district' => $request->input('district', ''),
                    'city' => $request->input('city', ''),
                    'category' => $request->input('category', ''),
                    'status' => $request->input('status', 1),
                    'lat' => $request->input('lat', ''),
                    'lng' => $request->input('lng', ''),
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                ],
            );

            //create employer SeekerPreference
            $employerSeekerPreference = \App\Models\EmployerSeekerPreference::updateOrCreate(
                [
                    'employer_id'   => $employer->id,
                ],
                [
                    'employer_id' => $employer->id,
                    'gender' => $request->input('gender', ''),
                    'marital' => $request->input('marital', ''),
                    'food_accommodation' => $request->input('food_accommodation', ''),
                    'working_time' => $request->input('working_time', ''),
                    'salary' => $request->input('salary', ''),
                    'experience' => $request->input('experience', ''),
                    'qualifications' => $request->input('qualifications', ''),
                    'other_demands' => $request->input('other_demands', ''),
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                ],
            );
        }
        return response(['message' => 'Successfully save', 'status' => false]);
    }

    public  function employers(Request $request){
        $validator = Validator::make($request->all(), [
            'page' => ['required', 'integer'],
            'per_page' => ['required', 'integer'],
        ]);
        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        $employers = \App\Models\Employer::with('user')->paginate($request->input('per_page', 10));
        return response(['message' => 'Successfully get', 'data' => $employers, 'status' => true]);
    }

    public function registerSeeker(Request $request, $id=0){
        $validator = Validator::make($request->all(), [
            'category' => ['required'],
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users,email,NULL,id,deleted_at,NULL'],
            'phone' => ['required', 'unique:users,phone,NULL,id,deleted_at,NULL', 'integer'],  
            'password' => ['required', 'min:6'],            
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
