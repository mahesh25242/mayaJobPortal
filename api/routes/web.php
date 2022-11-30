<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('/key', function() {
    return \Illuminate\Support\Str::random(32);
});


// $router->get('check','UserController@checkMail');
$router->group(['prefix' => 'v1'], function () use ($router) {  
    
    
    $router->post('checkLogin','UserController@checkLogin');
    $router->post('refreshToken','UserController@refreshToken');
    $router->put('seNewPassword','UserController@seNewPassword');
    
    $router->get('categories','CategoryController@categories');
    $router->get('blogs','BlogController@blogs');
    $router->get('blogs/{id}','BlogController@viewDetails');        
    $router->post('employer/register[/{id}]','UserController@registerEmployer');
    $router->post('seeker/register[/{id}]','UserController@registerSeeker');
    
    $router->get('banners','SettingController@getBanners');
    
    $router->group(['middleware' => 'auth'], function () use ($router) {
        $router->get('/user', 'UserController@getUser');    
        $router->put('/changePassword', 'UserController@changePassword');    
        
        $router->group(['prefix' => 'categories'], function () use ($router) {            
            $router->post('/{id}','CategoryController@save');
            $router->delete('/{id}','CategoryController@delete');
        });


        $router->group(['prefix' => 'blogs'], function () use ($router) {            
            $router->post('/{id}','BlogController@save');        
            $router->delete('/{id}','BlogController@delete');
            // $router->get('infos','BlogController@blogsInfo');
                
        });

        $router->group(['prefix' => 'settings'], function () use ($router) {
            $router->get('/','SettingController@settings');        
            $router->post('/{id}','SettingController@save');
            
        });

        $router->get('downloadPDF[/{id}]','UserController@downloadPDF');
        
        $router->group(['prefix' => 'employer'], function () use ($router) {
            $router->get('/','UserController@employers');              
            $router->delete('delete/{id}','UserController@delete');
           
        });
        $router->group(['prefix' => 'seeker'], function () use ($router) {
            $router->get('/','UserController@seeker');               
            $router->delete('delete/{id}','UserController@delete');            
            
        });

    });
    
   

   

   

    $router->group(['prefix' => 'employer'], function () use ($router) {
        $router->get('/','UserController@employers');   
        $router->post('register[/{id}]','UserController@registerEmployer');
        $router->delete('delete/{id}','UserController@delete');
    });
    $router->group(['prefix' => 'seeker'], function () use ($router) {
        $router->get('/','UserController@seeker');   
        $router->post('register[/{id}]','UserController@registerSeeker');
        $router->delete('delete/{id}','UserController@delete');
        
    });
});