<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

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
        //    $content = $response->getContent();
        //    $content = json_decode($content, true); 
           
        //    $content["role_id"]       = \App\Models\User::where([
        //     "email" => $request->input("email", '')            
        //    ])->first()->role_id;
        //    return response($content);
        //    $rr = $response->getBody();
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

        //    $content = $response->getContent();
        //    $content = json_decode($content, true); 
        // //    $content["role_id"] = Auth::user()->role_id;
        //    return response($content);
        } catch (\Exception $e) {
            return response(["success" => false, "message"=> "token expired"], 408);
        }    
    }

    public function registerEmployer(Request $request, $id=0){
       
        $validationArr = [            
            'category_id' => ['required'],
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users,email,'.$id],
            'phone' => ['required', 'unique:users,phone,'.$id, 'integer'],                
            'contact_name' => ['required'],
            'address' => ['required'],
            'country' => ['required'],            
            'state' => ['string'],
            'district' => ['required', 'string'],
            'city' => ['required', 'string'],                                                
        ];
        if(!$id && Auth::check()){
            $validationArr["password"] = ['required', 'min:6'];
        }
        $validator = Validator::make($request->all(), $validationArr);
        
        
        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
      
        if(Auth::check() && Auth::user()->role_id){
            //create user
            $user = ($id) ? \App\Models\User::find($id) : new \App\Models\User();
            $user->name = $request->input("contact_name", '');
            $user->email = $request->input("email", '');
            $user->phone = $request->input("phone", '');
            $user->status = $request->input("status", '');            
            
            if($request->input("password", null)){
                $user->password = Hash::make($request->input("password", ''));
            }
            if(!$id)
                $user->created_by = Auth::user()->id;
            

            $user->updated_by = Auth::user()->id;
            $user->save();
            
            //create employer
            $employer = \App\Models\Employer::updateOrCreate(
                [
                    'user_id'   => $user->id,
                ],
                [
                    'name' => $request->input('name', ''),
                    'phone' => $request->input('secondry_phone', ''),
                    'address' => $request->input('address', ''),
                    'country' => $request->input('country', ''),
                    'state' => $request->input('state', ''),
                    'district' => $request->input('district', ''),
                    'city' => $request->input('city', ''),
                    'category_id' => $request->input('category_id', ''),
                    'status' => $request->input('status', 1),
                    'lat' => $request->input('lat', ''),
                    'lng' => $request->input('lng', ''),
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                ],
            );

            //create SeekerPreference
            $seekerPreference = \App\Models\SeekerPreference::updateOrCreate(
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
        $employers = \App\Models\Employer::with(['user', 'seekerPreference'])->paginate($request->input('per_page', 10));
        return response(['message' => 'Successfully get', 'data' => $employers, 'status' => true]);
    }

    public function registerSeeker(Request $request, $id=0){

        $validationArr = [
            'category_id' => ['required'],
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
        ];

        if(!$id && Auth::check() && Auth::user()->role_id){
            $validationArr["password"] = ['required', 'min:6'];
        }else if(!Auth::check()){
            $validationArr["password"] = ['required', 'min:6'];
        }

        $validator = Validator::make($request->all(), $validationArr);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        if(Auth::check() && Auth::user()->role_id){
            $user = ($id) ? \App\Models\User::find($id) : new \App\Models\User();
            $user->status = $request->input("status", '');
            if($request->input("password", null)){
                $user->password = Hash::make($request->input("password", ''));
            }

        }else{
            $user = new \App\Models\User();
            $user->status = 1;
            $user->password = Hash::make($request->input("password", ''));
        }            
        $user->name = $request->input("contact_name", '');
        $user->email = $request->input("email", '');
        $user->phone = $request->input("phone", '');

        if(!$id)
            $user->created_by = Auth::user()->id;
            
        $user->updated_by = Auth::user()->id;
        $user->save();

        $dob = '';
        if($request->input('dob', '')){
            $dob = Carbon::parse($request->input('dob', ''));
            $dob = $dob->format('Y-m-d');
        }            

        //create employer
        $employer = \App\Models\Seeker::updateOrCreate(
            [
                'user_id'   => $user->id,
            ],
            [
                'name' => $request->input('name', ''),
                'phone' => $request->input('secondry_phone', ''),
                'address' => $request->input('address', ''),
                'country' => $request->input('country', ''),
                'state' => $request->input('state', ''),
                'district' => $request->input('district', ''),
                'city' => $request->input('city', ''),
                'pin' => $request->input('pin', ''),
                'dob' => $dob,
                'gender' => $request->input('gender', ''),
                'religion' => $request->input('religion', ''),
                'marital' => $request->input('marital', ''),
                'languages' => $request->input('languages', ''),
                'languages' => $request->input('languages', ''),
                'status' => $request->input('status', 1),
                'edu_qualification' => $request->input('edu_qualification', 1),
                'tech_qualification' => $request->input('tech_qualification', 1),
                'experience' => $request->input('experience', 1),
                'academic_profile' => $request->input('academic_profile', 1),
                'expected_salary' => $request->input('expected_salary', 1),
                'lat' => $request->input('lat', ''),
                'lng' => $request->input('lng', ''),
                'created_by' => Auth::user()->id,
                'updated_by' => Auth::user()->id,
            ],
        );

            
        

        return response(['message' => 'Successfully save', 'status' => false]);
    }

    public function seeker(Request $request){
        $validator = Validator::make($request->all(), [
            'page' => ['required', 'integer'],
            'per_page' => ['required', 'integer'],
        ]);
        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        $seekers = \App\Models\Seeker::with(['user'])->paginate($request->input('per_page', 10));
        return response(['message' => 'Successfully get', 'data' => $seekers, 'status' => true]);
    }
    /* delete a user */
    public function delete(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'id' => ['required', 'integer'],
        ]);
        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        $user = \App\Models\User::find($id);
        if(!$user){
            return response(['message' => 'User not found', 'status' => false], 404);
        }
        
        event(new \App\Events\UserDeleteEvent($user));
        

        return response(['message' => 'Successfully deleted', 'status' => true]);
    }

    public function getUser(){
        return response(Auth::user());
    }
    //
}
