<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;


class SettingController extends Controller
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

    public function save(Request $request){
        $validator = Validator::make($request->all(), [                       
            'name' => ['required'],
            'value' => ['required'],            
        ]);
        
       
        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
           
             
        $setting = \App\Models\Setting::updateOrCreate(
            [
               'id'   => $request->input("id", 0),
            ],
            [
               'name'     => $request->input('name', ''),
               'value' => $request->input('value', '')
            ],
        );
        return response(['message' => 'Successfully saved', 'status' => true]);
    }

    public function settings(Request $request){       
        $settings = \App\Models\Setting::all();
        return response($settings);
    }

    

}
