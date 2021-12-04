<?php

namespace App\Http\Controllers\Api;

use App\Comment;
use App\Events\CommentCreatedEvent;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CommentRequest;
use App\Http\Resources\CommentResource;
use Illuminate\Support\Facades\Log;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        return CommentResource::collection(
            Comment::where('todo_id',$id)
            ->orderBy('created_at','desc')
            ->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CommentRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::user()->id;
        $comment = Comment::create($data);
        try{
            event(new CommentCreatedEvent($comment,$data));
        }
        catch(\Exception $e){
            Log::info($e->getMessage());
        }
        return response()->json('Success',200);
    }
}
