<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    // use SoftDeletes;
    //uncomment after migration fresh
    protected $table = "comments";

    protected $fillable = ['user_id','todo_id','message'];
}
