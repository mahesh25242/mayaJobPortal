<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;


class CategoryController extends Controller
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
            'status' => ['required'],                        
        ]);
        
       
        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
           
             
        $category = \App\Models\Category::updateOrCreate(
            [
               'id'   => $request->input("id", 0),
            ],
            [
               'name'     => $request->input('name', ''),
               'description' => $request->input('description', ''),
               'status'    => $request->input("status", '')              
            ],
        );
        return response(['message' => 'Successfully saved', 'status' => true]);
    }

    public function categories(Request $request){       
        $categories = \App\Models\Category::withCount(["employer", "seeker"])->orderBy('name', 'ASC')->get();       
        return response($categories);
    }

    public function delete($id=0){
        $category = \App\Models\Category::find($id);
        $category->delete();
        return response(['message' => 'Successfully deleted', 'status' => true]);
    }

}
