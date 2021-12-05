<?php

namespace App\Http\Controllers\Api;

use App\Comment;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CommentRequest;
use App\Http\Resources\CommentResource;


/**
 * CommentController
 */
class CommentController extends Controller
{
    /**
     * @var Comment
     */
    private $model;

    /**
     * @param Comment $model
     */
    public function __construct(Comment $model)
    {
        $this->model = $model;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index($id)
    {
        return CommentResource::collection(
            $this->model->where('todo_id',$id)
            ->orderBy('created_at','desc')
            ->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CommentRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::user()->id;
        $this->model->create($data);
        return response()->json('Success',200);
    }
}
