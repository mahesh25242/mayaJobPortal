<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Kreait\Firebase\Exception\Auth\FailedToVerifyToken;


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



        if(env('APP_ENV') != "staging"){
          
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
        }else{
            $url = url("v1/oauth/token");

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS,
                "grant_type=password&username=".$request->input("email", '')."&password=".$request->input("password", '')."&client_id=".$oauthClient->id."&client_secret=".$oauthClient->secret);
            
            $response = curl_exec ($ch);
            $err = curl_error($ch);  //if you need
            curl_close ($ch);
            return $response;
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

        if(env('APP_ENV') != "staging"){
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
        }else{
            $url = url("v1/oauth/token");

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS,
                "grant_type=refresh_token&scope=&refresh_token=".$request->input("refresh_token", '')."&client_id=".$oauthClient->id."&client_secret=".$oauthClient->secret);
            
            $response = curl_exec ($ch);
            $err = curl_error($ch);  //if you need
            curl_close ($ch);
            return $response;
        }
           
    }

    public function registerEmployer(Request $request, $id=0){
       
        $validationArr = [            
            'category_id' => ['required'],
            'name' => ['required'],
            // 'email' => ['required', 'email', 'unique:users,email,'.$id.', deleted_at,NULL'],
            // 'phone' => ['required', 'unique:users,phone,'.$id.', deleted_at,NULL'],        
            
            'email' => ['required', 'email', 'unique:users,email,NULL,'.$id.',deleted_at,NULL'],
            'phone' => ['required', 'unique:users,phone,NULL,'.$id.',deleted_at,NULL'],   

            'contact_name' => ['required'],
            'address' => ['required'],
            'country' => ['required'],            
            'state' => ['string'],
            'district' => ['required', 'string'],
            'city' => ['required', 'string'],                                                
        ];
        if(!$id && Auth::check() && Auth::user()->role_id == 1){
            $validationArr["password"] = ['required', 'min:6'];
        }else if(!Auth::check()){
            $validationArr["password"] = ['required', 'min:6'];
        }

        $validator = Validator::make($request->all(), $validationArr);
        
        
        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        
        
        if(Auth::check() && Auth::user()->role_id == 1){
            $user = ($id) ? \App\Models\User::find($id) : new \App\Models\User();
            if($request->input("status", null))
                $user->status = $request->input("status", 1);
            if($request->input("password", null)){
                $user->password = Hash::make($request->input("password", ''));
            }
            $user->status = 1;
            $user->role_id = 2;
        }else{
            $status = 1;
            if(!Auth::check() && $request->input("accessToken", null)){
                $auth = app('firebase.auth');
                try {
                    $verifiedIdToken = $auth->verifyIdToken($request->input("accessToken", null));
                    // $uid = $verifiedIdToken->claims()->get('sub');
                    // $user = $auth->getUser($uid);                    
                } catch (FailedToVerifyToken $e) {
                    return response(['message' => 'Validation errors', 'errors' =>  [
                        "accessToken" => ["Invalid access token"]
                    ], 'status' => false], 422);                    
                }
                
            }else{
                $status = 0;
            }
            $user = ($id && Auth::id() == $id) ? \App\Models\User::find($id) : new \App\Models\User();            
            if($user->id){
                if($request->input("password", null)){
                    $user->password = Hash::make($request->input("password", ''));
                }
            }else{
                $user->status = $status;
                $user->role_id = 2;
                $user->password = Hash::make($request->input("password", ''));
            }
            
           
        }
        
            //create user
           
        $user->name = $request->input("contact_name", '');
        $user->email = $request->input("email", '');
        $user->phone = $request->input("phone", '');
        

        if(!$id && Auth::check())
            $user->created_by = Auth::user()->id;
        

        $user->updated_by = (Auth::check()) ? Auth::user()->id : 0;
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
                'home_address' => $request->input('home_address', ''),
                'country' => $request->input('country', ''),
                'nationality' => $request->input('nationality', ''),
                'state' => $request->input('state', ''),
                'district' => $request->input('district', ''),
                'pin' => $request->input('pin', ''),
                'city' => $request->input('city', ''),
                'category_id' => $request->input('category_id', ''),
                'status' => $request->input('status', 1),
                'lat' => $request->input('lat', ''),
                'lng' => $request->input('lng', ''),
                'created_by' => (Auth::check()) ? Auth::user()->id : $user->id,
                'updated_by' => (Auth::check()) ? Auth::user()->id : $user->id,
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
                'created_by' => (Auth::check()) ? Auth::user()->id : $user->id,
                'updated_by' => (Auth::check()) ? Auth::user()->id : $user->id,
            ],
        );
        
        try{
            if($user->status){
                event(new \App\Events\EmployerRegisterEvent($user));
                event(new \App\Events\SentResumePDFEvent($user));
            }            
        }catch (\Exception $e) {             
            return response(["success" => false, "message"=> $e->getMessage()], 404);
        }

        

        return response(['message' => 'Successfully save', 'status' => true, "user"=>$user]);
    }

    public  function employers(Request $request){
        $validator = Validator::make($request->all(), [
            'page' => ['required', 'integer'],
            'per_page' => ['required', 'integer'],
        ]);
        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        if(Auth::check() && Auth::user()->role_id == 1){
            $employers = \App\Models\Employer::with(['user', 'seekerPreference']);
            if($request->input("category", null)){
                $employers = $employers->where("category_id", $request->input("category", null));
            }
            if($request->input("name", null)){
                $employers = $employers->where("name","like", "%".$request->input("name", null)."%");
            }
            if($request->input("email", null)){
                $employers = $employers->whereHas("user", function ($query) use($request) {
                    $query->where('email', 'like', "%".$request->input("email", null)."%");
                });                
            }
            if($request->input("mobile", null)){
                $employers = $employers->whereHas("user", function ($query) use($request) {
                    $query->where('phone', 'like', "%".$request->input("mobile", null)."%");
                });                  
            }
            if($request->input("start", null) && $request->input("end", null)){
                $seekers = $employers->whereBetween("created_at", [$request->input("start", null), $request->input("end", null)]);
            }
            return response(['message' => 'Successfully get', 'data' => $employers->paginate($request->input('per_page', 10)), 'status' => true]);
        }else{
            $employers = new \App\Models\Employer;
            if($request->input("state", null)){
                $employers = $employers->where("state", "like", '%'.$request->input("state", null).'%');
            }
            if($request->input("district", null)){
                $employers = $employers->where("district", "like", '%'.$request->input("district", null).'%');
            }
            if($request->input("category", null)){
                $employers = $employers->where("category_id", "like", '%'.$request->input("category", null).'%');
            }

            return response(['message' => 'Successfully get', 'data' => $employers->count(), 'status' => true]);
        }
        
    }

    public function registerSeeker(Request $request, $id=0){

        $validationArr = [
            'category_id' => ['required'],
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users,email,NULL,'.$id.',deleted_at,NULL'],
            'phone' => ['required', 'unique:users,phone,NULL,'.$id.',deleted_at,NULL'],   
            // 'email' => ['required', 'email', 'unique:users,email,NULL,id,deleted_at,NULL'],
            // 'phone' => ['required', 'unique:users,phone,NULL,id,deleted_at,NULL', 'integer'],              
            'nationality' => ['required'],
            'address' => ['required'],
            'country' => ['required'],            
            'state' => ['string'],
            'district' => ['required', 'string'],
            'city' => ['required', 'string'],                                                
            'pin' => ['required', 'string'],                                                
        ];

        if(!$id && Auth::check() && Auth::user()->role_id == 1){
            $validationArr["password"] = ['required', 'min:6'];
        }else if(!Auth::check()){
            $validationArr["password"] = ['required', 'min:6'];
        }

        $validator = Validator::make($request->all(), $validationArr);
       
       
        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        
       
        if(Auth::check() && Auth::user()->role_id == 1){
            $user = ($id) ? \App\Models\User::find($id) : new \App\Models\User();
            if($request->input("status", null))
                $user->status = $request->input("status", 1);
            if($request->input("password", null)){
                $user->password = Hash::make($request->input("password", ''));
            }
            $user->status = 1;
            $user->role_id = 3;
        }else{
            $status = 1;
            
            if(!Auth::check() && $request->input("accessToken", null)){
                $auth = app('firebase.auth');
                try {
                    $verifiedIdToken = $auth->verifyIdToken($request->input("accessToken", null));
                    // $uid = $verifiedIdToken->claims()->get('sub');
                    // $user = $auth->getUser($uid);                    
                } catch (FailedToVerifyToken $e) {
                    return response(['message' => 'Validation errors', 'errors' =>  [
                        "accessToken" => ["Invalid access token"]
                    ], 'status' => false], 422);                    
                }
                
            }else{
                $status = 0;
            }
            
            $user = ($id && Auth::id() == $id) ? \App\Models\User::find($id) : new \App\Models\User();
            if($user->id){
                if($request->input("password", null)){
                    $user->password = Hash::make($request->input("password", ''));
                }
            }else{
                $user->status = $status;
                $user->role_id = 3;
                $user->password = Hash::make($request->input("password", ''));
            }
           
        }            
        $user->name = $request->input("contact_name", '');
        $user->email = $request->input("email", '');
        $user->phone = $request->input("phone", '');

        if(!$id && Auth::check())
            $user->created_by = Auth::user()->id;
            
        $user->updated_by = (Auth::check()) ? Auth::user()->id : 0;
        
        
        $user->save();

        $dob = null;
        if($request->input('dob', null)){
            $dob = Carbon::parse($request->input('dob', ''));
            $dob = $dob->format('Y-m-d');
        }            

        //create seeker
        $employer = \App\Models\Seeker::updateOrCreate(
            [
                'user_id'   => $user->id,
            ],
            [
                'name' => $request->input('name', ''),
                'phone' => $request->input('secondry_phone', ''),
                'address' => $request->input('address', ''),
                'home_address' => $request->input('home_address', ''),
                'country' => $request->input('country', ''),
                'category_id' => $request->input('category_id', ''),
                'nationality' => $request->input('nationality', ''),
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
                'created_by' => Auth::check()  ? Auth::user()->id : 0,
                'updated_by' => Auth::check() ? Auth::user()->id : 0,
            ],
        );
        try{
            if($user->status){
                event(new \App\Events\SeekerRegisterEvent($user));
                event(new \App\Events\SentResumePDFEvent($user));
            }
            
        }catch (\Exception $e) {             
            return response(["success" => false, "message"=> $e->getMessage()], 404);
        }
        

        return response(['message' => 'Successfully save', 'status' => true, "user"=>$user]);
    }

    public function seeker(Request $request){
        $validator = Validator::make($request->all(), [
            'page' => ['required', 'integer'],
            'per_page' => ['required', 'integer'],
        ]);
        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        if(Auth::check() && Auth::user()->role_id == 1){
            $seekers = \App\Models\Seeker::with(['user']);
            if($request->input("category", null)){
                $seekers = $seekers->where("category_id", $request->input("category", null));
            }
            if($request->input("name", null)){
                $seekers = $seekers->whereHas("user", function ($query) use($request) {
                    $query->where('name', 'like', "%".$request->input("name", null)."%");
                });
            }
            if($request->input("email", null)){
                $seekers = $seekers->whereHas("user", function ($query) use($request) {
                    $query->where('email', 'like', "%".$request->input("email", null)."%");
                });                
            }
            if($request->input("mobile", null)){
                $seekers = $seekers->whereHas("user", function ($query) use($request) {
                    $query->where('phone', 'like', "%".$request->input("mobile", null)."%");
                }); 
            }
            if($request->input("start", null) && $request->input("end", null)){
                $seekers = $seekers->whereBetween("created_at", [$request->input("start", null), $request->input("end", null)]);
            }
            return response(['message' => 'Successfully get', 'data' => $seekers->paginate($request->input('per_page', 10)), 'status' => true]);
        }else{
            $seekers = new \App\Models\Seeker;
            if($request->input("state", null)){
                $seekers = $seekers->where("state", "like", '%'.$request->input("state", null).'%');
            }
            if($request->input("district", null)){
                $seekers = $seekers->where("district", "like", '%'.$request->input("district", null).'%');
            }
            if($request->input("category", null)){
                $seekers = $seekers->where("category_id", "like", '%'.$request->input("category", null).'%');
            }

            return response(['message' => 'Successfully get', 'data' => $seekers->count(), 'status' => true]);
        }
       
       
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
        return response(\App\Models\User::with(["seeker", "employer"])->find(Auth::user()->id));
    }

    public function downloadPDF($id=0){
        $user = null;
        if(Auth::check() && Auth::user()->role_id == 1){
            $user = \App\Models\User::with(["seeker", "employer"])->find($id);
        }else{
            $user = \App\Models\User::with(["seeker", "employer"])->find(Auth::id());
        }
        $file = '';
        if($user && $user->role_id == 2){
            $file = app()->basePath('public/' . "employer/pdf/company_{$user->id}.pdf");
        }else if($user){
            $file = app()->basePath('public/' . "seeker/pdf/seeker_{$user->id}.pdf");            
        }        
        if(!file_exists($file)){
            if($user && $user->role_id == 2){
                event(new \App\Events\EmployerRegisterEvent($user));
            }else if($user && $user->role_id == 3){
                event(new \App\Events\SeekerRegisterEvent($user));
            }
            
        }
    
        return response()->download($file);
    }

    public function changePassword(Request $request){
        $validator = Validator::make($request->all(), [
            'old_password' => ['required'],
            'new_password' => ['required'],
            'confirm_password' => ['required'],
        ]);
        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        if(!Hash::check($request->input('old_password'), auth()->user()->password)){
            return response(['message' => 'User not found', 'status' => false], 422);
        }
        \App\Models\User::whereId(auth()->user()->id)->update([
            'password' => Hash::make($request->input('new_password'))
        ]);
        

        return response(['message' => 'Successfully updated ', 'status' => true]);
    }

    public function seNewPassword(Request $request){

        $validator = Validator::make($request->all(), [
            'newPassword' => ['required'],            
        ]);
        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        if(!Auth::check() && $request->input("key", null)){
            $auth = app('firebase.auth');
            try {                
                $verifiedIdToken = $auth->verifyIdToken($request->input("key", null));
                
             
            } catch (FailedToVerifyToken $e) {                
                return response(['message' => 'User not exists', 'errors' =>  [
                    "accessToken" => ["Invalid access token"]
                ], 'status' => false], 422);                    
            }
            if(isset($verifiedIdToken) && $verifiedIdToken){
                $uid = $verifiedIdToken->claims()->get('sub');
                $user = $auth->getUser($uid);    
                
                $dbUser = \App\Models\User::where([
                        "phone" => $user->phoneNumber           
                       ])->first();
                if($dbUser){                    
                    $dbUser->password = Hash::make($request->input("newPassword", ''));
                    $dbUser->save();
                    return response(['message' => 'Successfully updated ', 'status' => true]);
                }
            }
            
        }
        
        return response(['message' => 'unexpected error ', 'status' => false], 422);

        
    }

    public function checkRegistered(Request $request){
        $mobile = $request->input("mobile", null);
        if($mobile ){
            $dbUser = \App\Models\User::where([
                "phone" => $mobile          
               ])->first();
            if($dbUser){
                return response(['message' => 'success', 'status' => true]);
            }
        }
       
        return response(['message' => 'user not registered with us', 'status' => false], 422);
        
    }
    // public function checkMail(){        
    //     $user = \App\Models\User::find(12);

       
    //     event(new \App\Events\SentResumePDFEvent($user));
    // }
    //
}
