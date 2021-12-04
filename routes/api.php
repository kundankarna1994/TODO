<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'auth:api'],function(){
    Route::resource('todo', 'Api\TodoController');
    Route::post('todo/{id}/completed', 'Api\TodoController@completed');
    Route::get('users', 'Api\UserController@index');
    Route::get('user', 'Api\UserController@user');
    Route::get('user/notifications', 'Api\UserController@notifications');
    Route::get('todo/{id}/comments', 'Api\CommentController@index');
    Route::post('comments/store', 'Api\CommentController@store');
});