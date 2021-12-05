<?php

namespace App\Http\Controllers\Api;

use App\Todo;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\TodoResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\TodoStoreRequest;
use App\Http\Requests\TodoUpdateRequest;

/**
 * TodoController
 */
class TodoController extends Controller
{

    /**
     * @var Todo
     */
    private $model;

    /**
     * @param Todo $model
     */
    public function __construct(Todo $model)
    {
        $this->model = $model;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return TodoResource::collection(Todo::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\TodoStoreRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(TodoStoreRequest $request)
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($data['title']);
        $data['user_id'] = Auth::user()->id;
        $data['due_date'] = Carbon::parse($data['due_date'])->toDateTimeString();
        $this->model->create($data);
        return response()->json('Todo Added',200);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $slug
     * @return TodoResource
     */
    public function show($slug)
    {
        return new TodoResource($this->model->where('slug',$slug)->first());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $slug
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(TodoUpdateRequest $request, $slug)
    {
        $model = $this->model->where('slug',$slug)->first();
        $data = $request->validated();
        $data['due_date'] = Carbon::parse($data['due_date'])->toDateTimeString();
        $model->update($data);
        return response()->json('Todo Updated', 200);
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function completed(Request $request, $id)
    {
        $todo = $this->model->find($id);
        $data = $request->only('completed');
        $todo->update($data);
        return response()->json('Todo Completed', 200);
    }

}
