<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResources;
use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Support\Facades\Auth;

/**
 * UserController
 */
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return UserResource::collection(User::all()->except(Auth::id()));
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function user()
    {
        $user = Auth::user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->accessToken;
        return response()->json(['user' => $user,'token' => $token]);
    }

    /**
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function notifications()
    {
        $user = Auth::user();
        return NotificationResources::collection($user->notifications);
    }
}
