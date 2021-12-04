<?php

namespace App\Http\Controllers\Api;

use App\Events\NotificationEvent;
use App\Todo;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Events\TodoCreatedEvent;
use App\Events\TodoCompletedEvent;
use App\Http\Controllers\Controller;
use App\Http\Resources\TodoResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\TodoStoreRequest;
use App\Http\Requests\TodoUpdateRequest;
use Illuminate\Support\Facades\Log;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TodoResource::collection(Todo::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TodoStoreRequest $request)
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($data['title']);
        $data['user_id'] = Auth::user()->id;
        $data['due_date'] = Carbon::parse($data['due_date'])->toDateTimeString();
        $model = Todo::create($data);
        try{
            event(new TodoCreatedEvent($model));
        }
        catch(\Exception $e){
            Log::info($e->getMessage());
        }
        return response()->json('Todo Added',200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        return new TodoResource(Todo::where('slug',$slug)->first());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(TodoUpdateRequest $request, $slug)
    {
        $model = Todo::where('slug',$slug)->first();
        $data = $request->validated();
        $data['due_date'] = Carbon::parse($data['due_date'])->toDateTimeString();
        $model->update($data);
        return response()->json('Todo Updated', 200);
    }

    public function completed(Request $request, $id)
    {
        $todo = Todo::find($id);
        $data = $request->only('completed');
        $todo->update($data);
        try{
            event(new TodoCompletedEvent($todo));
        }
        catch(\Exception $e){
            Log::info($e->getMessage());
        }
        return response()->json('Todo Completed', 200);
    }

}
