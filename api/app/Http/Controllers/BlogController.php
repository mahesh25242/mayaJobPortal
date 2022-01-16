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

    public function save(Request $request, $id=0){
        $validator = Validator::make($request->all(), [                       
            'name' => ['required'],
            'description' => ['required'],
            'status' => ['required'],                        
        ]);
        
       
        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
           
             
        $blog = \App\Models\Blog::updateOrCreate(
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

    public function blogs(Request $request){       
        $blogs = \App\Models\Blog::all();
        return response($blogs);
    }

    public function delete($id=0){
        $blog = \App\Models\Blog::find($id);
        $blog->delete();
        return response(['message' => 'Successfully deleted', 'status' => true]);
    }

}
