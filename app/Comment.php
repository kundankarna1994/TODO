<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    // use SoftDeletes;
    //uncomment after migration fresh
    protected $table = "comments";

    protected $fillable = ['user_id','todo_id','message', 'formated_message'];

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function todo()
    {
        return $this->belongsTo(Todo::class, 'todo_id');
    }
}
