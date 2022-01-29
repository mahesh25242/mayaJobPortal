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

    public function save(Request $request, $id=0){        
        $validator = Validator::make($request->all(), [                                   
            'value' => ['required']            
        ]);
        
       
        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        $setting = \App\Models\Setting::find( $id);
        $value = null;
        switch($setting->type){          
            case 'file':
                
                if ($request->hasFile('value')) {
                    $destinationPath = "assets/banner";
                    $extension = $request->file('value')->extension();
                    $value = sprintf("%s.%s", uniqid('banner_'),$extension);
                    $request->file('value')->move($destinationPath, $value);            
                }
                 
            break;
            default:
                $value = $request->input('value', '');
            break;
        }

        // $setting->name = $request->input('name', '');
        $setting->value = $value;
        $setting->save();
             
     
        return response(['message' => 'Successfully saved', 'status' => true]);
    }

    public function settings(Request $request){       
        $settings = \App\Models\Setting::all();
        return response($settings);
    }

    public function getBanners(){
        $banners = \App\Models\Setting::where("name", "home_banner")->get();
        return response($banners);
    }


    

}
