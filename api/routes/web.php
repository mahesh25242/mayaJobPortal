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

$router->group(['prefix' => 'v1'], function () use ($router) {  
    $router->post('checkLogin','UserController@checkLogin');
    $router->post('refreshToken','UserController@refreshToken');
    
    
    $router->group(['prefix' => 'categories'], function () use ($router) {
        $router->get('/','CategoryController@categories');
        $router->post('/{id}','CategoryController@save');
        $router->delete('/{id}','CategoryController@delete');
    });

    $router->group(['prefix' => 'blogs'], function () use ($router) {
        $router->get('/','BlogController@blogs');
        $router->post('/{id}','BlogController@save');        
        $router->delete('/{id}','BlogController@delete');
        $router->get('infos','BlogController@blogsInfo');
        $router->get('/{id}','BlogController@viewDetails');
        
    });

    $router->group(['prefix' => 'settings'], function () use ($router) {
        $router->get('/','SettingController@settings');        
        $router->put('/{id}','SettingController@save');
        
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