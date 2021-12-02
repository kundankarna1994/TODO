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
        $data = $request->all();
        $data['slug'] = Str::slug($data['title']);
        $data['user_id'] = Auth::user()->id;
        $data['due_date'] = Carbon::parse($data['due_date'])->toDateTimeString();
        $model = Todo::create($data);
        if($model){
            return response()->json('Todo Added',200);
        }
        return response()->json('Something went wrong',500);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
