<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;


class BlogController extends Controller
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
            'description' => ['required'],
            'status' => ['required'],                        
        ]);
        
       
        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
           
             
        $category = \App\Models\Blog::updateOrCreate(
            [
               'id'   => $request->input("id", 0),
            ],
            [
               'name'     => $request->input('name', ''),
               'description' => $request->input('description', ''),
               'meta_description' => $request->input('meta_description', ''),
               'meta_keywords' => $request->input('meta_keywords', ''),               
               'status'    => $request->input("status", '')              
            ],
        );
        return response(['message' => 'Successfully saved', 'status' => true]);
    }

    public function categories(Request $request){       
        $categories = \App\Models\Category::all();
        return response($categories);
    }

    public function delete($id=0){
        $category = \App\Models\Category::find($id);
        $category->delete();
        return response(['message' => 'Successfully deleted', 'status' => true]);
    }

}
