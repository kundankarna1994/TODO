<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    // use SoftDeletes;
    //uncomment after migration fresh
    /**
     * @var string
     */
    protected $table = "comments";

    /**
     * @var string[]
     */
    protected $fillable = ['user_id','todo_id','message', 'formated_message'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function todo()
    {
        return $this->belongsTo(Todo::class, 'todo_id');
    }
}
