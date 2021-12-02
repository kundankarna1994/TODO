<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|',
            'email' => 'required|string|email|unique:users',
            'password' => 'required',
            'confirm_password' => 'required|same:password'
        ]);

        if ($validator->fails()) {
            $response = [
                'error' => $validator->errors(),
            ];
            return response()->json($response, 404);
        }
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        if ($user) {
            $success['token'] =  $user->createToken('token')->accessToken;
            $success['message'] = "Registration successfull..";
            return response()->json($success,201);
        } else {
            $error = "Sorry! Registration is not successfull.";
            $response = [
                'error' => $error,
            ];
            return response()->json($response, 404);
        }
    }

    //login
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            $response = [
                'error' => $validator->errors(),
            ];
            return response()->json($response, 404);
        }

        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            $error = "Unauthorized";
            return response()->json($error, 401);
        }
        $user = $request->user();
        $success['token'] =  $user->createToken('token')->accessToken;
        return response()->json($success,200);
    }

    //logout
    public function logout(Request $request)
    {

        $isUser = $request->user()->token()->revoke();
        if ($isUser) {
            $success['message'] = "Successfully logged out.";
            return response()->json($success, 200);
        } else {
            $error = "Something went wrong.";
            return response()->json($error, 401);
        }
    }

    //getuser
    public function getUser(Request $request)
    {
        //$id = $request->user()->id;
        $user = $request->user();
        if ($user) {
            return response()->json($user, 200);
        } else {
            $error = "user not found";
            return response()->json($error, 500);
        }
    }
}
