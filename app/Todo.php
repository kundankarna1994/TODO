<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Todo extends Model
{
    use SoftDeletes;
    
    protected $table = "todos";

    protected $fillable = ['title','slug','completed','user_id','asignee','due_date','description'];

    public function comments()
    {
        return $this->hasMany(Comment::class, 'todo_id');
    }

    public function asigned()
    {
        return $this->hasOne(User::class,'id','asignee');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
