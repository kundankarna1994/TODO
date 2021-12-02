<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Todo extends Model
{
    use SoftDeletes;
    
    protected $table = "todos";

    protected $fillable = ['title','slug','completed','user_id','assignee','due_date','description'];

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
